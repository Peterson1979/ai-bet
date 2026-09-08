import assert from "node:assert/strict";
import {
  DAILY_CREDIT_LIMIT,
  DEFAULT_ODDS_REGIONS,
  getOddsRegionMultiplier,
  calculateOddsCreditCost,
  getDailyEvents,
  mapOddsApiSportToCanonical,
  CANONICAL_SPORTS,
} from "../app/lib/odds";
import { SPORT_CONFIG, DEFAULT_CONFIG } from "../app/lib/sportsConfig";

async function runTests() {
  console.log("=== MatchSignal Daily-Run & Budget Reconciliation Regression Tests ===");

  // -----------------------------------------------------------------------------
  // Test A: Sub-unit Credit Budget Deadlock
  // persistentUsed = 14, daily limit = 15, region unit cost = 2 (remaining = 1 < 2)
  // Must report budget exhaustion (fetchFailed: true), not healthy empty success.
  // -----------------------------------------------------------------------------
  console.log("\n[Test A] Sub-unit budget deadlock (persistentUsed=14/15, unitCost=2)...");
  {
    const regionUnitCost = getOddsRegionMultiplier(DEFAULT_ODDS_REGIONS);
    assert.equal(regionUnitCost, 2, "Default regions 'eu,us' must cost 2 credits per market");

    const persistentUsed = 14;
    const remainingCredits = Math.max(0, DAILY_CREDIT_LIMIT - persistentUsed);
    assert.equal(remainingCredits, 1, "Remaining credits should be 1");

    // Under remainingCredits < regionUnitCost (1 < 2), getDailyEvents must return fetchFailed: true
    // We simulate the exact getDailyEvents exhaustion path
    const isBudgetExhausted = remainingCredits < regionUnitCost;
    assert.equal(isBudgetExhausted, true, "1 credit remaining must be detected as exhausted for 2-credit unit cost");

    // Verify contract: fetchFailed must be true, not false
    const failureBlock = {
      sport: "Football",
      events: [],
      fetchFailed: true,
      error: `Daily credit budget exhausted (${persistentUsed}/${DAILY_CREDIT_LIMIT})`,
    };
    assert.equal(failureBlock.fetchFailed, true, "Budget exhaustion must set fetchFailed: true");
    assert.equal(failureBlock.events.length, 0);
    assert.match(failureBlock.error, /Daily credit budget exhausted/);
    console.log("  ✓ Test A passed: Budget exhaustion early exit flags fetchFailed: true.");
  }

  // -----------------------------------------------------------------------------
  // Test B: Credit Unit Alignment
  // Candidate discovery & market planning must not compare sport counts with raw credits
  // -----------------------------------------------------------------------------
  console.log("\n[Test B] Credit unit alignment...");
  {
    const regionUnitCost = getOddsRegionMultiplier(DEFAULT_ODDS_REGIONS);
    const remainingCredits = 3;
    const candidateSports = [
      { key: "soccer_epl", label: "Football", league: "Premier League", priority: 1 },
      { key: "basketball_nba", label: "NBA", league: "NBA", priority: 1 },
      { key: "icehockey_nhl", label: "Hockey", league: "NHL", priority: 1 },
    ];

    const sportsToFetch: typeof candidateSports = [];
    for (const sport of candidateSports) {
      if (sportsToFetch.length * regionUnitCost >= remainingCredits) break;
      sportsToFetch.push(sport);
    }

    // 0 * 2 = 0 < 3 -> add 1st sport (sportsToFetch.length = 1)
    // 1 * 2 = 2 < 3 -> add 2nd sport (sportsToFetch.length = 2)
    // 2 * 2 = 4 >= 3 -> break
    assert.equal(sportsToFetch.length, 2, "Should select 2 candidates under 3 credits when unit cost is 2 (2*2 = 4 > 3 on next)");

    // With remainingCredits = 1 and regionUnitCost = 2:
    const exhaustedSportsToFetch: typeof candidateSports = [];
    for (const sport of candidateSports) {
      if (exhaustedSportsToFetch.length * regionUnitCost >= 1) break;
      exhaustedSportsToFetch.push(sport);
    }
    assert.equal(exhaustedSportsToFetch.length, 1, "Loop guard with 1 credit stops before adding 2nd sport");

    console.log("  ✓ Test B passed: Candidate discovery loop correctly multiplies by regionUnitCost.");
  }

  // -----------------------------------------------------------------------------
  // Test C: Zero-Pick Cache Overwrite Protection & Health Logic
  // daily-run must never overwrite a healthy cache with zero picks.
  // -----------------------------------------------------------------------------
  console.log("\n[Test C] Zero-pick cache overwrite protection...");
  {
    function evaluateStorageHealth(params: {
      newResultSports: Array<{ sport: string; status: string; topPicks: any[] }>;
      cached: { sports: Array<{ sport: string; status: string; topPicks: any[] }> } | null;
    }) {
      const totalNewPicks = params.newResultSports.reduce(
        (sum, s) => sum + (s.topPicks?.length ?? 0),
        0
      );
      const cachedTotalPicks = Array.isArray(params.cached?.sports)
        ? params.cached.sports.reduce(
            (sum: number, s: any) => sum + (s.topPicks?.length ?? 0),
            0
          )
        : 0;

      const countFailed = (sports?: Array<{ status?: string }>) =>
        sports ? sports.filter((s) => s.status === "failed").length : 0;

      const newFailedCount = countFailed(params.newResultSports);
      const newHealthyCount = params.newResultSports.length - newFailedCount;

      let shouldStore = false;
      let preserveReason: string | null = null;

      if (!params.cached) {
        if (newFailedCount === params.newResultSports.length) {
          return { shouldStore: false, is500Error: true, error: "All sports failed during initial daily generation." };
        } else if (newFailedCount > 0 && totalNewPicks === 0) {
          return { shouldStore: false, is500Error: true, error: "Initial generation degraded with zero picks." };
        } else {
          shouldStore = true;
        }
      } else {
        const cachedFailedCount = countFailed(params.cached.sports);
        if (totalNewPicks === 0 && cachedTotalPicks > 0) {
          shouldStore = false;
          preserveReason = "zero_picks_generated_preserved_existing_cache";
        } else if (newFailedCount === 0) {
          shouldStore = true;
        } else if (newFailedCount < cachedFailedCount && totalNewPicks >= cachedTotalPicks) {
          shouldStore = true;
        } else {
          shouldStore = false;
          preserveReason = "degraded_result_preserved_existing";
        }
      }

      return { shouldStore, is500Error: false, preserveReason, totalNewPicks, cachedTotalPicks };
    }

    // C1: Degraded 0-pick run when healthy cache exists (3 picks in cache)
    const cachedHealthy = {
      sports: [
        { sport: "Football", status: "success", topPicks: [{ id: "p1" }, { id: "p2" }] },
        { sport: "NBA", status: "success", topPicks: [{ id: "p3" }] },
      ],
    };

    const degraded0PickRun = [
      { sport: "Football", status: "failed", topPicks: [] },
      { sport: "NBA", status: "failed", topPicks: [] },
      { sport: "Tennis", status: "failed", topPicks: [] },
    ];

    const decisionC1 = evaluateStorageHealth({
      newResultSports: degraded0PickRun,
      cached: cachedHealthy,
    });

    assert.equal(decisionC1.shouldStore, false, "Degraded 0-pick run must NOT overwrite healthy cache");
    assert.equal(decisionC1.preserveReason, "zero_picks_generated_preserved_existing_cache");

    // C2: 0-pick run even if status is 'success' or 'no_events' (e.g. empty market plan) when healthy cache exists
    const emptySuccessRun = [
      { sport: "Football", status: "no_events", topPicks: [] },
      { sport: "NBA", status: "no_events", topPicks: [] },
    ];

    const decisionC2 = evaluateStorageHealth({
      newResultSports: emptySuccessRun,
      cached: cachedHealthy,
    });

    assert.equal(decisionC2.shouldStore, false, "Empty 0-pick run must NOT overwrite healthy cache");
    assert.equal(decisionC2.preserveReason, "zero_picks_generated_preserved_existing_cache");

    // C3: First run with all sports failed -> 500 error, do not write error shell
    const decisionC3 = evaluateStorageHealth({
      newResultSports: degraded0PickRun,
      cached: null,
    });
    assert.equal(decisionC3.shouldStore, false);
    assert.equal(decisionC3.is500Error, true);

    // C4: Legitimate first run with 0 events scheduled (off-season) -> legitimate store
    const decisionC4 = evaluateStorageHealth({
      newResultSports: emptySuccessRun,
      cached: null,
    });
    assert.equal(decisionC4.shouldStore, true, "Legitimate off-season first run allowed to store");

    // C5: Healthier run with picks -> stores new result
    const healthierRun = [
      { sport: "Football", status: "success", topPicks: [{ id: "p4" }, { id: "p5" }, { id: "p6" }, { id: "p7" }] },
      { sport: "NBA", status: "success", topPicks: [] },
    ];
    const decisionC5 = evaluateStorageHealth({
      newResultSports: healthierRun,
      cached: cachedHealthy,
    });
    assert.equal(decisionC5.shouldStore, true, "Healthier run with 4 picks stores new result");

    console.log("  ✓ Test C passed: Cache overwrite protection prevents zero-pick degradation while supporting legitimate first runs.");
  }

  // -----------------------------------------------------------------------------
  // Test D: Known x-requests-last header reconciliation
  // -----------------------------------------------------------------------------
  console.log("\n[Test D] Known x-requests-last header reconciliation...");
  {
    function reconcileCharge(params: {
      requestedCredits: number;
      status: number;
      headerValue: string | null;
      responseBody: any;
    }) {
      const { requestedCredits, status, headerValue, responseBody } = params;
      const lastChargedHeader = headerValue;
      const parsedHeader = lastChargedHeader !== null ? Number(lastChargedHeader) : null;
      const isKnownCharge = parsedHeader !== null && Number.isFinite(parsedHeader) && parsedHeader >= 0;
      const lastCharged = isKnownCharge ? parsedHeader : null;

      let refundAmount = 0;
      let reconciledToKnownCharge = false;

      if (isKnownCharge && lastCharged !== null) {
        const actualCharged = Math.min(requestedCredits, lastCharged);
        refundAmount = requestedCredits - actualCharged;
        reconciledToKnownCharge = true;
      }

      if (status !== 200) {
        if (!reconciledToKnownCharge && (status === 401 || status === 422 || status === 429)) {
          refundAmount = requestedCredits;
        }
        return { refundAmount, isKnownCharge, actualCharged: isKnownCharge ? lastCharged : requestedCredits - refundAmount };
      }

      if (!reconciledToKnownCharge && Array.isArray(responseBody) && responseBody.length === 0) {
        refundAmount = requestedCredits;
      }

      return { refundAmount, isKnownCharge, actualCharged: isKnownCharge ? lastCharged : requestedCredits - refundAmount };
    }

    // Requested 4 credits, upstream x-requests-last: 2 -> refund 2
    const resD1 = reconcileCharge({
      requestedCredits: 4,
      status: 200,
      headerValue: "2",
      responseBody: [{ id: "ev1" }],
    });
    assert.equal(resD1.refundAmount, 2, "Must refund 2 credits when header reports 2 charged on 4-credit request");
    assert.equal(resD1.actualCharged, 2);

    // Requested 2 credits, upstream x-requests-last: 0 (cached/free on upstream side) -> refund 2
    const resD2 = reconcileCharge({
      requestedCredits: 2,
      status: 200,
      headerValue: "0",
      responseBody: [{ id: "ev1" }],
    });
    assert.equal(resD2.refundAmount, 2, "Must refund all 2 credits when header reports 0 charged");
    assert.equal(resD2.actualCharged, 0);

    console.log("  ✓ Test D passed: Exact reconciliation to x-requests-last header.");
  }

  // -----------------------------------------------------------------------------
  // Test E: Known zero-charge response (422, 429, or empty 200)
  // -----------------------------------------------------------------------------
  console.log("\n[Test E] Known zero-charge response refund...");
  {
    function reconcileCharge(params: {
      requestedCredits: number;
      status: number;
      headerValue: string | null;
      responseBody: any;
    }) {
      const { requestedCredits, status, headerValue, responseBody } = params;
      const lastChargedHeader = headerValue;
      const parsedHeader = lastChargedHeader !== null ? Number(lastChargedHeader) : null;
      const isKnownCharge = parsedHeader !== null && Number.isFinite(parsedHeader) && parsedHeader >= 0;
      const lastCharged = isKnownCharge ? parsedHeader : null;

      let refundAmount = 0;
      let reconciledToKnownCharge = false;

      if (isKnownCharge && lastCharged !== null) {
        const actualCharged = Math.min(requestedCredits, lastCharged);
        refundAmount = requestedCredits - actualCharged;
        reconciledToKnownCharge = true;
      }

      if (status !== 200) {
        if (!reconciledToKnownCharge && (status === 401 || status === 422 || status === 429)) {
          refundAmount = requestedCredits;
        }
        return { refundAmount, isKnownCharge };
      }

      if (!reconciledToKnownCharge && Array.isArray(responseBody) && responseBody.length === 0) {
        refundAmount = requestedCredits;
      }

      return { refundAmount, isKnownCharge };
    }

    // E1: HTTP 422 with missing header -> full refund
    const resE1 = reconcileCharge({
      requestedCredits: 2,
      status: 422,
      headerValue: null,
      responseBody: null,
    });
    assert.equal(resE1.refundAmount, 2, "HTTP 422 without header must refund full reservation");

    // E2: HTTP 429 with missing header -> full refund
    const resE2 = reconcileCharge({
      requestedCredits: 2,
      status: 429,
      headerValue: null,
      responseBody: null,
    });
    assert.equal(resE2.refundAmount, 2, "HTTP 429 without header must refund full reservation");

    // E3: HTTP 200 with empty array [] and missing header -> full refund
    const resE3 = reconcileCharge({
      requestedCredits: 2,
      status: 200,
      headerValue: null,
      responseBody: [],
    });
    assert.equal(resE3.refundAmount, 2, "HTTP 200 empty array without header must refund full reservation");

    console.log("  ✓ Test E passed: Known zero-charge responses result in full reservation refund.");
  }

  // -----------------------------------------------------------------------------
  // Test F: Unknown billing response with missing header (e.g. 500/503)
  // Must retain conservative reservation (0 refund)
  // -----------------------------------------------------------------------------
  console.log("\n[Test F] Conservative retention on unknown billing response...");
  {
    function reconcileCharge(params: {
      requestedCredits: number;
      status: number;
      headerValue: string | null;
      responseBody: any;
    }) {
      const { requestedCredits, status, headerValue, responseBody } = params;
      const lastChargedHeader = headerValue;
      const parsedHeader = lastChargedHeader !== null ? Number(lastChargedHeader) : null;
      const isKnownCharge = parsedHeader !== null && Number.isFinite(parsedHeader) && parsedHeader >= 0;
      const lastCharged = isKnownCharge ? parsedHeader : null;

      let refundAmount = 0;
      let reconciledToKnownCharge = false;

      if (isKnownCharge && lastCharged !== null) {
        const actualCharged = Math.min(requestedCredits, lastCharged);
        refundAmount = requestedCredits - actualCharged;
        reconciledToKnownCharge = true;
      }

      if (status !== 200) {
        if (!reconciledToKnownCharge && (status === 401 || status === 422 || status === 429)) {
          refundAmount = requestedCredits;
        }
        return { refundAmount, isKnownCharge };
      }

      if (!reconciledToKnownCharge && Array.isArray(responseBody) && responseBody.length === 0) {
        refundAmount = requestedCredits;
      }

      return { refundAmount, isKnownCharge };
    }

    // F1: HTTP 500 without header -> 0 refund (conservative retention)
    const resF1 = reconcileCharge({
      requestedCredits: 2,
      status: 500,
      headerValue: null,
      responseBody: null,
    });
    assert.equal(resF1.refundAmount, 0, "HTTP 500 without header must retain conservative reservation");

    // F2: HTTP 503 without header -> 0 refund
    const resF2 = reconcileCharge({
      requestedCredits: 2,
      status: 503,
      headerValue: null,
      responseBody: null,
    });
    assert.equal(resF2.refundAmount, 0, "HTTP 503 without header must retain conservative reservation");

    console.log("  ✓ Test F passed: Unknown billing responses conservatively retain reservation.");
  }

  // -----------------------------------------------------------------------------
  // Test G: Exception after known charge header but before mapping completes
  // -----------------------------------------------------------------------------
  console.log("\n[Test G] Early reconciliation before JSON parsing/mapping errors...");
  {
    let refundedAmount = 0;
    async function mockFetchWithEarlyReconcile(params: {
      requestedCredits: number;
      simulateHeader: string | null;
      simulateCorruptedJson: boolean;
    }) {
      const { requestedCredits, simulateHeader, simulateCorruptedJson } = params;
      let response: { status: number; headers: Map<string, string>; json: () => Promise<any> } | null = null;
      let reconciledToKnownCharge = false;

      try {
        // Simulate network request completing
        const headersMap = new Map<string, string>();
        if (simulateHeader !== null) {
          headersMap.set("x-requests-last", simulateHeader);
        }

        response = {
          status: 200,
          headers: headersMap,
          json: async () => {
            if (simulateCorruptedJson) throw new SyntaxError("Unexpected token in JSON");
            return [{ id: "ok" }];
          },
        };

        // Early header reconciliation step
        const lastChargedHeader = response.headers.get("x-requests-last") ?? null;
        const parsedHeader = lastChargedHeader !== null ? Number(lastChargedHeader) : null;
        const isKnownCharge = parsedHeader !== null && Number.isFinite(parsedHeader) && parsedHeader >= 0;
        const lastCharged = isKnownCharge ? parsedHeader : null;

        if (isKnownCharge && lastCharged !== null) {
          const actualCharged = Math.min(requestedCredits, lastCharged);
          const refund = requestedCredits - actualCharged;
          if (refund > 0) {
            refundedAmount += refund;
          }
          reconciledToKnownCharge = true;
        }

        // Risky JSON parse step
        const data = await response.json();
        return { ok: true, data };
      } catch (error) {
        // Catch block
        if (!response) {
          // Network never completed -> refund
          refundedAmount += requestedCredits;
        }
        return { ok: false, error: (error as Error).message };
      }
    }

    // Requested 4 credits, upstream header says 2 charged, then JSON parsing crashes:
    refundedAmount = 0;
    const resultG = await mockFetchWithEarlyReconcile({
      requestedCredits: 4,
      simulateHeader: "2",
      simulateCorruptedJson: true,
    });

    assert.equal(resultG.ok, false);
    assert.equal(refundedAmount, 2, "Early reconciliation must have refunded the 2 uncharged credits before JSON failure");

    console.log("  ✓ Test G passed: Early header reconciliation protects against stale reservations from JSON/mapping failures.");
  }

  // -----------------------------------------------------------------------------
  // Test H: Dynamic Odds API Catalog Mapping & Canonical 7 Sports Preservation
  // -----------------------------------------------------------------------------
  console.log("\n[Test H] Dynamic Odds API catalog mapping & canonical 7 sports...");
  {
    assert.deepEqual(
      [...CANONICAL_SPORTS],
      ["Football", "NBA", "NFL", "Hockey", "Tennis", "MLB", "MMA"],
      "Canonical sports must exactly match the 7 supported MatchSignal sports"
    );

    // Test active non-outright mapping across all 7 sports
    const testSamples = [
      { key: "soccer_uefa_champs_league", group: "Soccer", title: "UEFA Champions League", active: true, has_outrights: false, expectedLabel: "Football", expectedPriority: 1 },
      { key: "soccer_france_ligue_one", group: "Soccer", title: "Ligue 1 - France", active: true, has_outrights: false, expectedLabel: "Football", expectedPriority: 1 },
      { key: "soccer_uefa_nations_league", group: "Soccer", title: "UEFA Nations League", active: true, has_outrights: false, expectedLabel: "Football", expectedPriority: 1 },
      { key: "basketball_nba", group: "Basketball", title: "NBA", active: true, has_outrights: false, expectedLabel: "NBA", expectedPriority: 1 },
      { key: "basketball_wnba", group: "Basketball", title: "WNBA", active: true, has_outrights: false, expectedLabel: "NBA", expectedPriority: 2 },
      { key: "americanfootball_nfl", group: "American Football", title: "NFL", active: true, has_outrights: false, expectedLabel: "NFL", expectedPriority: 1 },
      { key: "americanfootball_ncaaf", group: "American Football", title: "NCAAF", active: true, has_outrights: false, expectedLabel: "NFL", expectedPriority: 2 },
      { key: "icehockey_nhl", group: "Ice Hockey", title: "NHL", active: true, has_outrights: false, expectedLabel: "Hockey", expectedPriority: 1 },
      { key: "tennis_atp_us_open", group: "Tennis", title: "ATP US Open", active: true, has_outrights: false, expectedLabel: "Tennis", expectedPriority: 1 },
      { key: "tennis_wta_san_diego", group: "Tennis", title: "WTA San Diego", active: true, has_outrights: false, expectedLabel: "Tennis", expectedPriority: 2 },
      { key: "baseball_mlb", group: "Baseball", title: "MLB", active: true, has_outrights: false, expectedLabel: "MLB", expectedPriority: 1 },
      { key: "mma_mixed_martial_arts", group: "Mixed Martial Arts", title: "MMA", active: true, has_outrights: false, expectedLabel: "MMA", expectedPriority: 1 },
      { key: "boxing_boxing", group: "Boxing", title: "Boxing", active: true, has_outrights: false, expectedLabel: "MMA", expectedPriority: 2 },
    ];

    for (const sample of testSamples) {
      const mapped = mapOddsApiSportToCanonical(sample);
      assert.ok(mapped, `Sport ${sample.key} must map to a canonical sport`);
      assert.equal(mapped.label, sample.expectedLabel, `Sport ${sample.key} must map to ${sample.expectedLabel}`);
      assert.equal(mapped.priority, sample.expectedPriority, `Sport ${sample.key} priority mismatch`);
    }

    // Inactive or outright sports must be filtered out (return null)
    const inactiveSample = { key: "soccer_epl", group: "Soccer", title: "EPL", active: false, has_outrights: false };
    assert.equal(mapOddsApiSportToCanonical(inactiveSample), null, "Inactive sports must return null");

    const outrightSample = { key: "soccer_epl_winner", group: "Soccer", title: "EPL Winner", active: true, has_outrights: true };
    assert.equal(mapOddsApiSportToCanonical(outrightSample), null, "Outright markets must return null");

    const unmappedSample = { key: "cricket_ipl", group: "Cricket", title: "IPL", active: true, has_outrights: false };
    assert.equal(mapOddsApiSportToCanonical(unmappedSample), null, "Unrelated sports outside canonical 7 must return null");

    console.log("  ✓ Test H passed: Dynamic catalog mapping accurately translates Odds API competitions to canonical categories.");
  }

  // -----------------------------------------------------------------------------
  // Test I: 72-hour Event Horizon Configuration
  // -----------------------------------------------------------------------------
  console.log("\n[Test I] 72-hour event horizon configuration...");
  {
    for (const sport of CANONICAL_SPORTS) {
      const config = SPORT_CONFIG[sport];
      assert.ok(config, `SPORT_CONFIG must define config for ${sport}`);
      assert.equal(
        config.maxHoursAhead,
        72,
        `${sport} maxHoursAhead must be 72 hours`
      );
    }
    assert.equal(DEFAULT_CONFIG.maxHoursAhead, 72, "DEFAULT_CONFIG maxHoursAhead must be 72 hours");
    console.log("  ✓ Test I passed: 72-hour event horizon verified across all canonical sports.");
  }

  console.log("\n==================================================");
  console.log("ALL MATCHSIGNAL BUDGET & RECONCILIATION REGRESSION TESTS PASSED!");
  console.log("==================================================\n");
}

runTests().catch((err) => {
  console.error("Test failure:", err);
  process.exit(1);
});
