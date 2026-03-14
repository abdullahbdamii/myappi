import { db } from "./db";
import { documents, bookmarks, type Document, type InsertDocument, type Bookmark, type InsertBookmark } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getDocuments(): Promise<Document[]>;
  getDocument(id: number): Promise<Document | undefined>;
  createDocument(doc: InsertDocument): Promise<Document>;
  
  getBookmarks(documentId: number): Promise<Bookmark[]>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getDocuments(): Promise<Document[]> {
    return await db.select().from(documents);
  }

  async getDocument(id: number): Promise<Document | undefined> {
    const [doc] = await db.select().from(documents).where(eq(documents.id, id));
    return doc;
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const [doc] = await db.insert(documents).values(insertDocument).returning();
    return doc;
  }

  async getBookmarks(documentId: number): Promise<Bookmark[]> {
    return await db.select().from(bookmarks).where(eq(bookmarks.documentId, documentId));
  }

  async createBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const [bookmark] = await db.insert(bookmarks).values(insertBookmark).returning();
    return bookmark;
  }

  async deleteBookmark(id: number): Promise<void> {
    await db.delete(bookmarks).where(eq(bookmarks.id, id));
  }
}

export const storage = new DatabaseStorage();
