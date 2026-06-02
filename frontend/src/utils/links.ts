export function isExternalHref(href: string | undefined) {
  return /^https?:\/\//i.test(href?.trim() ?? "");
}

export function externalLinkProps(href: string | undefined) {
  if (!isExternalHref(href)) {
    return {};
  }

  return {
    target: "_blank",
    rel: "noopener noreferrer"
  } as const;
}
