import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GhostCam — 네 옆에 귀신이 있다",
  description: "AI 기술로 당신의 사진 속 옆에 있는 존재를 보여드립니다.",
  openGraph: {
    title: "GhostCam — 네 옆에 귀신이 있다",
    description: "AI 기술로 당신의 사진 속 옆에 있는 존재를 보여드립니다.",
    images: ["/assets/ghost-selfie-hero.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
