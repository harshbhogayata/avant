import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const annotations = [
  {
    id: 'T01',
    title: 'THE VOID',
    desc: '8mm of engineered air. The garment must not touch the skin here.',
    x: '15%',
    y: '20%',
    linePath: 'M 0 0 L 100 50 L 150 50'
  },
  {
    id: 'T02',
    title: 'GRAVITY',
    desc: 'Maximum structural collapse engineered at the hem line.',
    x: '75%',
    y: '60%',
    linePath: 'M 0 0 L -80 -40 L -120 -40'
  },
  {
    id: 'T03',
    title: 'ENDURANCE',
    desc: 'Internal blind-stitch scaffolding redistributes the load across the clavicle.',
    x: '20%',
    y: '75%',
    linePath: 'M 0 0 L 60 -60 L 120 -60'
  }
];

export function TheMonument({ context = 'page' }: { context?: 'home' | 'page' }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: true,
        id: 'monument-pin'
      });

      // Animate SVG lines
      gsap.utils.toArray('.cad-line').forEach((line: any, i) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${i * 20}% top`,
            end: `${(i * 20) + 30}% top`,
            scrub: true,
          }
        });
      });

      // Animate Annotations
      gsap.utils.toArray('.cad-annotation').forEach((text: any, i) => {
        gsap.fromTo(text, 
          { opacity: 0, filter: 'blur(5px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${(i * 20) + 15}% top`,
              end: `${(i * 20) + 35}% top`,
              scrub: true,
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center">
      
      {/* Background grain */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="absolute top-12 left-12 z-20 pointer-events-none">
        <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-mono mb-2">
          {context === 'home' ? 'THE FOUNDING // 1947' : 'Schematic // 01'}
        </p>
        <p className="text-[10px] tracking-[0.2em] text-[#ff3300] uppercase font-mono">
          {context === 'home' ? 'The First Principles' : 'Architecture Vestimentaire'}
        </p>
      </div>

      {/* Massive 1947 Background (Only on Home) */}
      {context === 'home' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
          <h2 className="text-[25vw] font-sans font-light tracking-tighter text-white/[0.02] uppercase leading-none mix-blend-screen drop-shadow-[0_0_100px_rgba(255,255,255,0.05)]">
            1947.
          </h2>
        </div>
      )}

      {/* Center Monument Image */}
      <div className="relative w-[80vw] md:w-[35vw] h-[85vh] z-10 flex items-center justify-center">
        <img 
          src="/images/generated/overcoat_main_1781868422286.png" 
          alt="The Overcoat Schematic"
          className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity brightness-75"
        />

        {/* CAD Annotations Overlay */}
        {annotations.map((ann, i) => (
          <div key={ann.id} className="absolute z-20" style={{ left: ann.x, top: ann.y }}>
            
            {/* SVG Line mapping to the garment */}
            <svg className="absolute top-1/2 left-1/2 overflow-visible pointer-events-none" style={{ width: 1, height: 1 }}>
              <path 
                className="cad-line"
                d={ann.linePath}
                fill="none"
                stroke="#ff3300"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <circle cx="0" cy="0" r="2" fill="#ff3300" />
            </svg>

            {/* The Text Box */}
            <div className="cad-annotation absolute top-1/2 left-1/2 w-48 -translate-y-1/2" style={{ transform: i === 1 ? 'translate(-100%, -50%)' : 'translate(0, -50%)', marginLeft: i === 1 ? '-140px' : '170px', marginTop: i === 2 ? '-60px' : (i === 1 ? '-40px' : '50px') }}>
              <div className="border-l border-[#ff3300] pl-3 py-1">
                <span className="block text-[9px] text-[#ff3300] font-mono tracking-[0.3em] uppercase mb-1">[{ann.id}] {ann.title}</span>
                <p className="text-[10px] text-white/60 font-mono leading-relaxed uppercase tracking-widest">{ann.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
