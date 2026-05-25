import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object | object[];
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
    setMeta('name', 'geo.position', '16.0678;108.1772');
    setMeta('name', 'ICBM', '16.0678, 108.1772');

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

    // JSON-LD Structured Data
    // Remove old script tags
    document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove());

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
  }, [fullTitle, description, keywords, fullUrl, ogImage, ogType, structuredData]);

  return null;
}

// ─── Shared Structured Data Helpers ───

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cường Thông Gió",
  "alternateName": ["Công ty TNHH MTV Cường Thông Gió", "Cuong Thong Gio", "CTG Co., Ltd"],
  "url": "https://cuongthonggio.com",
  "logo": "https://cuongthonggio.com/logo.png",
  "description": "Chuyên sản xuất quạt công nghiệp, gia công ống gió, thi công hệ thống thông gió, xử lý khí thải & bụi cho nhà xưởng, công trình tại Đà Nẵng và Miền Trung. 13+ năm kinh nghiệm, 2000+ dự án.",
  "foundingDate": "2015",
  "foundingLocation": {
    "@type": "Place",
    "name": "Đà Nẵng, Việt Nam",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Đà Nẵng",
      "addressCountry": "VN"
    }
  },
  "slogan": "Làm chủ công nghệ và kỹ thuật thông gió",
  "knowsAbout": [
    "Quạt công nghiệp",
    "Hệ thống thông gió",
    "Ống gió công nghiệp",
    "Xử lý khí thải",
    "Lọc bụi công nghiệp",
    "Thông gió PCCC",
    "Thông gió tầng hầm",
    "Quạt ly tâm",
    "Quạt hướng trục",
    "Điều hòa không khí",
    "Cơ khí chính xác"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+84-905-001-224",
      "contactType": "customer service",
      "areaServed": ["VN-DN", "VN"],
      "availableLanguage": "Vietnamese",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:30",
        "closes": "17:30"
      }
    },
    {
      "@type": "ContactPoint",
      "telephone": "+84-905-001-224",
      "contactType": "sales",
      "areaServed": "VN",
      "availableLanguage": "Vietnamese"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "101 Trần Quý Khoách, P. Hoà Minh, Q. Liên Chiểu",
    "addressLocality": "Đà Nẵng",
    "addressRegion": "Đà Nẵng",
    "postalCode": "550000",
    "addressCountry": "VN"
  },
  "sameAs": [
    "https://www.facebook.com/cuongthonggio",
    "https://zalo.me/0905001224"
  ]
};

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HVACBusiness"],
  "name": "Cường Thông Gió",
  "alternateName": ["Công ty TNHH MTV Cường Thông Gió", "Cuong Thong Gio"],
  "description": "Chuyên sản xuất quạt công nghiệp, gia công ống gió, thi công hệ thống thông gió, xử lý khí thải và bụi cho nhà xưởng, công trình tại Đà Nẵng và Miền Trung. Đơn vị hàng đầu về HVAC tại khu vực.",
  "url": "https://cuongthonggio.com",
  "telephone": "+84-905-001-224",
  "email": "phantrongcuong77@gmail.com",
  "image": "https://cuongthonggio.com/logo.png",
  "logo": "https://cuongthonggio.com/logo.png",
  "hasMap": "https://maps.google.com/maps?q=101+Tr%E1%BA%A7n+Qu%C3%BD+Kho%C3%A1ch,+Ho%C3%A0+Minh,+Li%C3%AAn+Chi%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "101 Trần Quý Khoách, P. Hoà Minh, Q. Liên Chiểu",
    "addressLocality": "Đà Nẵng",
    "addressRegion": "Đà Nẵng",
    "postalCode": "550000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "16.0678",
    "longitude": "108.1772"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "07:30",
      "closes": "17:30"
    }
  ],
  "priceRange": "$$",
  "currenciesAccepted": "VND",
  "paymentAccepted": "Cash, Bank Transfer",
  "areaServed": [
    {
      "@type": "City",
      "name": "Đà Nẵng",
      "sameAs": "https://vi.wikipedia.org/wiki/%C4%90%C3%A0_N%E1%BA%B5ng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Quận Liên Chiểu, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Quận Hải Châu, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Quận Thanh Khê, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Quận Sơn Trà, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Quận Ngũ Hành Sơn, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Quận Cẩm Lệ, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Huyện Hòa Vang, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Miền Trung Việt Nam"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Tỉnh Quảng Nam"
    }
  ],
  "knowsAbout": [
    "Quạt công nghiệp Đà Nẵng",
    "Hệ thống thông gió nhà xưởng",
    "Ống gió công nghiệp",
    "Xử lý khí thải",
    "Lọc bụi công nghiệp",
    "Thông gió PCCC tầng hầm",
    "Quạt ly tâm công nghiệp",
    "Quạt hướng trục",
    "Thi công M&E Đà Nẵng"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  },
  "sameAs": [
    "https://www.facebook.com/cuongthonggio",
    "https://zalo.me/0905001224"
  ]
};

