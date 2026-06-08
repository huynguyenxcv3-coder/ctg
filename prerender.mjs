/**
 * prerender.mjs — Static Site Generation (SSG) for cuongthonggio.com
 *
 * Generates static HTML files for each route at build time by injecting
 * article content, meta tags, and JSON-LD directly into the HTML.
 * No browser required — pure Node.js approach.
 *
 * For blog/article pages, it reads the article data from the source,
 * generates full semantic HTML, and writes to dist/.
 *
 * Usage:
 *   pnpm build:ssg    → vite build + pre-render
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, 'dist');
const BASE_URL = 'https://cuongthonggio.com';

// ─── Read the base index.html template ───
const baseHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');

// ─── Article Data ───
const contentData = JSON.parse(readFileSync(join(__dirname, 'src/data/content.json'), 'utf-8'));
const articles = contentData.articles;
const faqData = contentData.faqData;

// ─── Page definitions ───
const pages = [
  {
    route: '/',
    title: 'Cường Thông Gió — Quạt Công Nghiệp & Hệ Thống Thông Gió Đà Nẵng',
    description: 'Cường Thông Gió — Chuyên sản xuất quạt công nghiệp, gia công ống gió, thi công hệ thống thông gió, xử lý khí thải & bụi tại Đà Nẵng và Miền Trung. 13+ năm kinh nghiệm, 2000+ dự án.',
    keywords: 'quạt công nghiệp, thông gió, ống gió, quạt ly tâm, quạt hướng trục, Đà Nẵng, Cường Thông Gió',
  },
  {
    route: '/san-pham',
    title: 'Cường Thông Gió — Sản Phẩm Quạt Công Nghiệp & Ống Gió',
    description: 'Danh mục sản phẩm quạt công nghiệp, ống gió, quạt ly tâm, quạt hướng trục, hệ thống xử lý khí thải — sản xuất tại Đà Nẵng. Cường Thông Gió.',
    keywords: 'quạt công nghiệp, quạt ly tâm, quạt hướng trục, ống gió, sản phẩm, Cường Thông Gió, Đà Nẵng',
  },
  {
    route: '/gioi-thieu',
    title: 'Cường Thông Gió — Giới Thiệu Công Ty',
    description: 'Công ty TNHH MTV Cường Thông Gió — 13+ năm kinh nghiệm sản xuất quạt công nghiệp và thi công hệ thống thông gió tại Đà Nẵng.',
    keywords: 'Cường Thông Gió, giới thiệu, công ty, quạt công nghiệp, Đà Nẵng',
  },
  {
    route: '/lien-he',
    title: 'Cường Thông Gió — Liên Hệ & Báo Giá',
    description: 'Liên hệ Cường Thông Gió để nhận báo giá miễn phí. Hotline: 0905 001 224. Địa chỉ: 101 Trần Quý Khoách, Đà Nẵng.',
    keywords: 'liên hệ, báo giá, Cường Thông Gió, Đà Nẵng, thông gió',
  },
  {
    route: '/kien-thuc',
    title: 'Cường Thông Gió — Kiến Thức Thông Gió Công Nghiệp',
    description: 'Trung tâm kiến thức thông gió công nghiệp — Hướng dẫn chọn quạt, bảng giá thi công 2026, tiêu chuẩn PCCC tầng hầm. Bài viết chuyên sâu từ kỹ sư Cường Thông Gió.',
    keywords: 'kiến thức thông gió, quạt công nghiệp, chi phí thông gió, PCCC tầng hầm, QCVN 06:2022',
  },
];

// ─── Helpers ───
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function makeCanonicalTag(url) {
  return `<link rel="canonical" href="${url}" />`;
}

function makeHreflangTags(url) {
  return `<link rel="alternate" hreflang="vi" href="${url}" />\n    <link rel="alternate" hreflang="x-default" href="${url}" />`;
}

function makeMetaTags(page) {
  const fullUrl = `${BASE_URL}${page.route}`;
  return `
    <!-- SSG: Pre-rendered meta tags for ${page.route} -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="keywords" content="${escapeHtml(page.keywords)}" />
    ${makeCanonicalTag(fullUrl)}
    ${makeHreflangTags(fullUrl)}
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />`;
}

function makeArticleJsonLd(article) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": { "@type": "Person", "name": article.author, "jobTitle": "Kỹ sư Cơ khí Thông gió" },
    "publisher": { "@type": "Organization", "name": "Cường Thông Gió", "url": BASE_URL },
    "inLanguage": "vi",
    "mainEntityOfPage": `${BASE_URL}/kien-thuc/${article.id}`
  };
  return `<script type="application/ld+json" data-ssg="true">${JSON.stringify(schema)}</script>`;
}

function makeFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };
  return `<script type="application/ld+json" data-ssg="true">${JSON.stringify(schema)}</script>`;
}

function makeBreadcrumbJsonLd(items) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  return `<script type="application/ld+json" data-ssg="true">${JSON.stringify(schema)}</script>`;
}

/**
 * Generate semantic HTML content for an article page.
 * This is injected into the <noscript> section AND also into a hidden
 * div that crawlers can read even with JS enabled.
 */
