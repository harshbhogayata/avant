import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function TheAperture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const serifRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%', // Pin for 150% of viewport height
          pin: true,
          scrub: 0.5 // Tightened from 1 to 0.5 for responsiveness
        }
      });

      // Phase 1: The aperture violently rips open vertically to reveal the dark interior
      tl.to(apertureRef.current, 
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' }
      );

      // Phase 2: The text resolves from the shadows
      tl.fromTo('.aperture-text',
        { opacity: 0, filter: 'blur(20px)', scale: 1.05 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out' },
        '-=1' // Overlap with the aperture opening
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden cursor-crosshair border-b border-white/5">
      
      {/* The Aperture Reveal (Dark Mode Interior) */}
      <div 
        ref={apertureRef}
        className="absolute inset-0 w-full h-full bg-[#050505] z-10 flex flex-col items-center justify-center will-change-transform shadow-[inset_0_0_100px_rgba(255,255,255,0.02)] border-y border-white/20"
        style={{ clipPath: 'inset(49.8% 0% 49.8% 0%)' }}
      >
        
        {/* Heavy Film Grain for 1% Texture */}
        <div 
          className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none z-0"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        <div className="relative z-10 w-full max-w-[1800px] px-6 md:px-12 mx-auto text-center flex flex-col items-center">
          
          <h2 
            ref={textRef}
            className="aperture-text text-[12vw] font-sans font-light tracking-tight text-white uppercase leading-[0.85] mb-8 drop-shadow-2xl"
          >
            THE VOID
          </h2>

          <h3 
            ref={serifRef}
            className="aperture-text text-[6vw] md:text-[4vw] font-serif italic text-white/80 tracking-wide m-0 drop-shadow-2xl"
          >
            8mm of engineered air.
          </h3>

        </div>

        {/* Global HUD elements */}
        <div className="aperture-text absolute bottom-12 left-[5vw] md:left-[8vw] z-20 pointer-events-none w-full pr-12">
          <div className="flex items-end justify-between w-full max-w-sm">
            <div className="shrink-0 pr-6">
              <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono block leading-none">
                Philosophy // 01
              </span>
            </div>
            <div className="h-[1px] bg-white/20 flex-1 mb-[3px]" />
          </div>
        </div>

      </div>

    </section>
  );
}
