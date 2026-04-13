import type { CollectionConfig } from "payload";

export const UserBadges: CollectionConfig = {
  slug: "user-badges",
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
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
      name: "badge",
      type: "relationship",
      relationTo: "badges",
      required: true,
    },
    {
      name: "earnedAt",
      type: "date",
      required: true,
    },
  ],
};
