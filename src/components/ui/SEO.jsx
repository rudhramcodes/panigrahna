import { useEffect, useId } from "react";

const SITE_NAME = "Panigrahna";

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

export default function SEO({ title, description, ogImage, noindex, schema }) {
  const schemaId = useId();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Traditional Wedding Photography & Planning`;
    document.title = fullTitle;

    upsertMeta("description", description);
    upsertMeta("og:title", fullTitle, true);
    upsertMeta("og:description", description, true);
    upsertMeta("og:url", window.location.href, true);
    upsertMeta("og:image", ogImage || "/images/og-image.jpg", true);
    upsertMeta("og:site_name", SITE_NAME, true);
    upsertMeta("og:type", "website", true);
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", fullTitle);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", ogImage || "/images/og-image.jpg");

    if (noindex) {
      upsertMeta("robots", "noindex, nofollow");
    } else {
      removeMeta("name", "robots");
    }

    const existing = document.getElementById(schemaId);
    if (existing) existing.remove();

    if (schema) {
      const script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, ogImage, noindex, schema, schemaId]);

  return null;
}
