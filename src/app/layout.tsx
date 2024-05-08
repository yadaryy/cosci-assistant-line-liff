import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import  Navbar from "./navbar";
import { initLIFF } from '@/libs/liff';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cosci Assiatant ข่าวสาร",
  description: "ข่าวสาร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  initLIFF();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
