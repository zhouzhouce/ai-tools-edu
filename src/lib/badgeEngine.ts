interface BadgeCriteria {
  type: string;
  threshold?: number;
  slugs?: string[];
}

interface Badge {
  id: string | number;
  criteria: BadgeCriteria;
}

interface EvalContext {
  completedTutorialCount: number;
  completedTutorialSlugs: string[];
  viewedToolCount: number;
  bookmarkCount: number;
  completedOnboarding: boolean;
  categoriesWithCompletedTutorials: number;
  fastestCompletionRatio?: number; // timeSpent / estimatedMinutes
}

export function evaluateBadges(
  allBadges: Badge[],
  earnedBadgeIds: Set<string | number>,
  context: EvalContext
): (string | number)[] {
  const newBadges: (string | number)[] = [];

  for (const badge of allBadges) {
    if (earnedBadgeIds.has(badge.id)) continue;

    const criteria = badge.criteria;
    let earned = false;

    switch (criteria.type) {
      case "tutorial_count":
        earned = context.completedTutorialCount >= (criteria.threshold || 1);
        break;
      case "tool_view_count":
        earned = context.viewedToolCount >= (criteria.threshold || 10);
        break;
      case "specific_tutorials":
        earned = (criteria.slugs || []).every((s) =>
          context.completedTutorialSlugs.includes(s)
        );
        break;
      case "speed_completion":
        earned = (context.fastestCompletionRatio || Infinity) < 1;
        break;
      case "bookmark_count":
        earned = context.bookmarkCount >= (criteria.threshold || 5);
        break;
      case "category_diversity":
        earned =
          context.categoriesWithCompletedTutorials >= (criteria.threshold || 3);
        break;
      case "onboarding_complete":
        earned = context.completedOnboarding;
        break;
    }

    if (earned) {
      newBadges.push(badge.id);
    }
  }

  return newBadges;
}
