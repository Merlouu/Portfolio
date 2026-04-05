import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio | Business Analyst & Forecaster Supply Chain",
  description:
    "Portfolio professionnel pour accompagner un CV de Business Analyst et Forecaster Supply Chain, avec des projets qui mettent en avant analyse, pilotage et structuration de données.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
