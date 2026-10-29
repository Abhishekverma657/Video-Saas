import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/", ProjectController.createProject);
router.get("/", ProjectController.listProjects);
router.get("/:projectId", ProjectController.getProject);
router.post("/:projectId/regenerate-secret", ProjectController.regenerateSecret);

export default router;
