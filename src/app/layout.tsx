import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'
import LayoutWrapper from '@/components/LayoutWrapper'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Aris Stiawan | DevOps Engineer & Fullstack Developer",
  description: "Portfolio of Aris Stiawan - Building scalable cloud infrastructure, automated CI/CD pipelines, and high-performance web applications.",
  keywords: ["DevOps Engineer", "Fullstack Developer", "Next.js", "Docker", "AWS", "CI/CD", "Portfolio"],
  authors: [{ name: "Aris Stiawan" }],
  openGraph: {
    title: "Aris Stiawan | DevOps Engineer & Fullstack Developer",
    description: "Building scalable cloud infrastructure, automated CI/CD pipelines, and high-performance web applications.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        <RefreshRedirect />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}