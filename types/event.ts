import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  date: z.string().or(z.date()),
  startTime: z.string(),
  endTime: z.string().optional(),
  location: z.string().min(1, { message: "Location is required" }),
  ticketUrl: z.string().url().optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
  isPublished: z.boolean().default(false),
  price: z.string().optional(),
  performerName: z.string().optional(),
  performerDescription: z.string().optional(),
  socialShareEnabled: z.boolean().default(false),
  createdAt: z.string().or(z.date()).optional(),
  updatedAt: z.string().or(z.date()).optional(),
  slug: z.string(),
})

export type Event = z.infer<typeof eventSchema>

export const eventCreateSchema = eventSchema.omit({ 
  id: true, 
  isPublished: true,
  createdAt: true,
  updatedAt: true,
  slug: true
}).extend({
  isPublished: z.boolean().default(false),
  date: z.string(),
  slug: z.string().optional(),
})

export type EventCreate = z.infer<typeof eventCreateSchema>

export const eventUpdateSchema = eventCreateSchema.partial()

export type EventUpdate = z.infer<typeof eventUpdateSchema> 