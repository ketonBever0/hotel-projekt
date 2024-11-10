import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";
import Providers from "./providers";

const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hilton Hotel"
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
        <Providers>
          <div data-theme="mytheme_one">
            <NavBar />
            <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-300 flex justify-center items-center z-10">
              <div className="mt-24">
              {children}
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
