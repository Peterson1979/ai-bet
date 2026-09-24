import assert from "node:assert/strict";

import {
  buildYouTubeAuthUrl,
  exchangeYouTubeAuthCode,
  fetchAuthenticatedYouTubeChannel,
  inspectGoogleAccessToken,
  maskSecret,
  redactYouTubeSecrets,
  refreshYouTubeAccessToken,
  DEFAULT_YOUTUBE_SCOPES,
  GOOGLE_OAUTH_AUTH_URL,
  GOOGLE_OAUTH_TOKEN_URL,
  GOOGLE_TOKENINFO_URL,
  YOUTUBE_CHANNELS_API_URL,
  YOUTUBE_READONLY_SCOPE,
  YOUTUBE_UPLOAD_SCOPE,
} from "../app/lib/social/video/youtube-auth";

function createMockResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function runTests() {
  console.log("Running YouTube OAuth & Token Helper Tests...");

  // 1. buildYouTubeAuthUrl
  {
    const url = buildYouTubeAuthUrl({
      clientId: "mock-client-id.apps.googleusercontent.com",
      redirectUri: "http://localhost:8910/oauth2callback",
    });

    assert(url.startsWith(GOOGLE_OAUTH_AUTH_URL));
    const parsed = new URL(url);
    assert.equal(parsed.searchParams.get("client_id"), "mock-client-id.apps.googleusercontent.com");
    assert.equal(parsed.searchParams.get("redirect_uri"), "http://localhost:8910/oauth2callback");
    assert.equal(parsed.searchParams.get("response_type"), "code");
    assert.equal(parsed.searchParams.get("access_type"), "offline");
    assert.equal(parsed.searchParams.get("prompt"), "consent");
    assert.equal(
      parsed.searchParams.get("scope"),
      `${YOUTUBE_UPLOAD_SCOPE} ${YOUTUBE_READONLY_SCOPE}`
    );

    // Custom scopes & state
    const customUrl = buildYouTubeAuthUrl({
      clientId: "mock-client-id",
      redirectUri: "http://localhost:8910/oauth2callback",
      scopes: [YOUTUBE_UPLOAD_SCOPE],
      state: "custom-state-123",
      prompt: "select_account",
    });
    const parsedCustom = new URL(customUrl);
    assert.equal(parsedCustom.searchParams.get("scope"), YOUTUBE_UPLOAD_SCOPE);
    assert.equal(parsedCustom.searchParams.get("state"), "custom-state-123");
    assert.equal(parsedCustom.searchParams.get("prompt"), "select_account");

    // Missing required fields
    assert.throws(
      () =>
        buildYouTubeAuthUrl({
          clientId: "",
          redirectUri: "http://localhost:8910/oauth2callback",
        }),
      /clientId is required/
    );
    assert.throws(
      () =>
        buildYouTubeAuthUrl({
          clientId: "mock-client-id",
          redirectUri: "",
        }),
      /redirectUri is required/
    );
  }

  // 2. exchangeYouTubeAuthCode
  {
    let capturedUrl = "";
    let capturedInit: RequestInit | undefined;

    const mockFetch = async (input: string | URL | Request, init?: RequestInit) => {
      capturedUrl = input.toString();
      capturedInit = init;
      return createMockResponse({
        access_token: "mock_access_token_12345",
        expires_in: 3600,
        refresh_token: "1//04mock_refresh_token_67890",
        scope: DEFAULT_YOUTUBE_SCOPES.join(" "),
        token_type: "Bearer",
      });
    };

    const result = await exchangeYouTubeAuthCode({
      code: "mock_auth_code_abc",
      clientId: "mock_client_id",
      clientSecret: "mock_super_secret_xyz",
      redirectUri: "http://localhost:8910/oauth2callback",
      fetchFn: mockFetch,
    });

    assert.equal(capturedUrl, GOOGLE_OAUTH_TOKEN_URL);
    assert.equal(capturedInit?.method, "POST");
    assert.equal(result.access_token, "mock_access_token_12345");
    assert.equal(result.refresh_token, "1//04mock_refresh_token_67890");
    assert.equal(result.expires_in, 3600);

    const bodyParams = new URLSearchParams(capturedInit?.body as string);
    assert.equal(bodyParams.get("grant_type"), "authorization_code");
    assert.equal(bodyParams.get("code"), "mock_auth_code_abc");
    assert.equal(bodyParams.get("client_id"), "mock_client_id");
    assert.equal(bodyParams.get("client_secret"), "mock_super_secret_xyz");

    // Test error handling and redaction
    const mockFailFetch = async () => {
      return createMockResponse(
        { error: "invalid_grant", error_description: "Bad code: mock_super_secret_xyz" },
        400
      );
    };

    await assert.rejects(
      async () =>
        exchangeYouTubeAuthCode({
          code: "mock_auth_code_abc",
          clientId: "mock_client_id",
          clientSecret: "mock_super_secret_xyz",
          redirectUri: "http://localhost:8910/oauth2callback",
          fetchFn: mockFailFetch,
        }),
      (err: Error) => {
        assert(!err.message.includes("mock_super_secret_xyz"), "Error message leaked secret!");
        assert(err.message.includes("[REDACTED]"), "Secret was not redacted");
        return true;
      }
    );
  }

  // 3. refreshYouTubeAccessToken
  {
    let capturedInit: RequestInit | undefined;

    const mockRefreshFetch = async (input: string | URL | Request, init?: RequestInit) => {
      capturedInit = init;
      return createMockResponse({
        access_token: "mock_new_access_token_999",
        expires_in: 3600,
        scope: DEFAULT_YOUTUBE_SCOPES.join(" "),
        token_type: "Bearer",
      });
    };

    const refreshed = await refreshYouTubeAccessToken({
      refreshToken: "1//04mock_existing_refresh",
      clientId: "mock_client_id",
      clientSecret: "mock_secret_key",
      fetchFn: mockRefreshFetch,
    });

    assert.equal(refreshed.access_token, "mock_new_access_token_999");
    assert.equal(refreshed.refresh_token, "1//04mock_existing_refresh"); // Preserved

    const refreshBody = new URLSearchParams(capturedInit?.body as string);
    assert.equal(refreshBody.get("grant_type"), "refresh_token");
    assert.equal(refreshBody.get("refresh_token"), "1//04mock_existing_refresh");

    // Test error handling
    const mockRefreshFail = async () => {
      return createMockResponse(
        { error: "invalid_grant", error_description: "Token expired with secret mock_secret_key" },
        400
      );
    };

    await assert.rejects(
      async () =>
        refreshYouTubeAccessToken({
          refreshToken: "1//04mock_existing_refresh",
          clientId: "mock_client_id",
          clientSecret: "mock_secret_key",
          fetchFn: mockRefreshFail,
        }),
      (err: Error) => {
        assert(!err.message.includes("mock_secret_key"), "Error leaked secret");
        assert(!err.message.includes("1//04mock_existing_refresh"), "Error leaked refresh token");
        return true;
      }
    );
  }

  // 4. fetchAuthenticatedYouTubeChannel
  {
    let capturedAuthHeader = "";

    const mockChannelFetch = async (input: string | URL | Request, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      capturedAuthHeader = headers.get("Authorization") || "";
      return createMockResponse({
        kind: "youtube#channelListResponse",
        items: [
          {
            kind: "youtube#channel",
            id: "UC_MATCHSIGNAL_CHANNEL_ID",
            snippet: {
              title: "MatchSignal Official",
              description: "AI sports analysis channel",
              customUrl: "@matchsignal",
              publishedAt: "2025-01-01T00:00:00Z",
            },
          },
        ],
      });
    };

    const channel = await fetchAuthenticatedYouTubeChannel({
      accessToken: "mock_token_abc123",
      fetchFn: mockChannelFetch,
    });

    assert(channel);
    assert.equal(channel.id, "UC_MATCHSIGNAL_CHANNEL_ID");
    assert.equal(channel.title, "MatchSignal Official");
    assert.equal(channel.customUrl, "@matchsignal");
    assert.equal(capturedAuthHeader, "Bearer mock_token_abc123");

    // Empty channel items
    const mockEmptyFetch = async () => {
      return createMockResponse({
        kind: "youtube#channelListResponse",
        items: [],
      });
    };

    const emptyResult = await fetchAuthenticatedYouTubeChannel({
      accessToken: "mock_token_abc123",
      fetchFn: mockEmptyFetch,
    });
    assert.equal(emptyResult, null);

    // Error response
    const mockErrorFetch = async () => {
      return createMockResponse(
        { error: { code: 403, message: "The caller does not have permission" } },
        403
      );
    };

    await assert.rejects(
      async () =>
        fetchAuthenticatedYouTubeChannel({
          accessToken: "mock_token_abc123",
          fetchFn: mockErrorFetch,
        }),
      /YouTube Data API channels request failed: The caller does not have permission/
    );
  }

  // 5. inspectGoogleAccessToken
  {
    const mockTokenInfoFetch = async () => {
      return createMockResponse({
        azp: "mock_client_id",
        aud: "mock_client_id",
        scope: `${YOUTUBE_UPLOAD_SCOPE} ${YOUTUBE_READONLY_SCOPE}`,
        expires_in: "3599",
        access_type: "offline",
      });
    };

    const tokenInfo = await inspectGoogleAccessToken({
      accessToken: "mock_token_xyz",
      fetchFn: mockTokenInfoFetch,
    });

    assert.equal(tokenInfo.scope, `${YOUTUBE_UPLOAD_SCOPE} ${YOUTUBE_READONLY_SCOPE}`);
    assert.equal(tokenInfo.access_type, "offline");
  }

  // 6. redactYouTubeSecrets and maskSecret
  {
    const secret = "SUPER_SECRET_VALUE_12345";
    const refresh = "1//04REFRESH_TOKEN_67890";
    const text = `Request with client_secret=${secret}&refresh_token=${refresh}&access_token=ya29.xyz`;

    const redacted = redactYouTubeSecrets(text, [secret, refresh]);
    assert(!redacted.includes(secret));
    assert(!redacted.includes(refresh));
    assert(!redacted.includes("ya29.xyz"));
    assert(redacted.includes("[REDACTED]"));

    // maskSecret
    assert.equal(maskSecret(undefined), "[NOT_SET]");
    assert.equal(maskSecret(""), "[NOT_SET]");
    assert.equal(maskSecret("12345678"), "[REDACTED]");
    assert.equal(maskSecret("1//04abcdefgh123456", 4), "1//0...3456");
  }

  console.log("All YouTube OAuth & Token Helper Tests PASSED successfully! (6 test suites)");
}

runTests().catch((error) => {
  console.error("Test failed:", error);
  process.exit(1);
});
