import { Router } from "express";
import { RTCController } from "../controllers/rtc.controller.js";
import { requireApiKey } from "../middlewares/auth.middleware.js";

const router = Router();

// All RTC routes require API Key (appId + appSecret)
router.use(requireApiKey);

router.post("/token", RTCController.getToken);
router.get("/rooms", RTCController.getActiveRooms);
router.get("/analytics", RTCController.getAnalytics);

export default router;
