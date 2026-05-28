import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Feather, HelpCircle, Inbox, Send, Sun, Moon } from 'lucide-react';

import ParticleBackground from './components/ParticleBackground';
import Navigation from './components/Navigation';
import GallerySection from './components/GallerySection';
import SkillSection from './components/SkillSection';
import MessageSection from './components/MessageSection';

import { playClickSound, playHoverSound } from './utils/audio';

export default function App() {
  const [activeSection, setActiveSection] = useState('gallery');
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorHovering, setCursorHovering] = useState(false);

  // Soft custom mouse follower position smoothing
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetCursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetCursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic easing interpolation for custom velvet cursor delay
    let frameId: number;
    const updateCursorPhysics = () => {
      const dx = targetCursorRef.current.x - cursorRef.current.x;
      const dy = targetCursorRef.current.y - cursorRef.current.y;
      
      // Easing speed coefficient (0.08 produces an elegant, sleepy drift following physics)
      cursorRef.current.x += dx * 0.08;
      cursorRef.current.y += dy * 0.08;

      setMousePosition({ x: cursorRef.current.x, y: cursorRef.current.y });
      frameId = requestAnimationFrame(updateCursorPhysics);
    };

    updateCursorPhysics();

    // Setup IntersectionObserver to track active scrolling sections
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // focused in center viewport
      threshold: 0.1
    };

    const sectionIds = ['gallery', 'ability', 'message'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      }, observerOptions);

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleHeroHover = () => {
    playHoverSound();
    setCursorHovering(true);
  };

  const handleHeroLeave = () => {
    setCursorHovering(false);
  };

  return (
    <div className="relative min-h-screen selection:bg-purple-100 selection:text-violet-900 pb-12 overflow-hidden">
      
      {/* 1. Velvet Follower Cursor Glow - Soft, healing peach/lavender bubble */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-transform duration-300 mix-blend-multiply bg-[#FAF0E6]/30 blur-[4px] ring-1 ring-violet-200/20 sm:block hidden"
        style={{
          left: `${mousePosition.x - 20}px`,
          top: `${mousePosition.y - 20}px`,
          width: '40px',
          height: '40px',
          transform: cursorHovering ? 'scale(1.8)' : 'scale(1)',
          opacity: 0.85
        }}
      />
      <div
        className="fixed pointer-events-none z-50 rounded-full bg-violet-400/10 sm:block hidden"
        style={{
          left: `${mousePosition.x - 3}px`,
          top: `${mousePosition.y - 3}px`,
          width: '6px',
          height: '6px'
        }}
      />

      {/* 2. Slow plush nebula interactive background system */}
      <ParticleBackground />

      {/* 3. Floating glass pill header navigation bar */}
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 4. Elegant Hero Welcome Space */}
      <main className="relative z-10 pt-36">
        
        {/* Slogan & Introduction Block */}
        <section 
          className="max-w-4xl mx-auto px-6 text-center select-none"
          onMouseEnter={handleHeroHover}
          onMouseLeave={handleHeroLeave}
        >
          {/* Subtle design visual indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_12px_rgba(235,229,252,0.06)] text-sm font-sans tracking-wide text-gray-500 animate-float-slow">
            <Feather className="w-3.5 h-3.5 text-violet-400 animate-bounce" />
            <span>ORIGINAL DESIGNER PORTFOLIO · 2026 EDITION</span>
          </div>

          {/* Core Poetry Slogan - Frosted Glass specific tracking, weight and color definitions */}
          <div className="mt-10 mb-8 max-w-2xl mx-auto flex flex-col items-center">
            <h1 className="text-5xl sm:text-6xl md:text-[60px] font-extralight tracking-[0.18em] text-[#5A5A5A] mb-4 leading-[1.3] text-center">
              以温柔笔触<br />
              <span className="italic font-serif opacity-80 text-[#9D81BB] mt-2 block">造专属浪漫</span>
            </h1>
            <p className="tracking-[0.2em] text-[#9D81BB] opacity-85 mt-4 font-light text-lg sm:text-xl md:text-[2.5rem] transition-all duration-300">
              ✦ 芷澄-Aria Yang作品集 ✦
            </p>
          </div>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-300 to-transparent mx-auto my-8 opacity-60" />

          {/* Soft, warm, cozy paragraph introducing the aesthetic */}
          <p className="font-sans text-sm sm:text-base text-[#625C75] font-light leading-relaxed max-w-2xl mx-auto text-justify sm:text-center">
            你好，我是 <strong className="text-violet-600 font-medium">Aria Yang (芷澄)</strong>。
            一个常驻代码与像素世界的原创独立视觉设计师。我执着于寻找温暖物理材质与数字屏幕媒介之间的感性共鸣，拒绝机械冰冷、快节奏的视觉轰炸。
            在这里，所有设计作品都如同陈列在艺术磨砂玻璃格栅中的手作物。你可以点燃星光、倾听风声、抚摸低噪点的质感，在完全自由安详的浏览氛围里，发现一些有关生活的温存心机。
          </p>

          {/* Micro-interactive guide button prompting visitor to scroll */}
          <div className="mt-12 flex flex-col items-center">
            <button
              onClick={() => handleNavigate('gallery')}
              onMouseEnter={() => playHoverSound()}
              className="group p-3 rounded-full bg-white/45 backdrop-blur-md border border-white/60 hover:border-violet-100 hover:bg-white/90 text-gray-400 hover:text-violet-600 shadow-sm cursor-pointer transition-all duration-500 select-none animate-bounce"
            >
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <span className="font-mono text-[12px] text-gray-400/80 tracking-widest uppercase mt-2">
              SCROLL DOWN TO DISCOVER
            </span>
          </div>
        </section>

        {/* 5. Section: GALLERY 作品展示 */}
        <GallerySection />

        {/* Decorative layout splitter */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />
        </div>

        {/* 6. Section: ABILITY 技能剖析 */}
        <SkillSection />

        {/* Decorative layout splitter */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />
        </div>

        {/* 7. Section: MESSAGE 联系与许愿 */}
        <MessageSection />

      </main>

      {/* 8. Cohesive Minimalist Footer */}
      <footer className="relative z-10 text-center py-12 select-none">
        <div className="max-w-md mx-auto px-6 flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-white/70 border border-white shadow-sm flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-violet-400" />
          </div>
          <p className="font-mono text-[12px] text-[#9C94B8] tracking-widest uppercase leading-loose">
            Designed with stillness by Aria Yang · 芷澄 © 2026.
            <br />
            Deeply crafted in a quiet room of dreams.
          </p>
        </div>
      </footer>
    </div>
  );
}
