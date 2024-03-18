import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/navbar";
import Footer from "@/components/general/footer";
import PageLayout from "@/components/pagelayout";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sanjar Potfolio",
  description:
    "A personal portfolio website designed and built by Sanjar Jelet",
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
