import { loadEnvConfig } from "@next/env";

import {
  fetchAuthenticatedYouTubeChannel,
  inspectGoogleAccessToken,
  maskSecret,
  refreshYouTubeAccessToken,
  YOUTUBE_UPLOAD_SCOPE,
} from "../app/lib/social/video/youtube-auth";

async function main() {
  loadEnvConfig(process.cwd(), true);

  const clientId = process.env.YOUTUBE_CLIENT_ID?.trim();
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET?.trim();
  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN?.trim();
  const expectedChannelId = process.env.YOUTUBE_CHANNEL_ID?.trim();
  const jsonMode = process.argv.includes("--json");

  const errors: string[] = [];

  if (!clientId) errors.push("YOUTUBE_CLIENT_ID is not configured");
  if (!clientSecret) errors.push("YOUTUBE_CLIENT_SECRET is not configured");
  if (!refreshToken) errors.push("YOUTUBE_REFRESH_TOKEN is not configured");

  if (errors.length > 0) {
    if (jsonMode) {
      console.log(JSON.stringify({ ok: false, errors }, null, 2));
    } else {
      console.error("\n[ERROR] Missing required YouTube credentials:");
      errors.forEach((err) => console.error(`  - ${err}`));
      console.error(
        "\nPlease ensure YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, and YOUTUBE_REFRESH_TOKEN are set in .env.local\n"
      );
    }
    process.exit(1);
  }

  if (!jsonMode) {
    console.log("\n================================================================================");
    console.log("MATCHSIGNAL YOUTUBE AUTHENTICATION VERIFICATION (READ-ONLY)");
    console.log("================================================================================");
    console.log(`Client ID:     ${maskSecret(clientId, 6)}`);
    console.log(`Refresh Token: ${maskSecret(refreshToken, 6)}`);
    if (expectedChannelId) {
      console.log(`Expected ID:   ${expectedChannelId}`);
    }
    console.log("--------------------------------------------------------------------------------");
    console.log("1. Refreshing access token from Google OAuth endpoint...");
  }

  const tokenResponse = await refreshYouTubeAccessToken({
    clientId: clientId!,
    clientSecret: clientSecret!,
    refreshToken: refreshToken!,
  });

  if (!jsonMode) {
    console.log("   -> Access token received successfully.");
    console.log("2. Inspecting token metadata and granted scopes...");
  }

  let tokenInfo = null;
  try {
    tokenInfo = await inspectGoogleAccessToken({
      accessToken: tokenResponse.access_token,
    });
  } catch (err) {
    if (!jsonMode) {
      console.warn(`   [WARN] Tokeninfo endpoint warning: ${err instanceof Error ? err.message : "unknown"}`);
    }
  }

  const grantedScopes = (tokenInfo?.scope || tokenResponse.scope || "").split(" ");
  const hasUploadScope = grantedScopes.includes(YOUTUBE_UPLOAD_SCOPE);

  if (!jsonMode) {
    console.log(`   -> Granted scopes: ${grantedScopes.join(", ")}`);
    if (!hasUploadScope) {
      console.warn(
        `   [WARNING] Token is missing upload scope (${YOUTUBE_UPLOAD_SCOPE}). Video uploads will fail without it.`
      );
    }
    console.log("3. Calling YouTube Data API v3 channels.list(mine=true)...");
  }

  let channelInfo = null;
  try {
    channelInfo = await fetchAuthenticatedYouTubeChannel({
      accessToken: tokenResponse.access_token,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    if (jsonMode) {
      console.log(
        JSON.stringify(
          {
            ok: false,
            error: "Failed to fetch YouTube channel details",
            details: message,
            tokenRefreshed: true,
            scopes: grantedScopes,
          },
          null,
          2
        )
      );
    } else {
      console.error(`   [ERROR] Failed to fetch channel details: ${message}`);
    }
    process.exit(1);
  }

  const channelIdMatches =
    !expectedChannelId || (channelInfo ? channelInfo.id === expectedChannelId : false);

  const verificationSummary = {
    ok: Boolean(channelInfo && (!expectedChannelId || channelIdMatches)),
    authenticated: true,
    tokenRefreshOk: true,
    hasUploadScope,
    channel: channelInfo
      ? {
          id: channelInfo.id,
          title: channelInfo.title,
          customUrl: channelInfo.customUrl || null,
          publishedAt: channelInfo.publishedAt || null,
        }
      : null,
    expectedChannelId: expectedChannelId || null,
    channelIdMatches,
    scopes: grantedScopes,
  };

  if (jsonMode) {
    console.log(JSON.stringify(verificationSummary, null, 2));
  } else {
    console.log("   -> Channel details retrieved successfully.");
    console.log("================================================================================");
    console.log("VERIFICATION RESULT: SUCCESS");
    console.log("================================================================================");
    if (channelInfo) {
      console.log(`Channel Title:        ${channelInfo.title}`);
      console.log(`Channel ID:           ${channelInfo.id}`);
      if (channelInfo.customUrl) {
        console.log(`Custom Handle / URL:  ${channelInfo.customUrl}`);
      }
      if (channelInfo.publishedAt) {
        console.log(`Channel Created:      ${channelInfo.publishedAt}`);
      }
    } else {
      console.log("Channel:              No YouTube channel found associated with this Google account.");
    }
    if (expectedChannelId) {
      console.log(
        `Channel ID Match:     ${channelIdMatches ? "MATCHES (OK)" : `MISMATCH! Expected: ${expectedChannelId}, Got: ${channelInfo?.id}`}`
      );
    }
    console.log(`Upload Scope Ready:   ${hasUploadScope ? "YES" : "NO (missing youtube.upload)"}`);
    console.log("================================================================================\n");
  }

  if (!channelIdMatches) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(
    `\n[ERROR] Verification failed: ${error instanceof Error ? error.message : "Unknown error"}\n`
  );
  process.exit(1);
});
