import { Request, Response } from "express";
import { PhoneUser } from "../models/PhoneUser.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { LiveKitService } from "../services/livekit.service.js";
import { ENV } from "../config/env.js";

// Normalize phone: removes spaces, brackets, hyphens
const normalizePhone = (phone: string): string => {
  return phone.replace(/[\s\-\(\)]/g, "").trim();
};

export const registerPhoneUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, name, password } = req.body;

    if (!phone || !name || !password) {
      res.status(400).json({ success: false, message: "Phone, name, and password are required." });
      return;
    }

    const cleanPhone = normalizePhone(phone);
    if (cleanPhone.length < 5) {
      res.status(400).json({ success: false, message: "Please provide a valid phone number." });
      return;
    }

    const existing = await PhoneUser.findOne({ phone: cleanPhone });
    if (existing) {
      res.status(409).json({ success: false, message: "An account with this phone number already exists. Please log in." });
      return;
    }

    const passwordHash = hashPassword(password);

    // Random avatar assignment for rich UI
    const avatars = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80",
    ];
    const avatarUrl = avatars[Math.floor(Math.random() * avatars.length)];

    const user = await PhoneUser.create({
      phone: cleanPhone,
      name: name.trim(),
      passwordHash,
      avatarUrl,
      isOnline: true,
      lastActive: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Phone user registered successfully!",
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error: any) {
    console.error("registerPhoneUser error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

export const loginPhoneUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      res.status(400).json({ success: false, message: "Phone and password are required." });
      return;
    }

    const cleanPhone = normalizePhone(phone);
    const user = await PhoneUser.findOne({ phone: cleanPhone });

    if (!user) {
      res.status(404).json({ success: false, message: "No account found with this phone number. Please register." });
      return;
    }

    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      res.status(401).json({ success: false, message: "Incorrect password." });
      return;
    }

    user.isOnline = true;
    user.lastActive = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error: any) {
    console.error("loginPhoneUser error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

export const getPhoneUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const myPhone = req.query.myPhone ? normalizePhone(req.query.myPhone as string) : "";

    const query: any = {};
    if (myPhone) {
      query.phone = { $ne: myPhone };
    }

    const users = await PhoneUser.find(query)
      .select("phone name avatarUrl isOnline lastActive")
      .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error: any) {
    console.error("getPhoneUsers error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

export const initiatePhoneCall = async (req: Request, res: Response): Promise<void> => {
  try {
    const { callerPhone, calleePhone } = req.body;

    if (!callerPhone || !calleePhone) {
      res.status(400).json({ success: false, message: "Caller and Callee phone numbers are required." });
      return;
    }

    const cleanCaller = normalizePhone(callerPhone);
    const cleanCallee = normalizePhone(calleePhone);

    const caller = await PhoneUser.findOne({ phone: cleanCaller });
    const callee = await PhoneUser.findOne({ phone: cleanCallee });

    if (!caller || !callee) {
      res.status(404).json({ success: false, message: "Caller or callee phone number not registered." });
      return;
    }

    // Create unique deterministic room name for this call session
    const timestamp = Date.now();
    const roomId = `call_${cleanCaller}_${cleanCallee}_${timestamp}`;

    // Generate token for Caller
    const callerToken = await LiveKitService.createToken({
      roomName: roomId,
      identity: `user_${cleanCaller}`,
      name: caller.name,
    });

    // Generate token for Callee
    const calleeToken = await LiveKitService.createToken({
      roomName: roomId,
      identity: `user_${cleanCallee}`,
      name: callee.name,
    });

    // Save active incoming call on Callee's record so their device will ring!
    callee.incomingCall = {
      callerPhone: caller.phone,
      callerName: caller.name,
      roomId,
      serverUrl: ENV.LIVEKIT_URL,
      token: calleeToken,
      status: "ringing",
      createdAt: new Date(),
    };
    await callee.save();

    res.status(200).json({
      success: true,
      roomId,
      serverUrl: ENV.LIVEKIT_URL,
      token: callerToken,
      callee: {
        phone: callee.phone,
        name: callee.name,
        avatarUrl: callee.avatarUrl,
      },
    });
  } catch (error: any) {
    console.error("initiatePhoneCall error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

export const checkIncomingCall = async (req: Request, res: Response): Promise<void> => {
  try {
    const phone = req.query.phone ? normalizePhone(req.query.phone as string) : "";
    if (!phone) {
      res.status(400).json({ success: false, message: "Phone query parameter is required." });
      return;
    }

    const user = await PhoneUser.findOne({ phone });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    // Auto-timeout calls older than 45 seconds
    if (user.incomingCall) {
      const ageMs = Date.now() - new Date(user.incomingCall.createdAt).getTime();
      if (ageMs > 45000 && user.incomingCall.status === "ringing") {
        user.incomingCall = undefined;
        await user.save();
        res.status(200).json({ success: true, incomingCall: null });
        return;
      }
    }

    res.status(200).json({
      success: true,
      incomingCall: user.incomingCall || null,
    });
  } catch (error: any) {
    console.error("checkIncomingCall error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

export const respondPhoneCall = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, roomId, action } = req.body; // action: 'accept' | 'decline'

    if (!phone || !roomId || !action) {
      res.status(400).json({ success: false, message: "Phone, roomId, and action are required." });
      return;
    }

    const cleanPhone = normalizePhone(phone);
    const user = await PhoneUser.findOne({ phone: cleanPhone });

    if (!user || !user.incomingCall || user.incomingCall.roomId !== roomId) {
      res.status(404).json({ success: false, message: "Active call session not found for this room." });
      return;
    }

    if (action === "accept") {
      user.incomingCall.status = "connected";
      await user.save();
      res.status(200).json({ success: true, status: "connected", token: user.incomingCall.token, serverUrl: user.incomingCall.serverUrl });
    } else {
      user.incomingCall.status = "declined";
      await user.save();
      res.status(200).json({ success: true, status: "declined" });
    }
  } catch (error: any) {
    console.error("respondPhoneCall error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

export const getCallStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, calleePhone } = req.query;

    if (!roomId || !calleePhone) {
      res.status(400).json({ success: false, message: "roomId and calleePhone required." });
      return;
    }

    const cleanCallee = normalizePhone(calleePhone as string);
    const callee = await PhoneUser.findOne({ phone: cleanCallee });

    if (!callee || !callee.incomingCall || callee.incomingCall.roomId !== roomId) {
      res.status(200).json({ success: true, status: "ended" });
      return;
    }

    res.status(200).json({
      success: true,
      status: callee.incomingCall.status,
    });
  } catch (error: any) {
    console.error("getCallStatus error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};

export const endPhoneCall = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, phone } = req.body;

    if (phone) {
      const cleanPhone = normalizePhone(phone);
      await PhoneUser.updateOne({ phone: cleanPhone }, { $unset: { incomingCall: 1 } });
    } else if (roomId) {
      await PhoneUser.updateMany({ "incomingCall.roomId": roomId }, { $unset: { incomingCall: 1 } });
    }

    res.status(200).json({ success: true, message: "Call ended successfully." });
  } catch (error: any) {
    console.error("endPhoneCall error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};
