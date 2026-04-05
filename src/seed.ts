import type { Payload } from "payload";

const categoriesData = [
  { name: "Writing & Content", slug: "writing", icon: "pen-tool", color: "#3b82f6", order: 1, description: "AI tools for writing, copywriting, content generation, and text editing" },
  { name: "Image Generation", slug: "image-generation", icon: "image", color: "#a855f7", order: 2, description: "Create images, illustrations, and visual content with AI" },
  { name: "Coding & Development", slug: "coding", icon: "code", color: "#22c55e", order: 3, description: "AI-powered code generation, debugging, and development tools" },
  { name: "Data Analysis", slug: "data-analysis", icon: "bar-chart-3", color: "#f97316", order: 4, description: "Analyze data, generate insights, and create visualizations" },
  { name: "Chatbots & Assistants", slug: "chatbots", icon: "message-square", color: "#6366f1", order: 5, description: "General-purpose AI chatbots and virtual assistants" },
  { name: "Audio & Music", slug: "audio", icon: "music", color: "#ec4899", order: 6, description: "AI tools for music generation, audio editing, and voice synthesis" },
  { name: "Video & Animation", slug: "video", icon: "video", color: "#ef4444", order: 7, description: "Create and edit videos with AI assistance" },
  { name: "Automation", slug: "automation", icon: "bot", color: "#14b8a6", order: 8, description: "Automate workflows and repetitive tasks with AI" },
  { name: "Business Tools", slug: "business", icon: "briefcase", color: "#f59e0b", order: 9, description: "AI tools for business operations, presentations, and productivity" },
  { name: "Education", slug: "education", icon: "graduation-cap", color: "#06b6d4", order: 10, description: "AI tools for learning, tutoring, and educational content" },
];

