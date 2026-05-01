import { db } from "@/lib/db";
import { usersTable } from "@/app/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await db.insert(usersTable).values({
      name: body.name,
      age: body.age,
      email: body.email ?? `test${Date.now()}@mail.com`,
    });

    return Response.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, error: "Insert failed" },
      { status: 500 }
    );
  }
}