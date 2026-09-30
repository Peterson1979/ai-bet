import { VIDEO_CONTENT_PACKAGE_VALUES } from "./content-index";
import {
  parseVideoContentPackage,
  validateVideoContentPackage,
} from "./copy-validate";
import { formatThreadsVideoCaption } from "./threads-caption";
import type { VideoAsset } from "./types";

/**
 * Runtime publication never scans the filesystem and never calls AI. Only
 * statically imported, validated `ready` packages can become VideoAssets.
 * Draft/rejected packages are deliberately absent from the publishable list.
 */
export function loadReadyVideoAssets(
  values: readonly unknown[] = VIDEO_CONTENT_PACKAGE_VALUES
): VideoAsset[] {
  return values.flatMap((value) => {
    const contentPackage = parseVideoContentPackage(value);
    if (contentPackage.status !== "ready") return [];

    const validation = validateVideoContentPackage(contentPackage);
    if (!validation.valid || contentPackage.source.sourceUrl === null) {
      throw new TypeError(
        `ready video content package ${contentPackage.id} failed validation`
      );
    }

    const hasEnabledPlatformDestination = Boolean(
      contentPackage.platforms.instagram?.targets?.some((t) => t.enabled) ||
      contentPackage.platforms.facebook?.targets?.some((t) => t.enabled) ||
      contentPackage.platforms.youtube?.targets?.some((t) => t.enabled)
    );

    const threadsConfig =
      contentPackage.platforms.threads &&
      Array.isArray(contentPackage.platforms.threads.targets) &&
      contentPackage.platforms.threads.targets.length > 0
        ? contentPackage.platforms.threads
        : {
            targets: [
              {
                targetId: "threads-main",
                caption: formatThreadsVideoCaption({
                  message:
                    contentPackage.platforms.facebook?.targets[0]?.message ||
                    contentPackage.platforms.instagram?.targets[0]?.caption,
                }),
                enabled: hasEnabledPlatformDestination,
              },
            ],
          };

    return [
      {
        id: contentPackage.id,
        sourceUrl: contentPackage.source.sourceUrl,
        enabled: true,
        platforms: {
          ...contentPackage.platforms,
          threads: threadsConfig,
        },
      },
    ];
  });
}
