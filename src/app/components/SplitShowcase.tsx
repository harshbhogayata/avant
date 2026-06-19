import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export function SplitShowcase({ context = 'page' }: { context?: 'home' | 'page' }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Violent text block reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Image bleed parallax
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
      
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex flex-col min-h-[90vh] bg-[#020202] overflow-hidden border-y border-white/10 py-24 md:py-32">
      
      {/* Background Graphic elements */}
      <div className="absolute top-12 left-12 md:top-24 md:left-24 text-[#f40]/20 font-mono text-[20vw] leading-none pointer-events-none z-0 mix-blend-screen hidden md:block">
        [X]
      </div>

      <div className="max-w-[1800px] w-full mx-auto relative z-10 flex flex-col lg:flex-row items-center px-6 lg:px-12 h-full">
        
        {/* Left Side - The Decree Content */}
        <div
          ref={textRef}
          className="w-full lg:w-1/2 flex flex-col justify-center text-white relative z-20 pr-0 lg:pr-24"
        >
          <div className="border border-white/20 p-8 md:p-16 bg-black/80 backdrop-blur-md">
            
            <div className="flex justify-between items-start border-b border-white/20 pb-8 mb-8">
              <span className="text-[10px] tracking-[0.5em] uppercase text-white/50 font-mono">
                {context === 'home' ? 'FOUNDING // 1947' : 'REF // 004.992'}
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-mono text-right">
                {context === 'home' ? 'THE FIRST\nPRINCIPLES' : 'RESTRICTED\nACCESS'}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-tighter leading-[0.9] text-white uppercase mb-12">
              {context === 'home' ? (
                <>ABSOLUTE<br />MINIMUM</>
              ) : (
                <>ABSOLUTE<br />CONTROL</>
              )}
            </h2>

            <div className="text-xs md:text-sm tracking-[0.1em] text-white/70 leading-[2] font-mono uppercase space-y-6">
              {context === 'home' ? (
                <>
                  <p>A garment is a structure, not a decoration. Fabric is a building material.</p>
                  <p className="text-white/40">The most important part of a garment is the space between the fabric and the skin.</p>
                </>
              ) : (
                <>
                  <p>We do not produce stock. We produce architecture. Every garment is a strictly calibrated instrument, measured to absolute tolerances.</p>
                  <p className="text-white/40">The waiting list for a bespoke commission is currently 18 months. Applications are reviewed quarterly. Not all commissions are accepted.</p>
                </>
              )}
            </div>

            <Link to="/atelier" className="group mt-16 w-full flex items-center justify-between border border-white/20 bg-white/5 hover:bg-white p-4 transition-colors duration-500">
              <span className="text-[10px] tracking-[0.4em] text-white uppercase font-mono group-hover:text-black font-bold transition-colors">
                &gt; {context === 'home' ? 'Read_Manifesto' : 'Execute_Application'}
              </span>
              <span className="text-white group-hover:text-black font-mono animate-pulse">_</span>
            </Link>
          </div>
        </div>

        {/* Right Side - Aggressive Image Bleed */}
        <div className="w-full lg:w-1/2 relative h-[60vh] lg:h-[80vh] mt-12 lg:mt-0 z-10">
          <div className="absolute inset-0 border border-white/10" />
          <div
            ref={imageRef}
            className="absolute inset-4 bg-cover bg-center origin-center grayscale opacity-80 mix-blend-luminosity"
            style={{
              backgroundImage:
                'url(/images/runway/the_overcoat.png)',
            }}
          />
          {/* Intense vignette to blend it into the void */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#020202_80%)]" />
        </div>

      </div>

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
}