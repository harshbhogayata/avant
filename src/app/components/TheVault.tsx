import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VAULT_ITEMS = [
  { id: 'v1', year: '1951', title: 'THE OVERCOAT', img: '/images/generated/overcoat_main_1781868422286.png', desc: 'INTERNAL BLIND-STITCH SCAFFOLDING' },
  { id: 'v2', year: '1964', title: 'THE TRENCH', img: '/images/generated/trench_main_1781868466120.png', desc: '100% COTTON GABARDINE. TREATED.' },
  { id: 'v3', year: '1972', title: 'THE CAPE', img: '/images/generated/cape_main_1781868500274.png', desc: 'DOUBLE-FACED CASHMERE. UNBROKEN.' },
  { id: 'v4', year: '1984', title: 'THE PEACOAT', img: '/images/generated/peacoat_main_1781868542884.png', desc: 'DENSE BOILED WOOL. RIGID SILHOUETTE.' },
  { id: 'v5', year: '1988', title: 'THE JACKET', img: '/images/generated/jacket_main_1781868579593.png', desc: 'ENGINEERED AROUND THE ABSOLUTE VOID.' },
];

export function TheVault({ context = 'page' }: { context?: 'home' | 'page' }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Very slight parallax on the whole list as it scrolls
      gsap.to(listRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#020202] py-48 overflow-hidden cursor-crosshair">
      
      {/* Absolute HUD */}
      <div className="absolute top-12 left-12 z-20 pointer-events-none mix-blend-difference">
        <p className="text-[10px] tracking-[0.5em] text-white/50 uppercase font-mono mb-2">
          {context === 'home' ? 'The Collection // Fall Winter 2026' : 'The Archive // Flash Inventory'}
        </p>
      </div>

      {/* The Flashing Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {VAULT_ITEMS.map((item, index) => (
          <img
            key={`img-${item.id}`}
            src={item.img}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity brightness-75"
            // Crucial: Instant display, no transition
            style={{ 
              display: hoveredIndex === index ? 'block' : 'none',
              filter: 'contrast(1.2)' 
            }} 
          />
        ))}
      </div>

      {/* Heavy CRT/Scanline Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.1] mix-blend-screen pointer-events-none z-10"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)` }} 
      />

      {/* The Typographic List */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col justify-center min-h-[80vh]">
        <ul ref={listRef} className="flex flex-col w-full group">
          {VAULT_ITEMS.map((item, index) => (
            <li 
              key={item.id}
              className="border-b border-white/5 last:border-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between py-8 md:py-12 cursor-pointer transition-colors duration-100 opacity-50 hover:opacity-100">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#ff3300] font-mono tracking-[0.4em] mb-4">
                    [{item.year}]
                  </span>
                  <h2 className="text-[10vw] md:text-[8vw] font-extralight tracking-tighter uppercase leading-[0.8] text-white mix-blend-difference m-0 p-0">
                    {item.title}
                  </h2>
                </div>
                <div className="hidden md:block w-full max-w-[200px] text-right">
                   <p className="text-[9px] font-mono tracking-[0.2em] text-white/50 uppercase leading-relaxed">
                     {item.desc}
                   </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
