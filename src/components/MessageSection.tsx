import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mail, Send, CheckCircle, Lock, Unlock, MessageSquareHeart, Star, Copy, ExternalLink, HelpCircle, Phone } from 'lucide-react';
import { MessageSubmission } from '../types';
import { playClickSound, playHoverSound, playUnlockSound } from '../utils/audio';

// Default cozy guest messages to pre-populate the interactive feedback list beautifully
const DEFAULT_MEMORIES: MessageSubmission[] = [
  { name: '森屿', contact: 'senyu@gmail.com', text: '进入这个空间的感觉好温顺，像在清晨喝了一口温牛奶，粒子动效实在太安宁了。', timestamp: '2026-05-27 12:30' },
  { name: '西米露', contact: 'ximilu@design.cn', text: '好喜欢这种磨砂玻璃层叠的感觉！ASMR雨滴声配着 chimes 声，瞬间静下心来写完了设计稿。支持！', timestamp: '2026-05-27 15:45' },
  { name: '夏目', contact: 'Wechat: natsume_cc', text: '找 3D 包装和IP形象设计合作，已经发送了邮件到你的邮箱啦，盼复呀 ～ 🌸', timestamp: '2026-05-27 18:02' }
];

export default function MessageSection() {
  // Stars unlock state: need 4 clicks to unlock contact
  const [awakenedStars, setAwakenedStars] = useState<boolean[]>([false, false, false, false]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Mailbox state
  const [guestBook, setGuestBook] = useState<MessageSubmission[]>([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [msgText, setMsgText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    // Load existing notes
    const saved = localStorage.getItem('aria_portfolio_wishes');
    if (saved) {
      setGuestBook(JSON.parse(saved));
    } else {
      setGuestBook(DEFAULT_MEMORIES);
      localStorage.setItem('aria_portfolio_wishes', JSON.stringify(DEFAULT_MEMORIES));
    }
  }, []);

  const handleStarClick = (idx: number) => {
    if (awakenedStars[idx]) return;
    
    playClickSound();
    playHoverSound();

    const nextStars = [...awakenedStars];
    nextStars[idx] = true;
    setAwakenedStars(nextStars);

    // If all stars clicked, trigger beautiful unlock chime sequence
    if (nextStars.every(val => val === true)) {
      setTimeout(() => {
        playUnlockSound();
        setIsUnlocked(true);
      }, 700);
    }
  };

  const handleCopyText = (text: string, label: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitWish = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msgText.trim()) return;

    playClickSound();
    setIsSending(true);

    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newSubmission: MessageSubmission = {
      name: name.trim(),
      contact: contact.trim() || '未留下名片',
      text: msgText.trim(),
      timestamp: nowStr
    };

    setTimeout(() => {
      const nextList = [newSubmission, ...guestBook];
      setGuestBook(nextList);
      localStorage.setItem('aria_portfolio_wishes', JSON.stringify(nextList));
      
      setIsSending(false);
      setSendSuccess(true);
      setName('');
      setContact('');
      setMsgText('');

      setTimeout(() => {
        setSendSuccess(false);
      }, 3500);
    }, 1200);
  };

  const starMetadata = [
    { title: '风之耳语', subtitle: 'Auric Glow' },
    { title: '林间碎光', subtitle: 'Stellar Dust' },
    { title: '玻璃夜曲', subtitle: 'Water Dew' },
    { title: '星辰流转', subtitle: 'Cosmic Shine' },
  ];

  return (
    <section 
      id="message" 
      className="py-24 max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12"
    >
      {/* 1. Left Grid Container: 星光解锁联系方式 (Star Unlock Contacts) */}
      <div className="flex flex-col justify-start">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white/40 text-[#9D81BB] font-mono text-[13px] tracking-widest uppercase mb-4 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            SECURE MAGIC CONTACTS
          </div>
          <h2 className="font-sans font-medium text-[#5A5A5A] text-2xl tracking-wide mb-2">
            点亮星光 · 温柔解锁联系方式
          </h2>
          <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
            通过轻轻点击，唤醒下方4颗沉睡的祈愿之星，即可解锁与印有 Aria Yang 温度的设计专线。
          </p>
        </div>

        {/* Locked Overlay Card Container */}
        <div className="relative min-h-[400px] rounded-[36px] bg-white/40 backdrop-blur-xl border border-white/60 p-8 shadow-[0_16px_40px_rgba(157,129,187,0.08)] flex flex-col justify-center items-center overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!isUnlocked ? (
              // Locked Interactive Display
              <motion.div 
                key="locked-box"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full flex flex-col justify-center items-center gap-8 relative z-10 py-6"
              >
                <div className="flex flex-col items-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-[#EBE5FC]/30 border border-white flex items-center justify-center text-[#9D81BB] mb-3 animate-pulse-slow">
                    <Star className="w-6 h-6 fill-[#9D81BB]/50" />
                  </div>
                  <span className="font-sans font-medium text-sm text-charcoal-700 tracking-wide">
                    唤醒星芒以开始互动
                  </span>
                  <span className="font-mono text-[12px] text-gray-400 mt-1">
                    {awakenedStars.filter(v => v).length} / 4 STARS AWAKENED
                  </span>
                </div>

                {/* 4 Sleeping Stars inside a beautiful circular orbit layout */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-md">
                  {starMetadata.map((star, i) => {
                    const isAwake = awakenedStars[i];
                    return (
                      <button
                        key={i}
                        onClick={() => handleStarClick(i)}
                        onMouseEnter={() => playHoverSound()}
                        className={`p-4 rounded-3xl cursor-pointer select-none border flex flex-col items-center text-center transition-all duration-700 relative overflow-hidden group ${
                          isAwake
                            ? 'bg-gradient-to-tr from-amber-50 to-violet-50/80 border-amber-200 text-amber-500 shadow-sm scale-102'
                            : 'bg-white/45 border-white/70 text-gray-300 hover:border-violet-100 hover:text-[#9C94B8]'
                        }`}
                      >
                        {/* Shimmer rotating background ray if awake */}
                        {isAwake && (
                          <div className="absolute inset-x-0 inset-y-0 bg-[radial-gradient(circle_at_center,rgba(253,230,138,0.3)_0%,transparent_70%)] animate-spin-slow pointer-events-none" />
                        )}

                        <motion.div
                          animate={{ 
                            rotate: isAwake ? 360 : [0, 10, -10, 0],
                            scale: isAwake ? 1.15 : 1
                          }}
                          transition={{ 
                            rotate: isAwake ? { repeat: Infinity, duration: 8, ease: "linear" } : { repeat: Infinity, duration: 4 },
                            scale: { duration: 0.4 }
                          }}
                          className={`mb-2 ${isAwake ? 'text-amber-400' : 'text-gray-300 group-hover:text-purple-300'}`}
                        >
                          <Star className={`w-6 h-6 ${isAwake ? 'fill-amber-300' : 'fill-transparent'}`} />
                        </motion.div>

                        <span className={`text-[14px] font-sans font-medium ${isAwake ? 'text-amber-700' : 'text-gray-500 font-light'}`}>
                          {star.title}
                        </span>
                        <span className="font-mono text-[10px] text-gray-400 tracking-widest mt-0.5">
                          {star.subtitle}
                        </span>

                        {isAwake && (
                          <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="text-[13px] text-gray-400 font-mono tracking-wider text-center border-t border-purple-50 pt-4 w-3/4">
                  🌟 完成星光互动的声音灵感来自大自然的雨林水晶钟
                </div>
              </motion.div>
            ) : (
              // Unlocked Contact Information display
              <motion.div 
                key="unlocked-box"
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col justify-center gap-6 relative z-10"
              >
                <div className="flex items-center gap-3 border-b border-amber-100/60 pb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center text-amber-500 animate-spin-slow shrink-0 shadow-sm">
                    <Unlock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-medium text-charcoal-800 text-base tracking-wide">
                      星光祝福契约已达成
                    </h3>
                    <p className="font-mono text-[12px] text-[#AC8D5B] tracking-widest uppercase">
                      MAGICAL PORT CONTACTS UNLOCKED
                    </p>
                  </div>
                </div>

                {/* Aesthetic Contacts Cards list */}
                <div className="flex flex-col gap-3 w-full">
                  {[
                    { label: '微信联系', value: 'qkl1419', icon: <MessageSquareHeart className="w-4 h-4 text-[#73C088]" /> },
                    { label: 'QQ邮箱 / 联络', value: '3158200895@qq.com', icon: <Mail className="w-4 h-4 text-[#9D81BB]" /> },
                    { label: '手提电话 / 专线', value: '13126270917', icon: <Phone className="w-4 h-4 text-sky-400" /> }
                  ].map((item) => (
                    <div 
                      key={item.label}
                      className="p-3 px-4 rounded-2xl bg-white/70 border border-white/80 hover:border-[#9D81BB]/30 shadow-[0_2px_8px_rgba(157,129,187,0.03)] flex justify-between items-center transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-white shadow-sm border border-gray-100">
                          {item.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-sans text-[12px] text-gray-400 font-light">{item.label}</span>
                          <span className="font-sans text-sm font-medium text-charcoal-800">{item.value}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopyText(item.value, item.label)}
                        className={`px-3 py-1.5 rounded-xl border text-[12px] font-sans transition-all duration-300 flex items-center gap-1 cursor-pointer select-none ${
                          copiedField === item.label
                            ? 'bg-green-50 border-green-100 text-green-600'
                            : 'bg-white/90 hover:bg-[#9D81BB]/10 border-gray-100 hover:border-[#9D81BB]/20 text-gray-500'
                        }`}
                      >
                        {copiedField === item.label ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            复制
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/30 border border-amber-100/40 text-[14px] text-[#A69C75] leading-relaxed font-light">
                  ✦ <strong>小叮咛：</strong>添加微信时请备注「设计合作/交流」，我会于安静无扰的深夜或清晨温暖答复您。
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Right Grid Container: 心愿回音壁 (Whisper Mailbox Messages List) */}
      <div className="flex flex-col justify-start">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white/40 text-[#9D81BB] font-mono text-[13px] tracking-widest uppercase mb-4 shadow-sm">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            WHISPER MAILBOX
          </div>
          <h2 className="font-sans font-medium text-[#5A5A5A] text-2xl tracking-wide mb-2">
            心愿回音壁 · 留下一抹微芒
          </h2>
          <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
            您可以在这里留给 Aria Yang 一句话、一个念想或一个小合作，它们将在此化为宁静微风漂浮。
          </p>
        </div>

        {/* Guest comments feedback box */}
        <div className="p-6 rounded-[36px] bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_16px_40px_rgba(157,129,187,0.08)] flex flex-col gap-6">
          <form onSubmit={handleSubmitWish} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="text" 
                placeholder="您的绰号/昵称 *" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-white/60 border border-white/80 focus:border-[#9D81BB] focus:outline-none text-sm font-sans placeholder-gray-400 shadow-[inset_0_1px_4px_rgba(0,0,0,0.01)]"
              />
              <input 
                type="text" 
                placeholder="邮箱/微信号 (可选)" 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-white/60 border border-white/80 focus:border-[#9D81BB] focus:outline-none text-sm font-sans placeholder-gray-400 shadow-[inset_0_1px_4px_rgba(0,0,0,0.01)]"
              />
            </div>
            <textarea 
              placeholder="在这里落笔您的温暖留言... *" 
              required
              rows={3}
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
              className="px-4 py-3 rounded-2xl bg-white/60 border border-white/80 focus:border-[#9D81BB] focus:outline-none text-sm font-sans placeholder-gray-400 shadow-[inset_0_1px_4px_rgba(0,0,0,0.01)] resize-none"
            />

            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-2.5 rounded-2xl font-sans font-medium text-sm tracking-wider cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 select-none ${
                sendSuccess
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'bg-[#9D81BB] hover:bg-[#9D81BB]/90 text-white shadow-sm hover:translate-y-[-1px]'
              }`}
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  捎信中（ASMR风声捎带中）...
                </>
              ) : sendSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 animate-bounce" />
                  信件已送入回音壁，发出微弱呼啸 🌟
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  写好，投入心愿邮箱
                </>
              )}
            </button>
          </form>

          {/* Messages list container */}
          <div className="flex flex-col gap-3 max-h-[190px] overflow-y-auto pr-1">
            <AnimatePresence>
              {guestBook.map((item, idx) => (
                <motion.div
                  key={item.timestamp + idx}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3.5 rounded-2xl bg-white/70 border border-white/80 shadow-[0_2px_10px_rgba(157,129,187,0.02)] flex flex-col gap-1 text-[14px]"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-medium text-[#9D81BB]">{item.name}</span>
                      <span className="font-mono text-[11px] text-gray-400">({item.contact})</span>
                    </div>
                    <span className="font-mono text-[10px] text-gray-300">{item.timestamp}</span>
                  </div>
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
