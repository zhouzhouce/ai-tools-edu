import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "User", value: "user" },
      ],
      defaultValue: "user",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "displayName",
      type: "text",
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "profileRole",
      type: "select",
      admin: {
        description: "User's professional role (from onboarding)",
      },
      options: [
        { label: "Marketer", value: "marketer" },
        { label: "Developer", value: "developer" },
        { label: "Designer", value: "designer" },
        { label: "Student", value: "student" },
        { label: "Researcher", value: "researcher" },
        { label: "Content Creator", value: "content-creator" },
        { label: "Product Manager", value: "product-manager" },
        { label: "Entrepreneur", value: "entrepreneur" },
        { label: "Educator", value: "educator" },
        { label: "Data Analyst", value: "data-analyst" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "goals",
      type: "select",
      hasMany: true,
      options: [
        { label: "Content Creation", value: "content-creation" },
        { label: "Coding & Development", value: "coding" },
        { label: "Research & Analysis", value: "research" },
        { label: "Design & Visual", value: "design" },
        { label: "Writing & Editing", value: "writing" },
        { label: "Marketing & SEO", value: "marketing" },
        { label: "Data Analysis", value: "data-analysis" },
        { label: "Automation", value: "automation" },
        { label: "Learning & Education", value: "learning" },
        { label: "Business Operations", value: "business" },
      ],
    },
    {
      name: "experienceLevel",
      type: "select",
      options: [
        { label: "Beginner - New to AI tools", value: "beginner" },
        { label: "Intermediate - Used a few AI tools", value: "intermediate" },
        { label: "Advanced - Regular AI tool user", value: "advanced" },
      ],
    },
    {
      name: "scenario",
      type: "textarea",
      admin: {
        description: "User's specific AI use case scenario (from onboarding)",
      },
    },
    {
      name: "weeklyTimeBudget",
      type: "select",
      options: [
        { label: "15 minutes", value: "15min" },
        { label: "30 minutes", value: "30min" },
        { label: "1 hour", value: "1h" },
        { label: "2+ hours", value: "2h+" },
      ],
    },
    {
      name: "completedOnboarding",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "bookmarkedTools",
      type: "relationship",
      relationTo: "tools",
      hasMany: true,
    },
    {
      name: "completedTutorials",
      type: "array",
      fields: [
        {
          name: "tutorial",
          type: "relationship",
          relationTo: "tutorials",
          required: true,
        },
        {
          name: "completedAt",
          type: "date",
        },
        {
          name: "score",
          type: "number",
        },
      ],
    },
  ],
};
