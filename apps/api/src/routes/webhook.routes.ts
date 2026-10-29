import { Router } from "express";
import { WebhookController } from "../controllers/webhook.controller.js";

const router = Router();

// LiveKit Webhook Endpoint
router.post("/livekit", WebhookController.handleLiveKitWebhook);

export default router;
