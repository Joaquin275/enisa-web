import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Optimización de imágenes para producción
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      // En producción Vercel ajusta esto automáticamente
      allowedOrigins: process.env.NEXTAUTH_URL
        ? [process.env.NEXTAUTH_URL.replace("https://", "").replace("http://", "")]
        : ["localhost:3000", "localhost:3001"],
    },
  },
  // Compresión automática
  compress: true,
  // Headers de seguridad y caché
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/videos/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
