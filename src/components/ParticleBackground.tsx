import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  angle: number;
  speed: number;
  // Morph parameters
  tx: number; // Target x for morphing
  ty: number; // Target y for morphing
  isMorphing: boolean;
  pulseSpeed: number;
  pulsePhase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const [currentShape, setCurrentShape] = useState<'free' | 'heart' | 'cloud' | 'crescent'>('free');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position and ripples
    const mouse = { x: -1000, y: -1000, lastX: -1000, lastY: -1000 };
    let rippleTimer = 0;

    // Soft high-end color palette (low sat cream, peach pink, soft lavender)
    const colors = [
      'rgba(235, 229, 252, 0.45)', // Pale Lavender 浅芋紫
      'rgba(247, 241, 229, 0.55)', // Cozy Cream 奶杏
      'rgba(252, 238, 242, 0.45)', // Cloud Pink 雾粉
      'rgba(255, 255, 255, 0.60)', // Soft Pure White 洁净白
    ];

    const generateParticles = (count: number) => {
      const arr: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 5 + 4; // Velvet fuzzy beads (slightly larger with blur feel)
        const color = colors[Math.floor(Math.random() * colors.length)];
        arr.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() * 0.2 - 0.1) * 0.8,
          vy: (Math.random() * 0.2 - 0.1) * 0.8,
          size,
          opacity: Math.random() * 0.5 + 0.25,
          color,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.01 + 0.005,
          tx: x,
          ty: y,
          isMorphing: false,
          pulseSpeed: 0.02 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI,
        });
      }
      return arr;
    };

    particles = generateParticles(160);

    // Calculate morphing coordinates in the center of the screen
    const applyShapeMorph = (shape: 'free' | 'heart' | 'cloud' | 'crescent') => {
      const cx = width / 2;
      const cy = height / 2 - 20;
      const scale = Math.min(width, height) * 0.22; // Scale based on viewport

      particles.forEach((p, idx) => {
        p.isMorphing = shape !== 'free';

        if (shape === 'free') {
          // Send back to random drifting target
          p.tx = p.baseX;
          p.ty = p.baseY;
        } else if (shape === 'heart') {
          // Heart parametric equations: x = 16*sin^3(t), y = 13*cos(t)-5*cos(2t)-2*cos(3t)-cos(4t)
          const t = (idx / particles.length) * Math.PI * 2;
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
          p.tx = cx + hx * (scale * 0.055);
          p.ty = cy + hy * (scale * 0.055) + 20;
        } else if (shape === 'cloud') {
          // Overlaying fluffy circles to mimic cloud path
          const t = (idx / particles.length) * Math.PI * 2;
          let r = scale * 0.45;
          // Deform the circle into bubble clusters
          if (t < Math.PI * 0.6) {
            r = scale * (0.35 + 0.1 * Math.sin(t * 1.5));
          } else if (t < Math.PI * 1.3) {
            r = scale * (0.40 + 0.12 * Math.sin(t * 2));
            r += Math.sin(t * 10) * 8; // fluff noise
          } else {
            r = scale * (0.3 + 0.08 * Math.cos(t * 3));
          }
          // Offset Y slightly downwards for base line of cloud
          const isBase = t > Math.PI * 0.8 && t < Math.PI * 1.6;
          p.tx = cx + Math.cos(t) * r;
          p.ty = cy + Math.sin(t) * r * (isBase ? 0.75 : 0.9) + 15;
        } else if (shape === 'crescent') {
          // Moon crescent
          const angle = -0.5 + (idx / particles.length) * (Math.PI * 1.3);
          const r = scale * 0.42;
          // Innermost crescent side calculated by offsetting circles
          const ox = Math.cos(angle) * r;
          const oy = Math.sin(angle) * r;
          
          // Outer edge vs inner shadow
          if (idx % 2 === 0) {
            p.tx = cx + ox - 10;
            p.ty = cy + oy;
          } else {
            // Squeezed inner shadow
            p.tx = cx + Math.cos(angle) * (r * 0.75) + 12;
            p.ty = cy + Math.sin(angle) * (r * 0.85);
          }
        }
      });
    };

    // Cycle through shapes slowly for subtle heart, cloud, crescent "heartbeat" animations
    let stateTimer = 0;
    const shapeCycle: ('free' | 'heart' | 'cloud' | 'crescent')[] = ['free', 'heart', 'free', 'cloud', 'free', 'crescent'];
    let shapeIdx = 0;

    const resizeHandler = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-init or scale bases
      particles.forEach((p) => {
        p.baseX = Math.random() * width;
        p.baseY = Math.random() * height;
      });
      applyShapeMorph(shapeCycle[shapeIdx]);
    };

    window.addEventListener('resize', resizeHandler);

    // Mouse events
    const mouseMoveHandler = (e: MouseEvent) => {
      // Offset slightly to respect page padding
      const rect = canvas.getBoundingClientRect();
      const nextX = e.clientX - rect.left;
      const nextY = e.clientY - rect.top;

      mouse.x = nextX;
      mouse.y = nextY;

      // Rate limit ripple creation so it flows continuously only when moving
      const dist = Math.hypot(nextX - mouse.lastX, nextY - mouse.lastY);
      if (dist > 35 && rippleTimer <= 0) {
        ripples.push({
          x: nextX,
          y: nextY,
          radius: 2,
          maxRadius: 110 + Math.random() * 50,
          opacity: 0.35,
          color: Math.random() > 0.5 ? 'rgba(235, 229, 252, 0.4)' : 'rgba(247, 241, 229, 0.4)', // lavender vs warm cream
        });
        rippleTimer = 18; // wait 18 frames
        mouse.lastX = nextX;
        mouse.lastY = nextY;
      }
    };

    const mouseLeaveHandler = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseleave', mouseLeaveHandler);

    const drawParticle = (p: Particle) => {
      if (!ctx) return;
      ctx.save();

      // Slow pulse
      p.pulsePhase += p.pulseSpeed;
      const pulseScale = Math.sin(p.pulsePhase) * 1.5 + 4.5; // slow breathing scale
      const sizeFactor = p.isMorphing ? 4.5 : pulseScale;

      // Soft blur effect by drawing overlapping soft radial gradients (velvet clouds)
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * sizeFactor);
      grad.addColorStop(0, p.color);
      grad.addColorStop(0.3, p.color.replace(/[\d.]+\)$/, `${p.opacity * 0.7})`));
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * sizeFactor, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const updateParticles = () => {
      particles.forEach((p) => {
        if (p.isMorphing) {
          // Morph physics: ease towards target coordinates smoothly
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          p.x += dx * 0.045; // Gentle ease
          p.y += dy * 0.045;
        } else {
          // Free float - gentle wave / wave equation offset plus velocity
          p.angle += p.speed;
          const waveX = Math.sin(p.angle) * 0.08;
          const waveY = Math.cos(p.angle) * 0.08;

          p.x += p.vx + waveX;
          p.y += p.vy + waveY;

          // Gentle mouse push & pull (subtle rebound, no harsh explosions)
          if (mouse.x > 0) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 140) {
              const force = (140 - dist) / 140;
              // Push particles gently outwards
              p.x += (dx / dist) * force * 1.5;
              p.y += (dy / dist) * force * 1.5;
              p.opacity = Math.min(0.88, p.opacity + 0.005); // light glimmers upon proximity!
            } else {
              p.opacity = Math.max(0.2, p.opacity - 0.002);
            }
          }

          // Boundary wrapping (gentle fade in from other side)
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }
      });
    };

    const updateRipples = () => {
      ripples.forEach((r, idx) => {
        r.radius += 1.25; // Slow crawl
        r.opacity -= 0.004; // Gentle fade
        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(idx, 1);
        }
      });
    };

    const drawRipples = () => {
      if (!ctx) return;
      ripples.forEach((r) => {
        ctx.save();
        ctx.strokeStyle = r.color.replace(/[\d.]+\)$/, `${r.opacity})`);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Extra soft filler halo
        const grad = ctx.createRadialGradient(r.x, r.y, r.radius * 0.8, r.x, r.y, r.radius);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.5, r.color.replace(/[\d.]+\)$/, `${r.opacity * 0.15})`));
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });
    };

    // Cycle shape states slowly
    const cycleInterval = setInterval(() => {
      shapeIdx = (shapeIdx + 1) % shapeCycle.length;
      const nextShape = shapeCycle[shapeIdx];
      setCurrentShape(nextShape);
      applyShapeMorph(nextShape);
    }, 14000); // 14 seconds per cycle (restful & low pacing)

    const animate = () => {
      if (!ctx) return;
      // Soft translucent clear to preserve delicate trailers
      ctx.clearRect(0, 0, width, height);

      if (rippleTimer > 0) rippleTimer--;

      updateParticles();
      updateRipples();

      drawRipples();
      particles.forEach(drawParticle);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseleave', mouseLeaveHandler);
      clearInterval(cycleInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      id="velvet-particle-background"
    >
      {/* Gentle ambient glowing soft-lights (浅芋紫, 浅奶杏, 浅粉) matching the Frosted Glass theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[550px] h-[550px] rounded-full bg-[#F5E6FF] blur-[120px] opacity-45 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[480px] h-[480px] rounded-full bg-[#FFF3E0] blur-[100px] opacity-35 pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] rounded-full bg-[#FFEBEE] blur-[80px] opacity-25 pointer-events-none" />

      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* Low-key unobtrusive layout label to hint shape morphing has active state */}
      {currentShape !== 'free' && (
        <div className="absolute bottom-6 right-8 text-xs font-mono tracking-widest text-[#9C94B8]/40 select-none animate-pulse">
          AMBIENT SHAPE: {currentShape.toUpperCase()}
        </div>
      )}
    </div>
  );
}
