import { useEffect, useState } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';
import { playHoverSound, playClickSound, setMuted, startBackgroundASMR, stopBackgroundASMR } from '../utils/audio';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Auto trigger ASMR intro explanation the first time
  const handleToggleAmbientSound = () => {
    playClickSound();
    if (!isAudioActive) {
      startBackgroundASMR();
      setIsAudioActive(true);
      setIsMuted(false);
      setMuted(false);
    } else {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      setMuted(nextMute);
    }
  };

  const handleNavClick = (sectionId: string) => {
    playClickSound();
    onNavigate(sectionId);
  };

  const handleNavHover = () => {
    playHoverSound();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
      {/* Soft Designer Signature */}
      <div 
        className="flex items-center gap-2 select-none"
        onMouseEnter={handleNavHover}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-200/40 via-purple-100/50 to-amber-100/40 ring-1 ring-white/40 flex items-center justify-center shadow-sm backdrop-blur-sm animate-spin-slow">
          <Sparkles className="w-4 h-4 text-violet-400/90" />
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-medium text-base tracking-wider text-charcoal-800">
            Aria Yang
          </span>
          <span className="font-mono text-[12px] text-gray-400 tracking-widest leading-none">
            芷澄 · 视觉设计
          </span>
        </div>
      </div>

      {/* Frosted Glass Pill Navigation Bar */}
      <nav className="flex items-center p-1.5 rounded-full bg-white/45 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(235,229,252,0.18)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.03)] transition-all duration-300 ring-1 ring-purple-100/10">
        <ul className="flex items-center gap-1">
          {[
            { id: 'gallery', label: '作品集 · GALLERY' },
            { id: 'ability', label: '技能 · ABILITY' },
            { id: 'message', label: '联系 · MESSAGE' }
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={handleNavHover}
                  className={`px-5 py-2 text-sm font-sans font-medium tracking-wide rounded-full transition-all duration-300 relative select-none cursor-pointer ${
                    isActive
                      ? 'text-[#9D81BB] bg-white/75 shadow-[0_2px_12px_rgba(157,129,187,0.12)]'
                      : 'text-gray-500 hover:text-charcoal-800 hover:bg-white/30'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#9D81BB]" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sound Controller Module */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleToggleAmbientSound}
          onMouseEnter={handleNavHover}
          className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-sans font-medium tracking-wide transition-all duration-300 cursor-pointer select-none ${
            isAudioActive && !isMuted
              ? 'bg-violet-50/70 border-violet-100 text-violet-600 shadow-sm animate-pulse-slow'
              : 'bg-white/45 border-white/60 text-gray-500 hover:bg-white/80'
          }`}
          title="开启/关闭治愈ASMR声效"
        >
          {isAudioActive && !isMuted ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-violet-500 animate-bounce" />
              <span className="text-[12px] font-mono tracking-wider sm:inline hidden">ASMR: 聆听中</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="text-[12px] font-mono tracking-wider sm:inline hidden">ASMR: 静音</span>
            </>
          )}
        </button>

        {/* Floating guide bubble if sound not active yet */}
        {!isAudioActive && (
          <div className="absolute right-6 top-16 bg-white/85 backdrop-blur-md px-3 py-2 rounded-2xl shadow-sm border border-purple-100 text-[12px] text-violet-700 font-medium tracking-wide flex items-center gap-1.5 animate-bounce z-50 select-none">
            <Music className="w-3 h-3 text-violet-400" />
            点击开启治愈风声白噪音 🌸
          </div>
        )}
      </div>
    </header>
  );
}
