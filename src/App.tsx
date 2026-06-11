/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useEffect, Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// ─── Lazy-loaded pages (code-splitting) ───
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Products = lazy(() => import('./pages/Products').then(m => ({ default: m.Products })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then(m => ({ default: m.ArticlePage })));
const GiaCongOngGio = lazy(() => import('./pages/GiaCongOngGio').then(m => ({ default: m.GiaCongOngGio })));
const ThongGioNhaXuong = lazy(() => import('./pages/ThongGioNhaXuong').then(m => ({ default: m.ThongGioNhaXuong })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then(m => ({ default: m.ProjectDetail })));
const Tools = lazy(() => import('./pages/Tools').then(m => ({ default: m.Tools })));
const AirflowCalculator = lazy(() => import('./pages/AirflowCalculator').then(m => ({ default: m.AirflowCalculator })));
const DuctSizingCalculator = lazy(() => import('./pages/DuctSizingCalculator').then(m => ({ default: m.DuctSizingCalculator })));
const FanPowerCalculator = lazy(() => import('./pages/FanPowerCalculator').then(m => ({ default: m.FanPowerCalculator })));
const HutKhoiNhaXuong = lazy(() => import('./pages/HutKhoiNhaXuong').then(m => ({ default: m.HutKhoiNhaXuong })));
const QuatLyTam = lazy(() => import('./pages/QuatLyTam').then(m => ({ default: m.QuatLyTam })));
const XuLyBuiCongNghiep = lazy(() => import('./pages/XuLyBuiCongNghiep').then(m => ({ default: m.XuLyBuiCongNghiep })));

// ─── Scroll restoration ───
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// ─── Loading skeleton ───
function PageSkeleton() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin mb-6" />
      <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
        CƯỜNG THÔNG GIÓ ...
      </div>
      {/* Skeleton content blocks */}
      <div className="mt-16 w-full max-w-3xl px-6 space-y-4 animate-pulse">
        <div className="h-8 bg-zinc-100 rounded-lg w-3/4 mx-auto" />
        <div className="h-4 bg-zinc-50 rounded w-1/2 mx-auto" />
        <div className="h-64 bg-zinc-50 rounded-2xl mt-8" />
      </div>
    </div>
  );
}

