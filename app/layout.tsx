import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/shared/components";
import { Footer } from "@/shared/components/footer";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Booksaw | Premium Books Shop Management",
    template: "%s | Booksaw"
  },
  description: "A premium, modern books shop management platform. Browse, manage, and discover your next favorite read with ease.",
  keywords: ["books", "shop", "management", "reading", "library", "ecommerce"],
  authors: [{ name: "Booksaw Team" }],
  creator: "Booksaw Team",
  publisher: "Booksaw",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://booksaw.example.com",
    title: "Booksaw | Premium Books Shop Management",
    description: "Manage your books shop with a premium, modern interface.",
    siteName: "Booksaw",
  },
  twitter: {
    card: "summary_large_image",
    title: "Booksaw | Premium Books Shop Management",
    description: "Manage your books shop with a premium, modern interface.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-[#FAF9F9]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
