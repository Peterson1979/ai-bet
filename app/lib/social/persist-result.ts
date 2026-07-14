import { redis } from "../redis";
import type { Candidate } from "./types";

export async function isAlreadyPosted(candidateId: string) {
  const val = await redis.get(`social:posted:${candidateId}`);
  return !!val;
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