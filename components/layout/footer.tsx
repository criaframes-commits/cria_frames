import Link from "next/link";

const FOOTER_LINKS: Record<string, { href: string; label: string }[]> = {
  Estúdio: [
    { href: "/sobre", label: "Sobre" },
    { href: "/servicos", label: "Serviços" },
    { href: "/#cases", label: "Cases" },
  ],
  Contato: [
    { href: "/contato", label: "Fale conosco" },
    { href: "mailto:oi@criaframes.com", label: "oi@criaframes.com" },
  ],
  Social: [
    { href: "https://instagram.com", label: "Instagram" },
    { href: "https://linkedin.com", label: "LinkedIn" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-container gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
        <div>
          <span className="font-display text-lg font-black uppercase text-foreground">
            Cria Frames
          </span>
          <p className="mt-3 max-w-[28ch] text-sm text-muted-foreground">
            Estúdio de criação com IA: vídeo, motion e campanhas completas.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h3 className="font-body text-sm font-semibold text-foreground">
              {title}
            </h3>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors duration-fast hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground md:px-6">
        © {new Date().getFullYear()} Cria Frames. Todos os direitos reservados.
      </div>
    </footer>
  );
}
