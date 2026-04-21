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
  { name: "AI Agents", slug: "ai-agents", icon: "cpu", color: "#8b5cf6", order: 11, description: "Autonomous AI agents that execute tasks, manage workflows, and operate tools on your behalf" },
  { name: "App Building", slug: "app-building", icon: "blocks", color: "#0ea5e9", order: 12, description: "AI-powered platforms to build full-stack apps from natural language prompts (Vibe Coding)" },
];

const toolsData = [
  // Chatbots
  { name: "ChatGPT", slug: "chatgpt", tagline: "OpenAI's conversational AI for writing, coding, analysis, and more", taglineZh: "OpenAI的对话AI，用于写作、编程、分析等", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "chatbots", trending: true, trendingScore: 100, websiteUrl: "https://chat.openai.com", officialDocsUrl: "https://platform.openai.com/docs", officialTutorialUrl: "https://help.openai.com/en/collections/3742473-chatgpt", pros: ["Extremely versatile", "Large plugin ecosystem", "GPT-4o vision capabilities"], cons: ["Free tier has limitations", "Can hallucinate facts", "Usage caps on advanced models"] },
  { name: "Claude", slug: "claude", tagline: "Anthropic's AI assistant excelling at long documents, coding, and nuanced analysis", taglineZh: "Anthropic的AI助手，擅长长文档、编程和深度分析", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "chatbots", trending: true, trendingScore: 95, websiteUrl: "https://claude.ai", officialDocsUrl: "https://docs.anthropic.com", officialTutorialUrl: "https://docs.anthropic.com/en/docs/quickstart", pros: ["200K+ context window", "Strong at coding and analysis", "Thoughtful and nuanced responses"], cons: ["Smaller plugin ecosystem", "No image generation", "Usage limits on free tier"] },
  { name: "Gemini", slug: "gemini", tagline: "Google's multimodal AI with deep Google ecosystem integration", taglineZh: "Google的多模态AI，深度整合Google生态", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "chatbots", trending: true, trendingScore: 85, websiteUrl: "https://gemini.google.com", officialDocsUrl: "https://ai.google.dev/docs", officialTutorialUrl: "https://ai.google.dev/gemini-api/docs/get-started", pros: ["Deep Google integration", "Strong multimodal capabilities", "Free with Google account"], cons: ["Less consistent than competitors", "Limited third-party integrations"] },
  { name: "Perplexity", slug: "perplexity", tagline: "AI-powered search engine that provides cited, up-to-date answers", taglineZh: "AI搜索引擎，提供有引用来源的实时回答", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "chatbots", trending: true, trendingScore: 80, websiteUrl: "https://perplexity.ai", officialDocsUrl: "https://docs.perplexity.ai", officialTutorialUrl: "https://docs.perplexity.ai", pros: ["Real-time web search", "Cited sources", "Great for research"], cons: ["Less creative than ChatGPT", "Pro features require subscription"] },
  // Writing
  { name: "Jasper", slug: "jasper", tagline: "Enterprise AI content platform for marketing teams", taglineZh: "面向营销团队的企业级AI内容平台", pricing: "paid" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "writing", trending: false, trendingScore: 60, websiteUrl: "https://jasper.ai", officialDocsUrl: "https://support.jasper.ai", officialTutorialUrl: "https://support.jasper.ai", pros: ["Brand voice customization", "Marketing-focused templates", "Team collaboration"], cons: ["Expensive for individuals", "Learning curve for advanced features"] },
  { name: "Copy.ai", slug: "copy-ai", tagline: "AI copywriting tool for marketing copy, emails, and social media", taglineZh: "AI文案工具，适用于营销文案、邮件和社交媒体", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "writing", trending: false, trendingScore: 55, websiteUrl: "https://copy.ai", officialDocsUrl: "https://www.copy.ai/tools", officialTutorialUrl: "https://www.copy.ai/tools", pros: ["Easy to use", "Good free tier", "Many templates"], cons: ["Output quality varies", "Limited customization"] },
  { name: "Grammarly", slug: "grammarly", tagline: "AI-powered writing assistant for grammar, clarity, and tone", taglineZh: "AI写作助手，检查语法、清晰度和语气", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "writing", trending: false, trendingScore: 70, websiteUrl: "https://grammarly.com", officialDocsUrl: "https://support.grammarly.com", officialTutorialUrl: "https://support.grammarly.com", pros: ["Excellent grammar checking", "Tone detection", "Browser extension"], cons: ["Premium features are pricey", "Occasional false positives"] },
  { name: "Notion AI", slug: "notion-ai", tagline: "AI writing and productivity features built into Notion workspace", taglineZh: "集成在Notion中的AI写作和生产力功能", pricing: "paid" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "writing", trending: true, trendingScore: 75, websiteUrl: "https://notion.so", officialDocsUrl: "https://www.notion.so/help/guides/using-notion-ai", officialTutorialUrl: "https://www.notion.so/help/guides/using-notion-ai", pros: ["Integrated into workflow", "Good summarization", "Database AI features"], cons: ["Requires Notion subscription", "Add-on cost"] },
  // Image Generation
  { name: "Midjourney", slug: "midjourney", tagline: "Premium AI image generator known for stunning artistic quality", taglineZh: "以惊人艺术质量著称的高端AI图像生成器", pricing: "paid" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "image-generation", trending: true, trendingScore: 90, websiteUrl: "https://midjourney.com", officialDocsUrl: "https://docs.midjourney.com", officialTutorialUrl: "https://docs.midjourney.com/docs/quick-start", pros: ["Best image quality", "Strong artistic style", "Active community"], cons: ["No free tier", "Discord-based workflow", "Learning curve for prompts"] },
  { name: "DALL-E 3", slug: "dall-e-3", tagline: "OpenAI's image generator with natural language prompting via ChatGPT", taglineZh: "OpenAI的图像生成器，通过ChatGPT自然语言提示", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "image-generation", trending: true, trendingScore: 82, websiteUrl: "https://openai.com/dall-e-3", officialDocsUrl: "https://platform.openai.com/docs/guides/images", officialTutorialUrl: "https://platform.openai.com/docs/guides/images", pros: ["Natural language prompts", "Integrated in ChatGPT", "Good text rendering"], cons: ["Less artistic than Midjourney", "Content restrictions"] },
  { name: "Stable Diffusion", slug: "stable-diffusion", tagline: "Open-source image generation model you can run locally", taglineZh: "可在本地运行的开源图像生成模型", pricing: "free" as const, difficulty: "advanced" as const, difficultyTier: "developer" as const, category: "image-generation", trending: false, trendingScore: 65, websiteUrl: "https://stability.ai", officialDocsUrl: "https://platform.stability.ai/docs", officialTutorialUrl: "https://platform.stability.ai/docs/getting-started", pros: ["Free and open source", "Full control", "Run locally"], cons: ["Requires technical setup", "Needs GPU hardware", "Steep learning curve"] },
  { name: "Canva AI", slug: "canva-ai", tagline: "AI-powered design tool for creating graphics, presentations, and social media", taglineZh: "AI设计工具，创建图形、演示文稿和社交媒体内容", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "image-generation", trending: true, trendingScore: 78, websiteUrl: "https://canva.com", officialDocsUrl: "https://www.canva.com/designschool", officialTutorialUrl: "https://www.canva.com/designschool/tutorials", pros: ["Easy to use", "Templates included", "Full design suite"], cons: ["AI features require Pro", "Less powerful generation"] },
  // Coding
  { name: "GitHub Copilot", slug: "github-copilot", tagline: "AI pair programmer that suggests code in your IDE in real-time", taglineZh: "AI编程伙伴，在IDE中实时建议代码", pricing: "paid" as const, difficulty: "intermediate" as const, difficultyTier: "developer" as const, category: "coding", trending: true, trendingScore: 88, websiteUrl: "https://github.com/features/copilot", officialDocsUrl: "https://docs.github.com/en/copilot", officialTutorialUrl: "https://docs.github.com/en/copilot/quickstart", pros: ["IDE integration", "Context-aware suggestions", "Supports many languages"], cons: ["Subscription required", "Can suggest incorrect code", "Privacy concerns"] },
  { name: "Cursor", slug: "cursor", tagline: "AI-first code editor built on VS Code with deep AI integration", taglineZh: "基于VS Code构建的AI优先代码编辑器", pricing: "freemium" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "coding", trending: true, trendingScore: 92, websiteUrl: "https://cursor.com", officialDocsUrl: "https://docs.cursor.com", officialTutorialUrl: "https://docs.cursor.com/get-started/migrate-from-vscode", pros: ["Full IDE experience", "Multi-file editing", "Chat + inline editing"], cons: ["Pro features costly", "Can be resource-heavy"] },
  { name: "Replit AI", slug: "replit-ai", tagline: "Browser-based IDE with AI coding assistant and instant deployment", taglineZh: "基于浏览器的IDE，内置AI编程助手和即时部署", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "coding", trending: false, trendingScore: 60, websiteUrl: "https://replit.com", officialDocsUrl: "https://docs.replit.com", officialTutorialUrl: "https://docs.replit.com/getting-started/intro-replit", pros: ["No setup required", "Deploy instantly", "Great for learning"], cons: ["Performance limitations", "Limited for large projects"] },
  { name: "Claude Code", slug: "claude-code", tagline: "Anthropic's agentic coding tool that works directly in your terminal", taglineZh: "Anthropic的终端原生agentic编程工具", pricing: "paid" as const, difficulty: "intermediate" as const, difficultyTier: "developer" as const, category: "coding", trending: true, trendingScore: 93, websiteUrl: "https://claude.ai/code", officialDocsUrl: "https://docs.anthropic.com/en/docs/claude-code", officialTutorialUrl: "https://docs.anthropic.com/en/docs/claude-code/overview", pros: ["Terminal-native workflow", "Multi-file reasoning", "Agentic task execution"], cons: ["Requires API credits", "Terminal-based UI"] },
  // Data Analysis
  { name: "Julius AI", slug: "julius-ai", tagline: "AI data analyst that processes spreadsheets and creates visualizations", taglineZh: "AI数据分析师，处理电子表格并创建可视化", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "data-analysis", trending: false, trendingScore: 55, websiteUrl: "https://julius.ai", officialDocsUrl: "https://julius.ai/docs", officialTutorialUrl: "https://julius.ai/docs", pros: ["Upload and analyze data instantly", "Auto-generates charts", "Natural language queries"], cons: ["Limited free tier", "Less powerful than dedicated tools"] },
  // Automation
  { name: "Zapier AI", slug: "zapier-ai", tagline: "Connect and automate 6000+ apps with AI-powered workflow builder", taglineZh: "用AI工作流构建器连接并自动化6000+应用", pricing: "freemium" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "automation", trending: false, trendingScore: 65, websiteUrl: "https://zapier.com", officialDocsUrl: "https://zapier.com/help", officialTutorialUrl: "https://zapier.com/resources/guides/quick-start", pros: ["Massive app library", "No-code builder", "AI suggestions"], cons: ["Costs add up quickly", "Complex workflows need paid plans"] },
  { name: "Make (Integromat)", slug: "make", tagline: "Visual automation platform for building complex workflows between apps", taglineZh: "可视化自动化平台，构建应用间的复杂工作流", pricing: "freemium" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "automation", trending: false, trendingScore: 55, websiteUrl: "https://make.com", officialDocsUrl: "https://www.make.com/en/help", officialTutorialUrl: "https://www.make.com/en/help/tutorials", pros: ["Visual workflow builder", "More flexible than Zapier", "Good free tier"], cons: ["Steeper learning curve", "Smaller app library"] },
  // Video
  { name: "Runway ML", slug: "runway-ml", tagline: "AI video generation and editing with Gen-3 text-to-video model", taglineZh: "AI视频生成和编辑，支持Gen-3文生视频", pricing: "freemium" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "video", trending: true, trendingScore: 75, websiteUrl: "https://runway.ml", officialDocsUrl: "https://docs.runwayml.com", officialTutorialUrl: "https://docs.runwayml.com", pros: ["Cutting-edge video generation", "Creative tools suite", "Web-based"], cons: ["Credits used up quickly", "Quality varies"] },
  { name: "Synthesia", slug: "synthesia", tagline: "Create AI videos with realistic avatars from text scripts", taglineZh: "从文本脚本创建逼真数字人AI视频", pricing: "paid" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "video", trending: false, trendingScore: 60, websiteUrl: "https://synthesia.io", officialDocsUrl: "https://help.synthesia.io", officialTutorialUrl: "https://help.synthesia.io", pros: ["No camera needed", "Multi-language avatars", "Professional quality"], cons: ["Expensive", "Avatar limitations", "Can feel uncanny"] },
  // Audio
  { name: "ElevenLabs", slug: "elevenlabs", tagline: "AI voice synthesis and cloning with natural-sounding speech", taglineZh: "AI语音合成和克隆，生成自然逼真的语音", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "builder" as const, category: "audio", trending: true, trendingScore: 72, websiteUrl: "https://elevenlabs.io", officialDocsUrl: "https://elevenlabs.io/docs", officialTutorialUrl: "https://elevenlabs.io/docs/quickstart", pros: ["Most natural AI voices", "Voice cloning", "Many languages"], cons: ["Free tier is limited", "Voice cloning ethics concerns"] },
  { name: "Suno", slug: "suno", tagline: "AI music generator that creates full songs from text prompts", taglineZh: "AI音乐生成器，从文本提示创建完整歌曲", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "audio", trending: true, trendingScore: 70, websiteUrl: "https://suno.com", officialDocsUrl: "https://suno.com/blog", officialTutorialUrl: "https://suno.com/blog", pros: ["Full song generation", "Multiple genres", "Fun and creative"], cons: ["Quality inconsistent", "Copyright questions", "Limited control"] },
  // Business
  { name: "Beautiful.ai", slug: "beautiful-ai", tagline: "AI-powered presentation software that designs slides automatically", taglineZh: "AI演示文稿软件，自动设计幻灯片", pricing: "paid" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "business", trending: false, trendingScore: 50, websiteUrl: "https://beautiful.ai", officialDocsUrl: "https://support.beautiful.ai", officialTutorialUrl: "https://support.beautiful.ai", pros: ["Auto-formatting", "Professional templates", "Easy to use"], cons: ["Limited free features", "Less flexible than PowerPoint"] },
  { name: "Gamma", slug: "gamma", tagline: "Create presentations, documents, and websites with AI in seconds", taglineZh: "用AI在几秒内创建演示文稿、文档和网站", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "business", trending: true, trendingScore: 68, websiteUrl: "https://gamma.app", officialDocsUrl: "https://gamma.app/docs", officialTutorialUrl: "https://gamma.app/docs", pros: ["Very fast creation", "Modern designs", "Web-first"], cons: ["Limited customization", "Export limitations"] },
  // Education
  { name: "Khan Academy Khanmigo", slug: "khanmigo", tagline: "AI tutor from Khan Academy for personalized learning assistance", taglineZh: "可汗学院的AI导师，个性化学习辅导", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "education", trending: false, trendingScore: 55, websiteUrl: "https://khanacademy.org", officialDocsUrl: "https://support.khanacademy.org", officialTutorialUrl: "https://support.khanacademy.org", pros: ["Pedagogically sound", "Safe for students", "Guides rather than gives answers"], cons: ["Limited subject coverage", "Requires Khan Academy"] },
  { name: "Duolingo Max", slug: "duolingo-max", tagline: "AI-powered language learning with roleplay and explanations", taglineZh: "AI语言学习，支持角色扮演和解释", pricing: "paid" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "education", trending: false, trendingScore: 50, websiteUrl: "https://duolingo.com", officialDocsUrl: "https://support.duolingo.com", officialTutorialUrl: "https://support.duolingo.com", pros: ["Fun and engaging", "AI roleplay conversations", "Many languages"], cons: ["Subscription required", "AI features limited to some languages"] },
  // AI Agents
  { name: "OpenClaw", slug: "openclaw", tagline: "Open-source autonomous AI agent that executes tasks via messaging platforms", taglineZh: "开源自主AI Agent，通过消息平台执行任务", pricing: "free" as const, difficulty: "intermediate" as const, difficultyTier: "developer" as const, category: "ai-agents", trending: true, trendingScore: 98, websiteUrl: "https://github.com/openclaw/openclaw", officialDocsUrl: "https://github.com/openclaw/openclaw", officialTutorialUrl: "https://github.com/openclaw/openclaw/wiki", pros: ["247K GitHub stars", "True task automation via WhatsApp/Slack", "100+ prebuilt skills", "Open source & self-hosted", "Runs locally for privacy"], cons: ["Deep system access poses security risks", "Requires isolated machine for safety", "Complex setup for beginners", "Malicious extensions possible"] },
  { name: "Devin", slug: "devin", tagline: "The first AI software engineer that autonomously completes coding tasks end-to-end", taglineZh: "首个AI软件工程师，端到端自主完成编程任务", pricing: "paid" as const, difficulty: "advanced" as const, difficultyTier: "developer" as const, category: "ai-agents", trending: true, trendingScore: 85, websiteUrl: "https://devin.ai", officialDocsUrl: "https://docs.devin.ai", officialTutorialUrl: "https://docs.devin.ai/getting-started", pros: ["Fully autonomous coding", "Handles GitHub issues end-to-end", "Plans, codes, tests, and deploys", "Learns from codebase context"], cons: ["Expensive enterprise pricing", "Can make unexpected changes", "Needs careful supervision", "Limited to supported languages"] },
  // App Building (Vibe Coding)
  { name: "Bolt.new", slug: "bolt-new", tagline: "Browser-based AI full-stack development platform with zero local setup", taglineZh: "基于浏览器的AI全栈开发平台，零本地配置", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "builder" as const, category: "app-building", trending: true, trendingScore: 88, websiteUrl: "https://bolt.new", officialDocsUrl: "https://docs.bolt.new", officialTutorialUrl: "https://docs.bolt.new/getting-started", pros: ["Zero setup, runs in browser", "Supports 10+ frameworks", "WebContainer technology", "$40M ARR proven platform"], cons: ["Credits consumed quickly", "Complex apps may need manual refinement", "Limited backend capabilities"] },
  { name: "Lovable", slug: "lovable", tagline: "Build complete full-stack apps from a single prompt with database and auth included", taglineZh: "一句话生成完整全栈应用，含数据库和认证", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "app-building", trending: true, trendingScore: 86, websiteUrl: "https://lovable.dev", officialDocsUrl: "https://docs.lovable.dev", officialTutorialUrl: "https://docs.lovable.dev/getting-started", pros: ["Complete full-stack generation", "Built-in Supabase integration", "Auth & database auto-provisioned", "Best for non-technical users"], cons: ["Less control over code structure", "Supabase lock-in", "Complex customization limited"] },
  { name: "v0", slug: "v0", tagline: "Vercel's AI tool for generating beautiful React and Tailwind CSS components", taglineZh: "Vercel的AI工具，生成精美的React和Tailwind组件", pricing: "freemium" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "app-building", trending: true, trendingScore: 82, websiteUrl: "https://v0.dev", officialDocsUrl: "https://v0.dev/docs", officialTutorialUrl: "https://v0.dev/docs", pros: ["Highest quality React components", "Figma-to-code pipeline", "Tailwind CSS native", "Seamless Vercel deployment"], cons: ["Components only, not full apps", "No database or backend", "Limited to React ecosystem"] },
  { name: "Windsurf", slug: "windsurf", tagline: "The #1 ranked AI IDE with Arena Mode and multi-agent parallel editing", taglineZh: "排名第一的AI IDE，支持Arena模式和多Agent并行编辑", pricing: "freemium" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "coding", trending: true, trendingScore: 94, websiteUrl: "https://codeium.com/windsurf", officialDocsUrl: "https://docs.codeium.com/windsurf", officialTutorialUrl: "https://docs.codeium.com/windsurf/getting-started", pros: ["#1 AI IDE ranking 2026", "Arena Mode for model comparison", "8 parallel agents", "Generous free tier"], cons: ["Resource intensive", "Newer ecosystem than VS Code", "Some features in beta"] },
  // Chatbots
  { name: "Grok", slug: "grok", tagline: "xAI's AI assistant with real-time internet access and X (Twitter) integration", taglineZh: "xAI的AI助手，实时联网和X(Twitter)深度整合", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "chatbots", trending: true, trendingScore: 83, websiteUrl: "https://grok.x.ai", officialDocsUrl: "https://docs.x.ai", officialTutorialUrl: "https://docs.x.ai/docs/quickstart", pros: ["SWE-bench #1 score (75%)", "Real-time internet access", "X/Twitter data integration", "Uncensored responses"], cons: ["X Premium required for full access", "Smaller ecosystem", "Bias from X data"] },
  // Video
  { name: "Sora", slug: "sora", tagline: "OpenAI's text-to-video model generating high-quality 60-second videos", taglineZh: "OpenAI的文生视频模型，生成高质量60秒视频", pricing: "paid" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "video", trending: true, trendingScore: 87, websiteUrl: "https://sora.com", officialDocsUrl: "https://help.openai.com/en/collections/sora", officialTutorialUrl: "https://help.openai.com/en/collections/sora", pros: ["Industry-leading video quality", "60-second generation", "Understands physics & motion", "OpenAI ecosystem"], cons: ["Expensive credits", "Long generation times", "Content policy restrictions", "Limited editing control"] },
  { name: "Kling", slug: "kling", tagline: "China's leading AI video generator rivaling Sora in quality", taglineZh: "中国领先的AI视频生成器，质量媲美Sora", pricing: "freemium" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "video", trending: true, trendingScore: 76, websiteUrl: "https://klingai.com", officialDocsUrl: "https://klingai.com/docs", officialTutorialUrl: "https://klingai.com/docs", pros: ["High quality video generation", "Strong in Chinese content", "Competitive pricing", "Good motion understanding"], cons: ["Limited outside China", "English documentation sparse", "Fewer integrations"] },
  { name: "Pika", slug: "pika", tagline: "Simple and intuitive AI video editor for quick creative video content", taglineZh: "简单直观的AI视频编辑器，快速创作视频内容", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "video", trending: false, trendingScore: 62, websiteUrl: "https://pika.art", officialDocsUrl: "https://pika.art/blog", officialTutorialUrl: "https://pika.art/blog", pros: ["Very easy to use", "Quick video generation", "Fun creative effects", "Good for social media"], cons: ["Lower quality than Sora", "Limited video length", "Fewer customization options"] },
  // Image Generation
  { name: "Ideogram", slug: "ideogram", tagline: "AI image generator with the best text rendering in images", taglineZh: "AI图像生成器，图像中文字渲染效果最佳", pricing: "freemium" as const, difficulty: "intermediate" as const, difficultyTier: "builder" as const, category: "image-generation", trending: true, trendingScore: 74, websiteUrl: "https://ideogram.ai", officialDocsUrl: "https://docs.ideogram.ai", officialTutorialUrl: "https://docs.ideogram.ai", pros: ["Best text-in-image rendering", "Great for logos & posters", "Consistent style control", "Good free tier"], cons: ["Fewer artistic styles than Midjourney", "Smaller community", "API still maturing"] },
  // Business
  { name: "Napkin AI", slug: "napkin-ai", tagline: "Transform text into infographics, flowcharts, and visual diagrams instantly", taglineZh: "将文本即时转换为信息图、流程图和可视化图表", pricing: "freemium" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "business", trending: true, trendingScore: 65, websiteUrl: "https://napkin.ai", officialDocsUrl: "https://napkin.ai/help", officialTutorialUrl: "https://napkin.ai/help", pros: ["Text to infographic instantly", "Beautiful default designs", "Great for presentations", "Easy to customize"], cons: ["Limited diagram types", "Export format restrictions", "Pro features costly"] },
  // Education
  { name: "NotebookLM", slug: "notebooklm", tagline: "Google's AI research assistant that generates podcasts and summaries from your documents", taglineZh: "Google的AI研究助手，从文档自动生成播客和摘要", pricing: "free" as const, difficulty: "beginner" as const, difficultyTier: "starter" as const, category: "education", trending: true, trendingScore: 73, websiteUrl: "https://notebooklm.google.com", officialDocsUrl: "https://support.google.com/notebooklm", officialTutorialUrl: "https://support.google.com/notebooklm", pros: ["Free with Google account", "Audio podcast generation", "Multi-document analysis", "Grounded in your sources"], cons: ["Limited to uploaded docs", "Google ecosystem only", "No real-time data"] },
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
  {
    title: "Getting Started with OpenClaw AI Agent",
    slug: "getting-started-openclaw",
    toolSlug: "openclaw",
    difficulty: "intermediate" as const,
    estimatedMinutes: 20,
    description: "Learn what AI Agents are, how to set up OpenClaw, connect it to messaging platforms, and execute your first autonomous tasks safely.",
    learningObjectives: [
      "Understand the difference between AI tools and AI agents",
      "Set up OpenClaw on an isolated machine",
      "Connect OpenClaw to WhatsApp or Slack",
      "Design effective agent task instructions",
      "Apply security best practices for AI agents",
    ],
    steps: [
      { blockType: "textStep", title: "What is an AI Agent?", content: null },
      { blockType: "textStep", title: "AI Tools vs AI Agents vs AIOS", content: null },
      { blockType: "textStep", title: "Installing OpenClaw", content: null },
      { blockType: "interactiveStep", title: "Practice: Design an Agent Task", type: "prompt", promptTemplate: "Task: Monitor my project's GitHub repository for new issues labeled 'bug'. For each new bug issue:\n1. Read the issue description\n2. Search the codebase for related files\n3. Create a summary of potential root causes\n4. Post a comment on the issue with your analysis", expectedOutput: "A well-structured agent task with clear steps, success criteria, and safety boundaries", hints: [{ hint: "Always specify what the agent should NOT do" }, { hint: "Include a human approval step for destructive actions" }, { hint: "Define clear boundaries for file access" }] },
      { blockType: "tipStep", type: "warning", content: null },
      { blockType: "textStep", title: "Security Best Practices", content: null },
    ],
  },
  {
    title: "Build Your First App with Bolt.new",
    slug: "build-app-bolt-new",
    toolSlug: "bolt-new",
    difficulty: "beginner" as const,
    estimatedMinutes: 15,
    description: "Learn to build a complete web application in your browser using Bolt.new's AI-powered development platform - no local setup required.",
    learningObjectives: [
      "Understand what Vibe Coding is",
      "Create a project in Bolt.new",
      "Describe features in natural language",
      "Preview and iterate on your app",
      "Deploy your app to the web",
    ],
    steps: [
      { blockType: "textStep", title: "What is Vibe Coding?", content: null },
      { blockType: "textStep", title: "Creating Your First Project", content: null },
      { blockType: "interactiveStep", title: "Practice: Describe Your App", type: "prompt", promptTemplate: "Build me a personal task manager app with:\n- A clean, modern UI with a sidebar navigation\n- Ability to create, edit, and delete tasks\n- Task categories (Work, Personal, Learning)\n- Due dates and priority levels (Low, Medium, High)\n- A dashboard showing today's tasks and overdue items\n\nUse React, Tailwind CSS, and local storage for data.", expectedOutput: "A detailed app description with specific features, UI preferences, and tech stack", hints: [{ hint: "Be specific about the UI style and layout" }, { hint: "Mention the tech stack you want to use" }, { hint: "Describe the data model implicitly through features" }] },
      { blockType: "textStep", title: "Iterating and Refining", content: null },
      { blockType: "textStep", title: "Deploying Your App", content: null },
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
  {
    name: "Vibe Coding Stack",
    slug: "vibe-coding-stack",
    description: "Build full-stack apps without writing code: generate UIs, wire up backends, and deploy - all from natural language prompts.",
    targetRoles: ["entrepreneur", "designer", "product-manager"],
    targetGoals: ["coding", "design", "business"],
    toolSlugs: ["bolt-new", "lovable", "v0", "cursor"],
    difficulty: "beginner" as const,
    estimatedSetupMinutes: 10,
  },
  {
    name: "AI Agent Automation Suite",
    slug: "ai-agent-automation",
    description: "Set up autonomous AI agents to handle repetitive tasks: file management, email processing, code reviews, and workflow orchestration.",
    targetRoles: ["developer", "entrepreneur"],
    targetGoals: ["automation", "coding"],
    toolSlugs: ["openclaw", "zapier-ai", "make", "claude-code"],
    difficulty: "intermediate" as const,
    estimatedSetupMinutes: 30,
  },
  {
    name: "Video Content Pipeline",
    slug: "video-content-pipeline",
    description: "End-to-end AI video production: generate videos from text, add voiceovers, and create professional content at scale.",
    targetRoles: ["content-creator", "marketer"],
    targetGoals: ["content-creation", "marketing"],
    toolSlugs: ["sora", "runway-ml", "elevenlabs", "canva-ai"],
    difficulty: "intermediate" as const,
    estimatedSetupMinutes: 25,
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
          taglineZh: (tool as Record<string, unknown>).taglineZh as string || undefined,
          pricing: tool.pricing,
          difficulty: tool.difficulty,
          difficultyTier: (tool as Record<string, unknown>).difficultyTier as string || "starter",
          categories: [categoryId],
          trending: tool.trending,
          trendingScore: tool.trendingScore,
          websiteUrl: tool.websiteUrl,
          officialDocsUrl: (tool as Record<string, unknown>).officialDocsUrl as string || undefined,
          officialTutorialUrl: (tool as Record<string, unknown>).officialTutorialUrl as string || undefined,
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

  // Create badges
  const badgesData = [
    { name: "First Steps", nameZh: "第一步", description: "Complete your first tutorial", descriptionZh: "完成你的第一个教程", icon: "🎯", criteria: { type: "tutorial_count", threshold: 1 }, rarity: "common" as const, order: 1 },
    { name: "Dedicated Learner", nameZh: "勤奋学习者", description: "Complete 3 tutorials", descriptionZh: "完成3个教程", icon: "📚", criteria: { type: "tutorial_count", threshold: 3 }, rarity: "rare" as const, order: 2 },
    { name: "Tool Explorer", nameZh: "工具探索者", description: "View 10 different AI tools", descriptionZh: "浏览10个不同的AI工具", icon: "🔍", criteria: { type: "tool_view_count", threshold: 10 }, rarity: "common" as const, order: 3 },
    { name: "Prompt Master", nameZh: "提示词大师", description: "Complete all ChatGPT tutorials", descriptionZh: "完成所有ChatGPT教程", icon: "✨", criteria: { type: "specific_tutorials", slugs: ["getting-started-chatgpt"] }, rarity: "epic" as const, order: 4 },
    { name: "Speed Learner", nameZh: "极速学习者", description: "Complete a tutorial under the estimated time", descriptionZh: "在预估时间内完成教程", icon: "⚡", criteria: { type: "speed_completion" }, rarity: "rare" as const, order: 5 },
    { name: "Bookworm", nameZh: "收藏达人", description: "Bookmark 5 tools", descriptionZh: "收藏5个工具", icon: "🔖", criteria: { type: "bookmark_count", threshold: 5 }, rarity: "common" as const, order: 6 },
    { name: "Full Stack AI", nameZh: "全栈AI", description: "Complete tutorials across 3+ categories", descriptionZh: "完成3个以上分类的教程", icon: "🏆", criteria: { type: "category_diversity", threshold: 3 }, rarity: "legendary" as const, order: 7 },
    { name: "Early Adopter", nameZh: "先行者", description: "Complete the onboarding profile", descriptionZh: "完成新手引导画像", icon: "🚀", criteria: { type: "onboarding_complete" }, rarity: "rare" as const, order: 8 },
  ];

  for (const badge of badgesData) {
    const existing = await payload.find({
      collection: "badges",
      where: { name: { equals: badge.name } },
      limit: 1,
    });
    if (existing.docs.length > 0) continue;

    try {
      await payload.create({
        collection: "badges",
        data: badge,
      });
      console.log(`  Created badge: ${badge.name}`);
    } catch (err) {
      console.error(`  Failed to create badge ${badge.name}:`, err);
    }
  }

  console.log("Seeding complete!");
}
