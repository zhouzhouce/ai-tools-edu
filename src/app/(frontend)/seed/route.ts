import { getPayload } from "payload";
import config from "@payload-config";
import { seed } from "@/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    await seed(payload);
    return Response.json({ success: true, message: "Database seeded successfully" });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error ? error.stack : undefined;
    console.error("Seed error:", error);
    return Response.json(
      { success: false, error: errMsg, stack: errStack },
      { status: 500 }
    );
  }
}
