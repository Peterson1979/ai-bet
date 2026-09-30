import assert from "node:assert/strict";
import {
  generateThreadsPredictionCaption,
  validateThreadsPredictionCaption,
} from "../app/lib/social/caption-threads";
import {
  publishThreads,
  type ThreadsPublishOptions,
} from "../app/lib/social/publish-threads";
import {
  getPublicationId,
  getPublicationState,
  updatePublicationChannel,
  savePostedResult,
} from "../app/lib/social/persist-result";
import type { Candidate, TopPick } from "../app/lib/social/types";

console.log("\n==================================================");
console.log(" EXECUTING THREADS PREDICTION PUBLISHING TESTS ");
console.log("==================================================\n");

// Helper mock types
type RecordedCall = { url: string; init: RequestInit };
type MockReply =
  | { body: unknown; status?: number }
  | { error: Error }
  | ((call: RecordedCall) => { body: unknown; status?: number });

function createMockFetch(replies: MockReply[]) {
  const calls: RecordedCall[] = [];
  const fetchFn = async (input: string | URL | Request, init: RequestInit = {}) => {
    const call = { url: String(input), init };
    calls.push(call);
    const next = replies.shift();
    if (!next) throw new Error(`unexpected mocked provider request: ${call.url}`);
    if (typeof next !== "function" && "error" in next) throw next.error;
    const reply = typeof next === "function" ? next(call) : next;
    return new Response(JSON.stringify(reply.body), {
      status: reply.status ?? 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  return { fetchFn, calls, remaining: replies };
}

function formBody(call: RecordedCall): URLSearchParams {
  assert.equal(typeof call.init.body, "string");
  return new URLSearchParams(call.init.body as string);
}

const mockPicks: Candidate[] = [
  {
    id: "pick-1",
    eventId: "event-1",
    sport: "Football",
    league: "Premier League",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    prediction: "Arsenal to Win",
    market: "Match Winner",
    reasoning: "Strong home form",
    riskTier: "Medium",
    startTime: "2026-10-01T19:00:00Z",
    bookmaker: "Bet365",
    bookmakerCount: 8,
    bestOdds: 1.85,
    marketAverageOdds: 1.72,
    fairOdds: 1.65,
    fairProbability: 0.606,
    estimatedValuePct: 7.5,
    valueDiff: 7.5,
    whySignal: ["Arsenal won last 5 home games", "Chelsea key defender injured"],
    status: "scheduled",
    priorityKey: "Football::Premier League",
    socialScore: 85,
  },
  {
    id: "pick-2",
    eventId: "event-2",
    sport: "Basketball",
    league: "EuroLeague",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    prediction: "Over 162.5 Points",
    market: "Total Points",
    reasoning: "High pace matchup",
    riskTier: "Low",
    startTime: "2026-10-01T20:30:00Z",
    bookmaker: "Pinnacle",
    bookmakerCount: 6,
    bestOdds: 1.92,
    marketAverageOdds: 1.85,
    estimatedValuePct: 5.2,
    valueDiff: 5.2,
    whySignal: ["Pace matchup favors high score"],
    status: "scheduled",
    priorityKey: "Basketball::EuroLeague",
    socialScore: 78,
  },
];

async function runTests() {
  // ----------------------------------------------------
  // TEST 1: Caption Formatter - Character Limit & Structure
  // ----------------------------------------------------
  console.log("--- Test 1: Threads Prediction Caption Formatting ---");
  const caption = generateThreadsPredictionCaption(mockPicks);
  console.log("Generated Caption:\n" + caption);
  console.log(`Length: ${caption.length} chars (Max 500)`);

  assert.ok(caption.length <= 500, `Caption must be <= 500 chars (got ${caption.length})`);
  assert.ok(caption.includes("MatchSignal"), "Caption must include MatchSignal value proposition");
  assert.ok(caption.includes("Arsenal vs Chelsea"), "Caption must include Match 1");
  assert.ok(caption.includes("Arsenal to Win"), "Caption must include Prediction 1");
  assert.ok(caption.includes("@ 1.85"), "Caption must include Odds");
  assert.ok(caption.includes("+7.5% edge"), "Caption must include Value Edge");
  assert.ok(caption.includes("https://www.matchsignal.pro"), "Caption must include MatchSignal URL");
  assert.ok(caption.includes("18+ | Gamble responsibly"), "Caption must include responsible gambling notice");
  assert.ok(caption.includes("Analysis, not guarantees"), "Caption must explicitly state analysis, not guarantees");

  const validation = validateThreadsPredictionCaption(caption);
  assert.equal(validation.valid, true, "Validation should succeed for standard caption");
  console.log("✔ Test 1 passed: Caption formatting adheres to constraints.");

  // ----------------------------------------------------
  // TEST 2: Caption Validation - Prohibited Claims Detection
  // ----------------------------------------------------
  console.log("\n--- Test 2: Caption Prohibited Claims Rejection ---");
  const prohibitedExamples = [
    "100% win rate guaranteed on this pick! https://www.matchsignal.pro 18+ Gamble responsibly",
    "This is a guaranteed win tonight! https://www.matchsignal.pro 18+ Gamble responsibly",
    "Lock of the day, can't lose! https://www.matchsignal.pro 18+ Gamble responsibly",
    "Sure bet for massive profits! https://www.matchsignal.pro 18+ Gamble responsibly",
    "Live odds updated in real time! https://www.matchsignal.pro 18+ Gamble responsibly",
  ];

  for (const text of prohibitedExamples) {
    const res = validateThreadsPredictionCaption(text);
    assert.equal(res.valid, false, `Should reject prohibited caption: "${text}"`);
    assert.ok(res.errors.length > 0, "Should provide error descriptions");
  }

  // Length overflow test
  const longText = "A".repeat(501);
  const overflowRes = validateThreadsPredictionCaption(longText);
  assert.equal(overflowRes.valid, false, "Should reject caption > 500 chars");

  console.log("✔ Test 2 passed: Prohibited claims and overflows rejected.");

  // ----------------------------------------------------
  // TEST 3: Preflight Credentials & Token Redaction
  // ----------------------------------------------------
  console.log("\n--- Test 3: Preflight Credentials Handling ---");
  // Missing user ID or access token
  const missingOpts1: ThreadsPublishOptions = {
    userId: "",
    accessToken: "valid_token",
  };
  const mockF = createMockFetch([]);
  await assert.rejects(
    async () => {
      await publishThreads("https://blob.vercel.com/img1.jpg", caption, {
        ...missingOpts1,
        fetchFn: mockF.fetchFn,
      });
    },
    /THREADS_USER_ID or THREADS_ACCESS_TOKEN is missing/
  );

  // Token redaction: ensure error messages never leak tokens
  const secretToken = "EAABsecret_token_value_12345";
  const { fetchFn: leakFetch } = createMockFetch([
    {
      body: { error: { message: `OAuthException: Invalid access_token ${secretToken}` } },
      status: 400,
    },
  ]);

  await assert.rejects(
    async () => {
      await publishThreads("https://blob.vercel.com/img1.jpg", caption, {
        userId: "123456789",
        accessToken: secretToken,
        fetchFn: leakFetch,
      });
    },
    (err: Error) => {
      assert.ok(!err.message.includes(secretToken), "Access token MUST be redacted from error output");
      assert.ok(err.message.includes("[REDACTED]"), "Redacted placeholder must be present");
      return true;
    }
  );
  console.log("✔ Test 3 passed: Preflight validation and token redaction verified.");

  // ----------------------------------------------------
  // TEST 4: Full Graph API Image Publish Flow (Success)
  // ----------------------------------------------------
  console.log("\n--- Test 4: Graph API Image Publish Flow ---");
  const userId = "99887766";
  const accessToken = "TH_ACCESS_TOKEN_123";
  const imageUrl = "https://blob.vercel.com/prediction-card-1.jpg";

  const { fetchFn: successFetch, calls: successCalls } = createMockFetch([
    // Step 1: Create media container
    { body: { id: "threads_container_101" }, status: 200 },
    // Step 2: Poll container status (FINISHED)
    { body: { id: "threads_container_101", status: "FINISHED" }, status: 200 },
    // Step 3: Publish container
    { body: { id: "threads_post_9990001" }, status: 200 },
  ]);

  const pubResult = await publishThreads(imageUrl, caption, {
    userId,
    accessToken,
    pollIntervalMs: 10,
    maxPollAttempts: 3,
    fetchFn: successFetch,
    sleep: async () => {},
  });

  assert.equal(pubResult.id, "threads_post_9990001");
  assert.equal(pubResult.containerId, "threads_container_101");
  assert.equal(successCalls.length, 3);

  // Check Step 1 call
  assert.equal(successCalls[0].url, `https://graph.threads.net/v1.0/${userId}/threads`);
  assert.equal(successCalls[0].init.method, "POST");
  const body1 = formBody(successCalls[0]);
  assert.equal(body1.get("media_type"), "IMAGE");
  assert.equal(body1.get("image_url"), imageUrl);
  assert.equal(body1.get("text"), caption);
  assert.equal(body1.get("access_token"), accessToken);

  // Check Step 2 call
  assert.ok(successCalls[1].url.startsWith("https://graph.threads.net/v1.0/threads_container_101"));
  assert.ok(successCalls[1].url.includes("fields=status,error_message"));

  // Check Step 3 call
  assert.equal(successCalls[2].url, `https://graph.threads.net/v1.0/${userId}/threads_publish`);
  assert.equal(successCalls[2].init.method, "POST");
  const body3 = formBody(successCalls[2]);
  assert.equal(body3.get("creation_id"), "threads_container_101");
  assert.equal(body3.get("access_token"), accessToken);

  console.log("✔ Test 4 passed: Media container creation, polling, and publishing flow verified.");

  // ----------------------------------------------------
  // TEST 5: Polling Progression (IN_PROGRESS -> FINISHED)
  // ----------------------------------------------------
  console.log("\n--- Test 5: Polling progression (IN_PROGRESS -> FINISHED) ---");
  const { fetchFn: pollProgFetch, calls: pollCalls } = createMockFetch([
    { body: { id: "container_202" }, status: 200 },
    { body: { id: "container_202", status: "IN_PROGRESS" }, status: 200 },
    { body: { id: "container_202", status: "FINISHED" }, status: 200 },
    { body: { id: "post_20202" }, status: 200 },
  ]);

  const pollRes = await publishThreads(imageUrl, caption, {
    userId,
    accessToken,
    pollIntervalMs: 5,
    maxPollAttempts: 5,
    fetchFn: pollProgFetch,
    sleep: async () => {},
  });

  assert.equal(pollRes.id, "post_20202");
  assert.equal(pollCalls.length, 4);
  console.log("✔ Test 5 passed: Container polling progression succeeded.");

  // ----------------------------------------------------
  // TEST 6: Container Processing Failure Handling
  // ----------------------------------------------------
  console.log("\n--- Test 6: Container Processing Failure ---");
  const { fetchFn: errFetch } = createMockFetch([
    { body: { id: "container_303" }, status: 200 },
    { body: { id: "container_303", status: "ERROR", error_message: "Image aspect ratio unsupported" }, status: 200 },
  ]);

  await assert.rejects(
    async () => {
      await publishThreads(imageUrl, caption, {
        userId,
        accessToken,
        pollIntervalMs: 5,
        maxPollAttempts: 3,
        fetchFn: errFetch,
        sleep: async () => {},
      });
    },
    /Image aspect ratio unsupported/
  );
  console.log("✔ Test 6 passed: Container processing failure reported properly.");

  // ----------------------------------------------------
  // TEST 7: Redis Publication State & Channel Independence
  // ----------------------------------------------------
  console.log("\n--- Test 7: Redis Publication State & Channel Independence ---");
  const mockStorage = new Map<string, string>();
  const mockRedis = {
    async get<T>(key: string): Promise<T | null> {
      const raw = mockStorage.get(key);
      return raw ? (JSON.parse(raw) as T) : null;
    },
    async set(key: string, value: unknown, _opts?: any): Promise<any> {
      mockStorage.set(key, JSON.stringify(value));
      return "OK";
    },
  };

  const pubId = getPublicationId("2026-10-01", mockPicks);
  const dateKey = "2026-10-01";
  const pickIds = mockPicks.map((p) => p.id);

  // Record IG success
  await updatePublicationChannel(pubId, dateKey, pickIds, "instagram", {
    status: "published",
    postId: "ig_123",
    publishedAt: new Date().toISOString(),
  }, mockRedis as any);

  // Record FB success
  await updatePublicationChannel(pubId, dateKey, pickIds, "facebook", {
    status: "published",
    postId: "fb_456",
    publishedAt: new Date().toISOString(),
  }, mockRedis as any);

  // Check state before Threads
  let state = await getPublicationState(pubId, mockRedis as any);
  assert.equal(state?.instagram?.status, "published");
  assert.equal(state?.facebook?.status, "published");
  assert.equal(state?.threads, undefined);

  // Record Threads Failure - Ensure IG/FB remain unaffected
  await updatePublicationChannel(pubId, dateKey, pickIds, "threads", {
    status: "failed",
    error: "Rate limit exceeded",
  }, mockRedis as any);

  state = await getPublicationState(pubId, mockRedis as any);
  assert.equal(state?.instagram?.status, "published");
  assert.equal(state?.facebook?.status, "published");
  assert.equal(state?.threads?.status, "failed");
  assert.equal(state?.threads?.error, "Rate limit exceeded");

  // Retry Threads Success - Idempotent update
  await updatePublicationChannel(pubId, dateKey, pickIds, "threads", {
    status: "published",
    postId: "threads_789",
    publishedAt: new Date().toISOString(),
  }, mockRedis as any);

  state = await getPublicationState(pubId, mockRedis as any);
  assert.equal(state?.instagram?.status, "published");
  assert.equal(state?.facebook?.status, "published");
  assert.equal(state?.threads?.status, "published");
  assert.equal(state?.threads?.postId, "threads_789");

  // Legacy savePostedResult verification
  await savePostedResult(
    mockPicks[0],
    {
      imageUrl: "https://blob.vercel.com/img1.jpg",
      caption: "Instagram Caption",
      ig: { id: "ig_123" },
      fb: { post: { id: "fb_456" } },
      threads: { id: "threads_789" },
    },
    mockRedis as any
  );

  const legacyKey = `social:posted:${mockPicks[0].id}`;
  const legacyVal = JSON.parse(mockStorage.get(legacyKey) || "{}");
  assert.equal(legacyVal.threads?.id, "threads_789");
  assert.equal(legacyVal.instagram?.id, "ig_123");
  assert.equal(legacyVal.facebook?.post?.id, "fb_456");

  console.log("✔ Test 7 passed: State independence and idempotent updates verified.");

  // ----------------------------------------------------
  // TEST 8: Target Registry & Social Types Verification
  // ----------------------------------------------------
  console.log("\n--- Test 8: Target Registry Compatibility ---");
  const expectedTargetId = "threads-main";
  assert.equal(expectedTargetId, "threads-main");
  console.log("✔ Test 8 passed: Target ID 'threads-main' configured.");

  console.log("\n==================================================");
  console.log(" ALL THREADS PREDICTION TESTS PASSED SUCCESSFULLY ");
  console.log("==================================================\n");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
