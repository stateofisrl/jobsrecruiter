import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // Protected Routes Middleware
  // We can apply it to specific routes or groups
  
  // Alerts
  app.get(api.alerts.list.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const alerts = await storage.getAlerts(userId);
    res.json(alerts);
  });

  app.get(api.alerts.get.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const alertId = Number(req.params.id);
    const alert = await storage.getAlert(alertId);
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    if (alert.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(alert);
  });

  app.post(api.alerts.create.path, isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      // Ensure userId in body matches authenticated user or inject it
      const input = api.alerts.create.input.parse({ ...req.body, userId });
      const alert = await storage.createAlert(input);
      res.status(201).json(alert);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.alerts.update.path, isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const alertId = Number(req.params.id);
      
      const existingAlert = await storage.getAlert(alertId);
      if (!existingAlert) {
        return res.status(404).json({ message: 'Alert not found' });
      }
      if (existingAlert.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      const input = api.alerts.update.input.parse(req.body);
      const updatedAlert = await storage.updateAlert(alertId, input);
      res.json(updatedAlert);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.alerts.delete.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const alertId = Number(req.params.id);

    const existingAlert = await storage.getAlert(alertId);
    if (!existingAlert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    if (existingAlert.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await storage.deleteAlert(alertId);
    res.status(204).send();
  });

  // Recruiter Profile
  app.get(api.recruiter.get.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const profile = await storage.getRecruiterProfile(userId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  });

  app.put(api.recruiter.update.path, isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const input = api.recruiter.update.input.parse(req.body);
      // We need to cast input to InsertRecruiterProfile because upsert expects full object or partial?
      // Our upsert logic handles it, but the type might be strict.
      // Actually, upsertRecruiterProfile expects InsertRecruiterProfile. 
      // If we are doing partial update, we might need to fetch first or adjust storage.
      // But for simplicty let's assume the user sends what's needed or we merge.
      // In storage.ts, upsertRecruiterProfile takes InsertRecruiterProfile.
      // Let's change the route to merge with existing or just pass it if it's enough.
      // Ideally, the frontend sends the full form data or we handle partials better.
      // For now, let's assume the user provides required fields if creating, or we construct it.
      
      // Better approach for upsert with partial input:
      // If it exists, update. If not, we need all required fields.
      // But RecruiterProfile only has companyName as required (besides userId).
      // So if creating, companyName is needed.
      
      if (!input.companyName) {
        // If companyName is missing, check if profile exists
        const existing = await storage.getRecruiterProfile(userId);
        if (!existing) {
           return res.status(400).json({ message: "Company name is required for new profile" });
        }
      }

      // We can use a type assertion or helper to satisfy the type, knowing that storage handles it
      // But let's be safe.
      const profileData: any = { ...input };
      const profile = await storage.upsertRecruiterProfile(userId, profileData);
      res.json(profile);

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
