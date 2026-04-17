import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Provider } from "@/components/shared";
import { ToastProvider } from "@heroui/react";

const poppins = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
}); 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-foreground ">
        <Provider>
          <ToastProvider />
            {children} 
        </Provider>
      </body>
    </html>
  );
}