/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { Lato } from "next/font/google";

import "../styles/globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Slackzz",
  description: "Tempat Ngobrol Asik - Slack Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