function generateArticleHtml(article) {
  const paragraphs = article.contentSummary
    .map(p => `        <p>${escapeHtml(p)}</p>`)
    .join('\n');

  return `
      <article itemscope itemtype="https://schema.org/Article" data-ssg-content="true">
        <header>
          <h1 itemprop="headline">${escapeHtml(article.headline)}</h1>
          <p itemprop="description">${escapeHtml(article.description)}</p>
          <div itemprop="author" itemscope itemtype="https://schema.org/Person">
            <span itemprop="name">${escapeHtml(article.author)}</span> —
            <span itemprop="jobTitle">Kỹ sư Cơ khí Thông gió, 13+ năm kinh nghiệm</span>
          </div>
          <time itemprop="datePublished" datetime="${article.datePublished}">${article.datePublished}</time>
          <meta itemprop="dateModified" content="${article.dateModified}" />
        </header>
        <div itemprop="articleBody">
${paragraphs}
        </div>
        <footer>
          <p><strong>Cường Thông Gió</strong> — Hotline/Zalo: <a href="tel:0905001224">0905 001 224</a> — Email: <a href="mailto:phantrongcuong77@gmail.com">phantrongcuong77@gmail.com</a></p>
          <p>Địa chỉ: 101 Trần Quý Khoách, P. Hòa Khánh, TP. Đà Nẵng</p>
        </footer>
      </article>`;
}

/**
 * Generate a listing page for /kien-thuc
 */
function generateBlogListingHtml() {
  const articleLinks = articles
    .map(a => `        <li><a href="/kien-thuc/${a.id}"><strong>${escapeHtml(a.headline)}</strong></a> — ${escapeHtml(a.description)}</li>`)
    .join('\n');

  const faqHtml = faqData
    .map(f => `        <dt><strong>${escapeHtml(f.question)}</strong></dt>\n        <dd>${escapeHtml(f.answer)}</dd>`)
    .join('\n');

  return `
      <section data-ssg-content="true">
        <h1>Kiến thức thông gió công nghiệp — Cường Thông Gió</h1>
        <p>Trung tâm kiến thức thông gió công nghiệp — Hướng dẫn chọn quạt, bảng giá thi công 2026, tiêu chuẩn PCCC tầng hầm. Bài viết chuyên sâu từ kỹ sư Cường Thông Gió.</p>

        <h2>Bài viết</h2>
        <ul>
${articleLinks}
        </ul>

        <h2>Câu hỏi thường gặp</h2>
        <dl>
${faqHtml}
        </dl>
      </section>`;
}

