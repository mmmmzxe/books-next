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
  title: "Books Shop Management",
  description: "Manage your books shop with ease",
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
