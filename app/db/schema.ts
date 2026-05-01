// db/schema.ts
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),

  username: text("username").notNull().unique(), // /dwai
});

export const linksTable = sqliteTable("links", {
  id: integer("id").primaryKey(),

  title: text("title").notNull(),
  url: text("url").notNull(),

  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  order: integer("order").default(0), // optional but useful
});