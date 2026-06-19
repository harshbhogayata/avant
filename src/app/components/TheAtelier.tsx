import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    id: '01',
    name: 'Highland Wool',
    source: 'The Scottish Borders',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: '02',
    name: 'Raw Silk Organza',
    source: 'Suzhou, China',
    img: 'https://images.unsplash.com/photo-1611244419377-b0a760c19719?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: '03',
    name: 'Horsehair Canvas',
    source: 'Buenos Aires',
    img: 'https://images.unsplash.com/photo-1584346850024-cd9bb4fba976?auto=format&fit=crop&q=80&w=2000'
  }
];

export function TheAtelier() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // Pin the entire section while crossfading images
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${materials.length * 100}%`,
        pin: true,
        scrub: true,
      });

      // Animate images fading in and out sequentially with specific easing
      gsap.utils.toArray('.atelier-img').forEach((img: any, i) => {
        if (i === 0) return; // First image starts visible

        gsap.fromTo(img,
          { opacity: 0, scale: 1.05, filter: 'blur(5px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${i * 100}% top`,
              end: `${(i + 0.5) * 100}% top`,
              scrub: true,
            }
          }
        );
      });

      // Animate the text lines switching using the Footer's exact cubic-bezier approach
      gsap.utils.toArray('.atelier-text-group').forEach((group: any, i) => {
        gsap.fromTo(group,
          { opacity: 0, y: 50 },
          {
            opacity: i === 0 ? 1 : 0, 
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${(i - 0.5) * 100}% top`,
              end: `${i * 100}% top`,
              scrub: true,
              onEnter: () => gsap.to(group, { opacity: 1, y: 0, duration: 0.8, ease: "expo.inOut" }),
              onLeave: () => gsap.to(group, { opacity: 0, y: -50, duration: 0.8, ease: "expo.inOut" }),
              onEnterBack: () => gsap.to(group, { opacity: 1, y: 0, duration: 0.8, ease: "expo.inOut" }),
              onLeaveBack: () => gsap.to(group, { opacity: 0, y: 50, duration: 0.8, ease: "expo.inOut" })
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden">
      
      {/* Heavy Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Background Images Crossfading Container */}
      <div className="absolute top-0 right-0 w-full md:w-[60vw] h-full overflow-hidden z-10 pointer-events-none">
        
        {materials.map((mat, i) => (
          <img 
            key={mat.id}
            src={mat.img} 
            alt={mat.name} 
            className={`atelier-img absolute inset-0 w-full h-full object-cover grayscale mix-blend-luminosity brightness-75 ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Deep space shadows to fade out the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/50 to-transparent z-20" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-30 w-full h-full max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col justify-center mix-blend-overlay opacity-90">
        
        {/* Massive Serif Italic matching the Footer */}
        <div className="absolute top-12 left-12">
          <h2 className="text-[6vw] font-serif italic text-white leading-[0.8] tracking-[-0.02em] m-0 p-0 drop-shadow-2xl">
            Matière
          </h2>
          <h2 className="text-[6vw] font-serif italic text-white leading-[0.8] tracking-[-0.02em] m-0 p-0 drop-shadow-2xl indent-12">
            Première
          </h2>
          <div className="w-24 h-[1px] bg-white/20 mt-8" />
        </div>

        <div className="relative w-full max-w-lg mt-48">
          {materials.map((mat, i) => (
            <div 
              key={`text-${mat.id}`} 
              className={`atelier-text-group absolute top-0 left-0 w-full ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex items-center gap-6 mb-6">
                <span className="text-[9px] text-white/50 font-mono tracking-[0.4em] uppercase">
                  [{mat.id}]
                </span>
                <span className="text-[9px] text-white/30 font-mono tracking-[0.2em] uppercase">
                  {mat.source}
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-sans font-light text-white uppercase tracking-tight leading-[0.85]">
                {mat.name}
              </h3>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