const toolsData = [
  // Chatbots
  { name: "ChatGPT", slug: "chatgpt", tagline: "OpenAI's conversational AI for writing, coding, analysis, and more", pricing: "freemium" as const, difficulty: "beginner" as const, category: "chatbots", trending: true, trendingScore: 100, websiteUrl: "https://chat.openai.com", pros: ["Extremely versatile", "Large plugin ecosystem", "GPT-4o vision capabilities"], cons: ["Free tier has limitations", "Can hallucinate facts", "Usage caps on advanced models"] },
  { name: "Claude", slug: "claude", tagline: "Anthropic's AI assistant excelling at long documents, coding, and nuanced analysis", pricing: "freemium" as const, difficulty: "beginner" as const, category: "chatbots", trending: true, trendingScore: 95, websiteUrl: "https://claude.ai", pros: ["200K+ context window", "Strong at coding and analysis", "Thoughtful and nuanced responses"], cons: ["Smaller plugin ecosystem", "No image generation", "Usage limits on free tier"] },
  { name: "Gemini", slug: "gemini", tagline: "Google's multimodal AI with deep Google ecosystem integration", pricing: "freemium" as const, difficulty: "beginner" as const, category: "chatbots", trending: true, trendingScore: 85, websiteUrl: "https://gemini.google.com", pros: ["Deep Google integration", "Strong multimodal capabilities", "Free with Google account"], cons: ["Less consistent than competitors", "Limited third-party integrations"] },
  { name: "Perplexity", slug: "perplexity", tagline: "AI-powered search engine that provides cited, up-to-date answers", pricing: "freemium" as const, difficulty: "beginner" as const, category: "chatbots", trending: true, trendingScore: 80, websiteUrl: "https://perplexity.ai", pros: ["Real-time web search", "Cited sources", "Great for research"], cons: ["Less creative than ChatGPT", "Pro features require subscription"] },

  // Writing
  { name: "Jasper", slug: "jasper", tagline: "Enterprise AI content platform for marketing teams", pricing: "paid" as const, difficulty: "intermediate" as const, category: "writing", trending: false, trendingScore: 60, websiteUrl: "https://jasper.ai", pros: ["Brand voice customization", "Marketing-focused templates", "Team collaboration"], cons: ["Expensive for individuals", "Learning curve for advanced features"] },
  { name: "Copy.ai", slug: "copy-ai", tagline: "AI copywriting tool for marketing copy, emails, and social media", pricing: "freemium" as const, difficulty: "beginner" as const, category: "writing", trending: false, trendingScore: 55, websiteUrl: "https://copy.ai", pros: ["Easy to use", "Good free tier", "Many templates"], cons: ["Output quality varies", "Limited customization"] },
  { name: "Grammarly", slug: "grammarly", tagline: "AI-powered writing assistant for grammar, clarity, and tone", pricing: "freemium" as const, difficulty: "beginner" as const, category: "writing", trending: false, trendingScore: 70, websiteUrl: "https://grammarly.com", pros: ["Excellent grammar checking", "Tone detection", "Browser extension"], cons: ["Premium features are pricey", "Occasional false positives"] },
  { name: "Notion AI", slug: "notion-ai", tagline: "AI writing and productivity features built into Notion workspace", pricing: "paid" as const, difficulty: "beginner" as const, category: "writing", trending: true, trendingScore: 75, websiteUrl: "https://notion.so", pros: ["Integrated into workflow", "Good summarization", "Database AI features"], cons: ["Requires Notion subscription", "Add-on cost"] },

  // Image Generation
  { name: "Midjourney", slug: "midjourney", tagline: "Premium AI image generator known for stunning artistic quality", pricing: "paid" as const, difficulty: "intermediate" as const, category: "image-generation", trending: true, trendingScore: 90, websiteUrl: "https://midjourney.com", pros: ["Best image quality", "Strong artistic style", "Active community"], cons: ["No free tier", "Discord-based workflow", "Learning curve for prompts"] },
  { name: "DALL-E 3", slug: "dall-e-3", tagline: "OpenAI's image generator with natural language prompting via ChatGPT", pricing: "freemium" as const, difficulty: "beginner" as const, category: "image-generation", trending: true, trendingScore: 82, websiteUrl: "https://openai.com/dall-e-3", pros: ["Natural language prompts", "Integrated in ChatGPT", "Good text rendering"], cons: ["Less artistic than Midjourney", "Content restrictions"] },
  { name: "Stable Diffusion", slug: "stable-diffusion", tagline: "Open-source image generation model you can run locally", pricing: "free" as const, difficulty: "advanced" as const, category: "image-generation", trending: false, trendingScore: 65, websiteUrl: "https://stability.ai", pros: ["Free and open source", "Full control", "Run locally"], cons: ["Requires technical setup", "Needs GPU hardware", "Steep learning curve"] },
  { name: "Canva AI", slug: "canva-ai", tagline: "AI-powered design tool for creating graphics, presentations, and social media", pricing: "freemium" as const, difficulty: "beginner" as const, category: "image-generation", trending: true, trendingScore: 78, websiteUrl: "https://canva.com", pros: ["Easy to use", "Templates included", "Full design suite"], cons: ["AI features require Pro", "Less powerful generation"] },

  // Coding
  { name: "GitHub Copilot", slug: "github-copilot", tagline: "AI pair programmer that suggests code in your IDE in real-time", pricing: "paid" as const, difficulty: "intermediate" as const, category: "coding", trending: true, trendingScore: 88, websiteUrl: "https://github.com/features/copilot", pros: ["IDE integration", "Context-aware suggestions", "Supports many languages"], cons: ["Subscription required", "Can suggest incorrect code", "Privacy concerns"] },
  { name: "Cursor", slug: "cursor", tagline: "AI-first code editor built on VS Code with deep AI integration", pricing: "freemium" as const, difficulty: "intermediate" as const, category: "coding", trending: true, trendingScore: 92, websiteUrl: "https://cursor.com", pros: ["Full IDE experience", "Multi-file editing", "Chat + inline editing"], cons: ["Pro features costly", "Can be resource-heavy"] },
  { name: "Replit AI", slug: "replit-ai", tagline: "Browser-based IDE with AI coding assistant and instant deployment", pricing: "freemium" as const, difficulty: "beginner" as const, category: "coding", trending: false, trendingScore: 60, websiteUrl: "https://replit.com", pros: ["No setup required", "Deploy instantly", "Great for learning"], cons: ["Performance limitations", "Limited for large projects"] },
  { name: "Claude Code", slug: "claude-code", tagline: "Anthropic's agentic coding tool that works directly in your terminal", pricing: "paid" as const, difficulty: "intermediate" as const, category: "coding", trending: true, trendingScore: 93, websiteUrl: "https://claude.ai/code", pros: ["Terminal-native workflow", "Multi-file reasoning", "Agentic task execution"], cons: ["Requires API credits", "Terminal-based UI"] },

  // Data Analysis
  { name: "Julius AI", slug: "julius-ai", tagline: "AI data analyst that processes spreadsheets and creates visualizations", pricing: "freemium" as const, difficulty: "beginner" as const, category: "data-analysis", trending: false, trendingScore: 55, websiteUrl: "https://julius.ai", pros: ["Upload and analyze data instantly", "Auto-generates charts", "Natural language queries"], cons: ["Limited free tier", "Less powerful than dedicated tools"] },

  // Automation
  { name: "Zapier AI", slug: "zapier-ai", tagline: "Connect and automate 6000+ apps with AI-powered workflow builder", pricing: "freemium" as const, difficulty: "intermediate" as const, category: "automation", trending: false, trendingScore: 65, websiteUrl: "https://zapier.com", pros: ["Massive app library", "No-code builder", "AI suggestions"], cons: ["Costs add up quickly", "Complex workflows need paid plans"] },
  { name: "Make (Integromat)", slug: "make", tagline: "Visual automation platform for building complex workflows between apps", pricing: "freemium" as const, difficulty: "intermediate" as const, category: "automation", trending: false, trendingScore: 55, websiteUrl: "https://make.com", pros: ["Visual workflow builder", "More flexible than Zapier", "Good free tier"], cons: ["Steeper learning curve", "Smaller app library"] },

  // Video
  { name: "Runway ML", slug: "runway-ml", tagline: "AI video generation and editing with Gen-3 text-to-video model", pricing: "freemium" as const, difficulty: "intermediate" as const, category: "video", trending: true, trendingScore: 75, websiteUrl: "https://runway.ml", pros: ["Cutting-edge video generation", "Creative tools suite", "Web-based"], cons: ["Credits used up quickly", "Quality varies"] },
  { name: "Synthesia", slug: "synthesia", tagline: "Create AI videos with realistic avatars from text scripts", pricing: "paid" as const, difficulty: "beginner" as const, category: "video", trending: false, trendingScore: 60, websiteUrl: "https://synthesia.io", pros: ["No camera needed", "Multi-language avatars", "Professional quality"], cons: ["Expensive", "Avatar limitations", "Can feel uncanny"] },

  // Audio
  { name: "ElevenLabs", slug: "elevenlabs", tagline: "AI voice synthesis and cloning with natural-sounding speech", pricing: "freemium" as const, difficulty: "beginner" as const, category: "audio", trending: true, trendingScore: 72, websiteUrl: "https://elevenlabs.io", pros: ["Most natural AI voices", "Voice cloning", "Many languages"], cons: ["Free tier is limited", "Voice cloning ethics concerns"] },
  { name: "Suno", slug: "suno", tagline: "AI music generator that creates full songs from text prompts", pricing: "freemium" as const, difficulty: "beginner" as const, category: "audio", trending: true, trendingScore: 70, websiteUrl: "https://suno.com", pros: ["Full song generation", "Multiple genres", "Fun and creative"], cons: ["Quality inconsistent", "Copyright questions", "Limited control"] },

  // Business
  { name: "Beautiful.ai", slug: "beautiful-ai", tagline: "AI-powered presentation software that designs slides automatically", pricing: "paid" as const, difficulty: "beginner" as const, category: "business", trending: false, trendingScore: 50, websiteUrl: "https://beautiful.ai", pros: ["Auto-formatting", "Professional templates", "Easy to use"], cons: ["Limited free features", "Less flexible than PowerPoint"] },
  { name: "Gamma", slug: "gamma", tagline: "Create presentations, documents, and websites with AI in seconds", pricing: "freemium" as const, difficulty: "beginner" as const, category: "business", trending: true, trendingScore: 68, websiteUrl: "https://gamma.app", pros: ["Very fast creation", "Modern designs", "Web-first"], cons: ["Limited customization", "Export limitations"] },

  // Education
  { name: "Khan Academy Khanmigo", slug: "khanmigo", tagline: "AI tutor from Khan Academy for personalized learning assistance", pricing: "freemium" as const, difficulty: "beginner" as const, category: "education", trending: false, trendingScore: 55, websiteUrl: "https://khanacademy.org", pros: ["Pedagogically sound", "Safe for students", "Guides rather than gives answers"], cons: ["Limited subject coverage", "Requires Khan Academy"] },
  { name: "Duolingo Max", slug: "duolingo-max", tagline: "AI-powered language learning with roleplay and explanations", pricing: "paid" as const, difficulty: "beginner" as const, category: "education", trending: false, trendingScore: 50, websiteUrl: "https://duolingo.com", pros: ["Fun and engaging", "AI roleplay conversations", "Many languages"], cons: ["Subscription required", "AI features limited to some languages"] },
];

