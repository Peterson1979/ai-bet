import { loadEnvConfig } from "@next/env";
import http from "node:http";
import readline from "node:readline";
import { URL } from "node:url";

import {
  buildYouTubeAuthUrl,
  exchangeYouTubeAuthCode,
  fetchAuthenticatedYouTubeChannel,
  inspectGoogleAccessToken,
  maskSecret,
  DEFAULT_YOUTUBE_SCOPES,
} from "../app/lib/social/video/youtube-auth";

const DEFAULT_PORT = 8910;

function parseArgs(argv: string[]) {
  const codeIndex = argv.indexOf("--code");
  const code = codeIndex >= 0 ? argv[codeIndex + 1] : undefined;

  const portIndex = argv.indexOf("--port");
  const port = portIndex >= 0 ? parseInt(argv[portIndex + 1], 10) : undefined;

  const redirectUriIndex = argv.indexOf("--redirect-uri");
  const redirectUri =
    redirectUriIndex >= 0 ? argv[redirectUriIndex + 1] : undefined;

  const scopesIndex = argv.indexOf("--scopes");
  const scopes =
    scopesIndex >= 0 ? argv[scopesIndex + 1].split(",").map((s) => s.trim()) : undefined;

  return { code, port, redirectUri, scopes };
}

function promptForCode(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("\nPaste authorization code (or URL with code): ", (answer) => {
      rl.close();
      const trimmed = answer.trim();
      if (trimmed.includes("code=")) {
        try {
          const parsed = new URL(trimmed.startsWith("http") ? trimmed : `http://localhost/${trimmed}`);
          resolve(parsed.searchParams.get("code") || trimmed);
          return;
        } catch {
          // Fall through
        }
      }
      resolve(trimmed);
    });
  });
}

