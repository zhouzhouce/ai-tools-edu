import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order", "parent"],
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
    },
    {
      name: "icon",
      type: "text",
      admin: {
        description: "Lucide icon name (e.g., pen-tool, image, code, etc.)",
      },
    },
    {
      name: "color",
      type: "text",
      admin: {
        description: "Theme color hex (e.g., #6366f1)",
      },
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      admin: {
        description: "Parent category for sub-categories",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featuredTools",
      type: "relationship",
      relationTo: "tools",
      hasMany: true,
      admin: {
        description: "Curated featured tools for this category",
      },
    },
  ],
};
