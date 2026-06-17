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

interface SpaceType {
  label: string
  achMin: number
  achMax: number
  description: string
}

const spaceTypes: SpaceType[] = [
  { label: 'Nhà xưởng sản xuất thông thường', achMin: 6, achMax: 10, description: 'Xưởng lắp ráp, gia công nhẹ' },
  { label: 'Nhà xưởng có nhiệt/khói', achMin: 15, achMax: 30, description: 'Xưởng hàn, đúc, nhiệt luyện' },
  { label: 'Bếp công nghiệp', achMin: 20, achMax: 30, description: 'Bếp nhà hàng, canteen, khách sạn' },
  { label: 'Tầng hầm để xe', achMin: 6, achMax: 10, description: 'Hầm xe chung cư, tòa nhà' },
  { label: 'Văn phòng', achMin: 4, achMax: 6, description: 'Văn phòng làm việc, phòng họp' },
  { label: 'Kho hàng', achMin: 3, achMax: 6, description: 'Kho chứa hàng thông thường' },
  { label: 'Phòng sạch (Clean Room)', achMin: 20, achMax: 60, description: 'Phòng sạch cấp 100–10.000' },
]

const achReferenceTable = [
  { space: 'Nhà xưởng sản xuất thông thường', ach: '6 – 10', note: 'Theo ASHRAE / QCVN' },
  { space: 'Nhà xưởng có nhiệt / khói', ach: '15 – 30', note: 'Tùy mức phát nhiệt' },
  { space: 'Bếp công nghiệp', ach: '20 – 30', note: 'NFPA 96' },
  { space: 'Tầng hầm để xe', ach: '6 – 10', note: 'QCVN 13:2018/BXD' },
  { space: 'Văn phòng', ach: '4 – 6', note: 'ASHRAE 62.1' },
  { space: 'Kho hàng', ach: '3 – 6', note: 'Hàng hóa thông thường' },
  { space: 'Phòng sạch', ach: '20 – 60', note: 'ISO 14644' },
  { space: 'Phòng máy / Data Center', ach: '15 – 30', note: 'ASHRAE TC 9.9' },
  { space: 'Nhà vệ sinh công cộng', ach: '10 – 15', note: 'Hút mùi liên tục' },
  { space: 'Phòng thí nghiệm', ach: '6 – 12', note: 'Tùy hóa chất sử dụng' },
]

