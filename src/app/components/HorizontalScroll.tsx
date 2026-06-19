import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 1,
    title: 'THE CAPE',
    image: '/images/runway/the_cape.png',
  },
  {
    id: 2,
    title: 'THE TRENCH',
    image: '/images/runway/the_trench.png',
  },
  {
    id: 3,
    title: 'THE BLAZER',
    image: '/images/runway/the_blazer.png',
  },
  {
    id: 4,
    title: 'THE GOWN',
    image: '/images/runway/the_gown.png',
  }
];

const materials = [
  { id: 1, title: 'HIGHLAND WOOL', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000' },
  { id: 2, title: 'RAW SILK ORGANZA', image: 'https://images.unsplash.com/photo-1611244419377-b0a760c19719?auto=format&fit=crop&q=80&w=2000' },
  { id: 3, title: 'HORSEHAIR CANVAS', image: 'https://images.unsplash.com/photo-1584346850024-cd9bb4fba976?auto=format&fit=crop&q=80&w=2000' }
];

export function HorizontalScroll({ context = 'page' }: { context?: 'home' | 'page' }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const displayItems = context === 'home' ? materials : collections;

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;
    if (!container || !scroll) return;

    let ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;
      const scrollWidth = scroll.scrollWidth - window.innerWidth;
      
      if (isDesktop) {
        gsap.to(scroll, {
          x: -scrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Aggressive scale down on scroll to create physical weight
        const panels = scroll.querySelectorAll('.panel');
        panels.forEach((panel) => {
          gsap.fromTo(panel, 
            { scale: 1.1, filter: 'brightness(1.5) contrast(1.2)' },
            {
              scale: 0.85,
              filter: 'brightness(0.3) contrast(2)',
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.getById(scroll.id) || undefined, // Wait, containerAnimation is tricky. Let's just use regular scroll relative to viewport.
                start: 'left center',
                end: 'right center',
                scrub: true,
              }
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-[#050505] overflow-hidden py-32 lg:py-0 border-t border-white/5">
      
      <div className="lg:absolute lg:top-12 lg:left-12 z-20 px-6 lg:px-0 mb-12 lg:mb-0 pointer-events-none mix-blend-difference">
        <p className="text-[10px] tracking-[0.5em] text-[#f40] uppercase mb-4 font-mono">
          {context === 'home' ? '03 — The Sourcing' : '03 — Production'}
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-sans text-white tracking-tighter uppercase leading-[0.8]">
          {context === 'home' ? (
            <>Raw<br/>Matter</>
          ) : (
            <>Industrial<br/>Line</>
          )}
        </h2>
      </div>

      <div 
        ref={scrollRef} 
        className="flex flex-col lg:flex-row lg:absolute lg:top-0 lg:left-0 lg:h-screen lg:items-center px-6 lg:px-0 lg:pl-[30vw] pb-12 lg:pb-0 gap-8 lg:gap-0"
      >
        {displayItems.map((item, index) => (
          <div
            key={item.id}
            className="panel relative w-full lg:w-[60vw] h-[60vh] lg:h-[80vh] flex-shrink-0 group cursor-default border border-white/10 overflow-hidden bg-[#0a0a0a]"
          >
            {/* The Image */}
            <div className="absolute inset-0">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out mix-blend-luminosity"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </div>

            {/* Industrial Overlay */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-1000 mix-blend-multiply pointer-events-none" />

            {/* Massive Watermark Number */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 text-[50vw] lg:text-[40vw] font-black leading-none font-sans tracking-tighter pointer-events-none">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Typography Overlays */}
            <div className="absolute bottom-12 lg:bottom-16 left-6 lg:left-12 mix-blend-difference pointer-events-none">
              <h3 className="text-5xl sm:text-6xl lg:text-8xl font-black font-sans text-white mb-2 tracking-tighter uppercase leading-[0.8]">
                {item.title}
              </h3>
              <p className="text-[10px] tracking-[0.4em] text-[#f40] uppercase font-mono">
                {context === 'home' ? `Origin // ${String(index + 1).padStart(3, '0')}` : `Model // ${String(index + 1).padStart(3, '0')}`}
              </p>
            </div>
          </div>
        ))}
        {/* End padding block */}
        <div className="hidden lg:block w-[10vw] h-full flex-shrink-0"></div>
      </div>

      {/* Scroll progress */}
      <div className="hidden lg:block absolute bottom-12 right-12 text-white/40 text-[10px] tracking-[0.3em] uppercase pointer-events-none font-mono">
        <span className="animate-pulse">Scrub to advance &rarr;</span>
      </div>
      
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}