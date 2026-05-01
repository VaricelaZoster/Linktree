import { db } from "@/lib/db";
import { usersTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return Response.json(
      { available: false, error: "Username required" },
      { status: 400 }
    );
  }

  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);

  return Response.json({
    available: existing.length === 0,
  });
}