// ─── Error Boundary ───
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-zinc-900 text-white flex items-center justify-center rounded-full mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3 uppercase tracking-wider">Đã xảy ra lỗi</h2>
            <p className="text-zinc-500 mb-8 leading-relaxed">
              Xin lỗi, đã có lỗi xảy ra khi tải trang. Vui lòng thử lại hoặc quay về trang chủ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-3 bg-zinc-900 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors"
              >
                Thử lại
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-3 border-2 border-zinc-200 text-zinc-900 rounded-full font-bold text-sm uppercase tracking-widest hover:border-zinc-900 transition-colors text-center"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full max-w-[100vw]">
        <Navbar />
        <main id="main-content" className="flex-grow">
          <ErrorBoundary>
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/san-pham" element={<Products />} />
                <Route path="/gioi-thieu" element={<About />} />
                <Route path="/lien-he" element={<Contact />} />
                <Route path="/kien-thuc" element={<Blog />} />
                <Route path="/kien-thuc/:articleId" element={<ArticlePage />} />
                <Route path="/gia-cong-ong-gio-da-nang" element={<GiaCongOngGio />} />
                <Route path="/thong-gio-nha-xuong-da-nang" element={<ThongGioNhaXuong />} />
                <Route path="/du-an" element={<Projects />} />
                <Route path="/du-an/:projectId" element={<ProjectDetail />} />
                <Route path="/cong-cu" element={<Tools />} />
                <Route path="/cong-cu/tinh-luu-luong-gio" element={<AirflowCalculator />} />
                <Route path="/cong-cu/tinh-tiet-dien-ong-gio" element={<DuctSizingCalculator />} />
                <Route path="/cong-cu/tinh-cong-suat-quat" element={<FanPowerCalculator />} />
                <Route path="/hut-khoi-nha-xuong-da-nang" element={<HutKhoiNhaXuong />} />
                <Route path="/quat-ly-tam-cong-nghiep" element={<QuatLyTam />} />
                <Route path="/xu-ly-bui-cong-nghiep" element={<XuLyBuiCongNghiep />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        {/* Floating CTA — Giảm tỷ lệ thoát, tăng chuyển đổi */}
        <div className="floating-cta" aria-label="Liên hệ nhanh">
          <a
            href="https://zalo.me/0905001224"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-zalo"
            aria-label="Chat Zalo với Cường Thông Gió"
            title="Chat Zalo"
          >
            <svg width="24" height="24" viewBox="0 0 48 48" fill="currentColor">
              <path d="M15,36v-29.173l-1.211,-0.811c-5.149,2.067 -8.789,7.096 -8.789,12.984v10c0,7.732 6.268,14 14,14h10c4.722,0 8.883,-2.348 11.417,-5.931v-1.069z" fill="currentColor" opacity="0.3"></path>
              <path d="M29,5h-10c-1.845,0 -3.601,0.366 -5.214,1.014c-3.333,3.236 -5.786,8.514 -5.786,12.986c0,6.771 0.936,10.735 3.712,14.607c0.216,0.301 0.357,0.653 0.376,1.022c0.043,0.835 -0.129,2.365 -1.634,3.742c-0.162,0.148 -0.059,0.419 0.16,0.428c0.942,0.041 2.843,-0.014 4.797,-0.877c0.557,-0.246 1.191,-0.203 1.729,0.083c3.313,1.759 7.193,1.995 10.86,1.995c4.676,0 9.339,-1.04 12.417,-2.916c1.621,-2.285 2.583,-5.07 2.583,-8.084v-10c0,-7.732 -6.268,-14 -14,-14z" fill="currentColor"></path>
              <path d="M36.75,27c-2.067,0 -3.75,-1.683 -3.75,-3.75c0,-2.067 1.683,-3.75 3.75,-3.75c2.067,0 3.75,1.683 3.75,3.75c0,2.067 -1.683,3.75 -3.75,3.75zM36.75,21c-1.24,0 -2.25,1.01 -2.25,2.25c0,1.24 1.01,2.25 2.25,2.25c1.24,0 2.25,-1.01 2.25,-2.25c0,-1.24 -1.01,-2.25 -2.25,-2.25z" fill="#0068ff"></path>
              <path d="M31.5,27h-1c-0.276,0 -0.5,-0.224 -0.5,-0.5v-8.5h1.5z" fill="#0068ff"></path>
              <path d="M27,19.75v0.519c-0.629,-0.476 -1.403,-0.769 -2.25,-0.769c-2.067,0 -3.75,1.683 -3.75,3.75c0,2.067 1.683,3.75 3.75,3.75c0.847,0 1.621,-0.293 2.25,-0.769v0.269c0,0.276 0.224,0.5 0.5,0.5h1v-7.25zM24.75,25.5c-1.24,0 -2.25,-1.01 -2.25,-2.25c0,-1.24 1.01,-2.25 2.25,-2.25c1.24,0 2.25,1.01 2.25,2.25c0,1.24 -1.01,2.25 -2.25,2.25z" fill="#0068ff"></path>
              <path d="M21.25,18h-8v1.5h5.321l-5.571,6.5h0.026c-0.163,0.211 -0.276,0.463 -0.276,0.75v0.25h7.5c0.276,0 0.5,-0.224 0.5,-0.5v-1h-5.321l5.571,-6.5h-0.026c0.163,-0.211 0.276,-0.463 0.276,-0.75z" fill="#0068ff"></path>
            </svg>
          </a>
          <a
            href="tel:0905001224"
            className="cta-phone"
            aria-label="Gọi hotline Cường Thông Gió: 0905 001 224"
            title="Gọi ngay: 0905 001 224"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>
        </div>
      </div>
    </BrowserRouter>
  );
}
