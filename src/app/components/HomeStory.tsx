import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HomeStory() {
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (textMaskRef.current && storyContainerRef.current) {
        gsap.set(textMaskRef.current, {
          scale: 150,
          transformOrigin: '35% 50%'
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: storyContainerRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          }
        });

        tl.to(textMaskRef.current, { scale: 150, duration: 0.5, ease: 'none' });
        tl.to(textMaskRef.current, { scale: 1, ease: 'power3.out', duration: 1.5 });
        if (labelRef.current) {
          tl.to(labelRef.current, { opacity: 1, duration: 0.5 }, '-=0.5');
        }

        const words = storyContainerRef.current.querySelectorAll('.home-story-word');
        words.forEach((word) => {
          gsap.to(word, {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: word,
              start: 'top 95%',
              end: 'top 85%',
              scrub: 1,
            }
          });
        });
      }
    });

    // Ensure ScrollTrigger recalculates after fonts/images load
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={storyContainerRef}
      className="min-h-screen w-full relative bg-[#020202] overflow-hidden pt-[15vh] pb-32 border-t border-white/5"
    >
      {/* Film Grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col items-start px-6 md:px-12">

        <span
          ref={labelRef}
          className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4 border-b border-white/20 pb-2 opacity-0 w-max font-mono"
        >
          01 — La Genèse
        </span>

        {/* The Monumental Year */}
        <div className="w-full">
          <span
            ref={textMaskRef}
            className="inline-block font-sans font-bold tracking-tighter text-white ml-[8vw] text-4xl md:text-6xl lg:text-[6vw] leading-none"
          >
            1947.
          </span>
        </div>

        {/* The Founding Story — words revealed on scroll */}
        <div className="mt-4 md:mt-6 ml-[8vw] max-w-3xl flex flex-col gap-4 md:gap-5 pb-12">
          <p className="text-xl md:text-2xl lg:text-[1.8vw] font-serif italic text-white leading-tight flex flex-wrap gap-x-[0.5vw] gap-y-1">
            {`In the winter of 1947, while Paris celebrated the New Look — twenty-five meters of silk for a single skirt — an architect walked out of the presentation and never returned. He saw garments not as decoration, but as shelter. The excess disgusted him. He founded L'Atelier in a decommissioned concrete facility with three people and a single conviction: clothing is structure.`
              .split(' ')
              .map((word, i) => (
                <span key={`p1-${i}`} className="home-story-word opacity-[0.15]">{word}</span>
              ))
            }
          </p>

          <p className="text-sm md:text-base font-sans font-light tracking-wide text-white/80 leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
            {`He drafted the first garment on architectural blueprint paper. Not a sketch — a structural calculation. The weight distribution across the clavicle. The drape coefficient of unbleached highland wool. The precise 8 millimeters of air between the fabric and the skin — The Void — where a garment stops being clothing and becomes private architecture.`
              .split(' ')
              .map((word, i) => (
                <span key={`p2-${i}`} className="home-story-word opacity-[0.15]">{word}</span>
              ))
            }
          </p>

          <p className="text-sm md:text-base font-sans font-light tracking-wide text-white/80 leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
            {`By 1953, he banned every synthetic fiber from the workshop. By 1972, he decreed that no garment would ever be touched by more than fourteen artisans. By 1992, he withdrew from fashion weeks entirely. The runway, he said, was theatre for the temporary. L'Atelier produces fewer than sixty garments a year. They are not purchased. They are commissioned and inherited.`
              .split(' ')
              .map((word, i) => (
                <span key={`p3-${i}`} className="home-story-word opacity-[0.15]">{word}</span>
              ))
            }
          </p>

          <p className="text-xs md:text-sm font-sans font-bold tracking-widest uppercase text-white/60 leading-loose flex flex-wrap gap-x-2 gap-y-1 mt-6">
            {`Perfection is not a destination. It is the absolute minimum requirement. This is not fashion. This is physical architecture.`
              .split(' ')
              .map((word, i) => (
                <span key={`p4-${i}`} className="home-story-word opacity-[0.15]">{word}</span>
              ))
            }
          </p>
        </div>
      </div>
    </section>
  );
}
