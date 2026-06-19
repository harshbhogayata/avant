import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KinematicLink = ({ to, label }: { to: string, label: string }) => (
  <Link to={to} className="relative block overflow-hidden group text-white/60 hover:text-white transition-colors cursor-hover">
    <span className="block transition-transform duration-500 cubic-bezier(0.7, 0, 0.3, 1) group-hover:-translate-y-full">
      {label}
    </span>
    <span className="absolute left-0 top-full transition-transform duration-500 cubic-bezier(0.7, 0, 0.3, 1) group-hover:-translate-y-full">
      {label}
    </span>
  </Link>
);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax Curtain Reveal
      // The footer container is h-screen, but the inner content starts pushed up
      // and parallax-scrolls into place exactly as you scroll past it.
      gsap.fromTo(innerRef.current, 
        { yPercent: -30, opacity: 0.5 }, 
        {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom', // when top of footer hits bottom of viewport
            end: 'bottom bottom', // when bottom of footer hits bottom of viewport
            scrub: true
          }
        }
      );

      // Deep Space Parallax for the massive text (Subtle & Expensive)
      gsap.fromTo(textRef.current,
        { yPercent: -15, scale: 0.95, opacity: 0.6 },
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top bottom', // Start exactly when the text enters the screen
            end: 'bottom bottom', // End exactly when it hits the bottom
            scrub: true
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full bg-[#050505] overflow-hidden border-t border-white/5">
      
      {/* Background Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-screen pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div ref={innerRef} className="relative w-full flex flex-col gap-4 md:gap-8 pt-16 md:pt-24 pb-6 px-6 lg:px-12 z-10 will-change-transform">
        
        {/* TOP SECTION: Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8 max-w-[1800px] mx-auto w-full flex-1">
           
           {/* Left: Immersive Newsletter */}
           <div className="w-full lg:w-1/2 space-y-8 max-w-xl">
             <h3 className="text-4xl md:text-5xl lg:text-7xl font-extralight tracking-tighter uppercase leading-none mb-8 text-white">
               Join The <br /> Collection
             </h3>
             <form className="relative group w-full" onSubmit={(e) => { e.preventDefault(); }}>
               <input
                 type="email"
                 placeholder="Votre adresse email"
                 required
                 className="w-full bg-transparent border-b border-white/20 pb-4 text-xl md:text-2xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-white transition-colors rounded-none"
               />
               <button 
                 type="submit"
                 className="absolute right-0 bottom-4 text-white hover:text-white/70 transition-colors cursor-hover"
               >
                 <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform duration-500 ease-out" />
               </button>
             </form>
             <p className="text-[10px] md:text-xs text-white/30 tracking-[0.2em] font-mono uppercase">
               Exclusive access. Private presentations. Absolute silence.
             </p>
           </div>

           {/* Right: Architectural Grid Links */}
           <div className="w-full lg:w-1/2 flex justify-start lg:justify-end gap-16 md:gap-32 lg:pt-12">
              <div className="space-y-8">
                <h4 className="text-xs tracking-[0.3em] uppercase text-white/50 font-mono">The Atelier</h4>
                <ul className="space-y-4">
                  <li><KinematicLink to="/atelier#our-story" label="Our Story" /></li>
                  <li><KinematicLink to="/atelier#philosophy" label="Philosophy" /></li>
                  <li><KinematicLink to="/atelier#sustainability" label="Sustainability" /></li>
                  <li><KinematicLink to="/atelier#journal" label="Journal" /></li>
                  <li><KinematicLink to="/atelier#contact" label="Contact" /></li>
                </ul>
              </div>

              <div className="space-y-8">
                <h4 className="text-xs tracking-[0.3em] uppercase text-white/50 font-mono">Collection</h4>
                <ul className="space-y-4">
                  <li><KinematicLink to="/shop" label="View All" /></li>
                  <li><KinematicLink to="/shop" label="The Collection" /></li>
                  <li><KinematicLink to="/shop" label="Limited Edition" /></li>
                  <li><KinematicLink to="/shop" label="Bespoke" /></li>
                  <li><KinematicLink to="/shop" label="Details" /></li>
                </ul>
              </div>
           </div>
        </div>

        {/* BOTTOM SECTION: Massive Typography & Sub-footer */}
        <div className="w-full mt-auto relative pt-4 max-w-[1800px] mx-auto">
           {/* Sub-footer details */}
           <div className="flex flex-col md:flex-row justify-between items-end text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4 relative z-20 font-mono w-full">
              {/* Bottom Left */}
              <div className="flex flex-col gap-2">
                 <span>&copy; 2026 AVANT PARIS</span>
                 <span className="text-white/20">STUDIO &mdash; 48.8566&deg; N, 2.3522&deg; E</span>
              </div>
              
              {/* Right Side Links */}
              <div className="flex flex-wrap gap-8 md:gap-12 mt-6 md:mt-0">
                 <Link to="/" className="hover:text-white transition-colors cursor-hover">Instagram</Link>
                 <Link to="/" className="hover:text-white transition-colors cursor-hover">Twitter</Link>
                 <Link to="/" className="hover:text-white transition-colors cursor-hover">Privacy</Link>
                 <Link to="/" className="hover:text-white transition-colors cursor-hover">Terms</Link>
              </div>
           </div>
           
           {/* Massive Typography flanking both sides with separator */}
           <div ref={textRef} className="w-full flex items-end justify-between select-none relative z-10 pointer-events-none mix-blend-overlay opacity-90 pb-2">
              <h1 className="text-[12vw] font-serif italic text-white leading-[0.8] tracking-[-0.02em] m-0 p-0 drop-shadow-2xl">
                AVANT
              </h1>
              
              {/* Delicate Architectural Separator */}
              <div className="flex-1 h-[1px] bg-white/20 mx-4 lg:mx-8 mb-[2.5vw]"></div>
              
              <h1 className="text-[12vw] font-serif italic text-white leading-[0.8] tracking-[-0.02em] m-0 p-0 drop-shadow-2xl">
                PARIS
              </h1>
           </div>
        </div>

      </div>
    </footer>
  );
}