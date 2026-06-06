import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Variants } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Button } from '../components/ui/Button'
import { SEO, makeBreadcrumbSchema } from '../components/SEO'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

type DuctShape = 'round' | 'rectangular'

const velocityReference = [
  { application: 'Ống chính (Main duct)', velocity: '6 – 10', note: 'Hệ thống cấp/hút chung' },
  { application: 'Ống nhánh (Branch duct)', velocity: '4 – 8', note: 'Phân phối đến từng khu vực' },
  { application: 'Hút bụi công nghiệp', velocity: '15 – 20', note: 'Đảm bảo vận chuyển hạt bụi' },
  { application: 'Hút khói hàn / khí nóng', velocity: '8 – 12', note: 'Cân bằng hút hiệu quả & ồn' },
  { application: 'Thông gió tầng hầm', velocity: '6 – 8', note: 'QCVN 13:2018/BXD' },
  { application: 'Cấp gió tươi văn phòng', velocity: '3 – 5', note: 'Giảm tiếng ồn tối đa' },
  { application: 'Ống gió bếp', velocity: '8 – 12', note: 'Hút dầu mỡ hiệu quả' },
  { application: 'Hệ PCCC (tăng áp cầu thang)', velocity: '8 – 15', note: 'Theo TCVN / NFPA' },
]

/** Standard rectangular duct sizes (mm) commonly used in Vietnam */
const standardWidths = [200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600]

function getSuggestedRectSizes(areaM2: number): { w: number; h: number; actualArea: number; ratio: number }[] {
  if (areaM2 <= 0) return []
  const areaMm2 = areaM2 * 1e6
  const suggestions: { w: number; h: number; actualArea: number; ratio: number }[] = []

  for (const w of standardWidths) {
    const hExact = areaMm2 / w
    // Round h to nearest 50mm
    const h = Math.round(hExact / 50) * 50
    if (h < 150 || h > 1600) continue
    const ratio = Math.max(w, h) / Math.min(w, h)
    // SMACNA recommends aspect ratio ≤ 4:1
    if (ratio > 4.1) continue
    const actualArea = w * h / 1e6
    suggestions.push({ w, h, actualArea, ratio })
  }

  // Sort by how close actual area is to required area
  suggestions.sort((a, b) => Math.abs(a.actualArea - areaM2) - Math.abs(b.actualArea - areaM2))
  return suggestions.slice(0, 6)
}

