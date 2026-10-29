import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
import { requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Strictly guard ALL admin routes with requireAdmin
router.use(requireAdmin);

router.get("/overview", AdminController.getOverview);
router.get("/developers", AdminController.listAllDevelopers);
router.patch("/projects/:projectId/status", AdminController.toggleProjectStatus);
router.patch("/projects/:projectId/quota", AdminController.updateProjectQuota);

export default router;
