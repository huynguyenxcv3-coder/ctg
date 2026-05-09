import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import './index.css'

const Products = lazy(() => import('./pages/Products').then(module => ({ default: module.Products })))
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })))
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })))
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })))

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col overflow-x-hidden w-full relative">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={
            <div className="h-[60vh] w-full flex flex-col items-center justify-center text-zinc-400 gap-4">
              <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Đang tải...</span>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/san-pham" element={<Products />} />
              <Route path="/gioi-thieu" element={<About />} />
              <Route path="/lien-he" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