const tutorialsData = [
  {
    title: "Getting Started with ChatGPT",
    slug: "getting-started-chatgpt",
    toolSlug: "chatgpt",
    difficulty: "beginner" as const,
    estimatedMinutes: 15,
    description: "Learn the basics of ChatGPT: how to write effective prompts, use different modes, and get the most out of your conversations.",
    learningObjectives: [
      "Understand what ChatGPT can and cannot do",
      "Write clear and effective prompts",
      "Use system instructions and custom GPTs",
      "Apply prompt engineering techniques",
    ],
    steps: [
      { blockType: "textStep", title: "What is ChatGPT?", content: null },
      { blockType: "textStep", title: "Writing Your First Prompt", content: null },
      { blockType: "interactiveStep", title: "Prompt Practice: Summarize an Article", type: "prompt", promptTemplate: "Please summarize the following article in 3 bullet points:\n\n[Paste your article here]", expectedOutput: "A concise 3-bullet summary covering the main points", hints: [{ hint: "Be specific about the format you want" }, { hint: "Try adding constraints like word count or audience level" }] },
      { blockType: "tipStep", type: "tip", content: null },
      { blockType: "textStep", title: "Advanced Prompting Techniques", content: null },
      { blockType: "interactiveStep", title: "Challenge: Role-Based Prompting", type: "prompt", promptTemplate: "You are an experienced marketing copywriter. Write a compelling product description for a new AI-powered notebook app that helps students take better notes.", expectedOutput: "A persuasive product description with benefits, features, and a call to action", hints: [{ hint: "Assign a role to get more specialized output" }, { hint: "Include the target audience in your prompt" }] },
    ],
  },
  {
    title: "Introduction to Claude",
    slug: "intro-to-claude",
    toolSlug: "claude",
    difficulty: "beginner" as const,
    estimatedMinutes: 12,
    description: "Learn how to use Claude effectively for writing, analysis, coding, and research with its unique capabilities.",
    learningObjectives: [
      "Understand Claude's strengths and unique features",
      "Work with long documents using Claude's context window",
      "Use Claude for coding and technical tasks",
    ],
    steps: [
      { blockType: "textStep", title: "Meet Claude", content: null },
      { blockType: "textStep", title: "Long Document Analysis", content: null },
      { blockType: "interactiveStep", title: "Practice: Analyze and Compare", type: "prompt", promptTemplate: "Compare and contrast the following two approaches to [topic]. Provide a structured analysis with pros, cons, and your recommendation.", expectedOutput: "A structured comparison with clear sections for each approach", hints: [{ hint: "Claude excels at nuanced analysis - ask for multiple perspectives" }] },
      { blockType: "textStep", title: "Claude for Coding", content: null },
    ],
  },
  {
    title: "Creating Images with Midjourney",
    slug: "creating-images-midjourney",
    toolSlug: "midjourney",
    difficulty: "intermediate" as const,
    estimatedMinutes: 20,
    description: "Master Midjourney's prompt syntax to create stunning AI-generated images for various use cases.",
    learningObjectives: [
      "Understand Midjourney's prompt structure",
      "Use style parameters and aspect ratios",
      "Iterate on images with variations and upscaling",
    ],
    steps: [
      { blockType: "textStep", title: "How Midjourney Works", content: null },
      { blockType: "textStep", title: "Prompt Anatomy", content: null },
      { blockType: "interactiveStep", title: "Practice: Write an Image Prompt", type: "prompt", promptTemplate: "/imagine prompt: [subject], [style], [lighting], [camera angle] --ar 16:9 --v 6", expectedOutput: "A detailed prompt with subject, style descriptors, and Midjourney parameters", hints: [{ hint: "Be descriptive about the visual style you want" }, { hint: "Use --ar for aspect ratio, --v for version" }] },
      { blockType: "tipStep", type: "warning", content: null },
      { blockType: "textStep", title: "Iterating and Refining", content: null },
    ],
  },
  {
    title: "AI-Powered Coding with Cursor",
    slug: "coding-with-cursor",
    toolSlug: "cursor",
    difficulty: "intermediate" as const,
    estimatedMinutes: 25,
    description: "Learn to use Cursor IDE's AI features for faster coding: inline editing, chat, and multi-file changes.",
    learningObjectives: [
      "Set up and navigate Cursor IDE",
      "Use Cmd+K for inline AI editing",
      "Leverage AI chat for complex coding tasks",
      "Apply multi-file editing workflows",
    ],
    steps: [
      { blockType: "textStep", title: "Why Cursor?", content: null },
      { blockType: "textStep", title: "Inline AI Editing (Cmd+K)", content: null },
      { blockType: "textStep", title: "AI Chat for Complex Tasks", content: null },
      { blockType: "interactiveStep", title: "Practice: Describe a Feature", type: "prompt", promptTemplate: "Write a React component that displays a sortable table of users with columns for name, email, and role. Include search filtering and pagination.", expectedOutput: "A complete React component with sorting, filtering, and pagination", hints: [{ hint: "Be specific about the UI library and styling approach" }] },
      { blockType: "textStep", title: "Multi-File Editing", content: null },
    ],
  },
];

