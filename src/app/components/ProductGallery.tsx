import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { 
    id: "01", 
    img: "/images/runway/the_overcoat.png", 
    title: "THE OVERCOAT",
    specs: "Tolerance: 2.00mm // Structural Core",
    desc: "Redistributes gravitational load."
  },
  { 
    id: "02", 
    img: "/images/runway/the_jacket.png", 
    title: "THE JACKET",
    specs: "Suspended architecture // Void Focus",
    desc: "Engineered around the absolute void."
  },
  { 
    id: "03", 
    img: "/images/runway/the_trouser.png", 
    title: "THE TROUSER",
    specs: "Millimeter-calibrated tension // 0.5kg",
    desc: "Canvas waistband functions as structural foundation."
  }
];

export function ProductGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const crosshairXRef = useRef<HTMLDivElement>(null);
  const crosshairYRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll('li');
      if (items) {
        gsap.fromTo(items, 
          { opacity: 0, x: -50 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 1, 
            stagger: 0.1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%"
            }
          }
        );
      }
    }, sectionRef);

    const handleMouseMove = (e: MouseEvent) => {
      // Move crosshairs
      if (crosshairXRef.current && crosshairYRef.current) {
        gsap.to(crosshairXRef.current, { y: e.clientY, duration: 0.1, ease: 'none' });
        gsap.to(crosshairYRef.current, { x: e.clientX, duration: 0.1, ease: 'none' });
      }

      // Move image
      if (imageRef.current && hoveredIndex !== null) {
        gsap.to(imageRef.current, {
          x: e.clientX + 40,
          y: e.clientY - imageRef.current.offsetHeight / 2,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredIndex]);

  return (
    <section
      ref={sectionRef}
      id="blueprint"
      className="relative w-full min-h-screen bg-[#050505] py-32 overflow-hidden border-t border-white/5 cursor-none"
    >
      {/* Background CAD Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
             backgroundSize: '100px 100px'
           }} 
      />

      {/* Crosshairs */}
      <div ref={crosshairXRef} className="fixed top-0 left-0 w-full h-[1px] bg-white/30 z-40 pointer-events-none mix-blend-difference hidden md:block" />
      <div ref={crosshairYRef} className="fixed top-0 left-0 w-[1px] h-screen bg-white/30 z-40 pointer-events-none mix-blend-difference hidden md:block" />

      <div className="max-w-[1800px] mx-auto w-full relative z-10 flex flex-col md:flex-row justify-between items-start px-6 lg:px-12 h-full">
        
        {/* Left: Section Title (Terminal style) */}
        <div className="w-full md:w-1/3 md:sticky md:top-32">
           <div className="flex flex-col gap-2 mb-12 border-l border-white/20 pl-4">
             <p className="text-[10px] tracking-[0.5em] text-[#f40] uppercase font-mono">
               SYS.LOG // 02
             </p>
             <p className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-mono">
               ACCESS_LEVEL: RESTRICTED
             </p>
           </div>
           <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-black tracking-tighter text-white uppercase leading-[0.8] mix-blend-difference">
             Structural <br/> Blueprints
           </h2>
        </div>

        {/* Right: The List */}
        <div className="w-full md:w-2/3 mt-24 md:mt-0">
           <ul ref={listRef} className="w-full flex flex-col">
              {products.map((product, index) => (
                <li 
                  key={product.id}
                  className="w-full border-t border-white/10 relative transition-colors duration-500 hover:bg-white/5"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link to="/shop" className="w-full flex flex-col md:flex-row justify-between items-start md:items-center p-8 lg:p-12 group/item cursor-none">
                    
                    <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto">
                      <span className="text-xs font-mono text-white/20 tracking-[0.3em] group-hover/item:text-[#f40] transition-colors duration-500 hidden sm:block">
                        [ {product.id} ]
                      </span>
                      <h3 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white/40 group-hover/item:text-white transition-colors duration-500 tracking-tighter uppercase m-0 leading-none">
                        {product.title}
                      </h3>
                    </div>

                    <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end gap-2 opacity-30 group-hover/item:opacity-100 transition-opacity duration-500">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-[#f40] font-mono">{product.specs}</span>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white/70 font-mono text-right max-w-[200px]">{product.desc}</span>
                    </div>

                  </Link>
                </li>
              ))}
              <li className="w-full border-t border-white/10" />
           </ul>
        </div>
      </div>

      {/* X-Ray Floating Image */}
      <div 
        className="fixed inset-0 pointer-events-none z-30 mix-blend-difference"
        style={{ opacity: hoveredIndex !== null ? 1 : 0, transition: 'opacity 0.2s ease-out' }}
      >
        <img 
          ref={imageRef}
          src={hoveredIndex !== null ? products[hoveredIndex].img : products[0].img}
          alt="Blueprint Preview"
          className="absolute w-[40vw] md:w-[30vw] max-w-lg h-auto object-cover opacity-90"
          style={{ 
             top: 0, left: 0,
             filter: 'invert(1) contrast(2) grayscale(100%) brightness(1.5)'
          }}
        />
        {/* Technical crosshair attached to image */}
        <div className="absolute w-4 h-4 border border-[#f40]" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>

    </section>
  );
}
