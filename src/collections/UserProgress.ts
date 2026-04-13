import type { CollectionConfig } from "payload";

export const UserProgress: CollectionConfig = {
  slug: "user-progress",
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
      index: true,
    },
    {
      name: "tutorial",
      type: "relationship",
      relationTo: "tutorials",
      required: true,
      index: true,
    },
    {
      name: "currentStep",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "completedSteps",
      type: "json",
      defaultValue: [],
    },
    {
      name: "startedAt",
      type: "date",
      required: true,
    },
    {
      name: "completedAt",
      type: "date",
    },
    {
      name: "timeSpent",
      type: "number",
      defaultValue: 0,
      admin: { description: "Time spent in seconds" },
    },
  ],
};
