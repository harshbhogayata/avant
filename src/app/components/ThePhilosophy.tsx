import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ThePhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLHeadingElement>(null);

  const text = "PERFECTION IS NOT A DESTINATION. IT IS THE ABSOLUTE MINIMUM REQUIREMENT.";

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const words = gsap.utils.toArray('.phil-word');

      // The Scrubbing Dust Interaction
      gsap.fromTo(words,
        { opacity: 0.1, filter: 'blur(2px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            end: 'bottom 80%',
            scrub: 0.5
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#020202] py-32 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* Heavy Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 w-full max-w-[1600px] px-6 md:px-12 mx-auto flex flex-col items-start">
        
        <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-mono mb-12">
          The Brutal Standard // Chapter 10
        </p>

        <h2 
          ref={textContainerRef}
          className="text-4xl md:text-6xl lg:text-[7vw] font-sans font-light tracking-tight text-white uppercase leading-[0.9] flex flex-wrap gap-x-[2vw] gap-y-4"
        >
          {text.split(' ').map((word, wIdx) => (
            <span key={wIdx} className="phil-word inline-block will-change-[opacity,filter]">
              {word}
            </span>
          ))}
        </h2>

      </div>

    </section>
  );
}
