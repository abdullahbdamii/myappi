import { z } from 'zod';
import { insertDocumentSchema, insertBookmarkSchema, documents, bookmarks } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  documents: {
    list: {
      method: 'GET' as const,
      path: '/api/documents' as const,
      responses: {
        200: z.array(z.custom<typeof documents.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/documents/:id' as const,
      responses: {
        200: z.custom<typeof documents.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    upload: {
      method: 'POST' as const,
      path: '/api/documents/upload' as const,
      // Input is FormData, so we don't define a strict JSON input schema here
      responses: {
        201: z.custom<typeof documents.$inferSelect>(),
        400: errorSchemas.validation,
      },
    }
  },
  bookmarks: {
    list: {
      method: 'GET' as const,
      path: '/api/documents/:documentId/bookmarks' as const,
      responses: {
        200: z.array(z.custom<typeof bookmarks.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/documents/:documentId/bookmarks' as const,
      input: insertBookmarkSchema.omit({ documentId: true }),
      responses: {
        201: z.custom<typeof bookmarks.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/bookmarks/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
