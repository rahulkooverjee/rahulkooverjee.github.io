import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rahul Kooverjee",
  description: "Senior Product Manager at Google",
  openGraph: {
    title: "Rahul Kooverjee",
    description: "Senior Product Manager at Google",
    siteName: "Rahul Kooverjee",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} ${grotesk.variable} font-sans bg-[var(--bg-dark)] text-slate-50`}
      >
        <div className="mesh-bg" />
        {children}
      </body>
    </html>
  );
}