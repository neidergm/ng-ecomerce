import type { Metadata } from "next";
import { geistMono, geistSans } from "../config/fonts";
import "./globals.css";
import { UserSessionProvider, PaypalProvider } from "@/providers";

export const metadata: Metadata = {
  title: {
    template: "%s | NG Ecommerce",
    default: "Home - NG Ecommerce",
  },
  description: "Online store for the modern generation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserSessionProvider>
          <PaypalProvider>
            {children}
          </PaypalProvider>
        </UserSessionProvider>
      </body>
    </html>
  );
}
