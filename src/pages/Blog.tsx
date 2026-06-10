import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO, makeBreadcrumbSchema, makeFAQSchema } from '../components/SEO';

/* ─── Exported Types ─── */
export interface ArticleContentBlock {
  type: 'paragraph' | 'heading' | 'table' | 'callout' | 'list' | 'formula';
  text?: string;
  speakable?: boolean;
  headers?: string[];
  rows?: string[][];
  items?: string[];
  level?: 'h2' | 'h3';
}

export interface ArticleData {
  id: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  keywords: string;
  content: ArticleContentBlock[];
}

/* ─── Inline Article Schema Helper ─── */
export const makeArticleSchema = (article: { headline: string; description: string; datePublished: string; dateModified: string; author: string; url: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.headline,
  "description": article.description,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified,
  "author": { "@type": "Person", "name": article.author, "jobTitle": "Kỹ sư Cơ khí Thông gió" },
  "publisher": { "@type": "Organization", "name": "Cường Thông Gió", "url": "https://cuongthonggio.com" },
  "inLanguage": "vi",
  "mainEntityOfPage": article.url
});

/* ─── Article Data ─── */
import contentData from '../data/content.json';

export const articles: ArticleData[] = contentData.articles as unknown as ArticleData[];
export const faqData = contentData.faqData;

/* ─── Blog Page Component ─── */
export function Blog() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Kiến thức', url: 'https://cuongthonggio.com/kien-thuc' }
  ]);

  const articleSchemas = articles.map(a => makeArticleSchema({
    headline: a.headline,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    author: a.author,
    url: `https://cuongthonggio.com/kien-thuc/${a.id}`
  }));

  const faqSchema = makeFAQSchema(faqData);

  return (
    <div className="bg-white">
      <SEO
        title="Kiến Thức Thông Gió Công Nghiệp"
        description="Trung tâm kiến thức thông gió công nghiệp — Hướng dẫn chọn quạt, bảng giá thi công 2026, tiêu chuẩn PCCC tầng hầm QCVN 06:2022/BXD. Bài viết chuyên sâu từ đội ngũ kỹ sư Cường Thông Gió."
        keywords="kiến thức thông gió, cách chọn quạt công nghiệp, chi phí thông gió nhà xưởng 2026, tiêu chuẩn PCCC tầng hầm, QCVN 06:2022, quạt ly tâm, quạt hướng trục, ống gió SMACNA, thông gió Đà Nẵng"
        structuredData={[breadcrumb, ...articleSchemas, faqSchema]}
        dateModified="2026-06-05"
      />

      {/* ─── Breadcrumb ─── */}
      <nav aria-label="Breadcrumb" className="pt-24 md:pt-28 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-400 font-medium" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Trang chủ</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-zinc-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-zinc-900 font-bold">Kiến thức</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-8 pb-20 border-b border-zinc-100" aria-label="Kiến thức thông gió công nghiệp">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              Kiến thức chuyên sâu
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-8 max-w-5xl leading-[1.1]">
              Kiến thức thông gió công nghiệp —{' '}
              <br className="hidden md:block" />
              Hỏi gì, đáp nấy.
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl max-w-3xl leading-relaxed">
              Tổng hợp bài viết chuyên sâu từ đội ngũ kỹ sư Cường Thông Gió — giúp chủ đầu tư, kỹ sư M&E và nhà thầu hiểu rõ về quạt công nghiệp, chi phí thi công và tiêu chuẩn PCCC.
            </p>
            <p className="text-zinc-700 text-base md:text-lg font-semibold leading-relaxed max-w-3xl mt-4" data-speakable="true">
              <strong>
                Chúng tôi chia sẻ kiến thức thực tiễn về cách chọn quạt công nghiệp (ly tâm, hướng trục), bảng giá thi công thông gió nhà xưởng 2026 và các quy chuẩn kỹ thuật mới nhất — đúc kết từ hơn 13 năm kinh nghiệm thực chiến.
              </strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Articles ─── */}
      <section className="py-20 md:py-32" aria-label="Bài viết kiến thức thông gió">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {articles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-zinc-100 shadow-[0_2px_30px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_4px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500"
              itemScope
              itemType="https://schema.org/Article"
            >
              <Link
                to={`/kien-thuc/${article.id}`}
                className="block p-8 md:p-12 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Bài viết #{idx + 1}
                  </span>
                  <time
                    dateTime={article.datePublished}
                    className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                    itemProp="datePublished"
                  >
                    {article.datePublished}
                  </time>
                </div>

                <h2
                  className="text-xl md:text-3xl font-bold text-zinc-900 mb-4 leading-tight tracking-tight group-hover:text-zinc-700 transition-colors"
                  itemProp="headline"
                >
                  {article.headline}
                </h2>

                <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-6" itemProp="description">
                  {article.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      C
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-700 block" itemProp="name">{article.author}</span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider" itemProp="jobTitle">Kỹ sư Cơ khí Thông gió</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors">
                    <span className="hidden sm:inline">Đọc bài viết</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="py-20 md:py-32 bg-zinc-50 border-y border-zinc-100" aria-label="Câu hỏi thường gặp về thông gió" id="faq-kien-thuc">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight"
            >
              Câu hỏi thường gặp
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-base md:text-lg leading-relaxed"
            >
              <strong>Giải đáp nhanh các thắc mắc về quạt công nghiệp, chi phí thi công và tiêu chuẩn PCCC.</strong>
            </motion.p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                  aria-expanded={openFaq === idx}
                  aria-controls={`blog-faq-answer-${idx}`}
                >
                  <h3 className="text-base md:text-lg font-bold text-zinc-900 pr-4 leading-snug">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={`blog-faq-answer-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 pb-6 md:pb-8' : 'max-h-0'}`}
                  role="region"
                >
                  <p className="faq-answer px-6 md:px-8 text-zinc-500 text-sm md:text-base leading-relaxed" data-speakable="true">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight leading-tight">
              Cần tư vấn giải pháp thông gió cho dự án của bạn?
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Đội ngũ kỹ sư của chúng tôi sẵn sàng khảo sát, thiết kế và báo giá miễn phí — từ thông gió nhà xưởng đến PCCC tầng hầm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/lien-he"
                className="bg-zinc-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors shadow-2xl shadow-zinc-300 inline-flex items-center justify-center"
              >
                Nhận báo giá miễn phí
              </Link>
              <a
                href="tel:0905001224"
                className="border-2 border-zinc-200 text-zinc-900 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:border-zinc-900 transition-colors inline-flex items-center justify-center"
              >
                Gọi ngay: 0905 001 224
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
