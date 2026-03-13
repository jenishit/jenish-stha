"use client";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";
import SoundToggle from "@/components/ui/SoundToggle";
import LenisProvider from "@/components/ui/LenisProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap" rel="stylesheet" />
        <title>Jenish Shrestha — Engineer & Inventor</title>
        <meta name="description" content="Portfolio of Jenish Shrestha — Embedded Systems Engineer, Robotics Builder, Software Developer from Nepal." />
      </head>
      <body>
        <LenisProvider>
          <CustomCursor />
          <PageTransition />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <SoundToggle />
        </LenisProvider>
      </body>
    </html>
  );
}
