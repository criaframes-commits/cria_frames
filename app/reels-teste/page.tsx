import type { Metadata } from "next";
import { ReelsViewer } from "@/components/reels/reels-viewer";
import { REELS, REELS_ARE_PREVIEW } from "@/lib/reels";

export const metadata: Metadata = {
  title: "Reels · Prévia",
  description: "Explore os filmes da Cria Frames em uma experiência vertical.",
  alternates: { canonical: "/reels-teste/" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ReelsTestPage() {
  return <ReelsViewer reels={REELS} preview={REELS_ARE_PREVIEW} />;
}