/**
 * WebSite schema — enables sitelinks search box in Google results
 */
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Cường Thông Gió",
  "alternateName": ["Cuong Thong Gio", "CTG", "Cường Thông Gió Đà Nẵng"],
  "url": "https://cuongthonggio.com",
  "inLanguage": "vi",
  "description": "Website chính thức của Cường Thông Gió — Chuyên sản xuất quạt công nghiệp, thi công hệ thống thông gió tại Đà Nẵng và Miền Trung.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://cuongthonggio.com/san-pham?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export function makeBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function makeProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image ? `https://cuongthonggio.com${product.image}` : undefined,
    "category": product.category || "Quạt công nghiệp & Thông gió",
    "brand": {
      "@type": "Brand",
      "name": "Cường Thông Gió"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Cường Thông Gió",
      "url": "https://cuongthonggio.com"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "VND",
      "seller": {
        "@type": "Organization",
        "name": "Cường Thông Gió"
      },
      "availableAtOrFrom": {
        "@type": "Place",
        "name": "Xưởng sản xuất Cường Thông Gió",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "101 Trần Quý Khoách, P. Hoà Minh, Q. Liên Chiểu",
          "addressLocality": "Đà Nẵng",
          "addressCountry": "VN"
        }
      }
    }
  };
}

/**
 * FAQ Schema — rich snippet for Google FAQ section
 */
export function makeFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Service Schema — for individual services offered, with GEO targeting
 */
export function makeServiceSchema(service: {
  name: string;
  description: string;
  image?: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "name": service.name,
    "description": service.description,
    "image": service.image ? `https://cuongthonggio.com${service.image}` : undefined,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Cường Thông Gió",
      "url": "https://cuongthonggio.com",
      "telephone": "+84-905-001-224",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "101 Trần Quý Khoách, P. Hoà Minh, Q. Liên Chiểu",
        "addressLocality": "Đà Nẵng",
        "addressCountry": "VN"
      }
    },
    "areaServed": [
      {
        "@type": "City",
        "name": service.areaServed || "Đà Nẵng"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Miền Trung Việt Nam"
      }
    ],
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://cuongthonggio.com/lien-he",
      "servicePhone": "+84-905-001-224",
      "serviceLocation": {
        "@type": "Place",
        "name": "Cường Thông Gió — Xưởng sản xuất",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Đà Nẵng",
          "addressCountry": "VN"
        }
      }
    },
    "termsOfService": "https://cuongthonggio.com/gioi-thieu"
  };
}

/**
 * Review Schema — for customer testimonials
 */
export function makeReviewSchema(reviews: {
  author: string;
  reviewBody: string;
  ratingValue?: number;
}[]) {
  return reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.ratingValue || 5,
      "bestRating": 5,
      "worstRating": 1
    },
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": "Cường Thông Gió",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Đà Nẵng",
        "addressCountry": "VN"
      }
    }
  }));
}

/**
 * HowTo Schema — for process/workflow sections
 */
export function makeHowToSchema(howTo: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": howTo.name,
    "description": howTo.description,
    "step": howTo.steps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": step.name,
      "text": step.text
    }))
  };
}

/**
 * GeoCircle Schema — define service area radius for local SEO
 */
export const GEO_SERVICE_AREA_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Thi công hệ thống thông gió tại Đà Nẵng",
  "description": "Dịch vụ thi công hệ thống thông gió, quạt công nghiệp, xử lý khí thải cho nhà xưởng, công trình tại Đà Nẵng và các tỉnh Miền Trung.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Cường Thông Gió"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "16.0678",
      "longitude": "108.1772"
    },
    "geoRadius": "100000"
  },
  "serviceArea": [
    {
      "@type": "AdministrativeArea",
      "name": "KCN Hòa Khánh, Quận Liên Chiểu, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "KCN Hòa Cầm, Quận Cẩm Lệ, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "KCN An Đồn, Quận Sơn Trà, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "KCN Thọ Quang, Quận Sơn Trà, Đà Nẵng"
    },
    {
      "@type": "AdministrativeArea",
      "name": "KCN Điện Nam - Điện Ngọc, Quảng Nam"
    }
  ]
};
