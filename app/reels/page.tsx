import { ReelsViewer } from "@/components/reels/reels-viewer";
import { REELS, REELS_ARE_PREVIEW } from "@/lib/reels";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cria em movimento",
  description: "Uma nova forma de explorar os vídeos da Cria Frames. Dê play e descubra a próxima história.",
  path: "/reels/",
});

export default function ReelsPage() {
  return <ReelsViewer reels={REELS} preview={REELS_ARE_PREVIEW} />;
}