const breadcrumb = makeBreadcrumbSchema([
  { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
  { name: 'Công cụ tính toán', url: 'https://cuongthonggio.com/cong-cu' },
  { name: 'Tính tiết diện ống gió', url: 'https://cuongthonggio.com/cong-cu/tinh-tiet-dien-ong-gio' },
])

export function DuctSizingCalculator() {
  const [airflow, setAirflow] = useState<string>('5000')
  const [velocity, setVelocity] = useState<string>('8')
  const [ductShape, setDuctShape] = useState<DuctShape>('round')

  const results = useMemo(() => {
    const q = parseFloat(airflow) || 0 // m³/h
    const v = parseFloat(velocity) || 0 // m/s

    if (q <= 0 || v <= 0) {
      return { areaM2: 0, diameterMm: 0, rectSuggestions: [], qM3s: 0 }
    }

    const qM3s = q / 3600
    const areaM2 = qM3s / v

    // Round duct: D = sqrt(4A/π)
    const diameterM = Math.sqrt((4 * areaM2) / Math.PI)
    const diameterMm = Math.round(diameterM * 1000)

    // Rectangular duct suggestions
    const rectSuggestions = getSuggestedRectSizes(areaM2)

    return {
      areaM2: Math.round(areaM2 * 1e6) / 1e6,
      areaCm2: Math.round(areaM2 * 1e4 * 100) / 100,
      diameterMm,
      rectSuggestions,
      qM3s: Math.round(qM3s * 1000) / 1000,
    }
  }, [airflow, velocity])

  const inputClass =
    'w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'

  return (
    <>
      <SEO
        title="Tính Tiết Diện Ống Gió — Ống Tròn & Chữ Nhật"
        description="Công cụ tính kích thước ống gió miễn phí. Xác định đường kính ống tròn hoặc kích thước ống chữ nhật dựa trên lưu lượng gió và vận tốc. Tham chiếu tiêu chuẩn SMACNA."
        keywords="tính tiết diện ống gió, kích thước ống gió, ống gió tròn, ống gió chữ nhật, duct sizing calculator, SMACNA, tính đường kính ống gió"
        structuredData={breadcrumb}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto max-w-3xl">
            <motion.nav variants={fadeUp} className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
              <Link to="/" className="hover:text-zinc-300 transition-colors">Trang chủ</Link>
              <span>/</span>
              <Link to="/cong-cu" className="hover:text-zinc-300 transition-colors">Công cụ</Link>
              <span>/</span>
              <span className="text-zinc-300">Tính tiết diện ống gió</span>
            </motion.nav>
            <motion.h1 variants={fadeUp} className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Tính Tiết Diện Ống Gió
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-zinc-400">
              Xác định kích thước ống gió tròn hoặc chữ nhật dựa trên lưu lượng và vận tốc gió thiết kế.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-zinc-950 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid gap-8 lg:grid-cols-5"
            >
              {/* Inputs */}
              <motion.div variants={fadeUp} className="lg:col-span-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:p-8">
                <h2 className="mb-6 text-lg font-bold text-white">Thông số đầu vào</h2>

                {/* Airflow */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Lưu lượng gió Q (m³/h)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={airflow}
                    onChange={(e) => setAirflow(e.target.value)}
                    className={inputClass}
                    placeholder="5000"
                  />
                  <p className="mt-1 text-xs text-zinc-500">
                    Tương đương: {results.qM3s} m³/s
                  </p>
                </div>

                {/* Velocity */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Vận tốc gió v (m/s)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={velocity}
                    onChange={(e) => setVelocity(e.target.value)}
                    className={inputClass}
                    placeholder="8"
                  />
                  <p className="mt-1 text-xs text-zinc-500">
                    Khuyến nghị: 6–10 m/s cho ống chính, 4–8 m/s cho ống nhánh
                  </p>
                </div>

                {/* Duct shape */}
                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-zinc-300">
                    Loại ống gió
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDuctShape('round')}
                      className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                        ductShape === 'round'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                        Ống tròn
                      </div>
                    </button>
                    <button
                      onClick={() => setDuctShape('rectangular')}
                      className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                        ductShape === 'rectangular'
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <rect x="4" y="6" width="16" height="12" rx="1" />
                        </svg>
                        Ống chữ nhật
                      </div>
                    </button>
                  </div>
                </div>

                {/* Formula */}
                <div className="rounded-xl bg-zinc-800/50 p-4">
                  <p className="text-xs font-medium text-zinc-400 mb-2">Công thức tính:</p>
                  {ductShape === 'round' ? (
                    <p className="font-mono text-sm text-blue-400">
                      D = √(4Q / πv) = √(4 × {results.qM3s} / (π × {velocity || 0}))
                      {results.diameterMm > 0 && (
                        <> = <span className="font-bold text-white">{results.diameterMm} mm</span></>
                      )}
                    </p>
                  ) : (
                    <p className="font-mono text-sm text-blue-400">
                      A = Q / v = {results.qM3s} / {velocity || 0}
                      {results.areaM2 > 0 && (
                        <> = <span className="font-bold text-white">{results.areaCm2} cm²</span></>
                      )}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Results */}
              <motion.div variants={fadeUp} className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-zinc-900/50 p-6 lg:p-8">
                  <h2 className="mb-6 text-lg font-bold text-white">Kết quả tính toán</h2>

                  {ductShape === 'round' ? (
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Đường kính ống tròn</p>
                        <p className="mt-1 text-4xl font-bold text-white">
                          {results.diameterMm > 0 ? results.diameterMm : '—'}
                        </p>
                        <p className="text-sm text-blue-400">mm</p>
                      </div>
                      <div className="h-px bg-zinc-700/50" />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Tiết diện ống</p>
                        <p className="mt-1 text-2xl font-bold text-white">
                          {results.areaM2 > 0 ? results.areaCm2 : '—'}
                        </p>
                        <p className="text-sm text-zinc-400">cm²</p>
                      </div>
                      {results.diameterMm > 0 && (
                        <>
                          <div className="h-px bg-zinc-700/50" />
                          <div className="rounded-lg bg-zinc-800/60 p-3">
                            <p className="text-xs font-semibold text-zinc-300 mb-1">Đường kính tiêu chuẩn gần nhất:</p>
                            <p className="text-sm text-blue-400 font-mono">
                              ∅{Math.ceil(results.diameterMm / 50) * 50} mm
                              <span className="text-zinc-500 ml-2">(làm tròn lên 50mm)</span>
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Diện tích tiết diện yêu cầu</p>
                        <p className="mt-1 text-3xl font-bold text-white">
                          {results.areaM2 > 0 ? results.areaCm2 : '—'}
                        </p>
                        <p className="text-sm text-blue-400">cm²</p>
                      </div>
                      {results.rectSuggestions.length > 0 && (
                        <>
                          <div className="h-px bg-zinc-700/50" />
                          <div>
                            <p className="text-xs font-semibold text-zinc-300 mb-3">Kích thước W × H đề xuất:</p>
                            <div className="space-y-2">
                              {results.rectSuggestions.map((s, i) => (
                                <div
                                  key={i}
                                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                                    i === 0
                                      ? 'bg-blue-500/10 border border-blue-500/30'
                                      : 'bg-zinc-800/50'
                                  }`}
                                >
                                  <span className={`font-mono font-semibold ${i === 0 ? 'text-blue-400' : 'text-zinc-300'}`}>
                                    {s.w} × {s.h} mm
                                  </span>
                                  <span className="text-xs text-zinc-500">
                                    {(s.ratio).toFixed(1)}:1
                                  </span>
                                </div>
                              ))}
                            </div>
                            <p className="mt-2 text-xs text-zinc-500">
                              * Tỷ lệ W:H khuyến nghị ≤ 4:1 (SMACNA)
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <p className="text-sm font-medium text-zinc-300 mb-3">Bước tiếp theo</p>
                  <Button asChild size="default" className="w-full">
                    <Link to="/cong-cu/tinh-cong-suat-quat">
                      Tính công suất quạt →
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Velocity Reference Table */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:p-8"
            >
              <h2 className="mb-6 text-lg font-bold text-white">
                Bảng tra vận tốc gió khuyến nghị
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="pb-3 pr-4 font-semibold text-zinc-300">Ứng dụng</th>
                      <th className="pb-3 pr-4 font-semibold text-zinc-300">Vận tốc (m/s)</th>
                      <th className="pb-3 font-semibold text-zinc-300">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {velocityReference.map((row, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4 text-zinc-300">{row.application}</td>
                        <td className="py-3 pr-4 font-mono text-blue-400">{row.velocity}</td>
                        <td className="py-3 text-zinc-500">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="mt-12 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-8 text-center lg:p-12"
            >
              <h2 className="text-2xl font-bold text-white">
                Cần tư vấn chuyên sâu?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-zinc-400">
                Cường Thông Gió chuyên gia công ống gió tròn xoắn, ống gió chữ nhật theo tiêu chuẩn SMACNA.
                Liên hệ để được tư vấn kích thước và vật liệu phù hợp cho dự án của bạn.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link to="/lien-he">Liên hệ Cường Thông Gió</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:0905001224">Gọi ngay: 0905 001 224</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
