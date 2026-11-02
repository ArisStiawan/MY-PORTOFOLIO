import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: ["192.168.56.1", "localhost:3000", "127.0.0.1:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Serve modern formats first — cuts image payload ~40-60%
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Strip console.* in production (smaller bundle, faster parse)
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  // Aggressively tree-shake barrel-file packages.
  // Without this, importing one icon from a barrel pulls the whole index.
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "three",
      "@react-three/fiber",
      "sweetalert2",
    ],
  },
};

export default nextConfig;
