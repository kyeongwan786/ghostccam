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
  title: "Ghostcam — 네 옆에 귀신이 있다",
  description: "당신의 사진 속에 보이지 않던 존재를 보여드립니다.",
  openGraph: {
    title: "Ghostcam — 네 옆에 귀신이 있다",
    description: "당신의 사진 속에 보이지 않던 존재를 보여드립니다.",
    images: ["/assets/ghost-selfie-hero.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
