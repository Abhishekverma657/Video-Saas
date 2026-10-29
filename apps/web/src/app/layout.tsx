import type { Metadata } from "next";
import "@livekit/components-styles";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "AuraRTC Cloud | Ultra-Low Latency Video, Voice & Real-Time Streaming",
  description: "Enterprise WebRTC Real-Time Media Platform powered by LiveKit SFU, Node.js, and MongoDB Atlas. Sub-150ms global video calling, interactive broadcasting, and multi-party conferences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-slate-900 min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
