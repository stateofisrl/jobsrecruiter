import { db } from "./db";
import {
  alerts,
  recruiterProfiles,
  type Alert,
  type InsertAlert,
  type RecruiterProfile,
  type InsertRecruiterProfile,
  type UpdateAlertRequest,
  type UpdateRecruiterProfileRequest
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Alerts
  getAlerts(userId: string): Promise<Alert[]>;
  getAlert(id: number): Promise<Alert | undefined>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  updateAlert(id: number, updates: UpdateAlertRequest): Promise<Alert>;
  deleteAlert(id: number): Promise<void>;

  // Recruiter Profile
  getRecruiterProfile(userId: string): Promise<RecruiterProfile | undefined>;
  upsertRecruiterProfile(userId: string, profile: InsertRecruiterProfile): Promise<RecruiterProfile>;

  // Newsletter
  subscribeToNewsletter(email: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Alerts
  async getAlerts(userId: string): Promise<Alert[]> {
    return await db.select().from(alerts).where(eq(alerts.userId, userId));
  }

  async getAlert(id: number): Promise<Alert | undefined> {
    const [alert] = await db.select().from(alerts).where(eq(alerts.id, id));
    return alert;
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const [newAlert] = await db.insert(alerts).values(alert).returning();
    return newAlert;
  }

  async updateAlert(id: number, updates: UpdateAlertRequest): Promise<Alert> {
    const [updatedAlert] = await db
      .update(alerts)
      .set(updates)
      .where(eq(alerts.id, id))
      .returning();
    return updatedAlert;
  }

  async deleteAlert(id: number): Promise<void> {
    await db.delete(alerts).where(eq(alerts.id, id));
  }

  // Recruiter Profile
  async getRecruiterProfile(userId: string): Promise<RecruiterProfile | undefined> {
    const [profile] = await db.select().from(recruiterProfiles).where(eq(recruiterProfiles.userId, userId));
    return profile;
  }

  async upsertRecruiterProfile(userId: string, profile: InsertRecruiterProfile): Promise<RecruiterProfile> {
    const [existing] = await db.select().from(recruiterProfiles).where(eq(recruiterProfiles.userId, userId));
    
    if (existing) {
      const [updated] = await db
        .update(recruiterProfiles)
        .set({ ...profile })
        .where(eq(recruiterProfiles.userId, userId))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(recruiterProfiles)
        .values({ ...profile, userId })
        .returning();
      return created;
    }
  }

  async subscribeToNewsletter(email: string): Promise<void> {
    await db.insert(newsletterSubscriptions).values({ email }).onConflictDoNothing();
  }
}

export const storage = new DatabaseStorage();
