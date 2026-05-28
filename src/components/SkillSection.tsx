import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, Compass, Origami, Layers, Cpu } from 'lucide-react';
import { SKILL_ITEMS } from '../data';
import { playHoverSound, playClickSound } from '../utils/audio';

// Custom fluid dynamic wave gauge to replace generic bar animations
function WaveGauge({ percentage, isHovered }: { percentage: number; isHovered: boolean }) {
  return (
    <div className="relative w-24 h-24 rounded-full border border-white bg-white/50 backdrop-blur-sm overflow-hidden shadow-[inner_0_4px_12px_rgba(235,229,252,0.4)] flex items-center justify-center">
      {/* Floating dynamic soft wave representing proficiency */}
      <motion.div
        animate={{
          y: isHovered 
            ? [100 - percentage - 4, 100 - percentage + 4, 100 - percentage - 4] 
            : [100 - percentage - 1, 100 - percentage + 1, 100 - percentage - 1],
          rotate: isHovered ? [0, 360] : [0, 180]
        }}
        transition={{
          y: { repeat: Infinity, duration: isHovered ? 3.5 : 6, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: isHovered ? 12 : 20, ease: "linear" }
        }}
        className="absolute left-[-50%] right-[-50%] bottom-[-50%] top-[40%] rounded-[42%] bg-gradient-to-tr from-violet-100 via-purple-100/75 to-violet-200/40 opacity-75"
        style={{
          transformOrigin: '50% 50%',
        }}
      />

      {/* Helper second slower overlapping ocean swell */}
      <motion.div
        animate={{
          y: isHovered 
            ? [100 - percentage + 2, 100 - percentage - 3, 100 - percentage + 2] 
            : [100 - percentage, 100 - percentage, 100 - percentage],
          rotate: isHovered ? [360, 0] : [180, 0]
        }}
        transition={{
          y: { repeat: Infinity, duration: isHovered ? 4.5 : 8, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: isHovered ? 16 : 28, ease: "linear" }
        }}
        className="absolute left-[-50%] right-[-50%] bottom-[-50%] top-[40%] rounded-[40%] bg-gradient-to-br from-amber-50/50 via-[#EBE5FC]/40 to-white/10 opacity-60"
        style={{
          transformOrigin: '50% 48%',
        }}
      />

      {/* Percentage value */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="font-mono text-charcoal-800 font-semibold text-lg tracking-tight leading-none">
          {percentage}%
        </span>
        <span className="font-mono text-[11px] text-[#9C94B8]/80 tracking-widest mt-0.5">SCORE</span>
      </div>
    </div>
  );
}

export default function SkillSection() {
  const [activeSkillIdx, setActiveSkillIdx] = useState<number | null>(null);

  const getIconForIdx = (idx: number) => {
    switch(idx) {
      case 0: return <Compass className="w-5 h-5 text-[#9D81BB]" />;
      case 1: return <Layers className="w-5 h-5 text-[#9D81BB]" />;
      case 2: return <Origami className="w-5 h-5 text-[#9D81BB]" />;
      default: return <Cpu className="w-5 h-5 text-[#9D81BB]" />;
    }
  };

  const handleHoverSkill = (idx: number | null) => {
    if (idx !== null) playHoverSound();
    setActiveSkillIdx(idx);
  };

  const handleCardClick = () => {
    playClickSound();
  };

  return (
    <section 
      id="ability" 
      className="py-24 max-w-7xl mx-auto px-6 relative z-10"
    >
      {/* Ability Title Header */}
      <div className="mb-14 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white/40 text-[#9D81BB] font-mono text-[13px] tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          DESIGN POTENTIAL
        </div>
        <h2 className="font-sans font-medium text-[#5A5A5A] text-3xl tracking-wide mb-3">
          设计潜能与感知维度
        </h2>
        <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
          摒弃流水线式刚硬像素，以有呼吸感的设计语言，传递 brand 与故事之间的幽微默契。
        </p>
      </div>

      {/* Grid containing customized skill panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_ITEMS.map((skill, idx) => {
          const isSelected = activeSkillIdx === idx;
          return (
            <motion.div
              key={skill.name}
              onMouseEnter={() => handleHoverSkill(idx)}
              onMouseLeave={() => handleHoverSkill(null)}
              onClick={handleCardClick}
              className="rounded-3xl bg-white/45 backdrop-blur-md border border-white/60 hover:border-white/90 p-6 shadow-[0_8px_24px_rgba(157,129,187,0.06)] hover:shadow-[0_16px_40px_rgba(157,129,187,0.1)] transition-all duration-700 cursor-pointer flex flex-col md:flex-row gap-6 items-center group relative overflow-hidden"
              whileHover={{ y: -4 }}
            >
              {/* Sleek water-ripple gauge illustration */}
              <div className="shrink-0 flex items-center justify-center">
                <WaveGauge percentage={skill.percentage} isHovered={isSelected} />
              </div>

              {/* Text Description Pane */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-xl bg-white/90 border border-white shadow-sm">
                    {getIconForIdx(idx)}
                  </div>
                  <h3 className="font-sans font-medium text-charcoal-800 text-base tracking-wide group-hover:text-[#9D81BB] transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>

                <p className="font-sans text-sm text-gray-400 gap-1 leading-relaxed font-light mb-4 text-justify">
                  {skill.description}
                </p>

                {/* Tags lists */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.subSkills.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/70 border border-white/80 font-mono text-[12px] text-[#867EA3] tracking-wide shadow-sm"
                    >
                      ✦ {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glowing aesthetic backdrop lights on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-tr from-[#9D81BB]/5 via-transparent to-rose-50/5 pointer-events-none transition-opacity duration-700 ${
                  isSelected ? 'opacity-100' : 'opacity-0'
                }`} 
              />
            </motion.div>
          );
        })}
      </div>

      {/* Decorative center subtle quote */}
      <div className="mt-14 p-5 rounded-3xl bg-white/30 border border-white/50 backdrop-blur-sm max-w-2xl mx-auto flex items-center gap-4 shadow-sm select-none">
        <HelpCircle className="w-5 h-5 text-[#9D81BB]/80 shrink-0" />
        <p className="font-sans text-[14px] text-gray-500 leading-relaxed font-light">
          <strong>美学认知：</strong> 每一百像素的间距 or 微动，均被赋予ASMR级别静音波，意在给访客减压、褪去噪杂；真正的创造力，是听见内心的微细声响。
        </p>
      </div>
    </section>
  );
}
