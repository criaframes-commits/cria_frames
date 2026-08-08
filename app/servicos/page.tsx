import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/page-intro";
import { ProcessSection } from "@/components/services/process-section";
import { ServiceDetails } from "@/components/services/service-details";
import { ServicesCta } from "@/components/services/services-cta";
import { ServicesFaq } from "@/components/services/services-faq";
import { STUDIO_SERVICES } from "@/lib/studio-services";

export const metadata: Metadata = {
  title: "Serviços — Cria Frames",
  description:
    "Vídeo com IA, motion design, campanhas completas e consultoria criativa.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Serviços"
        title="Da ideia ao último frame."
        description="Cada projeto pede um arranjo diferente. Escolha o que mais se aproxima da sua necessidade; o escopo se ajusta na conversa."
        theme="light"
      />
      <ServiceDetails services={STUDIO_SERVICES} />
      <ProcessSection />
      <ServicesCta />
      <ServicesFaq />
    </main>
  );
}
