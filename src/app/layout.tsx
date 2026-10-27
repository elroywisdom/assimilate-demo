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
  title: "Coza Buddy — Church Assimilation Platform",
  description: "End-to-end digital assimilation platform for COZA Global",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-mode="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-kumo-canvas text-kumo-default min-h-full flex flex-col">
        {/* App root stacking isolation for Kumo popups, tooltips, and dialogs */}
        <div className="isolate min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
