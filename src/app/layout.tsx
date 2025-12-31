import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/core/providers/app-provider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Overgive Distributor – Donation Delivery Dashboard",
  description:
    "Overgive Distributor is the operational dashboard for distributors managing the delivery of donations on the Overgive platform, ensuring transparency and accurate reporting.",

  applicationName: "Overgive Distributor",
  creator: "Muhammad Rafli Silehu",
  publisher: "Overlogic",

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Overgive Distributor – Donation Delivery Dashboard",
    description:
      "Dashboard for managing and tracking donation deliveries, providing distributors with clear operational insights.",
    url: "https://overgive-web-distributor.vercel.app",
    siteName: "Overgive Distributor",
    images: [
      {
        url: "/images/overgive-logo-bg-white.png",
        width: 1200,
        height: 630,
        alt: "Overgive Distributor Dashboard",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
