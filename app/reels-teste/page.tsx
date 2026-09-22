import type { Metadata } from "next";
import { ReelsGallery } from "@/components/reels/reels-gallery";
import { REELS } from "@/lib/reels";

export const metadata: Metadata = {
  title: "Reels · Prévia",
  description: "Explore os filmes da Cria Frames em uma experiência vertical.",
  alternates: { canonical: "/reels-teste/" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ReelsTestPage() {
  return <ReelsGallery reels={REELS} />;
}
