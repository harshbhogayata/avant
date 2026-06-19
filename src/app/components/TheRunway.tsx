import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const runwayItems = [
  { id: 'r1', year: '1951', title: 'The Overcoat', img: '/images/generated/overcoat_main_1781868422286.png', desc: 'Internal blind-stitch scaffolding' },
  { id: 'r2', year: '1964', title: 'The Trench', img: '/images/generated/trench_main_1781868466120.png', desc: '100% Cotton Gabardine' },
  { id: 'r3', year: '1972', title: 'The Cape', img: '/images/generated/cape_main_1781868500274.png', desc: 'Double-faced cashmere' },
  { id: 'r4', year: '1984', title: 'The Peacoat', img: '/images/generated/peacoat_main_1781868542884.png', desc: 'Dense boiled wool' },
  { id: 'r5', year: '1988', title: 'The Jacket', img: '/images/generated/jacket_main_1781868579593.png', desc: 'Engineered void' }
];

export function TheRunway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const sections = gsap.utils.toArray('.runway-item');
      
      // Dynamic calculation for scroll width to prevent breaking when images load
      const getScrollAmount = () => {
        return trackRef.current ? -(trackRef.current.scrollWidth - window.innerWidth) : 0;
      };

      const scrollTween = gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${trackRef.current ? trackRef.current.scrollWidth - window.innerWidth : 0}`,
          pin: true,
          scrub: 0.5, // Tightened from 1 to 0.5 for responsiveness
          invalidateOnRefresh: true, // CRITICAL: Recalculates on resize/image load
        }
      });

      // Extreme Deep Space Parallax for images INSIDE the horizontally moving frames
      // This replaces the buggy velocity skew with something elegant and flawless
      sections.forEach((section: any) => {
        const img = section.querySelector('.runway-img');
        
        gsap.to(img, {
          xPercent: 40, // Move image right as container moves left
          scale: 1.1, // Slight scale effect
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: 'left right', // When the left of the item hits the right of the screen
            end: 'right left',   // When the right of the item hits the left of the screen
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden">
      
      {/* Heavy Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none z-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Global Header */}
      <div className="absolute top-12 left-12 z-50 pointer-events-none mix-blend-difference">
        <p className="text-[10px] tracking-[0.5em] text-white/50 uppercase font-mono mb-2">
          Runway // The Sequence
        </p>
        <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono">
          The Permanent Archive
        </p>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="absolute top-0 left-0 h-full flex items-center will-change-transform pt-16 md:pt-0">
        
        {/* Intro Spacing */}
        <div className="w-[10vw] md:w-[20vw] h-full shrink-0" />

        {runwayItems.map((item) => (
          <div key={item.id} className="runway-item relative w-[85vw] md:w-[45vw] h-[75vh] md:h-[65vh] shrink-0 mr-8 md:mr-32 flex flex-col justify-end will-change-transform overflow-hidden">
            
            {/* The Image Wrapper */}
            <div className="absolute top-0 left-0 w-full h-[80%] overflow-hidden bg-[#050505] relative">
              {/* Image with Parallax */}
              <img 
                src={item.img} 
                alt={item.title} 
                className="runway-img absolute top-0 left-[-20%] w-[140%] h-full object-cover grayscale opacity-80 mix-blend-luminosity brightness-90 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80 z-10" />
              
              {/* Grain inside the picture itself */}
              <div 
                className="absolute inset-0 opacity-10 mix-blend-screen pointer-events-none z-20"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
              />
            </div>

            {/* Typography Below the Image */}
            <div className="relative z-30 w-full flex flex-col mt-auto pt-6 bg-[#020202]">
              <span className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-mono mb-2">
                [{item.year}]
              </span>
              <h3 className="text-4xl md:text-5xl font-sans font-light tracking-tight uppercase text-white leading-none mb-2">
                {item.title}
              </h3>
              <p className="text-lg font-serif italic text-white/60 tracking-wide">
                {item.desc}
              </p>
            </div>

          </div>
        ))}
        
        {/* Outro Spacing */}
        <div className="w-[40vw] h-full shrink-0 flex items-center justify-center">
           <a href="/shop" className="group cursor-pointer">
             <h2 className="text-[6vw] font-serif italic text-white/40 leading-[0.8] whitespace-nowrap mix-blend-screen drop-shadow-2xl transition-colors duration-500 group-hover:text-white">
               View Collection
             </h2>
             <div className="w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full mt-4" />
           </a>
        </div>

      </div>

    </section>
  );
}
