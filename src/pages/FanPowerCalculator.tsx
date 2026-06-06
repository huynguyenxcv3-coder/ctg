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

/** Standard IEC motor sizes in kW */
const standardMotorSizes = [0.37, 0.55, 0.75, 1.1, 1.5, 2.2, 3, 4, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45, 55, 75, 90, 110, 132, 160]

function getRecommendedMotor(powerKw: number): number {
  for (const size of standardMotorSizes) {
    if (size >= powerKw) return size
  }
  return standardMotorSizes[standardMotorSizes.length - 1]
}

const safetyFactors = [
  { value: 1.0, label: '1.00 — Không có hệ số an toàn' },
  { value: 1.1, label: '1.10 — Tiêu chuẩn (khuyến nghị)' },
  { value: 1.15, label: '1.15 — An toàn cao' },
  { value: 1.2, label: '1.20 — Dự phòng lớn' },
]

const fanPressureReference = [
  { type: 'Quạt hướng trục (Axial)', pressure: '50 – 300', application: 'Thông gió chung, hút mái' },
  { type: 'Quạt ly tâm áp thấp', pressure: '200 – 500', application: 'Cấp gió tươi, thông gió tầng hầm' },
  { type: 'Quạt ly tâm áp trung', pressure: '500 – 1.500', application: 'Hệ thống ống gió dài, lọc bụi' },
  { type: 'Quạt ly tâm áp cao', pressure: '1.500 – 5.000', application: 'Hút bụi, lò hơi, tháp hấp thụ' },
  { type: 'Quạt PCCC (tăng áp)', pressure: '300 – 1.000', application: 'Tăng áp cầu thang, buồng đệm' },
  { type: 'Quạt Plug Fan (EC)', pressure: '200 – 1.200', application: 'AHU, hệ thống HVAC hiện đại' },
  { type: 'Quạt hút mái (Roof)', pressure: '50 – 200', application: 'Thông gió mái nhà xưởng' },
]

