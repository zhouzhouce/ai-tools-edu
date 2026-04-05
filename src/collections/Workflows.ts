import type { CollectionConfig } from "payload";

export const Workflows: CollectionConfig = {
  slug: "workflows",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "difficulty", "status"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "targetRoles",
      type: "select",
      hasMany: true,
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
      ],
    },
    {
      name: "targetGoals",
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
      name: "tools",
      type: "relationship",
      relationTo: "tools",
      hasMany: true,
      required: true,
    },
    {
      name: "steps",
      type: "richText",
      admin: {
        description: "How the tools connect in this workflow",
      },
    },
    {
      name: "estimatedSetupMinutes",
      type: "number",
    },
    {
      name: "difficulty",
      type: "select",
      required: true,
      options: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
};
