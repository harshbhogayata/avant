import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  
  // The word they wanted
  const text = "AVANT PARIS".split('');

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Cinematic blur entrance for the image
      tl.fromTo(imageRef.current, 
        { scale: 1.1, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power3.out' }
      );

      // Intense volumetric light slow reveal
      tl.fromTo(lightRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 4, ease: 'power2.out' },
        '-=2'
      );

      // Fracture typography drop-in
      tl.fromTo('.hero-char',
        { 
          yPercent: 100, 
          rotationX: -90,
          opacity: 0,
          transformOrigin: "50% 100% -50"
        },
        { 
          yPercent: 0, 
          rotationX: 0,
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.05, 
          ease: 'expo.out' 
        },
        '-=2.5'
      );

      // Scroll Parallax
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Text Parallax (moves up slightly faster than background)
      gsap.to(textRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#020202] flex items-center justify-center overflow-hidden perspective-1000">
      
      {/* Background Image Container */}
      <div className="absolute top-0 right-0 w-full md:w-[65vw] h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent z-10" />
        <img 
          ref={imageRef}
          src="/images/generated/hero_avant_paris_1781868411351.png" 
          alt="Avant Paris Brutalism" 
          className="w-full h-full object-cover grayscale opacity-90 object-right-top"
        />
      </div>

      {/* Volumetric Light Overlay */}
      <div 
        ref={lightRef}
        className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Fracture Typography */}
      <div className="absolute inset-0 flex items-center justify-start pl-[5vw] md:pl-[8vw] pointer-events-none">
        <h1 
          ref={textRef} 
          className="relative z-20 text-[14vw] md:text-[10vw] font-sans font-light tracking-tight text-white uppercase leading-[0.85] flex flex-col items-start transform-style-3d mix-blend-difference whitespace-nowrap"
        >
          <div className="flex">
            {"AVANT".split('').map((char, i) => (
              <span key={`w1-${i}`} className="hero-char inline-block">{char}</span>
            ))}
          </div>
          <div className="flex relative">
            {/* Invisible spacer to precisely align 'P' under 'T' */}
            {"AVAN".split('').map((char, i) => (
              <span key={`spacer-${i}`} className="inline-block opacity-0 select-none">{char}</span>
            ))}
            {"PARIS".split('').map((char, i) => (
              <span key={`w2-${i}`} className="hero-char inline-block">{char}</span>
            ))}
          </div>
        </h1>
      </div>

      {/* Bottom Left Lore & Exact-Width Line */}
      <div className="absolute bottom-12 left-[5vw] md:left-[8vw] z-30 pointer-events-none">
        {/* Invisible clone of the text to establish the exact width ending at 'S' */}
        <div className="text-[14vw] md:text-[10vw] font-sans font-light tracking-tight uppercase leading-[0.85] whitespace-nowrap opacity-0 h-0 overflow-visible">
          <div className="flex h-0">
            {"AVAN".split('').map((char, i) => <span key={`c1-${i}`} className="inline-block">{char}</span>)}
            {"PARIS".split('').map((char, i) => <span key={`c2-${i}`} className="inline-block">{char}</span>)}
          </div>
        </div>

        {/* Visible Content constrained to that exact width */}
        <div className="absolute bottom-0 left-0 w-full flex items-end justify-between">
          <div className="shrink-0 pr-6 md:pr-10">
            <h2 className="text-sm md:text-base font-serif italic text-white/80 tracking-wide mb-2 leading-none">
              The Permanent Archive.
            </h2>
            <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase font-mono block leading-none">
              Architecture Vestimentaire // FW26
            </span>
          </div>
          {/* The line stretching to the 'S' */}
          <div className="h-[1px] bg-white/40 flex-1 mb-[3px]" />
        </div>
      </div>

      {/* Heavy Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none z-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}
