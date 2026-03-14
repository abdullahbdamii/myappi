import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  documentId: integer("document_id").notNull(),
  pageNumber: integer("page_number").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({ id: true, uploadedAt: true });
export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({ id: true, createdAt: true });

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;

// ─── AI Aalim Chat ─────────────────────────────────────────────────────────────
export const aalimChats = pgTable("aalim_chats", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),          // "user" | "assistant"
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertAalimChatSchema = createInsertSchema(aalimChats).omit({ id: true, createdAt: true });
export type AalimChat = typeof aalimChats.$inferSelect;
export type InsertAalimChat = z.infer<typeof insertAalimChatSchema>;
