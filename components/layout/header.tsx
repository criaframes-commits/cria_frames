"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSelector } from "@/components/i18n/language-selector";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[var(--site-header-height)] border-b border-border bg-background">
      <div className="mx-auto flex h-full max-w-container items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          aria-label="Cria Frames — início"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/cria-frames-logo-branca.png"
            alt="Cria Frames"
            width={1018}
            height={796}
            priority
            sizes="(min-width: 768px) 102px, 82px"
            className="h-16 w-auto object-contain md:h-20"
          />
        </Link>

        {/* nav desktop */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-muted-foreground transition-colors duration-fast hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* estiliza o Link direto com as classes do Button, sem asChild */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <Link
            href="/contato"
            className={cn(buttonVariants(), "rounded-pill")}
          >
            Falar com o estúdio
          </Link>
          <LanguageSelector />
        </div>

        {/* nav mobile — Sheet controlado manualmente, sem asChild/SheetClose */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Abrir menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors duration-fast hover:bg-accent lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="overflow-y-auto border-white/10 bg-black-950 p-0 text-white sm:max-w-sm"
          >
            <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
            <div className="flex min-h-full flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(4.75rem,env(safe-area-inset-top))]">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                Menu
              </p>
              <nav aria-label="Navegação principal" className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-white/10 py-3.5 font-display text-[clamp(1.55rem,8vw,2rem)] font-black uppercase leading-none tracking-[-0.03em] text-white transition-[color,padding] duration-300 first:border-t hover:pl-2 hover:text-blue-300 focus-visible:pl-2 focus-visible:text-blue-300 focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-3 border-t border-white/10 pt-6">
                <Link
                  href="/contato"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "min-h-12 w-full rounded-pill text-sm"
                  )}
                >
                  Falar com o estúdio
                </Link>
                <LanguageSelector mobile />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