const breadcrumb = makeBreadcrumbSchema([
  { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
  { name: 'Công cụ tính toán', url: 'https://cuongthonggio.com/cong-cu' },
  { name: 'Tính công suất quạt', url: 'https://cuongthonggio.com/cong-cu/tinh-cong-suat-quat' },
])

export function FanPowerCalculator() {
  const [airflow, setAirflow] = useState<string>('5000')
  const [pressure, setPressure] = useState<string>('500')
  const [efficiency, setEfficiency] = useState<string>('70')
  const [safetyFactor, setSafetyFactor] = useState<number>(1.1)

  const results = useMemo(() => {
    const q = parseFloat(airflow) || 0 // m³/h
    const dp = parseFloat(pressure) || 0 // Pa
    const eta = parseFloat(efficiency) || 0 // %

    if (q <= 0 || dp <= 0 || eta <= 0) {
      return { powerW: 0, powerKw: 0, powerHp: 0, motorKw: 0, motorHp: 0 }
    }

    // P = (Q × ΔP) / (3600 × η) × safety_factor
    const powerW = (q * dp) / (3600 * (eta / 100)) * safetyFactor
    const powerKw = powerW / 1000
    const powerHp = powerKw * 1.341

    const motorKw = getRecommendedMotor(powerKw)
    const motorHp = motorKw * 1.341

    return {
      powerW: Math.round(powerW * 10) / 10,
      powerKw: Math.round(powerKw * 100) / 100,
      powerHp: Math.round(powerHp * 100) / 100,
      motorKw,
      motorHp: Math.round(motorHp * 100) / 100,
    }
  }, [airflow, pressure, efficiency, safetyFactor])

  const inputClass =
    'w-full rounded-xl border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30'

  return (
    <>
      <SEO
        title="Tính Công Suất Quạt — Fan Power Calculator"
        description="Công cụ tính công suất quạt công nghiệp miễn phí. Nhập lưu lượng gió, áp suất tĩnh và hiệu suất quạt để tính công suất motor cần thiết (kW, HP). Đề xuất motor tiêu chuẩn IEC."
        keywords="tính công suất quạt, fan power calculator, công suất motor quạt, kW HP quạt công nghiệp, tính toán quạt ly tâm, quạt hướng trục"
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
              <span className="text-zinc-300">Tính công suất quạt</span>
            </motion.nav>
            <motion.h1 variants={fadeUp} className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Tính Công Suất Quạt
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-zinc-400">
              Xác định công suất quạt cần thiết dựa trên lưu lượng gió, áp suất tĩnh và hiệu suất. Đề xuất motor tiêu chuẩn IEC phù hợp.
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
                </div>

                {/* Pressure */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Áp suất tĩnh ΔP (Pa)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={pressure}
                    onChange={(e) => setPressure(e.target.value)}
                    className={inputClass}
                    placeholder="500"
                  />
                  <p className="mt-1 text-xs text-zinc-500">
                    Tham khảo bảng áp suất bên dưới theo loại quạt
                  </p>
                </div>

                {/* Efficiency */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Hiệu suất quạt η (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="10"
                      max="100"
                      step="5"
                      value={efficiency}
                      onChange={(e) => setEfficiency(e.target.value)}
                      className={inputClass}
                      placeholder="70"
                    />
                  </div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {[60, 65, 70, 75, 80, 85].map((v) => (
                      <button
                        key={v}
                        onClick={() => setEfficiency(String(v))}
                        className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                          efficiency === String(v)
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600'
                        }`}
                      >
                        {v}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Safety Factor */}
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Hệ số an toàn
                  </label>
                  <select
                    value={safetyFactor}
                    onChange={(e) => setSafetyFactor(Number(e.target.value))}
                    className={inputClass + ' cursor-pointer'}
                  >
                    {safetyFactors.map((sf) => (
                      <option key={sf.value} value={sf.value} className="bg-zinc-800">
                        {sf.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Formula */}
                <div className="rounded-xl bg-zinc-800/50 p-4">
                  <p className="text-xs font-medium text-zinc-400 mb-2">Công thức tính:</p>
                  <p className="font-mono text-sm text-blue-400">
                    P = (Q × ΔP) / (3600 × η) × SF
                  </p>
                  <p className="font-mono text-sm text-blue-400 mt-1">
                    P = ({airflow || 0} × {pressure || 0}) / (3600 × {(parseFloat(efficiency) || 0) / 100}) × {safetyFactor}
                    {results.powerKw > 0 && (
                      <> = <span className="font-bold text-white">{results.powerKw} kW</span></>
                    )}
                  </p>
                </div>
              </motion.div>

              {/* Results */}
              <motion.div variants={fadeUp} className="lg:col-span-2 space-y-4">
                <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-zinc-900/50 p-6 lg:p-8">
                  <h2 className="mb-6 text-lg font-bold text-white">Kết quả tính toán</h2>

                  <div className="space-y-5">
                    {/* Shaft power */}
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Công suất trục quạt</p>
                      <p className="mt-1 text-4xl font-bold text-white">
                        {results.powerKw > 0 ? results.powerKw : '—'}
                      </p>
                      <p className="text-sm text-blue-400">kW</p>
                    </div>

                    <div className="h-px bg-zinc-700/50" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Watt</p>
                        <p className="mt-1 text-2xl font-bold text-white">
                          {results.powerW > 0 ? results.powerW.toLocaleString() : '—'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Mã lực (HP)</p>
                        <p className="mt-1 text-2xl font-bold text-white">
                          {results.powerHp > 0 ? results.powerHp : '—'}
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-zinc-700/50" />

                    {/* Motor recommendation */}
                    {results.powerKw > 0 && (
                      <div className="rounded-lg bg-zinc-800/60 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                          Motor đề xuất (IEC)
                        </p>
                        <div className="flex items-end gap-3">
                          <div>
                            <p className="text-3xl font-bold text-green-400">{results.motorKw}</p>
                            <p className="text-sm text-zinc-400">kW</p>
                          </div>
                          <div className="text-zinc-600 text-2xl">/</div>
                          <div>
                            <p className="text-3xl font-bold text-green-400">{results.motorHp}</p>
                            <p className="text-sm text-zinc-400">HP</p>
                          </div>
                        </div>
                        <p className="mt-3 text-xs text-zinc-500">
                          Kích thước motor tiêu chuẩn IEC gần nhất ≥ công suất tính toán.
                          Đã bao gồm hệ số an toàn ×{safetyFactor}.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick links */}
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                  <p className="text-sm font-medium text-zinc-300 mb-3">Các công cụ khác</p>
                  <div className="space-y-2">
                    <Button asChild variant="outline" size="default" className="w-full">
                      <Link to="/cong-cu/tinh-luu-luong-gio">
                        ← Tính lưu lượng gió
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="default" className="w-full">
                      <Link to="/cong-cu/tinh-tiet-dien-ong-gio">
                        ← Tính tiết diện ống gió
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Motor Sizes Reference */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:p-8"
            >
              <h2 className="mb-6 text-lg font-bold text-white">
                Bảng tra áp suất theo loại quạt
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="pb-3 pr-4 font-semibold text-zinc-300">Loại quạt</th>
                      <th className="pb-3 pr-4 font-semibold text-zinc-300">Áp suất (Pa)</th>
                      <th className="pb-3 font-semibold text-zinc-300">Ứng dụng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fanPressureReference.map((row, i) => (
                      <tr key={i} className="border-b border-zinc-800/50">
                        <td className="py-3 pr-4 text-zinc-300">{row.type}</td>
                        <td className="py-3 pr-4 font-mono text-blue-400">{row.pressure}</td>
                        <td className="py-3 text-zinc-500">{row.application}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Standard Motor Sizes */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 lg:p-8"
            >
              <h2 className="mb-4 text-lg font-bold text-white">
                Dãy công suất motor tiêu chuẩn IEC
              </h2>
              <div className="flex flex-wrap gap-2">
                {standardMotorSizes.map((size) => (
                  <span
                    key={size}
                    className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-all ${
                      results.motorKw === size
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30 ring-1 ring-green-500/20'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {size} kW
                  </span>
                ))}
              </div>
              {results.motorKw > 0 && (
                <p className="mt-3 text-xs text-zinc-500">
                  ✓ Motor <span className="text-green-400 font-semibold">{results.motorKw} kW</span> được đề xuất cho công suất tính toán {results.powerKw} kW
                </p>
              )}
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
                Cường Thông Gió chuyên sản xuất quạt ly tâm, quạt hướng trục với đa dạng công suất.
                Liên hệ để được tư vấn chọn quạt phù hợp nhất cho hệ thống của bạn.
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
