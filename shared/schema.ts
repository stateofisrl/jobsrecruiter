import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth";
import { relations } from "drizzle-orm";

export * from "./models/auth";

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  keywords: text("keywords").notNull(),
  location: text("location"),
  frequency: text("frequency").default("daily").notNull(), // daily, weekly, instant
  isActive: boolean("is_active").default(true).notNull(),
  lastSentAt: timestamp("last_sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const recruiterProfiles = pgTable("recruiter_profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id).unique(),
  companyName: text("company_name").notNull(),
  industry: text("industry"),
  websiteUrl: text("website_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  alerts: many(alerts),
  recruiterProfile: one(recruiterProfiles, {
    fields: [users.id],
    references: [recruiterProfiles.userId],
  }),
}));

export const alertsRelations = relations(alerts, ({ one }) => ({
  user: one(users, {
    fields: [alerts.userId],
    references: [users.id],
  }),
}));

export const recruiterProfilesRelations = relations(recruiterProfiles, ({ one }) => ({
  user: one(users, {
    fields: [recruiterProfiles.userId],
    references: [users.id],
  }),
}));

// Schemas
export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  userId: true,
  lastSentAt: true,
  createdAt: true,
});

export const insertRecruiterProfileSchema = createInsertSchema(recruiterProfiles).omit({
  id: true,
  userId: true,
  createdAt: true,
});

// Types
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type RecruiterProfile = typeof recruiterProfiles.$inferSelect;
export type InsertRecruiterProfile = z.infer<typeof insertRecruiterProfileSchema>;

// API Types
export type CreateAlertRequest = InsertAlert;
export type UpdateAlertRequest = Partial<InsertAlert>;
export type UpdateRecruiterProfileRequest = Partial<InsertRecruiterProfile>;
