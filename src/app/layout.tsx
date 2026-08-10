import type { Metadata } from "next";
import { Rethink_Sans, Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/layout/ScrollToTop";
import StoreProvider from "@/lib/redux/StoreProvider";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Easy Lift and Clean — Home Services Made Easy",
  description:
    "Book trusted moving, cleaning, repair, and laundry services instantly. We manage your home so you don't have to.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rethinkSans.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <StoreProvider>
          <ScrollToTop />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
