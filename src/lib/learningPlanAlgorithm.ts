const goalToCategoryMap: Record<string, string[]> = {
  "content-creation": ["writing", "video"],
  coding: ["coding"],
  research: ["chatbots", "data-analysis"],
  design: ["image-generation"],
  writing: ["writing"],
  marketing: ["writing", "image-generation", "business"],
  "data-analysis": ["data-analysis"],
  automation: ["automation"],
  learning: ["chatbots", "education"],
  business: ["business", "automation"],
};

const tierForLevel: Record<string, string[]> = {
  beginner: ["starter"],
  intermediate: ["starter", "builder"],
  advanced: ["starter", "builder", "developer"],
};

interface Tool {
  id: string | number;
  slug: string;
  name: string;
  categories: { slug: string }[] | string[];
  difficultyTier?: string;
  trendingScore?: number;
}

interface Tutorial {
  id: string | number;
  slug: string;
  tool: { slug: string } | string;
  difficulty: string;
  estimatedMinutes: number;
}

interface Workflow {
  id: string | number;
  targetRoles?: string[];
  targetGoals?: string[];
}

interface UserProfile {
  profileRole?: string;
  goals?: string[];
  experienceLevel?: string;
  scenario?: string;
  weeklyTimeBudget?: string;
}

interface WeeklyItem {
  week: number;
  toolId: string | number;
  toolName: string;
  tutorialIds: (string | number)[];
  estimatedMinutes: number;
}

export function generateLearningPlan(
  profile: UserProfile,
  tools: Tool[],
  tutorials: Tutorial[],
  workflows: Workflow[]
) {
  const { goals = [], experienceLevel = "beginner", profileRole, scenario, weeklyTimeBudget = "30min" } = profile;

  // 1. Find matching category slugs from goals
  const matchingCategories = new Set<string>();
  goals.forEach((g) => {
    (goalToCategoryMap[g] || []).forEach((c) => matchingCategories.add(c));
  });

  // 2. Filter tools by tier and category match
  const allowedTiers = tierForLevel[experienceLevel] || ["starter"];
  const scoredTools = tools
    .filter((t) => allowedTiers.includes(t.difficultyTier || "starter"))
    .map((t) => {
      const cats = Array.isArray(t.categories)
        ? t.categories.map((c) => (typeof c === "object" ? c.slug : ""))
        : [];
      const categoryMatch = cats.some((c) => matchingCategories.has(c)) ? 2 : 0;

      // Scenario keyword matching
      let scenarioBonus = 0;
      if (scenario) {
        const lower = scenario.toLowerCase();
        if (lower.includes(t.name.toLowerCase())) scenarioBonus = 3;
        if (lower.includes(t.slug)) scenarioBonus = 3;
      }

      const score = (t.trendingScore || 0) / 20 + categoryMatch * 10 + scenarioBonus * 5;
      return { tool: t, score };
    })
    .sort((a, b) => b.score - a.score);

  // 3. Determine how many to recommend based on time budget
  const toolCount = { "15min": 3, "30min": 5, "1h": 8, "2h+": 12 }[weeklyTimeBudget] || 5;
  const recommendedTools = scoredTools.slice(0, toolCount).map((s) => s.tool);
  const recommendedToolIds = new Set(recommendedTools.map((t) => t.id));

  // 4. Match tutorials for recommended tools
  const recommendedTutorials = tutorials.filter((tut) => {
    const toolSlug = typeof tut.tool === "object" ? tut.tool.slug : "";
    return recommendedTools.some((t) => t.slug === toolSlug);
  });

  // 5. Match workflows
  const recommendedWorkflows = workflows.filter((wf) => {
    const roleMatch = wf.targetRoles?.includes(profileRole || "") || false;
    const goalMatch = wf.targetGoals?.some((g) => goals.includes(g)) || false;
    return roleMatch || goalMatch;
  });

  // 6. Generate weekly schedule
  const minutesPerWeek = { "15min": 15, "30min": 30, "1h": 60, "2h+": 120 }[weeklyTimeBudget] || 30;
  const weeklySchedule: WeeklyItem[] = [];
  let week = 1;
  let weekMinutes = 0;

  for (const tool of recommendedTools) {
    const toolTutorials = recommendedTutorials.filter((tut) => {
      const toolSlug = typeof tut.tool === "object" ? tut.tool.slug : "";
      return toolSlug === tool.slug;
    });

    const totalMinutes = toolTutorials.reduce((sum, t) => sum + (t.estimatedMinutes || 15), 0) || 15;

    if (weekMinutes + totalMinutes > minutesPerWeek && weekMinutes > 0) {
      week++;
      weekMinutes = 0;
    }

    weeklySchedule.push({
      week,
      toolId: tool.id,
      toolName: tool.name,
      tutorialIds: toolTutorials.map((t) => t.id),
      estimatedMinutes: totalMinutes,
    });
    weekMinutes += totalMinutes;
  }

  return {
    recommendedTools: recommendedTools.map((t) => t.id),
    recommendedTutorials: recommendedTutorials.map((t) => t.id),
    recommendedWorkflows: recommendedWorkflows.map((w) => w.id),
    weeklySchedule,
    progress: 0,
    generatedAt: new Date().toISOString(),
  };
}
