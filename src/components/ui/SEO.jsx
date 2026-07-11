import { useEffect } from "react";

const SITE_NAME = "Panigrahna";
const SITE_URL = "https://panigrahna.com";
const DEFAULT_IMAGE = "/images/og-image.jpg";

function upsertMeta(name, content, property) {
  if (!content) return;
  const attr = property ? "property" : "name";
  const key = property || name;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(attr, key) {
  const el = document.querySelector(`meta[${attr}="${key}"]`);
  if (el) el.remove();
}

export default function SEO({ title, description, ogImage, noindex }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Traditional Wedding Photography & Planning`;
    document.title = fullTitle;

    upsertMeta("description", description);
    upsertMeta("og:title", fullTitle, true);
    upsertMeta("og:description", description, true);
    upsertMeta("og:url", window.location.href, true);
    upsertMeta("og:image", ogImage || DEFAULT_IMAGE, true);
    upsertMeta("og:site_name", SITE_NAME, true);
    upsertMeta("og:type", "website", true);
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", fullTitle);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", ogImage || DEFAULT_IMAGE);

    if (noindex) {
      upsertMeta("robots", "noindex, nofollow");
    } else {
      removeMeta("name", "robots");
    }
  }, [title, description, ogImage, noindex]);

  return null;
}