async function main() {
  loadEnvConfig(process.cwd(), true);
  const args = parseArgs(process.argv.slice(2));

  const clientId = process.env.YOUTUBE_CLIENT_ID?.trim();
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET?.trim();

  if (!clientId) {
    console.error(
      "\n[ERROR] YOUTUBE_CLIENT_ID is not set in environment or .env.local.\n" +
        "Please add YOUTUBE_CLIENT_ID to your .env.local file.\n"
    );
    process.exit(1);
  }

  if (!clientSecret) {
    console.error(
      "\n[ERROR] YOUTUBE_CLIENT_SECRET is not set in environment or .env.local.\n" +
        "Please add YOUTUBE_CLIENT_SECRET to your .env.local file.\n"
    );
    process.exit(1);
  }

  const port =
    args.port ||
    (process.env.YOUTUBE_REDIRECT_PORT
      ? parseInt(process.env.YOUTUBE_REDIRECT_PORT, 10)
      : DEFAULT_PORT);

  const redirectUri =
    args.redirectUri ||
    process.env.YOUTUBE_REDIRECT_URI ||
    `http://localhost:${port}/oauth2callback`;

  const scopes = args.scopes || DEFAULT_YOUTUBE_SCOPES;

  const authUrl = buildYouTubeAuthUrl({
    clientId,
    redirectUri,
    scopes,
    accessType: "offline",
    prompt: "consent",
  });

  console.log("\n================================================================================");
  console.log("MATCHSIGNAL YOUTUBE OAUTH AUTHORIZATION HELPER");
  console.log("================================================================================");
  console.log(`Client ID:    ${maskSecret(clientId, 6)}`);
  console.log(`Redirect URI: ${redirectUri}`);
  console.log(`Scopes:       ${scopes.join("\n              ")}`);
  console.log("================================================================================");
  console.log("\n1. Open the following URL in your browser:\n");
  console.log(`   ${authUrl}\n`);
  console.log("2. Sign in to the Google / YouTube account you want to publish with.");
  console.log("3. Grant the requested permissions.\n");

  let code = args.code;

  if (!code) {
    console.log(`Starting local listener on http://localhost:${port}/oauth2callback ...`);
    console.log("(If browser redirect does not work, you can also paste the code directly).\n");

    const server = http.createServer();

    const codeFromCallback = new Promise<string>((resolve, reject) => {
      server.on("request", async (req, res) => {
        try {
          const reqUrl = new URL(req.url || "/", `http://localhost:${port}`);
          if (reqUrl.pathname === "/oauth2callback") {
            const callbackCode = reqUrl.searchParams.get("code");
            const callbackError = reqUrl.searchParams.get("error");

            if (callbackError) {
              res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
              res.end(
                `<html><body style="font-family:sans-serif;padding:40px;text-align:center;">` +
                  `<h2 style="color:#d9534f;">Authorization Denied</h2>` +
                  `<p>Google returned error: ${callbackError}</p>` +
                  `</body></html>`
              );
              reject(new Error(`OAuth callback error: ${callbackError}`));
              return;
            }

            if (callbackCode) {
              res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
              res.end(
                `<html><body style="font-family:sans-serif;padding:40px;text-align:center;">` +
                  `<h2 style="color:#5cb85c;">Authorization Successful!</h2>` +
                  `<p>You can close this window and return to your terminal.</p>` +
                  `</body></html>`
              );
              resolve(callbackCode);
              return;
            }
          }

          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        } catch (err) {
          reject(err);
        }
      });

      server.on("error", (err) => {
        reject(err);
      });
    });

    server.listen(port);

    // Also offer prompt for code if user prefers manual paste
    const codePromise = Promise.race([
      codeFromCallback,
      promptForCode().then((manualCode) => {
        if (!manualCode) throw new Error("No authorization code provided");
        return manualCode;
      }),
    ]);

    try {
      code = await codePromise;
    } finally {
      server.close();
    }
  }

  console.log("\nExchanging authorization code with Google OAuth endpoint...");
  const tokens = await exchangeYouTubeAuthCode({
    code,
    clientId,
    clientSecret,
    redirectUri,
  });

  if (!tokens.refresh_token) {
    console.warn(
      "\n[WARNING] Google did not return a refresh_token in this exchange.\n" +
        "This usually happens when an authorization was previously granted.\n" +
        "To force Google to issue a new refresh token, visit:\n" +
        "https://myaccount.google.com/permissions\n" +
        "Revoke access for this app, then re-run this authorization script.\n"
    );
  }

  let channelInfo = null;
  let tokenInfo = null;
  try {
    channelInfo = await fetchAuthenticatedYouTubeChannel({
      accessToken: tokens.access_token,
    });
  } catch (err) {
    console.warn(
      `[NOTE] Could not fetch channel metadata via channels.list: ${err instanceof Error ? err.message : "unknown error"}`
    );
  }

  try {
    tokenInfo = await inspectGoogleAccessToken({
      accessToken: tokens.access_token,
    });
  } catch {
    // Optional tokeninfo inspection
  }

  console.log("\n================================================================================");
  console.log("YOUTUBE OAUTH AUTHORIZATION SUCCESSFUL");
  console.log("================================================================================");
  if (channelInfo) {
    console.log(`Channel Title:  ${channelInfo.title}`);
    console.log(`Channel ID:     ${channelInfo.id}`);
    if (channelInfo.customUrl) {
      console.log(`Custom URL:     ${channelInfo.customUrl}`);
    }
  } else {
    console.log("Channel:        (No channel metadata retrieved; token is valid)");
  }
  if (tokenInfo?.scope || tokens.scope) {
    console.log(`Granted Scopes: ${tokenInfo?.scope || tokens.scope}`);
  }
  console.log("--------------------------------------------------------------------------------");
  console.log("SAVE THE FOLLOWING TO YOUR .env.local (and deployment environment):");
  console.log("--------------------------------------------------------------------------------");
  if (tokens.refresh_token) {
    console.log(`YOUTUBE_REFRESH_TOKEN=${tokens.refresh_token}`);
  }
  if (channelInfo?.id) {
    console.log(`YOUTUBE_CHANNEL_ID=${channelInfo.id}`);
  }
  console.log("================================================================================\n");
}

main().catch((error) => {
  console.error(
    `\n[ERROR] Authorization flow failed: ${error instanceof Error ? error.message : "Unknown error"}\n`
  );
  process.exit(1);
});