const workflowsData = [
  {
    name: "Content Creator Starter Pack",
    slug: "content-creator-starter",
    description: "A complete AI toolkit for content creators: generate ideas, write drafts, create visuals, and edit your work.",
    targetRoles: ["content-creator", "marketer"],
    targetGoals: ["content-creation", "writing"],
    toolSlugs: ["chatgpt", "jasper", "canva-ai", "grammarly"],
    difficulty: "beginner" as const,
    estimatedSetupMinutes: 15,
  },
  {
    name: "Developer Productivity Stack",
    slug: "developer-productivity",
    description: "Supercharge your development workflow with AI coding assistants, documentation, and automation.",
    targetRoles: ["developer"],
    targetGoals: ["coding", "automation"],
    toolSlugs: ["cursor", "claude-code", "github-copilot", "chatgpt"],
    difficulty: "intermediate" as const,
    estimatedSetupMinutes: 20,
  },
  {
    name: "Student Research Kit",
    slug: "student-research-kit",
    description: "AI tools to help students research faster, write better papers, and understand complex topics.",
    targetRoles: ["student", "researcher"],
    targetGoals: ["research", "writing", "learning"],
    toolSlugs: ["perplexity", "claude", "grammarly", "notion-ai"],
    difficulty: "beginner" as const,
    estimatedSetupMinutes: 10,
  },
  {
    name: "Marketing Visual Content Pipeline",
    slug: "marketing-visual-pipeline",
    description: "Create stunning marketing visuals from concept to final design using AI tools.",
    targetRoles: ["marketer", "designer"],
    targetGoals: ["design", "marketing", "content-creation"],
    toolSlugs: ["midjourney", "canva-ai", "dall-e-3", "beautiful-ai"],
    difficulty: "intermediate" as const,
    estimatedSetupMinutes: 25,
  },
  {
    name: "Entrepreneur MVP Builder",
    slug: "entrepreneur-mvp-builder",
    description: "Build your startup's MVP fast: AI for coding, design, copywriting, and business planning.",
    targetRoles: ["entrepreneur", "product-manager"],
    targetGoals: ["coding", "design", "writing", "business"],
    toolSlugs: ["cursor", "chatgpt", "gamma", "canva-ai", "zapier-ai"],
    difficulty: "intermediate" as const,
    estimatedSetupMinutes: 30,
  },
];

