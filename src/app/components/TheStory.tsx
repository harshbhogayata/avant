import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  "A garment is a structure, not a decoration.",
  "Fabric is a building material.",
  "The most important part of a garment is the space between the fabric and the skin.",
  "A garment must outlast its owner.",
  "Silence is a prerequisite for precision."
];

export function TheStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'top top',
          toggleActions: 'play none none reverse'
        }
      });

      // The Monumental Drop
      tl.fromTo(yearRef.current,
        { scale: 3, opacity: 0, filter: 'blur(20px)', y: -100 },
        { scale: 1, opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.5, ease: 'expo.out' }
      );

      // The Principles reveal
      const items = gsap.utils.toArray('.principle-item');
      tl.fromTo(items,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
        '-=1'
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#020202] py-32 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Heavy Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 w-full max-w-[1800px] px-6 md:px-12 mx-auto flex flex-col items-center">
        
        {/* Massive 1947 */}
        <h2 
          ref={yearRef}
          className="text-[20vw] md:text-[16vw] font-sans font-light tracking-tighter text-white uppercase leading-none mb-16 mix-blend-difference"
        >
          1947.
        </h2>

        {/* The First Principles */}
        <div className="w-full max-w-4xl">
          <p className="text-[10px] tracking-[0.4em] text-white/50 uppercase font-mono mb-8 block border-b border-white/20 pb-4">
            The First Principles // Original Draft
          </p>
          <ul ref={listRef} className="space-y-6">
            {principles.map((principle, idx) => (
              <li key={idx} className="principle-item flex items-start gap-8">
                <span className="text-white/30 font-mono text-sm pt-2">0{idx + 1}</span>
                <p className="text-2xl md:text-4xl font-serif italic text-white/80 tracking-wide leading-tight">
                  {principle}
                </p>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </section>
  );
}
