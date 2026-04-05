import type { CollectionConfig } from "payload";

export const Tools: CollectionConfig = {
  slug: "tools",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "categories", "pricing", "difficulty", "status"],
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
      name: "tagline",
      type: "text",
      required: true,
      admin: {
        description: "One-line description shown on cards",
      },
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "screenshots",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
      ],
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      required: true,
    },
    {
      name: "pricing",
      type: "select",
      required: true,
      options: [
        { label: "Free", value: "free" },
        { label: "Freemium", value: "freemium" },
        { label: "Paid", value: "paid" },
        { label: "Enterprise", value: "enterprise" },
      ],
    },
    {
      name: "pricingDetails",
      type: "text",
      admin: {
        description: "e.g., 'Free tier: 100 requests/day, Pro: $20/mo'",
      },
    },
    {
      name: "websiteUrl",
      type: "text",
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
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "trending",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show on homepage trending section",
      },
    },
    {
      name: "trendingScore",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
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
    {
      name: "alternatives",
      type: "relationship",
      relationTo: "tools",
      hasMany: true,
      admin: {
        description: "Similar or competing tools",
      },
    },
    {
      name: "lastVerified",
      type: "date",
      admin: {
        position: "sidebar",
        description: "When an editor last verified this tool's info",
      },
    },
    {
      name: "launchDate",
      type: "date",
    },
    {
      name: "pros",
      type: "array",
      fields: [{ name: "text", type: "text", required: true }],
    },
    {
      name: "cons",
      type: "array",
      fields: [{ name: "text", type: "text", required: true }],
    },
  ],
};
