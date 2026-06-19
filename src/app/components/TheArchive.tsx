import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const archiveItems = [
  { id: 'v1', year: '1951', title: 'The Overcoat', img: '/images/generated/overcoat_main_1781868422286.png', desc: 'Internal blind-stitch scaffolding' },
  { id: 'v2', year: '1964', title: 'The Trench', img: '/images/generated/trench_main_1781868466120.png', desc: '100% Cotton Gabardine' },
  { id: 'v3', year: '1972', title: 'The Cape', img: '/images/generated/cape_main_1781868500274.png', desc: 'Double-faced cashmere' },
  { id: 'v4', year: '1984', title: 'The Peacoat', img: '/images/generated/peacoat_main_1781868542884.png', desc: 'Dense boiled wool' },
];

export function TheArchive({ context = 'page' }: { context?: 'home' | 'page' }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.utils.toArray('.archive-panel').forEach((panel: any) => {
        const img = panel.querySelector('.archive-img');
        const textWrapper = panel.querySelector('.archive-text-wrapper');

        // Cinematic Image Reveal
        gsap.fromTo(img, 
          { scale: 1.1, filter: 'blur(20px)', opacity: 0 },
          {
            scale: 1,
            filter: 'blur(0px)',
            opacity: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'top 30%',
              scrub: 1.5 // Buttery smooth scrub delay
            }
          }
        );

        // Fade image out into deep space when scrolling past
        gsap.to(img, {
          yPercent: 20, // Parallax down
          scale: 0.9,
          filter: 'blur(10px)',
          opacity: 0,
          ease: 'power3.in',
          scrollTrigger: {
            trigger: panel,
            start: 'bottom 80%',
            end: 'bottom top',
            scrub: true
          }
        });

        // Massive Typography Parallax moving up faster
        gsap.fromTo(textWrapper,
          { yPercent: 30, opacity: 0, filter: 'blur(10px)' },
          {
            yPercent: -30,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top 90%',
              end: 'bottom top',
              scrub: true
            }
          }
        );

      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#020202] pt-12 pb-32 overflow-hidden">
      
      {/* Heavy Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none z-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="flex flex-col w-full">
        {archiveItems.map((item, index) => (
          <div key={item.id} className="archive-panel relative w-full h-[130vh] flex items-center justify-center">
            
            {/* Background Container for the Garment Image */}
            <div className="absolute right-0 w-full md:w-[65vw] h-[90vh] flex items-center justify-end overflow-hidden z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] z-10" />
              <img 
                src={item.img} 
                alt={item.title} 
                className="archive-img w-full h-full object-cover grayscale mix-blend-luminosity brightness-75 object-top"
              />
            </div>

            {/* Foreground Typographic Layout */}
            <div className="archive-text-wrapper relative z-20 w-full max-w-[1800px] px-6 md:px-12 mx-auto mix-blend-difference select-none">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-mono mb-4">
                  [{item.year}]
                </span>
                
                {/* 14vw Tightly Tracked Sans-Serif matching Hero */}
                <h3 className="text-[16vw] md:text-[12vw] font-sans font-light tracking-tight uppercase leading-[0.85] text-white mb-8 ml-[-1vw]">
                  {item.title}
                </h3>
                
                {/* Elegant Serif Italic Description matching Hero/Footer */}
                <p className="text-2xl md:text-4xl font-serif italic text-white/80 tracking-wide max-w-xl pr-6 md:pl-24">
                  {item.desc}
                </p>

                {/* Delicate structural line */}
                <div className="w-1/2 max-w-sm h-[1px] bg-white/20 mt-12 md:ml-24" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
