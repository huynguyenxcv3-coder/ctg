import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object | object[];
  dateModified?: string;
}

/**
 * SEO component — sets per-page title, meta description, Open Graph,
 * Twitter Card, canonical URL, hreflang, and JSON-LD structured data.
 * Cleans up all injected tags on unmount or route change.
 */
export function SEO({
  title,
  description,
  keywords,
  ogImage = '/logo.png',
  ogType = 'website',
  structuredData,
  dateModified,
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://cuongthonggio.com';
  const fullUrl = `${baseUrl}${location.pathname}`;
  const fullTitle = `Cường Thông Gió — ${title}`;

  useEffect(() => {
    // Set document title
    document.title = fullTitle;

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Primary meta
    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);

    // GEO meta tags for local SEO
    setMeta('name', 'geo.region', 'VN-DN');
    setMeta('name', 'geo.placename', 'Đà Nẵng');
    setMeta('name', 'geo.position', '16.0773;108.1595');
    setMeta('name', 'ICBM', '16.0773, 108.1595');

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:image', `${baseUrl}${ogImage}`);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:locale', 'vi_VN');
    setMeta('property', 'og:site_name', 'Cường Thông Gió');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', `${baseUrl}${ogImage}`);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Hreflang alternate (Vietnamese)
    let hreflang = document.querySelector('link[hreflang="vi"]') as HTMLLinkElement | null;
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.setAttribute('rel', 'alternate');
      hreflang.setAttribute('hreflang', 'vi');
      document.head.appendChild(hreflang);
    }
    hreflang.setAttribute('href', fullUrl);

    // x-default hreflang
    let xDefault = document.querySelector('link[hreflang="x-default"]') as HTMLLinkElement | null;
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute('href', fullUrl);

    // Date modified — GEO signal for content freshness
    if (dateModified) {
      setMeta('property', 'article:modified_time', dateModified);
      setMeta('property', 'og:updated_time', dateModified);
      let lastMod = document.querySelector('meta[http-equiv="last-modified"]') as HTMLMetaElement | null;
      if (!lastMod) {
        lastMod = document.createElement('meta');
        lastMod.setAttribute('http-equiv', 'last-modified');
        document.head.appendChild(lastMod);
      }
      lastMod.setAttribute('content', dateModified);
    }

    // JSON-LD Structured Data — clean up all previous injections
    document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove());
    // Remove SSG-injected scripts; React SEO component now manages all structured data
    document.querySelectorAll('script[data-ssg="true"]').forEach(el => el.remove());
    // Remove base body JSON-LD to prevent duplication (prerender adds them back for crawlers)
    document.querySelectorAll('body > script[type="application/ld+json"]:not([data-seo-jsonld])').forEach(el => el.remove());

    if (structuredData) {
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      dataArray.forEach((data, idx) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', `seo-${idx}`);
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Cleanup JSON-LD on unmount
      document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove());
    };
  }, [fullTitle, description, keywords, fullUrl, ogImage, ogType, structuredData, dateModified]);

  return null;
}
