"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
          <SheetContent side="right" className="border-border bg-background">
            <nav className="mt-10 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl uppercase text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contato"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants(), "mt-4 rounded-pill")}
              >
                Falar com o estúdio
              </Link>
              <LanguageSelector mobile />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
