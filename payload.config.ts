import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Categories } from "./src/collections/Categories";
import { Tools } from "./src/collections/Tools";
import { Tutorials } from "./src/collections/Tutorials";
import { Workflows } from "./src/collections/Workflows";
import { UserProgress } from "./src/collections/UserProgress";
import { LearningPlans } from "./src/collections/LearningPlans";
import { Badges } from "./src/collections/Badges";
import { UserBadges } from "./src/collections/UserBadges";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | AI Tools Edu",
    },
  },
  collections: [Users, Media, Categories, Tools, Tutorials, Workflows, UserProgress, LearningPlans, Badges, UserBadges],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "default-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "file:./data/payload.db",
    },
  }),
  sharp,
});
