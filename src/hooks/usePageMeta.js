import { useEffect } from "react";

function setMetaContent(selector, content) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute("content", content);
}

export function usePageMeta({ title, description }) {
  useEffect(() => {
    if (!title) return;

    document.title = title;
    setMetaContent('meta[name="title"]', title);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[name="twitter:title"]', title);

    if (description) {
      setMetaContent('meta[name="description"]', description);
      setMetaContent('meta[property="og:description"]', description);
      setMetaContent('meta[name="twitter:description"]', description);
    }

    const url = window.location.href;
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[name="twitter:url"]', url);
  }, [title, description]);
}
