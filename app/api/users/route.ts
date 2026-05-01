import { db } from "@/lib/db";
import { usersTable } from "@/app/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.username) {
      return Response.json(
        { success: false, error: "Username required" },
        { status: 400 }
      );
    }

    const result = await db.insert(usersTable).values({
      username: body.username,
    });

    return Response.json({
      success: true,
      message: "User created",
      result,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, error: "Failed to create user" },
      { status: 500 }
    );
  }
}