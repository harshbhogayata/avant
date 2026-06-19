import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function MarqueeText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  const manifesto = [
    "WE", "REJECT", "THE", "DISPOSABLE.",
    "WE", "REJECT", "THE", "SYNTHETIC.",
    "THIS", "IS", "NOT", "FASHION.",
    "THIS", "IS", "ARCHITECTURE."
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!wordsRef.current) return;

      const words = wordsRef.current.querySelectorAll('.manifesto-word');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      // Brutal, overlapping assault
      words.forEach((word, i) => {
        tl.fromTo(word,
          { 
            opacity: 0, 
            scale: 2, 
            filter: 'blur(20px)',
            z: 100
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            z: 0,
            ease: 'expo.out',
            duration: 1
          },
          i * 0.4
        );
        
        // Let it linger, then violently disappear
        tl.to(word, {
          opacity: 0,
          scale: 0.8,
          filter: 'blur(10px)',
          duration: 0.5,
          ease: 'power2.in'
        }, `+=${0.5}`);
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400vh] bg-[#050505] flex items-start justify-center overflow-hidden"
    >
       <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden mix-blend-difference z-20">
          <div ref={wordsRef} className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {manifesto.map((word, i) => (
              <h2 
                key={i} 
                className="manifesto-word absolute text-[18vw] md:text-[15vw] font-black leading-[0.8] tracking-tighter text-white uppercase text-center w-full"
                style={{
                  // Slight random offset to make it feel chaotic and physical
                  transform: `translate(${(i % 3 - 1) * 5}vw, ${(i % 2 === 0 ? 1 : -1) * 2}vh)`
                }}
              >
                {word}
              </h2>
            ))}
          </div>
       </div>

       {/* Grain Background */}
       <div 
        className="fixed inset-0 opacity-[0.04] mix-blend-screen pointer-events-none z-10"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}
