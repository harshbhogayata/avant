import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HomePhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!containerRef.current || !maskRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      tl.to(maskRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        duration: 1
      });

      const lore = containerRef.current.querySelector('.philosophy-lore');
      if (lore) {
        tl.to(lore, { opacity: 1, duration: 0.3 }, '+=0.1');
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-[300vh] w-full bg-[#111111] relative border-t border-white/10"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 md:p-12">

        {/* Concrete texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/images/lore/first_principles.png')] bg-cover bg-center grayscale" />

        {/* Film Grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        <p className="absolute top-12 left-12 text-[10px] tracking-[0.4em] uppercase text-white/30 z-20 font-mono">
          02 — Le Standard
        </p>

        <div className="relative w-full max-w-[1400px] flex flex-col items-center">
          <div className="relative w-full text-center">

            {/* Ghost / chalk outline text */}
            <h2
              className="text-[9vw] md:text-[6vw] font-extralight uppercase leading-[0.9] tracking-tighter text-white/5"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
            >
              Perfection is not a destination.<br />It is the absolute minimum requirement.
            </h2>

            {/* Solid fill text revealed by clip-path mask */}
            <div
              ref={maskRef}
              className="absolute top-0 left-0 w-full h-full flex justify-center"
              style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            >
              <h2 className="text-[9vw] md:text-[6vw] font-extralight uppercase leading-[0.9] tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                Perfection is not a destination.<br />It is the absolute minimum requirement.
              </h2>
            </div>
          </div>

          {/* Lore subtext */}
          <div className="philosophy-lore opacity-0 mt-12 md:mt-20 max-w-2xl text-center flex flex-col items-center gap-6 relative z-20">
            <div className="w-[1px] h-12 bg-white/20" />
            <p className="text-sm md:text-base font-serif italic text-white/60 leading-relaxed px-6">
              This phrase — known internally as <em>Le Standard</em> — is never printed on garments and never used in marketing. It exists only in chalk on the raw concrete wall above The Keeper's inspection table. It is the final filter before a piece is permitted to leave the archive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
