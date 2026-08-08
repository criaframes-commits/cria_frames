import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { MemberProjects } from "@/components/about/member-projects";
import {
  MEMBER_PROFILE_PROJECTS,
  PORTFOLIO_PROJECTS,
} from "@/lib/portfolio-projects";
import { TEAM_MEMBERS } from "@/lib/team-members";

type MemberPageProps = {
  params: Promise<{ memberId: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({ memberId: member.id }));
}

export async function generateMetadata({
  params,
}: MemberPageProps): Promise<Metadata> {
  const { memberId } = await params;
  const member = TEAM_MEMBERS.find((item) => item.id === memberId);

  if (!member) return {};

  return {
    title: `${member.name} — Cria Frames`,
    description: `${member.role} na Cria Frames. Conheça o perfil e os projetos de ${member.name}.`,
  };
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { memberId } = await params;
  const memberIndex = TEAM_MEMBERS.findIndex((item) => item.id === memberId);

  if (memberIndex < 0) notFound();

  const member = TEAM_MEMBERS[memberIndex];
  const previousMember = TEAM_MEMBERS[memberIndex - 1] ?? null;
  const nextMember = TEAM_MEMBERS[memberIndex + 1] ?? null;
  const projects = [
    ...PORTFOLIO_PROJECTS.filter((project) =>
      project.memberIds.includes(member.id)
    ),
    ...(MEMBER_PROFILE_PROJECTS[member.id] ?? []),
  ];

  const previousHref = previousMember
    ? `/sobre/equipe/${previousMember.id}`
    : "/sobre#equipe";
  const previousName = previousMember?.name ?? "Sobre";
  const nextHref = nextMember
    ? `/sobre/equipe/${nextMember.id}`
    : "/sobre#equipe";
  const nextName = nextMember?.name ?? "Equipe";

  return (
    <main>
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid min-h-[calc(78svh-var(--site-header-height))] max-w-container gap-9 px-4 py-14 md:grid-cols-[minmax(14rem,0.62fr)_minmax(12rem,0.55fr)_minmax(20rem,1fr)] md:items-end md:gap-10 md:px-6 md:py-16 lg:gap-14">
          <div
            className="relative aspect-square max-h-[30rem] overflow-hidden rounded-md border border-border bg-black-900"
          >
            <Image
              src={member.imageSrc}
              alt={`Retrato de ${member.name}`}
              fill
              priority
              sizes="(min-width: 768px) 28vw, 100vw"
              style={{ objectPosition: member.imagePosition }}
              className="object-cover"
            />
            <span className="absolute right-5 top-4 font-display text-[clamp(5rem,9vw,8rem)] font-black leading-none text-white/[0.06]">
              {String(memberIndex + 1).padStart(2, "0")}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/5" />
          </div>

          <div>
            <p className="font-body text-caption font-semibold uppercase tracking-[0.18em] text-accent-text">
              {String(memberIndex + 1).padStart(2, "0")} / {String(TEAM_MEMBERS.length).padStart(2, "0")}
            </p>
            <h1 className="mt-4 font-display text-page-title font-black uppercase leading-[0.94] tracking-[-0.035em] text-foreground">
              {member.name}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">{member.role}</p>

            <div className="mt-8 border-t border-border pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Redes
              </p>
              {member.socials.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {member.socials.map((social) => (
                    <li key={social.label}>
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group/social inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                      >
                        {social.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs text-muted-foreground">
                  Links em atualização.
                </p>
              )}
            </div>
          </div>

          <div className="border-l border-border pl-5 md:pl-7">
            <p className="max-w-[56ch] text-base leading-relaxed text-muted-foreground">
              {member.profile}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {member.specialties.map((specialty) => (
                <li
                  key={specialty}
                  className="rounded-md border border-border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground"
                >
                  {specialty}
                </li>
              ))}
            </ul>
            <Link
              href="#projetos"
              className="group/see-projects mt-9 inline-flex min-h-11 items-center gap-3 rounded-md bg-blue-500 px-5 text-xs font-bold uppercase tracking-[0.13em] text-white transition-[background,color] hover:bg-white hover:text-black-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              Ver projetos
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover/see-projects:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <MemberProjects
        memberName={member.name}
        memberId={member.id}
        projects={projects}
        members={TEAM_MEMBERS}
      />

      <nav
        aria-label="Navegação anterior e próximo entre membros"
        className="bg-background"
      >
        <div className="mx-auto grid max-w-container grid-cols-[1fr_auto_1fr] items-center gap-4 border-t border-border px-4 py-10 md:px-6 md:py-12">
          <Link
            href={previousHref}
            className="group/previous min-w-0 justify-self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover/previous:-translate-x-1"
              />
              {previousMember ? "Anterior" : "Voltar"}
            </span>
            <span className="mt-2 block truncate font-display text-sm font-bold uppercase text-foreground transition-colors group-hover/previous:text-blue-300 md:text-lg">
              {previousName}
            </span>
          </Link>

          <Link
            href="/sobre#equipe"
            className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            Equipe
          </Link>

          <Link
            href={nextHref}
            className="group/next min-w-0 justify-self-end text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <span className="inline-flex items-center justify-end gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {nextMember ? "Próximo" : "Voltar"}
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover/next:translate-x-1"
              />
            </span>
            <span className="mt-2 block truncate font-display text-sm font-bold uppercase text-foreground transition-colors group-hover/next:text-blue-300 md:text-lg">
              {nextName}
            </span>
          </Link>
        </div>
      </nav>
    </main>
  );
}
