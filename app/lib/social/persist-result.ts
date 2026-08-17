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
  updatedAt: string;
};

export function getPublicationId(dateKey: string, topPicks: TopPick[]): string {
  const identity = `${dateKey}|${topPicks.map((p) => p.id).join("|")}`;
  const hash = createHash("sha256").update(identity).digest("hex").slice(0, 16);
  return `${dateKey}-${hash}`;
}

export async function getPublicationState(
  publicationId: string
): Promise<SocialPublicationState | null> {
  return redis.get<SocialPublicationState>(`social:pub:${publicationId}`);
}

export async function updatePublicationChannel(
  publicationId: string,
  dateKey: string,
  pickIds: string[],
  channel: "instagram" | "facebook",
  channelState: SocialChannelState
): Promise<SocialPublicationState> {
  const key = `social:pub:${publicationId}`;
  const current = (await redis.get<SocialPublicationState>(key)) || {
    publicationId,
    date: dateKey,
    pickIds,
    updatedAt: new Date().toISOString(),
  };

  current[channel] = channelState;
  current.updatedAt = new Date().toISOString();

  await redis.set(key, current);

  if (
    current.instagram?.status === "published" &&
    current.facebook?.status === "published"
  ) {
    await redis.zadd("social:posted:index", {
      score: Date.now(),
      member: publicationId,
    });
  }

  return current;
}

export async function isLegacyPosted(candidateId: string) {
  const val = await redis.get(`social:posted:${candidateId}`);
  return !!val;
}

export async function isAlreadyPosted(candidateId: string) {
  return isLegacyPosted(candidateId);
}

export async function savePostedResult(
  pick: Candidate,
  result: {
    imageUrl: string;
    caption: string;
    ig?: any;
    fb?: any;
  }
) {
  await redis.set(`social:posted:${pick.id}`, {
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
  });

  await redis.zadd("social:posted:index", {
    score: Date.now(),
    member: pick.id,
  });
}