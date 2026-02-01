import { z } from 'zod';
import { insertAlertSchema, insertRecruiterProfileSchema, alerts, recruiterProfiles } from './schema';

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
  alerts: {
    list: {
      method: 'GET' as const,
      path: '/api/alerts',
      responses: {
        200: z.array(z.custom<typeof alerts.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/alerts/:id',
      responses: {
        200: z.custom<typeof alerts.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/alerts',
      input: insertAlertSchema,
      responses: {
        201: z.custom<typeof alerts.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/alerts/:id',
      input: insertAlertSchema.partial(),
      responses: {
        200: z.custom<typeof alerts.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/alerts/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  recruiter: {
    get: {
      method: 'GET' as const,
      path: '/api/recruiter/profile',
      responses: {
        200: z.custom<typeof recruiterProfiles.$inferSelect>(),
        404: errorSchemas.notFound, // Or null if not set
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/recruiter/profile',
      input: insertRecruiterProfileSchema.partial(),
      responses: {
        200: z.custom<typeof recruiterProfiles.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
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
