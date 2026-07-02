import React, { useState, useCallback, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

import { Button } from '../components/ui/Button';
import { SEO, makeBreadcrumbSchema, makeProductSchema } from '../components/SEO';
import { getProductBySlug, getRelatedProducts, productsDetailList } from './productsDetailData';
import type { ProductDetailData } from './productsDetailData';

/* ─── Image Gallery (Shopee-style: main image + thumbnails) ─── */
function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const prev = useCallback(() =>
    setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() =>
    setCurrent(c => (c + 1) % images.length), [images.length]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative aspect-square bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 shadow-lg group cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={images[current]}
            src={images[current]}
            alt={`${title} — hình ảnh ${current + 1}`}
            loading={current === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
            >
              <span className="text-2xl font-bold leading-none text-zinc-700 -mt-1">&#8249;</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Ảnh tiếp theo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110"
            >
              <span className="text-2xl font-bold leading-none text-zinc-700 -mt-1">&#8250;</span>
            </button>
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrent(i)}
              aria-label={`Xem ảnh ${i + 1}`}
              className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === current
                  ? 'border-zinc-900 shadow-md ring-1 ring-zinc-900/20'
                  : 'border-zinc-200 hover:border-zinc-400 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              src={images[current]}
              alt={`${title} — phóng to`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl font-light"
              aria-label="Đóng"
            >
              ✕
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center transition-colors"
                  aria-label="Ảnh trước"
                >
                  <span className="text-4xl font-light leading-none text-white -mt-1">&#8249;</span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full flex items-center justify-center transition-colors"
                  aria-label="Ảnh tiếp theo"
                >
                  <span className="text-4xl font-light leading-none text-white -mt-1">&#8250;</span>
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Product Info Panel (right side, Shopee-style) ─── */
function ProductInfoPanel({ product }: { product: ProductDetailData }) {
  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center px-3 py-1.5 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
          {product.badge}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
        {product.title}
      </h1>

      {/* Short description */}
      <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
        {product.shortDesc}
      </p>

      {/* Install Note */}
      {product.installNote && (
        <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-100">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-0.5">Dịch vụ đi kèm</div>
            <p className="text-sm text-emerald-600 font-medium">{product.installNote}</p>
          </div>
        </div>
      )}

      {/* Highlights */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Điểm nổi bật</h3>
        <ul className="space-y-2.5">
          {product.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                ✓
              </div>
              <span className="text-sm text-zinc-600 leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button asChild size="lg" className="flex-1 rounded-xl h-14 bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest transition-all text-sm shadow-lg shadow-zinc-300/50">
          <Link to="/lien-he">
            Yêu cầu tư vấn
          </Link>
        </Button>
        <Button asChild size="lg" className="flex-1 rounded-xl h-14 bg-[#0068ff] hover:bg-[#0055dd] text-white font-bold uppercase tracking-widest transition-all text-sm shadow-lg shadow-blue-300/30">
          <a href="https://zalo.me/0905001224" target="_blank" rel="noopener noreferrer">
            Chat Zalo
          </a>
        </Button>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="flex items-center gap-2.5 bg-zinc-50 rounded-xl p-3 border border-zinc-100 justify-center text-center">
          <span className="text-xs font-semibold text-zinc-600">Giao hàng toàn Miền Trung</span>
        </div>
        <div className="flex items-center gap-2.5 bg-zinc-50 rounded-xl p-3 border border-zinc-100 justify-center text-center">
          <span className="text-xs font-semibold text-zinc-600">Bảo hành 12 tháng</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Specs Table ─── */
function SpecsTable({ specs }: { specs: ProductDetailData['specs'] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-zinc-900">
            <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-white" colSpan={2}>
              Thông số kỹ thuật
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {specs.map((spec, i) => (
            <tr key={i} className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 font-bold text-zinc-900 w-1/3">{spec.label}</td>
              <td className="px-6 py-4 text-zinc-600">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Description Section (Markdown-like rendered) ─── */
function DescriptionSection({ description }: { description: string; title?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Simple markdown-like renderer
  const renderDescription = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactElement[] = [];
    let listItems: React.ReactElement[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let tableHeader: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(<ul key={`list-${elements.length}`} className="space-y-2 my-4 pl-1">{listItems}</ul>);
        listItems = [];
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-6 rounded-xl border border-zinc-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-100">
                  {tableHeader.map((h, i) => (
                    <th key={i} className="px-4 py-3 text-left font-bold text-zinc-900 text-xs uppercase tracking-wider">{h.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {tableRows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-zinc-50">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-zinc-600">{cell.trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        tableHeader = [];
        inTable = false;
      }
    };

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();

      // Table rows
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const cells = trimmed.split('|').filter(c => c.trim() !== '');
        if (cells.every(c => /^[-:\s]+$/.test(c))) {
          // separator row, skip
          return;
        }
        if (!inTable) {
          flushList();
          inTable = true;
          tableHeader = cells;
        } else {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
      }

      // H2
      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={lineIdx} className="text-xl md:text-2xl font-bold text-zinc-900 mt-10 mb-4 tracking-tight flex items-center gap-3">
            <div className="w-1 h-6 bg-zinc-900 rounded-full" />
            {trimmed.slice(3)}
          </h2>
        );
        return;
      }

      // H3
      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={lineIdx} className="text-lg font-bold text-zinc-800 mt-6 mb-3">
            {trimmed.slice(4)}
          </h3>
        );
        return;
      }

      // Numbered list
      if (/^\d+\.\s/.test(trimmed)) {
        flushList();
        const text = trimmed.replace(/^\d+\.\s/, '');
        const boldMatch = text.match(/^\*\*(.*?)\*\*:?\s*(.*)/);
        elements.push(
          <div key={lineIdx} className="flex items-start gap-3 my-3">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center shrink-0 text-xs font-bold">
              {trimmed.match(/^(\d+)/)?.[1]}
            </div>
            <div>
              {boldMatch ? (
                <>
                  <span className="font-bold text-zinc-900">{boldMatch[1]}</span>
                  {boldMatch[2] && <span className="text-zinc-600">: {boldMatch[2]}</span>}
                </>
              ) : (
                <span className="text-zinc-600">{text}</span>
              )}
            </div>
          </div>
        );
        return;
      }

      // Bullet list
      if (trimmed.startsWith('- ')) {
        const text = trimmed.slice(2);
        const boldMatch = text.match(/^\*\*(.*?)\*\*:?\s*(.*)/);
        listItems.push(
          <li key={lineIdx} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0 mt-2" />
            <span className="text-zinc-600 leading-relaxed">
              {boldMatch ? (
                <>
                  <strong className="text-zinc-900 font-bold">{boldMatch[1]}</strong>
                  {boldMatch[2] && `: ${boldMatch[2]}`}
                </>
              ) : text}
            </span>
          </li>
        );
        return;
      }

      // Empty line
      if (trimmed === '') {
        flushList();
        return;
      }

      // Regular paragraph
      flushList();
      elements.push(
        <p key={lineIdx} className="text-zinc-600 leading-relaxed my-3">
          {trimmed}
        </p>
      );
    });

    flushList();
    flushTable();

    return elements;
  };

  const renderedContent = renderDescription(description);
  const maxCollapsedHeight = 400;

  return (
    <div className="relative">
      <div
        className={`overflow-hidden transition-all duration-500 ${!isExpanded ? 'max-h-[400px]' : 'max-h-none'}`}
        style={!isExpanded ? { maxHeight: `${maxCollapsedHeight}px` } : undefined}
      >
        <div className="prose-custom">
          {renderedContent}
        </div>
      </div>

      {/* Gradient overlay when collapsed */}
      {!isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}

      <div className="text-center pt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-sm uppercase tracking-wider rounded-xl transition-all group"
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm mô tả chi tiết'}
        </button>
      </div>
    </div>
  );
}

/* ─── Related Products ─── */
function RelatedProducts({ slugs, currentSlug }: { slugs: string[]; currentSlug: string }) {
  const related = getRelatedProducts(slugs).filter(p => p.slug !== currentSlug);

  if (related.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-100" aria-label="Sản phẩm liên quan">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 tracking-tight">
          Sản phẩm liên quan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link
              key={p.slug}
              to={`/san-pham/${p.slug}`}
              className="group bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden bg-zinc-50">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{p.badge}</span>
                <h3 className="text-lg font-bold text-zinc-900 mt-1 mb-2 group-hover:text-zinc-700 transition-colors">{p.title}</h3>
                <p className="text-sm text-zinc-500 line-clamp-2">{p.shortDesc}</p>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main ProductDetail Page ─── */
export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-6">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">Không tìm thấy sản phẩm</h1>
          <p className="text-zinc-500 mb-8">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
          <Button asChild className="rounded-xl px-8 h-14 bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest">
            <Link to="/san-pham">Xem tất cả sản phẩm</Link>
          </Button>
        </div>
      </div>
    );
  }

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Sản phẩm', url: 'https://cuongthonggio.com/san-pham' },
    { name: product.title, url: `https://cuongthonggio.com/san-pham/${product.slug}` }
  ]);

  const productSchema = makeProductSchema({
    name: product.title,
    description: product.shortDesc,
    image: product.imageUrl,
    category: 'Quạt công nghiệp & Thông gió'
  });

  return (
    <div className="bg-white">
      <SEO
        title={`${product.title} — Cường Thông Gió Đà Nẵng`}
        description={product.shortDesc}
        keywords={`${product.title}, ${product.badge}, quạt công nghiệp Đà Nẵng, Cường Thông Gió`}
        structuredData={[breadcrumb, productSchema]}
        dateModified="2026-06-14"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-24 md:pt-28 pb-0 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 transition-colors text-sm font-medium group"
            >
              Quay lại
            </button>
            <div className="w-px h-4 bg-zinc-200" />
            <ol className="flex items-center gap-2 text-xs text-zinc-400 font-medium" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" itemProp="item" className="hover:text-zinc-900 transition-colors">
                  <span itemProp="name">Trang chủ</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="text-zinc-300">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/san-pham" itemProp="item" className="hover:text-zinc-900 transition-colors">
                  <span itemProp="name">Sản phẩm</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="text-zinc-300">/</li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-zinc-900 font-bold">{product.title}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </div>
      </nav>

      {/* Product Main Section — Shopee-style 2 column layout */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-16"
          >
            {/* Left — Image Gallery */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-28 lg:self-start">
              <ProductGallery images={product.images} title={product.title} />
            </div>

            {/* Right — Product Info */}
            <div className="w-full lg:w-1/2">
              <ProductInfoPanel product={product} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specs + Description Tabs Section */}
      <section className="py-12 md:py-16 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <ProductTabs product={product} />
        </div>
      </section>

      {/* All Products Grid */}
      <section className="py-16 md:py-24 bg-white border-t border-zinc-100" aria-label="Tất cả sản phẩm">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 tracking-tight text-center">
            Tất cả sản phẩm của Cường Thông Gió
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {productsDetailList.map((p) => (
              <Link
                key={p.slug}
                to={`/san-pham/${p.slug}`}
                className={`group bg-white rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${
                  p.slug === product.slug
                    ? 'border-zinc-900 ring-1 ring-zinc-900/10 shadow-md'
                    : 'border-zinc-100 hover:border-zinc-300'
                }`}
              >
                <div className="aspect-square overflow-hidden bg-zinc-50">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{p.badge}</span>
                  <h3 className="text-xs md:text-sm font-bold text-zinc-900 mt-1 line-clamp-2 group-hover:text-zinc-700 transition-colors leading-snug">{p.title}</h3>
                  {p.slug === product.slug && (
                    <span className="inline-block mt-2 text-[9px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-100 px-2 py-0.5 rounded-full">Đang xem</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts slugs={product.relatedSlugs} currentSlug={product.slug} />

      {/* CTA Bottom */}
      <section className="py-20 md:py-28 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.03),transparent)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Bạn cần tư vấn về {product.title.toLowerCase()}?
          </h2>
          <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Đội ngũ kỹ thuật 13+ năm kinh nghiệm sẵn sàng tư vấn, báo giá và lắp đặt tận nơi tại Đà Nẵng và Miền Trung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-xl px-12 h-16 bg-white text-zinc-900 hover:bg-zinc-100 font-bold uppercase tracking-[0.2em] shadow-2xl text-sm">
              <Link to="/lien-he">Nhận báo giá ngay</Link>
            </Button>
            <Button asChild size="lg" className="rounded-xl px-12 h-16 bg-[#0068ff] hover:bg-[#0055dd] text-white font-bold uppercase tracking-[0.2em] shadow-2xl text-sm border-none">
              <a href="tel:0905001224">
                0905 001 224
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Tabs Component ─── */
function ProductTabs({ product }: { product: ProductDetailData }) {
  const [activeTab, setActiveTab] = useState<'description' | 'specs'>('description');

  const tabs = [
    { key: 'description' as const, label: 'Mô tả sản phẩm' },
    { key: 'specs' as const, label: 'Thông số kỹ thuật' },
  ];

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex gap-0 border-b border-zinc-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 md:px-10 py-4 text-sm md:text-base font-bold uppercase tracking-wider transition-all relative ${
              activeTab === tab.key
                ? 'text-zinc-900'
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'description' && (
          <motion.div
            key="description"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl"
          >
            <DescriptionSection description={product.description} title={product.title} />
          </motion.div>
        )}
        {activeTab === 'specs' && (
          <motion.div
            key="specs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl"
          >
            <SpecsTable specs={product.specs} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
