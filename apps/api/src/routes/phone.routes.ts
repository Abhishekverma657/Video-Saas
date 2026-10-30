import { Router } from "express";
import {
  registerPhoneUser,
  loginPhoneUser,
  getPhoneUsers,
  initiatePhoneCall,
  checkIncomingCall,
  respondPhoneCall,
  getCallStatus,
  endPhoneCall,
} from "../controllers/phone.controller.js";

const router = Router();

// Authentication
router.post("/register", registerPhoneUser);
router.post("/login", loginPhoneUser);

// Directory & Contacts
router.get("/users", getPhoneUsers);

// Real-Time Call Signaling
router.post("/call/initiate", initiatePhoneCall);
router.get("/call/check-incoming", checkIncomingCall);
router.post("/call/respond", respondPhoneCall);
router.get("/call/status", getCallStatus);
router.post("/call/end", endPhoneCall);

export default router;
