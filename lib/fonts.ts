import { Archivo, Inter } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  // 300 usado no subtítulo do hero (o "— FRAMES —" leve e espaçado da logo)
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});