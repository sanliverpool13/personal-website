import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/general/footer";
import PageLayout from "@/components/pagelayout";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sanjar Jelet | Software Engineer",
  description: "A website to showcase my design and coding skills, and blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <PageLayout>{children}</PageLayout>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
