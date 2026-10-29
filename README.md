# Video-Saas

Real-time video conferencing & WebRTC cloud platform with developer console, SDKs, and automated room management.

## 🚀 Features

- **Ultra-Low Latency Video Calls** powered by LiveKit SFU.
- **Developer Console** for creating projects, App IDs, and App Secrets.
- **Multi-Platform SDKs** (React, Next.js, Flutter, Node.js).
- **Secure Token Minting** with dynamic room joining and leave webhooks.

## 📁 Repository Structure

- `apps/api`: Backend Express & TypeScript API Gateway (`port 5001`)
- `apps/web`: Frontend Next.js 15 Web Application & Developer Console (`port 3001`)
- `packages/sdk`: Client SDK for custom integrations

## 🛠️ Quick Start

```bash
# 1. Install all dependencies
npm install

# 2. Start Backend API
npm run dev:api

# 3. Start Frontend Web
npm run dev:web
```

Open [http://localhost:3001](http://localhost:3001) to view the web application.

## 📄 License

MIT
