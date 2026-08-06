"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/servicos", label: "Serviços" },
  { href: "/#cases", label: "Cases" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3 md:px-6">
        <Link
          href="/"
          className="font-display text-lg font-black uppercase tracking-tight text-foreground"
        >
          Cria Frames
        </Link>

        {/* nav desktop */}
        <nav className="hidden items-center gap-8 md:flex">
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
        <Link
          href="/contato"
          className={cn(buttonVariants(), "hidden rounded-pill md:inline-flex")}
        >
          Falar com o estúdio
        </Link>

        {/* nav mobile — Sheet controlado manualmente, sem asChild/SheetClose */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Abrir menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors duration-fast hover:bg-accent md:hidden"
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
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
