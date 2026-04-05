import type { CollectionConfig } from "payload";

export const Tutorials: CollectionConfig = {
  slug: "tutorials",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tool", "difficulty", "status"],
  },
  fields: [
    {
      name: "title",
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
      name: "tool",
      type: "relationship",
      relationTo: "tools",
      required: true,
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
      name: "estimatedMinutes",
      type: "number",
      required: true,
      min: 1,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "learningObjectives",
      type: "array",
      fields: [{ name: "objective", type: "text", required: true }],
    },
    {
      name: "prerequisites",
      type: "relationship",
      relationTo: "tutorials",
      hasMany: true,
    },
    {
      name: "steps",
      type: "blocks",
      blocks: [
        {
          slug: "textStep",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "content", type: "richText" },
          ],
        },
        {
          slug: "videoStep",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "videoUrl", type: "text", required: true },
            { name: "caption", type: "text" },
          ],
        },
        {
          slug: "interactiveStep",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "instructions", type: "richText" },
            {
              name: "type",
              type: "select",
              required: true,
              options: [
                { label: "Code Sandbox", value: "sandbox" },
                { label: "Prompt Challenge", value: "prompt" },
                { label: "Quiz", value: "quiz" },
              ],
            },
            {
              name: "sandboxConfig",
              type: "json",
              admin: {
                condition: (_, siblingData) => siblingData?.type === "sandbox",
                description: "Sandpack configuration JSON",
              },
            },
            {
              name: "promptTemplate",
              type: "textarea",
              admin: {
                condition: (_, siblingData) => siblingData?.type === "prompt",
              },
            },
            {
              name: "expectedOutput",
              type: "textarea",
              admin: {
                description: "Expected output pattern for validation",
              },
            },
            {
              name: "hints",
              type: "array",
              fields: [{ name: "hint", type: "text", required: true }],
            },
            {
              name: "quizQuestions",
              type: "json",
              admin: {
                condition: (_, siblingData) => siblingData?.type === "quiz",
                description:
                  'JSON array of {question, options[], correctIndex}',
              },
            },
          ],
        },
        {
          slug: "tipStep",
          fields: [
            {
              name: "type",
              type: "select",
              required: true,
              options: [
                { label: "Tip", value: "tip" },
                { label: "Warning", value: "warning" },
                { label: "Info", value: "info" },
              ],
            },
            { name: "content", type: "richText" },
          ],
        },
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
