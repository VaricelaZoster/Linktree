import { db } from "@/lib/db";
import { usersTable, linksTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    // ✅ unwrap params
    const { username } = await context.params;

    if (!username) {
      return Response.json(
        { success: false, error: "Username missing in URL" },
        { status: 400 }
      );
    }

    // 🔍 find user
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

    // 🔗 get links
    const links = await db
      .select()
      .from(linksTable)
      .where(eq(linksTable.userId, user[0].id));

    return Response.json({
      success: true,
      username,
      links,
    });
  } catch (err: any) {
    console.error(err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}