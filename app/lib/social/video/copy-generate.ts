import type {
  CopyValidationIssue,
  GeneratedVideoCopy,
  VideoContentInput,
  VideoContentPackage,
} from "./content-types";
import { buildVideoCopyPrompt } from "./copy-prompt";
import {
  buildVideoContentPackage,
  createRejectedVideoCopy,
  parseGeneratedVideoCopy,
  validateGeneratedVideoCopy,
} from "./copy-validate";

export type VideoCopyGenerationFunction = (prompt: string) => Promise<unknown>;

export type VideoCopyGenerationOutcome = {
  contentPackage: VideoContentPackage;
  validationErrors: CopyValidationIssue[];
  generationCalls: 1 | 2;
  repaired: boolean;
};

/** Normal generation is one AI call containing all seven destinations. A
 * single repair call is allowed only when deterministic validation rejects the
 * first response. There are no open-ended retries. */
export async function generateVideoContentPackage(params: {
  input: VideoContentInput;
  generate: VideoCopyGenerationFunction;
  generatedAt?: string;
}): Promise<VideoCopyGenerationOutcome> {
  const firstRaw = await params.generate(buildVideoCopyPrompt({ input: params.input }));
  const firstValidation = validateGeneratedVideoCopy(params.input.id, firstRaw);
  if (firstValidation.valid) {
    return {
      contentPackage: buildVideoContentPackage({
        input: params.input,
        copy: parseGeneratedVideoCopy(firstRaw),
        generatedAt: params.generatedAt,
      }),
      validationErrors: [],
      generationCalls: 1,
      repaired: false,
    };
  }

  const secondRaw = await params.generate(
    buildVideoCopyPrompt({
      input: params.input,
      repairIssues: firstValidation.errors,
    })
  );
  const secondValidation = validateGeneratedVideoCopy(params.input.id, secondRaw);
  let copy: GeneratedVideoCopy;
  try {
    copy = parseGeneratedVideoCopy(secondRaw);
  } catch {
    copy = createRejectedVideoCopy(params.input.id);
  }

  return {
    contentPackage: buildVideoContentPackage({
      input: params.input,
      copy,
      generatedAt: params.generatedAt,
      forceRejected: !secondValidation.valid,
    }),
    validationErrors: secondValidation.valid ? [] : secondValidation.errors,
    generationCalls: 2,
    repaired: true,
  };
}
