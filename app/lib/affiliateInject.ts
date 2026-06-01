export function injectAffiliateDisclosure(content: string) {
  const disclaimer =
    "\n\n---\nAffiliate Disclosure: This post may contain affiliate links. We may earn a commission at no extra cost to you.";

  return content + disclaimer;
}