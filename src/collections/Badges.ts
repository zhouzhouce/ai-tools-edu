import type { CollectionConfig } from "payload";

export const Badges: CollectionConfig = {
  slug: "badges",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "nameZh",
      type: "text",
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "descriptionZh",
      type: "text",
    },
    {
      name: "icon",
      type: "text",
      required: true,
      admin: { description: "Emoji or Lucide icon name" },
    },
    {
      name: "criteria",
      type: "json",
      required: true,
      admin: {
        description: 'e.g. { "type": "tutorial_count", "threshold": 1 }',
      },
    },
    {
      name: "rarity",
      type: "select",
      required: true,
      options: [
        { label: "Common", value: "common" },
        { label: "Rare", value: "rare" },
        { label: "Epic", value: "epic" },
        { label: "Legendary", value: "legendary" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
    },
  ],
};