export async function seed(payload: Payload) {
  console.log("Seeding database...");

  // Create admin user if none exists
  const existingUsers = await payload.find({
    collection: "users",
    limit: 1,
  });
  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@aitoolsedu.com",
        password: "admin123",
        role: "admin",
        displayName: "Admin",
      },
    });
    console.log("  Created admin user: admin@aitoolsedu.com / admin123");
  }

  // Create categories
  const categoryMap = new Map<string, number | string>();
  for (const cat of categoriesData) {
    const existing = await payload.find({
      collection: "categories",
      where: { slug: { equals: cat.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      categoryMap.set(cat.slug, existing.docs[0].id);
      continue;
    }
    try {
      const created = await payload.create({
        collection: "categories",
        data: {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: cat.icon,
          color: cat.color,
          order: cat.order,
        },
      });
      categoryMap.set(cat.slug, created.id);
      console.log(`  Created category: ${cat.name} (id: ${created.id})`);
    } catch (err) {
      console.error(`  Failed to create category ${cat.name}:`, err);
      throw err;
    }
  }

  // Create tools
  const toolMap = new Map<string, number | string>();
  for (const tool of toolsData) {
    const existing = await payload.find({
      collection: "tools",
      where: { slug: { equals: tool.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      toolMap.set(tool.slug, existing.docs[0].id);
      continue;
    }
    const categoryId = categoryMap.get(tool.category);
    if (!categoryId) {
      console.log(`  Skipping tool ${tool.name}: no category ${tool.category}`);
      continue;
    }

    try {
      const created = await payload.create({
        collection: "tools",
        data: {
          name: tool.name,
          slug: tool.slug,
          tagline: tool.tagline,
          pricing: tool.pricing,
          difficulty: tool.difficulty,
          categories: [categoryId],
          trending: tool.trending,
          trendingScore: tool.trendingScore,
          websiteUrl: tool.websiteUrl,
          status: "published",
          lastVerified: new Date().toISOString(),
          pros: tool.pros?.map((text: string) => ({ text })) || [],
          cons: tool.cons?.map((text: string) => ({ text })) || [],
        },
      });
      toolMap.set(tool.slug, created.id);
      console.log(`  Created tool: ${tool.name}`);
    } catch (err) {
      console.error(`  Failed to create tool ${tool.name}:`, err);
      throw err;
    }
  }

  // Create tutorials
  for (const tut of tutorialsData) {
    const existing = await payload.find({
      collection: "tutorials",
      where: { slug: { equals: tut.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;

    const toolId = toolMap.get(tut.toolSlug);
    if (!toolId) {
      console.log(`  Skipping tutorial ${tut.title}: no tool ${tut.toolSlug}`);
      continue;
    }

    try {
    await payload.create({
      collection: "tutorials",
      data: {
        title: tut.title,
        slug: tut.slug,
        tool: toolId,
        difficulty: tut.difficulty,
        estimatedMinutes: tut.estimatedMinutes,
        description: tut.description,
        learningObjectives: tut.learningObjectives.map((o) => ({ objective: o })),
        steps: tut.steps,
        status: "published",
      },
    });
    console.log(`  Created tutorial: ${tut.title}`);
    } catch (err) {
      console.error(`  Failed to create tutorial ${tut.title}:`, err);
      // Continue with other tutorials
    }
  }

  // Create workflows
  for (const wf of workflowsData) {
    const existing = await payload.find({
      collection: "workflows",
      where: { slug: { equals: wf.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;

    const toolIds = wf.toolSlugs
      .map((slug) => toolMap.get(slug))
      .filter(Boolean) as (number | string)[];

    await payload.create({
      collection: "workflows",
      data: {
        name: wf.name,
        slug: wf.slug,
        description: wf.description,
        targetRoles: wf.targetRoles,
        targetGoals: wf.targetGoals,
        tools: toolIds,
        difficulty: wf.difficulty,
        estimatedSetupMinutes: wf.estimatedSetupMinutes,
        status: "published",
      },
    });
    console.log(`  Created workflow: ${wf.name}`);
  }

  console.log("Seeding complete!");
}