const breadcrumb = makeBreadcrumbSchema([
  { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
  { name: 'Công cụ tính toán', url: 'https://cuongthonggio.com/cong-cu' },
  { name: 'Tính lưu lượng gió', url: 'https://cuongthonggio.com/cong-cu/tinh-luu-luong-gio' },
])

export function AirflowCalculator() {
  const [length, setLength] = useState<string>('20')
  const [width, setWidth] = useState<string>('15')
  const [height, setHeight] = useState<string>('6')
  const [spaceIndex, setSpaceIndex] = useState<number>(0)
  const [achOverride, setAchOverride] = useState<string>('')

  const results = useMemo(() => {
    const l = parseFloat(length) || 0
    const w = parseFloat(width) || 0
    const h = parseFloat(height) || 0
    const volume = l * w * h

    const space = spaceTypes[spaceIndex]
    const achValue = achOverride
      ? parseFloat(achOverride) || 0
      : (space.achMin + space.achMax) / 2

    const qM3h = volume * achValue
    const qCfm = qM3h / 1.699
    const qLs = qM3h / 3.6

    return {
      volume: Math.round(volume * 100) / 100,
      ach: Math.round(achValue * 10) / 10,
      achMin: space.achMin,
      achMax: space.achMax,
      qM3h: Math.round(qM3h),
      qCfm: Math.round(qCfm),
      qLs: Math.round(qLs * 10) / 10,
    }
  }, [length, width, height, spaceIndex, achOverride])

  const inputClass =
    'w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'

  return (
    <>
      <SEO
        title="Tính Lưu Lượng Gió — Công Cụ Tính ACH Online"
        description="Công cụ tính lưu lượng gió miễn phí theo phương pháp ACH (Air Changes per Hour). Nhập kích thước phòng và loại không gian để tính lưu lượng thông gió cần thiết (m³/h, CFM, l/s)."
        keywords="tính lưu lượng gió, tính ACH, air changes per hour, thông gió nhà xưởng, calculator lưu lượng gió, m3/h, CFM"
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
              <span className="text-zinc-300">Tính lưu lượng gió</span>
            </motion.nav>
            <motion.h1 variants={fadeUp} className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Tính Lưu Lượng Gió
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-zinc-400">
              Xác định lưu lượng thông gió cần thiết dựa trên thể tích phòng và số lần trao đổi không khí (ACH).
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

                {/* Room dimensions */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Kích thước phòng
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="mb-1 block text-xs text-zinc-500">Dài (m)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className={inputClass}
                        placeholder="20"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-zinc-500">Rộng (m)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className={inputClass}
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-zinc-500">Cao (m)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className={inputClass}
                        placeholder="6"
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">
                    Thể tích: <span className="font-semibold text-zinc-300">{results.volume.toLocaleString()} m³</span>
                  </p>
                </div>

                {/* Space type */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Loại không gian
                  </label>
                  <select
                    value={spaceIndex}
                    onChange={(e) => {
                      setSpaceIndex(Number(e.target.value))
                      setAchOverride('')
                    }}
                    className={inputClass + ' cursor-pointer'}
                  >
                    {spaceTypes.map((s, i) => (
                      <option key={i} value={i} className="bg-zinc-800">
                        {s.label} ({s.achMin}–{s.achMax} ACH)
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-xs text-zinc-500">
                    {spaceTypes[spaceIndex].description}
                  </p>
                </div>

                {/* ACH override */}
                <div className="mb-2">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Hệ số ACH tùy chỉnh{' '}
                    <span className="font-normal text-zinc-500">(tùy chọn)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={achOverride}
                    onChange={(e) => setAchOverride(e.target.value)}
                    className={inputClass}
                    placeholder={`Mặc định: ${(spaceTypes[spaceIndex].achMin + spaceTypes[spaceIndex].achMax) / 2} ACH (trung bình)`}
                  />
                </div>

                {/* Formula */}
                <div className="mt-6 rounded-xl bg-zinc-800/50 p-4">
                  <p className="text-xs font-medium text-zinc-400 mb-2">Công thức tính:</p>
                  <p className="font-mono text-sm text-blue-400">
                    Q = V × ACH = {results.volume.toLocaleString()} × {results.ach} = <span className="font-bold text-white">{results.qM3h.toLocaleString()} m³/h</span>
                  </p>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div variants={fadeUp} className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-zinc-900/50 p-6 lg:p-8">
                  <h2 className="mb-6 text-lg font-bold text-white">Kết quả tính toán</h2>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Lưu lượng gió</p>
                      <p className="mt-1 text-4xl font-bold text-white">{results.qM3h.toLocaleString()}</p>
                      <p className="text-sm text-blue-400">m³/h</p>
                    </div>

                    <div className="h-px bg-zinc-700/50" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">CFM</p>
                        <p className="mt-1 text-2xl font-bold text-white">{results.qCfm.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Lít/giây</p>
                        <p className="mt-1 text-2xl font-bold text-white">{results.qLs.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="h-px bg-zinc-700/50" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-zinc-500">Thể tích phòng</p>
                        <p className="text-sm font-semibold text-zinc-300">{results.volume.toLocaleString()} m³</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">ACH sử dụng</p>
                        <p className="text-sm font-semibold text-zinc-300">{results.ach} lần/giờ</p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-zinc-800/60 p-3">
                      <p className="text-xs text-zinc-400">
                        <span className="font-semibold text-zinc-300">Khoảng ACH khuyến nghị:</span>{' '}
                        {results.achMin} – {results.achMax} ACH
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Kết quả tương ứng: {(results.volume * results.achMin).toLocaleString()} – {(results.volume * results.achMax).toLocaleString()} m³/h
                      </p>
                    </div>
                  </div>
                </div>

                {/* Next step */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <p className="text-sm font-medium text-zinc-300 mb-3">Bước tiếp theo</p>
                  <Button asChild size="default" className="w-full">
                    <Link to="/cong-cu/tinh-tiet-dien-ong-gio">
                      Tính tiết diện ống gió →
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Reference Table */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:p-8"
            >
              <h2 className="mb-6 text-lg font-bold text-white">
                Bảng tra hệ số ACH theo loại không gian
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="pb-3 pr-4 font-semibold text-zinc-300">Loại không gian</th>
                      <th className="pb-3 pr-4 font-semibold text-zinc-300">ACH (lần/giờ)</th>
                      <th className="pb-3 font-semibold text-zinc-300">Tiêu chuẩn tham chiếu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {achReferenceTable.map((row, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4 text-zinc-300">{row.space}</td>
                        <td className="py-3 pr-4 font-mono text-blue-400">{row.ach}</td>
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
                Đội ngũ kỹ sư của chúng tôi sẵn sàng hỗ trợ tính toán chi tiết và thiết kế
                hệ thống thông gió tối ưu cho công trình của bạn.
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
