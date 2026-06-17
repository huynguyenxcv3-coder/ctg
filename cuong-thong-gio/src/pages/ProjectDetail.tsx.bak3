import { motion } from 'framer-motion'
import { Link, useParams, Navigate } from 'react-router-dom'
import type { Variants } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { SEO, makeBreadcrumbSchema } from '../components/SEO'
import { projects } from './projectsData'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const sectionLabels = [
  {
    key: 'problem' as const,
    title: 'Vấn đề',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-100',
  },
  {
    key: 'solution' as const,
    title: 'Giải pháp',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
  },
  {
    key: 'construction' as const,
    title: 'Thi công',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
  },
  {
    key: 'results' as const,
    title: 'Kết quả',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
  },
]

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-')
  const months = [
    '', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
  ]
  return `${months[parseInt(month)]}, ${year}`
}

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return <Navigate to="/du-an" replace />
  }

  const relatedProjects = projects
    .filter((p) => p.categorySlug === project.categorySlug && p.id !== project.id)
    .slice(0, 3)

  // If not enough related by same category, fill with other projects
  const moreRelated =
    relatedProjects.length < 3
      ? [
          ...relatedProjects,
          ...projects
            .filter((p) => p.id !== project.id && !relatedProjects.find((r) => r.id === p.id))
            .slice(0, 3 - relatedProjects.length),
        ]
      : relatedProjects

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Dự án', url: 'https://cuongthonggio.com/du-an' },
    { name: project.name, url: `https://cuongthonggio.com/du-an/${project.id}` },
  ])

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.name,
    description: project.problem.slice(0, 160),
    author: {
      '@type': 'Organization',
      name: 'Cường Thông Gió',
      url: 'https://cuongthonggio.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cường Thông Gió',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cuongthonggio.com/logo.png',
      },
    },
    datePublished: `${project.completedDate}-01`,
    dateModified: '2026-06-04',
    mainEntityOfPage: `https://cuongthonggio.com/du-an/${project.id}`,
    about: {
      '@type': 'Service',
      name: project.category,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Cường Thông Gió',
      },
      areaServed: {
        '@type': 'Place',
        name: project.location,
      },
    },
  }

  return (
    <div className="bg-white min-h-screen selection:bg-zinc-200 selection:text-zinc-900 relative font-sans text-zinc-900">
      <SEO
        title={`${project.name} — Dự Án Thực Tế`}
        description={`${project.category} tại ${project.location}. ${project.problem.slice(0, 120)}... Xem giải pháp và kết quả từ Cường Thông Gió.`}
        keywords={`${project.category}, ${project.location}, thông gió, Cường Thông Gió, dự án thực tế`}
        structuredData={[breadcrumb, projectSchema]}
        dateModified="2026-06-04"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-24 md:pt-28 pb-0 relative z-10 bg-white">
        <div className="container-custom">
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
              <Link to="/du-an" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Dự án</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-zinc-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-zinc-900 line-clamp-1">
                {project.name}
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero / Header */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16 relative z-10 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl">
            <motion.div variants={stagger} initial="hidden" animate="visible">
              {/* Category + Date */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-sm text-zinc-400">
                  {formatDate(project.completedDate)}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-zinc-900 leading-[1.15] mb-6"
              >
                {project.name}
              </motion.h1>

              {/* Meta info */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-6 text-sm text-zinc-500"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {project.location}
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  {project.area}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="pb-12 md:pb-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="border border-zinc-200 rounded-2xl overflow-hidden">
              <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200">
                <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                  Thông số kỹ thuật
                </h2>
              </div>
              <div className="divide-y divide-zinc-100">
                {project.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-zinc-50/50 transition-colors"
                  >
                    <span className="text-sm text-zinc-500 font-medium">{spec.label}</span>
                    <span className="text-sm font-bold text-zinc-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections: Problem → Solution → Construction → Results */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl space-y-8 md:space-y-12">
            {sectionLabels.map((section, idx) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <div className={`border ${section.borderColor} rounded-2xl overflow-hidden`}>
                  {/* Section header */}
                  <div className={`${section.bgColor} px-6 py-4 flex items-center gap-3`}>
                    <div className={section.color}>{section.icon}</div>
                    <h2 className="text-base font-bold text-zinc-900">{section.title}</h2>
                  </div>
                  {/* Section content */}
                  <div className="px-6 py-5 md:px-8 md:py-6 bg-white">
                    <p className="text-zinc-600 leading-relaxed text-[15px]">
                      {project[section.key]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-zinc-950 text-white">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight"
            >
              Cần giải pháp tương tự?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Liên hệ ngay để được tư vấn miễn phí và nhận báo giá trong 24 giờ.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:0905001224">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0905 001 224
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/lien-he">Gửi yêu cầu báo giá</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Projects */}
      {moreRelated.length > 0 && (
        <section className="py-16 md:py-24 bg-white border-t border-zinc-100">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">
                Dự án liên quan
              </h2>
              <p className="text-zinc-500 mt-2">
                Các dự án khác trong cùng lĩnh vực hoặc khu vực thi công.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {moreRelated.map((rel) => (
                <motion.div key={rel.id} variants={fadeUp}>
                  <Link to={`/du-an/${rel.id}`} className="group block h-full">
                    <article className="h-full border border-zinc-200 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-zinc-400 hover:shadow-lg hover:shadow-zinc-100 bg-white flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                        {rel.category}
                      </span>
                      <h3 className="text-lg font-bold text-zinc-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {rel.name}
                      </h3>
                      <p className="text-sm text-zinc-500 mb-4 flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-zinc-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {rel.location}
                      </p>
                      <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center gap-1 text-sm font-medium text-zinc-400 group-hover:text-zinc-900 transition-colors">
                        Xem chi tiết
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Back to all projects */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <Button variant="outline" asChild>
                <Link to="/du-an">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Xem tất cả dự án
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}
