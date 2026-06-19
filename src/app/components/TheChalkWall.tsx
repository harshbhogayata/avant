import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function TheChalkWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const wireframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Extremely slow rotation of the wireframe graphic
      gsap.to(wireframeRef.current, {
        rotation: 360,
        duration: 150,
        repeat: -1,
        ease: 'none'
      });

      // Hover magnification effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || !textRef.current) return;
        const { clientX, clientY } = e;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // If mouse is near the text, slightly magnify and increase brightness
        const distToCenter = Math.sqrt(Math.pow(x - rect.width/2, 2) + Math.pow(y - rect.height/2, 2));
        
        if (distToCenter < 200) {
          gsap.to(textRef.current, {
            scale: 1.1,
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0px 0px 10px rgba(255,255,255,0.2)',
            duration: 0.5,
            ease: 'power2.out'
          });
        } else {
          gsap.to(textRef.current, {
            scale: 1,
            color: 'rgba(255,255,255,0.4)',
            textShadow: '0px 0px 0px rgba(255,255,255,0)',
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      };

      containerRef.current?.addEventListener('mousemove', handleMouseMove);
      return () => containerRef.current?.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] border-y border-white/5 overflow-hidden flex items-center justify-center cursor-crosshair">
      
      {/* HUD Corner element */}
      <div className="absolute top-12 left-12 z-20 pointer-events-none">
        <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-mono mb-2">
          Le Standard
        </p>
      </div>

      {/* Massive rotating abstract wireframe (Oppressive scale, very faint) */}
      <div 
        ref={wireframeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] border-[1px] border-white/5 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, transparent 30%, rgba(255,255,255,0.02) 100%)'
        }}
      >
        <div className="absolute inset-0 border-[1px] border-white/5 rounded-full rotate-45 scale-75" />
        <div className="absolute inset-0 border-[1px] border-white/5 rounded-full -rotate-45 scale-50" />
      </div>

      {/* The Central Tiny Text */}
      <div className="relative z-10 p-12 max-w-[280px] text-center">
        <p 
          ref={textRef}
          className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] uppercase leading-relaxed text-white/40 transition-colors"
        >
          Perfection is not a destination. <br/><br/>
          It is the absolute minimum requirement. <br/><br/>
          Every seam. Every thread. Every millimeter of the void.
        </p>
      </div>

    </section>
  );
}
