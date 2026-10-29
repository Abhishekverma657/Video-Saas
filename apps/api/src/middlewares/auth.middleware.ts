import { Request, Response, NextFunction } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt.js";
import { Project, IProject } from "../models/Project.js";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
      project?: IProject;
    }
  }
}

/**
 * Middleware for Dashboard/Developer User JWT Authentication
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Unauthorized. Bearer token missing." });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token." });
    return;
  }
};

/**
 * Middleware for SaaS Super Administrator Authorization
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({
        success: false,
        message: "Forbidden. Access restricted to Platform Super Administrators only.",
      });
      return;
    }
    next();
  });
};

/**
 * Middleware for 3rd-Party SDK & API calls using AppId & AppSecret
 */
export const requireApiKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const appId = (req.headers["x-app-id"] as string) || (req.query.appId as string) || req.body.appId;
  const appSecret = (req.headers["x-app-secret"] as string) || (req.query.appSecret as string) || req.body.appSecret;

  if (!appId || !appSecret) {
    res.status(401).json({
      success: false,
      message: "Authentication required. Please provide 'x-app-id' and 'x-app-secret' headers.",
    });
    return;
  }

  try {
    const project = await Project.findOne({ appId, appSecret });
    if (!project) {
      res.status(401).json({ success: false, message: "Invalid AppId or AppSecret." });
      return;
    }

    if (project.status !== "active") {
      res.status(403).json({ success: false, message: "This project has been suspended." });
      return;
    }

    // Check if free quota or balance is exhausted
    if (project.totalMinutesUsed >= project.freeQuotaMinutes) {
      res.status(402).json({
        success: false,
        message: "Payment Required. Minute quota exhausted. Please upgrade your plan.",
      });
      return;
    }

    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error during auth verification." });
    return;
  }
};
