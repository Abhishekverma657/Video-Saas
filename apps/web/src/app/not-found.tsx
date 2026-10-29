import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center space-y-4">
      <h1 className="text-6xl font-black text-rose-500 font-mono">404</h1>
      <h2 className="text-xl font-bold text-white">Page Not Found</h2>
      <p className="text-sm text-gray-400 max-w-sm">
        The page or room you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-rose-500 text-white font-semibold text-sm hover:from-violet-500 hover:to-rose-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return Home</span>
      </Link>
    </div>
  );
}
