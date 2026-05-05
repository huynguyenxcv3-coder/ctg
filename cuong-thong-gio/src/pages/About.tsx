import { Award, Users, Clock, Target, CheckCircle, Factory, Building2, Wind } from 'lucide-react'
import { Link } from 'react-router-dom'

const milestones = [
  {
    year: '2009',
    title: 'Thành Lập Công Ty',
    desc: 'Công ty TNHH MTV Cường Thống Gió được thành lập với vốn điều lệ ban đầu và đội ngũ 10 kỹ sư.',
  },
  {
    year: '2013',
    title: 'Mở Rộng Thị Trường',
    desc: 'Phủ sóng khắp miền Nam, ký hợp đồng với các khu công nghiệp lớn tại Bình Dương, Đồng Nai.',
  },
  {
    year: '2017',
    title: 'Đạt Chứng Nhận ISO',
    desc: 'Nhận chứng nhận ISO 9001:2015 về hệ thống quản lý chất lượng. Mở chi nhánh Hà Nội và Đà Nẵng.',
  },
  {
    year: '2020',
    title: 'Ra Mắt Dòng Sản Phẩm Mới',
    desc: 'Giới thiệu dòng sản phẩm tiết kiệm năng lượng thế hệ mới, đáp ứng tiêu chuẩn xanh quốc tế.',
  },
  {
    year: '2024',
    title: 'Top 10 Thương Hiệu Uy Tín',
    desc: 'Được vinh danh Top 10 Thương Hiệu Thông Gió Uy Tín Việt Nam, phục vụ hơn 500 khách hàng doanh nghiệp.',
  },
]

const team = [
  { name: 'Nguyễn Văn Cường', role: 'Giám Đốc Điều Hành', exp: '20 năm kinh nghiệm' },
  { name: 'Trần Minh Thống', role: 'Giám Đốc Kỹ Thuật', exp: '15 năm kinh nghiệm' },
  { name: 'Lê Thị Hương', role: 'Trưởng Phòng Kinh Doanh', exp: '12 năm kinh nghiệm' },
  { name: 'Phạm Quốc Gió', role: 'Trưởng Nhóm Kỹ Thuật', exp: '10 năm kinh nghiệm' },
]

const clients = [
  { icon: Factory, name: 'Nhà Máy & Xưởng SX', count: '320+ đơn vị' },
  { icon: Building2, name: 'Tòa Nhà Văn Phòng', count: '150+ công trình' },
  { icon: Wind, name: 'Khu Công Nghiệp', count: '30+ KCN' },
]

export function About() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="hero-bg py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Users className="w-4 h-4" />
              Về Chúng Tôi
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              15 Năm Xây Dựng<br />Niềm Tin Bền Vững
            </h1>
            <p className="text-blue-200 text-lg leading-relaxed">
              Công ty TNHH MTV Cường Thống Gió là đơn vị hàng đầu trong lĩnh vực cung cấp, lắp đặt và bảo trì thiết bị thông gió công nghiệp tại Việt Nam — với hơn 2.000 dự án thành công trên khắp cả nước.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Sứ Mệnh & Tầm Nhìn</h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Chúng tôi tin rằng môi trường làm việc sạch sẽ và thoáng mát là nền tảng cho năng suất lao động và sức khỏe cộng đồng. Từ đó, chúng tôi không ngừng nghiên cứu và ứng dụng những công nghệ thông gió tiên tiến nhất vào thực tiễn Việt Nam.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Tầm nhìn của chúng tôi là trở thành đối tác thông gió tin cậy số một của các doanh nghiệp Việt Nam, hướng tới phát triển bền vững và bảo vệ môi trường.
              </p>
              <div className="space-y-3">
                {[
                  'Chất lượng sản phẩm luôn là ưu tiên số một',
                  'Đồng hành cùng khách hàng trong mọi giai đoạn',
                  'Cam kết bảo hành và hỗ trợ hậu mãi tận tâm',
                  'Ứng dụng công nghệ tiết kiệm năng lượng hiện đại',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, label: 'Giải Thưởng', value: '12+', color: 'bg-orange-50 text-orange-600 border-orange-100' },
                { icon: Users, label: 'Nhân Viên', value: '120+', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                { icon: Clock, label: 'Năm HĐ', value: '15+', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                { icon: Target, label: 'Dự Án', value: '2.000+', color: 'bg-purple-50 text-purple-600 border-purple-100' },
              ].map(s => (
                <div key={s.label} className={`p-6 rounded-2xl border ${s.color} flex flex-col items-center text-center`}>
                  <s.icon className="w-7 h-7 mb-3" />
                  <div className="text-3xl font-bold mb-1">{s.value}</div>
                  <div className="text-xs font-medium opacity-70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50 section-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Lịch Sử Phát Triển</h2>
            <p className="text-slate-500">Hành trình 15 năm vươn tới đỉnh cao chất lượng</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-blue-200" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm inline-block text-left">
                      <div className="text-blue-700 font-bold text-sm mb-1">{m.year}</div>
                      <h3 className="font-bold text-slate-800 mb-2">{m.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-700 rounded-full border-4 border-white shadow-lg z-10 top-6" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Đội Ngũ Lãnh Đạo</h2>
            <p className="text-slate-500">Những chuyên gia giàu kinh nghiệm đứng sau mọi thành công</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{member.name}</h3>
                <div className="text-blue-600 text-xs font-medium mb-1">{member.role}</div>
                <div className="text-slate-400 text-xs">{member.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Khách Hàng Của Chúng Tôi</h2>
          <p className="text-blue-200 mb-12">Tin tưởng lựa chọn từ hàng trăm doanh nghiệp lớn nhỏ</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {clients.map(c => (
              <div key={c.name} className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <c.icon className="w-10 h-10 text-blue-200 mx-auto mb-4" />
                <div className="text-white font-bold text-lg mb-1">{c.name}</div>
                <div className="text-blue-300 text-sm">{c.count}</div>
              </div>
            ))}
          </div>
          <Link
            to="/lien-he"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg"
          >
            Trở Thành Đối Tác
          </Link>
        </div>
      </section>
    </div>
  )
}
