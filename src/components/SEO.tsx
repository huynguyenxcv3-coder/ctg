/* eslint-disable react-refresh/only-export-components */
export { SEO } from './SEOComponent';

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
        "opens": "08:00",
        "closes": "17:00"
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
    "streetAddress": "101 Trần Quý Khoách, P. Hòa Khánh, Q. Liên Chiểu",
    "addressLocality": "Đà Nẵng",
    "addressRegion": "Đà Nẵng",
    "postalCode": "550000",
    "addressCountry": "VN"
  },
  "sameAs": [
    "https://www.facebook.com/cuongthonggio",
    "https://zalo.me/0905001224",
    "https://www.google.com/maps/place/?q=place_id:ChIJAQDvmduYQjERvtE7J7awz68",
    "https://masothue.com/0401686548-cong-ty-tnhh-mtv-cuong-thong-gio"
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
  "hasMap": "https://www.google.com/maps/place/?q=place_id:ChIJAQDvmduYQjERvtE7J7awz68",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "101 Trần Quý Khoách, P. Hòa Khánh, Q. Liên Chiểu",
    "addressLocality": "Đà Nẵng",
    "addressRegion": "Đà Nẵng",
    "postalCode": "550000",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "16.0773",
    "longitude": "108.1595"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "17:00"
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
    "https://zalo.me/0905001224",
    "https://www.google.com/maps/place/?q=place_id:ChIJAQDvmduYQjERvtE7J7awz68",
    "https://masothue.com/0401686548-cong-ty-tnhh-mtv-cuong-thong-gio"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sản phẩm & Dịch vụ Cường Thông Gió",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Quạt công nghiệp",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Quạt ly tâm công nghiệp", "description": "Quạt ly tâm 1.5kW-200kW, áp suất tĩnh đến 3,000 Pa", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "89" } } },
          { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Quạt hướng trục công nghiệp", "description": "Quạt hướng trục 1.1kW-200kW, lưu lượng đến 150,000 m³/h", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "89" } } }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Dịch vụ thông gió",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Thi công hệ thống thông gió nhà xưởng", "description": "Thiết kế, sản xuất, lắp đặt hệ thống thông gió nhà xưởng trọn gói tại Đà Nẵng" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gia công ống gió CNC Plasma", "description": "Gia công ống gió tôn mạ kẽm, inox theo tiêu chuẩn SMACNA" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Xử lý khí thải & lọc bụi công nghiệp", "description": "Hệ thống xử lý khí thải đạt chuẩn QCVN, lọc bụi túi vải, cyclone, scrubber" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Thông gió PCCC tầng hầm", "description": "Quạt chịu nhiệt 300°C/2h, van chặn lửa, jet fan theo QCVN 06:2022" } }
        ]
      }
    ]
  }
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
      "url": "https://cuongthonggio.com/san-pham",
      "priceCurrency": "VND",
      "price": "0",
      "priceValidUntil": "2030-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Cường Thông Gió"
      },
      "availableAtOrFrom": {
        "@type": "Place",
        "name": "Xưởng sản xuất Cường Thông Gió",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "101 Trần Quý Khoách, P. Hòa Khánh, Q. Liên Chiểu",
          "addressLocality": "Đà Nẵng",
          "addressCountry": "VN"
        }
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "89"
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
        "streetAddress": "101 Trần Quý Khoách, P. Hòa Khánh, Q. Liên Chiểu",
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
      "latitude": "16.0773",
      "longitude": "108.1595"
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

/**
 * Person Schema — E-E-A-T signal for founder/author profiles
 */
export function makePersonSchema(person: {
  name: string;
  jobTitle: string;
  description?: string;
  url?: string;
  worksFor?: string;
  knowsAbout?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "description": person.description,
    "url": person.url || "https://cuongthonggio.com/gioi-thieu",
    "worksFor": {
      "@type": "Organization",
      "name": person.worksFor || "Cường Thông Gió",
      "url": "https://cuongthonggio.com"
    },
    "knowsAbout": person.knowsAbout || [
      "Quạt công nghiệp",
      "Hệ thống HVAC",
      "Thông gió PCCC",
      "Xử lý khí thải"
    ]
  };
}

/**
 * SpeakableSpecification — helps AI voice assistants identify key content
 */
export function makeSpeakableSchema(page: {
  name: string;
  url: string;
  cssSelectors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.name,
    "url": page.url,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": page.cssSelectors || ["h1", "[data-speakable]", ".answer-block", "article > p:first-of-type"]
    }
  };
}

/**
 * Video Schema — for video content pages
 */
export function makeVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "publisher": {
      "@type": "Organization",
      "name": "Cường Thông Gió",
      "url": "https://cuongthonggio.com"
    }
  };
}
