import type { Metadata } from "next";
import SmallScreenGate from "@/components/SmallScreenGate";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bordeaux",
  description: "Estudio de arquitectura e interiorismo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        {children}
        <SmallScreenGate />
      </body>
    </html>
  );
}
