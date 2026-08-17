export const HERO_VIDEO_ID = "uyc10b029hQ";

const HERO_EMBED_BASE = `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}`;

export const HERO_BACKGROUND_VIDEO_URL =
  `${HERO_EMBED_BASE}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}` +
  "&controls=0&disablekb=1&fs=0&iv_load_policy=3&playsinline=1&rel=0&enablejsapi=1";

export const HERO_DIALOG_VIDEO_URL =
  `${HERO_EMBED_BASE}?autoplay=1&loop=1&playlist=${HERO_VIDEO_ID}` +
  "&rel=0&playsinline=1";
