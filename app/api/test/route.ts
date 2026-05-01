import { db } from "@/lib/db";
import { usersTable } from "@/app/db/schema";

export async function POST() {
  try {
    const result = await db.insert(usersTable).values({
      name: "Test User",
      age: 22,
      email: `test${Date.now()}@mail.com`,
    });

    return Response.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, error: "Insert failed" }, { status: 500 });
  }
}