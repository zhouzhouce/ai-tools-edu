import type { CollectionConfig } from "payload";

export const LearningPlans: CollectionConfig = {
  slug: "learning-plans",
  access: {
    read: ({ req: { user } }) => (user ? { user: { equals: user.id } } : false),
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => (user ? { user: { equals: user.id } } : false),
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      unique: true,
    },
    {
      name: "recommendedTools",
      type: "relationship",
      relationTo: "tools",
      hasMany: true,
    },
    {
      name: "recommendedTutorials",
      type: "relationship",
      relationTo: "tutorials",
      hasMany: true,
    },
    {
      name: "recommendedWorkflows",
      type: "relationship",
      relationTo: "workflows",
      hasMany: true,
    },
    {
      name: "weeklySchedule",
      type: "json",
      admin: { description: "Weekly learning schedule" },
    },
    {
      name: "progress",
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 100,
    },
    {
      name: "generatedAt",
      type: "date",
    },
  ],
};
