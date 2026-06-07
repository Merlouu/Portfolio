import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merlin Debrais | Business Analyst, Supply Chain & Data",
  description:
    "Portfolio de Merlin Debrais : business analysis, supply chain, forecasting, data et automatisation.",
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
