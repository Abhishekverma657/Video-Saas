# Video-Saas (AuraRTC Cloud)

Enterprise Ultra-Low Latency Real-Time Video, Voice & Live Streaming Cloud Platform. Powered by **LiveKit SFU Engine**, **Node.js Express (TypeScript)**, **MongoDB Atlas**, and **Next.js 15 App Router**.

---

## 🏗️ Monorepo Architecture

This repository is organized as a clean, modular monorepo:

```text
Video-Saas/
├── apps/
│   ├── api/                   # Backend API Gateway & SaaS Metering Engine (Node.js + TS)
│   │   ├── src/
│   │   │   ├── config/        # MongoDB Atlas & LiveKit Cloud configuration
│   │   │   ├── controllers/   # Auth, Projects, RTC Token, Admin, Webhook Metering
│   │   │   ├── middlewares/   # JWT, API Key (appId/appSecret), and requireAdmin RBAC
│   │   │   ├── models/        # User, Project, RoomSession, ParticipantLog (Mongoose)
│   │   │   ├── services/      # LiveKit Server SDK integration
│   │   │   ├── utils/         # Scrypt hashing, JWT signer, Super Admin seeder
│   │   │   └── server.ts      # Express Gateway (Port 5001)
│   │   ├── .env.example       # Production environment variables template
│   │   └── package.json
│   │
│   └── web/                   # Frontend Web Application (Next.js 15 + Tailwind CSS)
│       ├── public/
│       │   └── sample-app.html# Standalone SDK Test Client (Zero dependencies)
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx          # Clean Light Landing Page with 3D Video Showcase
│       │   │   ├── login/page.tsx    # Developer Sign In
│       │   │   ├── register/page.tsx # Developer Sign Up & Auto-Tenant Provisioning
│       │   │   ├── dashboard/page.tsx# Protected Developer Console & SDK Live Diagnostics
│       │   │   ├── admin/            # Isolated Super Admin Console & Login (/admin/login)
│       │   │   ├── docs/page.tsx     # Full SDK Documentation Hub (Flutter, React, Node)
│       │   │   └── room/[roomId]/    # LiveKit WebRTC Video Room Component
│       │   ├── components/    # 3D Showcase, HowItWorks, Architecture, Navbar
│       │   └── context/       # AuthContext (JWT Developer & Super Admin sessions)
│       └── package.json
│
├── packages/
│   └── sdk/                   # @omnirtc/sdk - Reusable Client SDK for Web & React
└── package.json               # Root workspace script runner
```

---

## 🚀 Quickstart: Running Locally

### 1. Prerequisites
- Node.js v20+ or v22+
- MongoDB Atlas cluster URI
- LiveKit Cloud credentials (or local LiveKit server)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
In `apps/api/.env`:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
JWT_SECRET=super_secret_jwt_key
CORS_ORIGIN=*
```

### 4. Run Both API and Web Apps Concurrently
```bash
# Terminal 1: Run Backend API (Port 5001)
npm run dev:api

# Terminal 2: Run Frontend Web (Port 3001)
npm run dev:web
```

---

## 🌐 100% Free Cloud Deployment Guide (Zero Credit Card Required)

### Step 1: Deploy Backend API on Render.com
1. Go to [render.com](https://render.com) and log in with your GitHub account (No credit card required).
2. Click **"New"** ➔ **"Web Service"**.
3. Connect your GitHub repository: `https://github.com/Abhishekverma657/Video-Saas`.
4. Configure service settings:
   - **Name:** `videosaas-api`
   - **Region:** Singapore / Frankfurt / Oregon (nearest to you)
   - **Root Directory:** `apps/api`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `PORT`: `5001`
   - `MONGODB_URI`: `your_mongodb_atlas_uri`
   - `LIVEKIT_URL`: `wss://your-project.livekit.cloud`
   - `LIVEKIT_API_KEY`: `your_livekit_api_key`
   - `LIVEKIT_API_SECRET`: `your_livekit_api_secret`
   - `JWT_SECRET`: `your_random_jwt_secret`
   - `CORS_ORIGIN`: `*`
6. Click **"Create Web Service"**. Render will deploy your API and provide a live URL (e.g. `https://videosaas-api.onrender.com`).

---

### Step 2: Deploy Frontend Web App on Vercel
1. Go to [vercel.com](https://vercel.com) and log in with GitHub (No credit card required).
2. Click **"Add New..."** ➔ **"Project"** ➔ Import `Video-Saas`.
3. In project setup:
   - **Framework Preset:** Next.js
   - **Root Directory:** Edit and select `apps/web`
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: `https://videosaas-api.onrender.com/api/v1`
5. Click **"Deploy"**. Vercel will build and deploy your app in under 2 minutes with free SSL and a custom domain.

---

## 🛡️ Super Admin Control Center
AuraRTC features a completely isolated Super Admin Console guarded by `requireAdmin` RBAC middleware:
- **Admin Login:** `/admin/login`
- **Admin Dashboard:** `/admin`
- Default seeded administrator: `admin@aurartc.io` / `Admin@AuraRTC2026!`
- Global telemetry: track active tenants, global minutes, LiveKit SFU node health, and 1-click project suspend/bonus minutes.
