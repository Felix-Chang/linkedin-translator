import type { Metadata } from "next";
import { Arvo } from "next/font/google";
import "./globals.css";

const arvo = Arvo({
  variable: "--font-arvo",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LinkedIn Translator",
  description:
    "Translate normal thoughts into elite professional nonsense. Or reverse the damage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${arvo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