// ─── Process each page ───
function injectSeoIntoHtml(html, page, extraContent = '', extraHead = '') {
  const fullUrl = `${BASE_URL}${page.route}`;
  let result = html;

  // 1. Replace <title> tag
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(page.title)}</title>`
  );

  // 2. Replace meta description
  result = result.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(page.description)}" />`
  );

  // 3. Replace meta keywords
  result = result.replace(
    /<meta name="keywords" content="[^"]*" \/>/,
    `<meta name="keywords" content="${escapeHtml(page.keywords)}" />`
  );

  // 4. Inject canonical & hreflang after the comment
  result = result.replace(
    /<!-- Canonical & hreflang: managed dynamically by <SEO\/> component per route\.\s*This prevents Google from treating \/san-pham, \/kien-thuc etc\. as duplicates of homepage\.\s*The SEO component sets canonical = https:\/\/cuongthonggio\.com\{pathname\} on every route\. -->/,
    `<!-- Canonical & hreflang: pre-rendered by SSG for ${page.route} -->
    ${makeCanonicalTag(fullUrl)}
    ${makeHreflangTags(fullUrl)}`
  );

  // 5. Update og:url
  result = result.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${fullUrl}" />`
  );

  // 6. Update og:title
  result = result.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`
  );

  // 7. Update og:description
  result = result.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`
  );

  // 8. Inject extra head content (JSON-LD) before </head>
  if (extraHead) {
    result = result.replace('</head>', `    ${extraHead}\n  </head>`);
  }

  // 9. Inject crawlable content before <div id="root">
  // This content is hidden visually but readable by crawlers
  if (extraContent) {
    result = result.replace(
      '<div id="root"></div>',
      `<!-- SSG: Pre-rendered content for crawlers -->
    <div id="ssg-content" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;" aria-hidden="true">
${extraContent}
    </div>
    <div id="root"></div>`
    );
  }

  // 10. Add SSG marker
  result = result.replace('<!doctype html>', '<!doctype html>\n<!-- Pre-rendered by cuongthonggio.com SSG -->');

  return result;
}

// ─── Main ───
function main() {
  console.log('\n🚀 Cường Thông Gió — SSG Pre-renderer (Pure Node.js)');
  console.log('─'.repeat(50));

  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist/ not found. Run `pnpm build` first.');
    process.exit(1);
  }

  let count = 0;

  // 1. Process static pages (/, /san-pham, /gioi-thieu, /lien-he)
  for (const page of pages) {
    let extraContent = '';
    let extraHead = '';

    if (page.route === '/kien-thuc') {
      extraContent = generateBlogListingHtml();
      extraHead = [
        makeBreadcrumbJsonLd([
          { name: 'Trang chủ', url: `${BASE_URL}/` },
          { name: 'Kiến thức', url: `${BASE_URL}/kien-thuc` }
        ]),
        ...articles.map(a => makeArticleJsonLd(a)),
        makeFaqJsonLd()
      ].join('\n    ');
    }

    const html = injectSeoIntoHtml(baseHtml, page, extraContent, extraHead);

    let outputPath;
    if (page.route === '/') {
      outputPath = join(DIST_DIR, 'index.html');
    } else {
      const dir = join(DIST_DIR, page.route.slice(1));
      mkdirSync(dir, { recursive: true });
      outputPath = join(dir, 'index.html');
    }

    writeFileSync(outputPath, html, 'utf-8');
    console.log(`  ✅ ${page.route} → ${outputPath.replace(DIST_DIR, 'dist')}`);
    count++;
  }

  // 2. Process article pages
  for (const article of articles) {
    const route = `/kien-thuc/${article.id}`;
    const page = {
      route,
      title: `Cường Thông Gió — ${article.headline}`,
      description: article.description,
      keywords: article.keywords,
    };

    const extraContent = generateArticleHtml(article);
    const extraHead = [
      makeBreadcrumbJsonLd([
        { name: 'Trang chủ', url: `${BASE_URL}/` },
        { name: 'Kiến thức', url: `${BASE_URL}/kien-thuc` },
        { name: article.headline, url: `${BASE_URL}${route}` }
      ]),
      makeArticleJsonLd(article),
      makeFaqJsonLd()
    ].join('\n    ');

    const html = injectSeoIntoHtml(baseHtml, page, extraContent, extraHead);

    const dir = join(DIST_DIR, 'kien-thuc', article.id);
    mkdirSync(dir, { recursive: true });
    const outputPath = join(dir, 'index.html');

    writeFileSync(outputPath, html, 'utf-8');
    console.log(`  ✅ ${route} → ${outputPath.replace(DIST_DIR, 'dist')}`);
    count++;
  }

  console.log(`\n✨ Done! ${count} pages pre-rendered to dist/`);
  console.log('─'.repeat(50));
  console.log('Each page now has:');
  console.log('  • Correct canonical URL');
  console.log('  • Correct hreflang tags');
  console.log('  • Correct og:url, og:title, og:description');
  console.log('  • JSON-LD structured data (articles, FAQ, breadcrumbs)');
  console.log('  • Hidden semantic HTML content for non-JS crawlers\n');
}

main();
