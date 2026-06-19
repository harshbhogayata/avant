import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    id: '01',
    title: 'THE SCOTTISH BORDERS',
    specs: [
      { label: 'YIELD', value: 'Highland Wool' },
      { label: 'DIAMETER', value: '19.5 Microns' },
      { label: 'CRIMP', value: '12-14 Waves/Inch' },
      { label: 'TREATMENT', value: 'Unscoured / Raw' }
    ],
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: '02',
    title: 'SUZHOU, CHINA',
    specs: [
      { label: 'YIELD', value: 'Raw Silk Organza' },
      { label: 'STATE', value: 'Un-degummed' },
      { label: 'SERICIN', value: 'Intact (Rigid)' },
      { label: 'TENSILE', value: 'Extreme' }
    ],
    img: 'https://images.unsplash.com/photo-1611244419377-b0a760c19719?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: '03',
    title: 'BUENOS AIRES',
    specs: [
      { label: 'YIELD', value: 'Horsehair Canvas' },
      { label: 'SOURCE', value: 'Argentine Criollo' },
      { label: 'TENSION', value: '3.2 N/cm' },
      { label: 'PURPOSE', value: 'Structural Rigidity' }
    ],
    img: 'https://images.unsplash.com/photo-1584346850024-cd9bb4fba976?auto=format&fit=crop&q=80&w=2000'
  }
];

export function RawMatter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.utils.toArray('.material-section').forEach((section: any, i) => {
        // Pin each image
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: section.querySelector('.material-visual'),
          pinSpacing: false
        });

        // The forensic scanner line
        gsap.fromTo(section.querySelector('.scanner-line'),
          { top: '0%' },
          {
            top: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          }
        );

        // Terminal data pop-in
        gsap.utils.toArray(section.querySelectorAll('.spec-row')).forEach((row: any, j) => {
          gsap.fromTo(row,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              scrollTrigger: {
                trigger: section,
                start: `${10 + (j * 15)}% top`, // Stagger based on scroll depth
                end: `${20 + (j * 15)}% top`,
                scrub: true
              }
            }
          );
        });

      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#020202]">
      {materials.map((mat, index) => (
        <div key={mat.id} className="material-section relative w-full h-[200vh]">
          
          {/* Visual Container (Pinned) */}
          <div className="material-visual absolute top-0 left-0 w-full h-screen overflow-hidden">
            
            <img 
              src={mat.img} 
              alt={mat.title} 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 mix-blend-luminosity"
            />
            
            {/* Dark Gradient Overlay to hide edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] opacity-80" />
            
            {/* The Forensic Scanner Line */}
            <div className="scanner-line absolute left-0 w-full h-[1px] bg-[#ff3300] shadow-[0_0_15px_rgba(255,51,0,0.8)] z-20" />
            
            {/* Title */}
            <div className="absolute top-12 left-12 z-30">
              <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase font-mono mb-2 block">
                Matière Première // {mat.id}
              </span>
              <h3 className="text-3xl md:text-5xl font-extralight font-sans text-white uppercase tracking-tighter">
                {mat.title}
              </h3>
            </div>

            {/* Terminal Feed (Bottom Left) */}
            <div className="absolute bottom-12 left-12 z-30 flex flex-col gap-3 font-mono">
              {mat.specs.map((spec, sIndex) => (
                <div key={sIndex} className="spec-row flex items-center gap-6">
                  <span className="text-[9px] text-[#ff3300] tracking-[0.3em] uppercase w-20">[{spec.label}]</span>
                  <span className="text-[10px] text-white/70 tracking-[0.2em] uppercase">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Crosshair Graphic Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none z-10 opacity-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-white" />
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}
