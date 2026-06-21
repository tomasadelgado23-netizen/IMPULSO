import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Impulso — Marketing con Inteligencia",
  description:
    "Marketing potenciado por IA para pymes. Estrategia, campañas, CRM y métricas en una sola plataforma.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jakarta.variable}`}>
      <body
        className="antialiased"
        style={{
          fontFamily:
            "var(--font-jakarta), 'Plus Jakarta Sans', system-ui, sans-serif",
          background: "#000000",
        }}
      >
        {children}
      </body>
    </html>
  );
}
