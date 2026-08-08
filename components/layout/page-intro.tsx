import { cn } from "@/lib/utils";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  theme?: "dark" | "light";
};

export function PageIntro({
  eyebrow,
  title,
  description,
  theme = "dark",
}: PageIntroProps) {
  return (
    <section
      className={cn(
        "border-b border-border bg-background",
        theme === "light" && "theme-light"
      )}
    >
      <div className="mx-auto grid min-h-[calc(58svh-var(--site-header-height))] w-full max-w-container gap-10 px-4 py-14 md:grid-cols-[minmax(0,1fr)_minmax(20rem,0.58fr)] md:items-end md:px-6 md:py-20">
        <div>
          <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-[11ch] font-display text-page-title font-black uppercase leading-[0.92] tracking-[-0.045em] text-foreground">
            {title}
          </h1>
        </div>

        <div className="border-l border-border pl-5 md:justify-self-end md:pl-6">
          <p className="max-w-[42ch] text-sm leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
