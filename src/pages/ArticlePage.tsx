import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles, faqData, makeArticleSchema } from './Blog';
import type { ArticleContentBlock } from './Blog';
import { SEO, makeBreadcrumbSchema, makeFAQSchema } from '../components/SEO';
import { NotFound } from './NotFound';

/* ─── Content Block Renderer ─── */
function renderBlock(block: ArticleContentBlock, idx: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={idx}
          className="text-zinc-600 text-base md:text-lg leading-relaxed mb-6"
          {...(block.speakable ? { 'data-speakable': 'true' } : {})}
        >
          {block.text}
        </p>
      );

    case 'heading': {
      const level = block.level || 'h2';
      const Tag = level;
      const className =
        level === 'h2'
          ? 'text-2xl md:text-3xl font-bold text-zinc-900 mt-12 mb-6 tracking-tight leading-tight'
          : 'text-xl md:text-2xl font-bold text-zinc-800 mt-8 mb-4 tracking-tight leading-tight';
      return (
        <Tag key={idx} className={className}>
          {block.text}
        </Tag>
      );
    }

    case 'table':
      return (
        <div key={idx} className="overflow-x-auto mb-8 rounded-2xl border border-zinc-100 shadow-sm">
          <table className="w-full text-sm md:text-base">
            {block.headers && (
              <thead>
                <tr className="bg-zinc-900 text-white">
                  {block.headers.map((header, hIdx) => (
                    <th
                      key={hIdx}
                      className="px-5 py-3 text-left font-bold text-xs uppercase tracking-wider first:rounded-tl-2xl last:rounded-tr-2xl"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            {block.rows && (
              <tbody>
                {block.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`border-b border-zinc-100 ${rIdx % 2 === 0 ? 'bg-white' : 'bg-zinc-50'} hover:bg-zinc-100 transition-colors`}
                  >
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-5 py-3 text-zinc-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      );

    case 'callout':
      return (
        <div
          key={idx}
          className="bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl p-6 mb-8 flex gap-4 items-start"
          {...(block.speakable ? { 'data-speakable': 'true' } : {})}
        >
          <p className="text-zinc-700 text-sm md:text-base leading-relaxed">{block.text}</p>
        </div>
      );

    case 'list':
      return (
        <ol key={idx} className="list-decimal list-inside space-y-2 mb-8 pl-2">
          {block.items?.map((item, iIdx) => (
            <li key={iIdx} className="text-zinc-600 text-sm md:text-base leading-relaxed pl-2">
              {item}
            </li>
          ))}
        </ol>
      );

    case 'formula':
      return (
        <div
          key={idx}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 flex gap-4 items-start"
        >
          <p className="text-blue-900 text-base md:text-lg font-semibold leading-relaxed">
            {block.text}
          </p>
        </div>
      );

    default:
      return null;
  }
}

/* ─── Article Page Component ─── */
export function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();

  const article = articles.find(a => a.id === articleId);

  if (!article) {
    return <NotFound />;
  }

  const relatedArticles = articles.filter(a => a.id !== article.id);

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Kiến thức', url: 'https://cuongthonggio.com/kien-thuc' },
    { name: article.headline, url: `https://cuongthonggio.com/kien-thuc/${article.id}` }
  ]);

  const articleSchema = makeArticleSchema({
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: article.author,
    url: `https://cuongthonggio.com/kien-thuc/${article.id}`
  });

  const faqSchema = makeFAQSchema(faqData);

  return (
    <div className="bg-white">
      <SEO
        title={article.headline}
        description={article.description}
        keywords={article.keywords}
        ogType="article"
        structuredData={[breadcrumb, articleSchema, faqSchema]}
        dateModified={article.dateModified}
      />

      {/* ─── Breadcrumb ─── */}
      <nav aria-label="Breadcrumb" className="pt-24 md:pt-28 pb-0 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ol
            className="flex items-center gap-2 text-xs text-zinc-400 font-medium flex-wrap"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Trang chủ</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-zinc-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/kien-thuc" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Kiến thức</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-zinc-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-zinc-900 font-bold">
                {article.headline.length > 60
                  ? article.headline.substring(0, 60) + '…'
                  : article.headline}
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* ─── Article Header ─── */}
      <header className="pt-8 pb-12 border-b border-zinc-100">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block px-4 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
                Kiến thức chuyên sâu
              </span>
              <time
                dateTime={article.datePublished}
                className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
              >
                {article.datePublished}
              </time>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6 max-w-4xl leading-[1.1]">
              {article.headline}
            </h1>

            <p className="text-zinc-500 text-base md:text-lg max-w-3xl leading-relaxed mb-8" data-speakable="true">
              {article.description}
            </p>

            {/* Author Info */}
            <div
              className="flex items-center gap-4"
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-white text-lg font-bold shrink-0">
                C
              </div>
              <div>
                <span className="text-sm font-bold text-zinc-900 block" itemProp="name">
                  {article.author}
                </span>
                <span
                  className="text-xs text-zinc-400 uppercase tracking-wider"
                  itemProp="jobTitle"
                >
                  Kỹ sư Cơ khí Thông gió — 13+ năm kinh nghiệm
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ─── Article Content ─── */}
      <article
        className="py-12 md:py-20"
        itemScope
        itemType="https://schema.org/Article"
      >
        <div className="max-w-4xl mx-auto px-6">
          <meta itemProp="headline" content={article.headline} />
          <meta itemProp="datePublished" content={article.datePublished} />
          <meta itemProp="dateModified" content={article.dateModified} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {article.content.map((block, idx) => renderBlock(block, idx))}
          </motion.div>
        </div>
      </article>

      {/* ─── Bottom CTA ─── */}
      <section className="py-20 md:py-32 bg-zinc-50 border-y border-zinc-100">
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
              Đội ngũ kỹ sư Cường Thông Gió sẵn sàng khảo sát, thiết kế và báo giá miễn phí — từ
              thông gió nhà xưởng đến PCCC tầng hầm.
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

      {/* ─── Related Articles ─── */}
      {relatedArticles.length > 0 && (
        <section className="py-20 md:py-32 bg-white" aria-label="Bài viết liên quan">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
                Bài viết liên quan
              </h2>
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed mb-12">
                Đọc thêm kiến thức chuyên sâu từ Cường Thông Gió
              </p>
            </motion.div>

            <div className="space-y-6">
              {relatedArticles.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Link
                    to={`/kien-thuc/${related.id}`}
                    className="block bg-white rounded-2xl border border-zinc-100 shadow-[0_2px_30px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_4px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500 p-8 md:p-10 group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                        Bài viết
                      </span>
                      <time
                        dateTime={related.datePublished}
                        className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                      >
                        {related.datePublished}
                      </time>
                    </div>

                    <h3 className="text-lg md:text-2xl font-bold text-zinc-900 mb-3 leading-tight tracking-tight group-hover:text-zinc-700 transition-colors">
                      {related.headline}
                    </h3>

                    <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
                      {related.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors">
                      <span>Đọc bài viết</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
