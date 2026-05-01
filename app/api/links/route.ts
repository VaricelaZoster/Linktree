import { db } from "@/lib/db";
import { usersTable, linksTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, url, username } = body;

    if (!title || !url || !username) {
      return Response.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // 🔑 find user by username
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    if (user.length === 0) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // insert link using user.id
    const result = await db.insert(linksTable).values({
      title,
      url,
      userId: user[0].id,
    });

    return Response.json({
      success: true,
      message: "Link added",
      result,
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, error: "Insert failed" },
      { status: 500 }
    );
  }
}