import type { Metadata } from "next";
import { archivo, inter } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/components/i18n/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cria Frames — Estúdio de criação com IA",
  description: "Vídeo, motion e campanhas completas criadas com inteligência artificial.",
  icons: {
    icon: [{ url: "/cria-frames-logo-branca.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body
        suppressHydrationWarning
        className="bg-background text-foreground antialiased"
      >
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
