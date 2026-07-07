import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description: string;
  keywords?: string;
}

export function useSEO({ title, description, keywords }: SEOOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const updateMeta = (selector: string, value: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute("content", value);
      } else {
        // If meta doesn't exist, create it dynamically
        const match = selector.match(/meta\[(name|property)="([^"]+)"\]/);
        if (match) {
          const [, attr, name] = match;
          const newMeta = document.createElement("meta");
          newMeta.setAttribute(attr, name);
          newMeta.setAttribute("content", value);
          document.head.appendChild(newMeta);
        }
      }
    };

    const prevDescEl = document.querySelector('meta[name="description"]');
    const prevDesc = prevDescEl ? prevDescEl.getAttribute("content") : "";
    if (description) {
      updateMeta('meta[name="description"]', description);
      updateMeta('meta[property="og:description"]', description);
      updateMeta('meta[name="twitter:description"]', description);
    }

    const prevKeywordsEl = document.querySelector('meta[name="keywords"]');
    const prevKeywords = prevKeywordsEl ? prevKeywordsEl.getAttribute("content") : "";
    if (keywords) {
      updateMeta('meta[name="keywords"]', keywords);
    }

    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[name="twitter:title"]', title);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalEl ? canonicalEl.getAttribute("href") : "";
    if (canonicalEl) {
      canonicalEl.setAttribute("href", window.location.href);
    }

    return () => {
      document.title = prevTitle;
      if (prevDesc) {
        updateMeta('meta[name="description"]', prevDesc);
        updateMeta('meta[property="og:description"]', prevDesc);
        updateMeta('meta[name="twitter:description"]', prevDesc);
      }
      if (prevKeywords) {
        updateMeta('meta[name="keywords"]', prevKeywords);
      }
      if (prevCanonical && canonicalEl) {
        canonicalEl.setAttribute("href", prevCanonical);
      }
    };
  }, [title, description, keywords]);
}
