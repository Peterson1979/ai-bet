import { redis } from "../redis";
import type { Candidate, TopPick } from "./types";
import { createHash } from "node:crypto";

export type SocialChannelStatus = "published" | "failed";

export type SocialChannelState = {
  status: SocialChannelStatus;
  postId?: string | null;
  publishedAt?: string | null;
  error?: string | null;
};

export type SocialPublicationState = {
  publicationId: string;
  date: string;
  pickIds: string[];
  instagram?: SocialChannelState;
  facebook?: SocialChannelState;
  threads?: SocialChannelState;
  updatedAt: string;
};

export function getPublicationId(dateKey: string, topPicks: TopPick[]): string {
  const identity = `${dateKey}|${topPicks.map((p) => p.id).join("|")}`;
  const hash = createHash("sha256").update(identity).digest("hex").slice(0, 16);
  return `${dateKey}-${hash}`;
}

export async function getPublicationState(
  publicationId: string,
  redisClient: any = redis
): Promise<SocialPublicationState | null> {
  return redisClient.get(`social:pub:${publicationId}`);
}

export async function updatePublicationChannel(
  publicationId: string,
  dateKey: string,
  pickIds: string[],
  channel: "instagram" | "facebook" | "threads",
  channelState: SocialChannelState,
  redisClient: any = redis
): Promise<SocialPublicationState> {
  const key = `social:pub:${publicationId}`;
  const current = (await redisClient.get(key)) || {
    publicationId,
    date: dateKey,
    pickIds,
    updatedAt: new Date().toISOString(),
  };

  current[channel] = channelState;
  current.updatedAt = new Date().toISOString();

  await redisClient.set(key, current);

  if (
    current.instagram?.status === "published" &&
    current.facebook?.status === "published"
  ) {
    if (typeof redisClient.zadd === "function") {
      await redisClient.zadd("social:posted:index", {
        score: Date.now(),
        member: publicationId,
      });
    }
  }

  return current;
}

export async function isLegacyPosted(candidateId: string, redisClient: any = redis) {
  const val = await redisClient.get(`social:posted:${candidateId}`);
  return !!val;
}

export async function isAlreadyPosted(candidateId: string, redisClient: any = redis) {
  return isLegacyPosted(candidateId, redisClient);
}

export async function savePostedResult(
  pick: Candidate,
  result: {
    imageUrl: string;
    caption: string;
    ig?: any;
    fb?: any;
    threads?: any;
  },
  redisClient: any = redis
) {
  await redisClient.set(`social:posted:${pick.id}`, {
    candidateId: pick.id,
    eventId: pick.eventId,
    postedAt: new Date().toISOString(),
    sport: pick.sport,
    league: pick.league,
    socialScore: pick.socialScore,
    imageUrl: result.imageUrl,
    caption: result.caption,
    instagram: result.ig ?? null,
    facebook: result.fb ?? null,
    threads: result.threads ?? null,
  });

  if (typeof redisClient.zadd === "function") {
    await redisClient.zadd("social:posted:index", {
      score: Date.now(),
      member: pick.id,
    });
  }
}