import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// The Raw Matter Data
const THE_RAW_MATTER_PILLARS = [
  {
    id: 'wool',
    title: 'Scottish Borders Wool',
    number: '01',
    content: (
      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
        <h3 className="text-[8vw] md:text-[6vw] font-extralight tracking-tighter uppercase leading-none mix-blend-difference mb-8">The Fleece</h3>
        <p className="text-xl md:text-2xl font-serif italic text-white/70 max-w-xl">Sourced from a single flock in the Cheviot Hills. Shorn by hand. 19.5 microns. Capable of structural memory.</p>
      </div>
    ),
    bg: '/images/lore/zero_synthetic.png'
  },
  {
    id: 'silk',
    title: 'Suzhou Raw Silk',
    number: '02',
    content: (
      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
        <h3 className="text-[8vw] md:text-[6vw] font-extralight tracking-tighter uppercase leading-none mix-blend-difference mb-8">The Architecture</h3>
        <p className="text-xl md:text-2xl font-serif italic text-white/70 max-w-xl">Harvested at the dead pupa stage to retain its natural sericin. Used purely for load-bearing organza interlining.</p>
      </div>
    ),
    bg: '/images/lore/tenet_endurance.png'
  },
  {
    id: 'canvas',
    title: 'Argentine Horsehair',
    number: '03',
    content: (
      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
        <h3 className="text-[8vw] md:text-[6vw] font-extralight tracking-tighter uppercase leading-none mix-blend-difference mb-8">The Skeleton</h3>
        <p className="text-xl md:text-2xl font-serif italic text-white/70 max-w-xl">Woven in Buenos Aires at a precise tension of 3.2 newtons per centimeter. It defies gravity. It never collapses.</p>
      </div>
    ),
    bg: '/images/lore/law_of_fourteen.png'
  }
];

const STACK_IMAGES = [
  { 
    src: '/images/lore/first_principles.png', 
    label: '1947 / First Principles',
    meta: 'Architectural Blueprint Paper / Hand-inked',
    desc: 'The original five principles defining the garment as a structure, not a decoration. Drafted in the summer of 1947 before the facility even had electricity.'
  },
  { 
    src: '/images/lore/zero_synthetic.png', 
    label: '1953 / Zero-Synthetic Decree',
    meta: 'Internal Memorandum / Typewritten',
    desc: '"Effective immediately, no material synthesized from petroleum shall be permitted inside these walls." This decree permanently locked the atelier out of mass-market profitability, and secured its soul.'
  },
  { 
    src: '/images/lore/law_of_fourteen.png', 
    label: '1972 / Law of Fourteen',
    meta: 'Workshop Protocol / Stamped',
    desc: '"No garment shall be touched by more than fourteen artisans." A total rejection of the assembly line. From The Listener to The Keeper, the fourteen roles remain unchanged.'
  },
  { 
    src: '/images/lore/the_rejection.png', 
    label: '1992 / The Rejection',
    meta: 'Public Statement / Final Transmission',
    desc: '"The runway is theatre for the temporary. We have no interest in the temporary." The final public statement before L\'Atelier erased its address and phone number from public records.'
  },
  { 
    src: '/images/lore/the_overcoat.png', 
    label: '1951 / The Overcoat Blueprint',
    meta: 'Technical Schematic / 1:1 Scale',
    desc: 'The first garment ever commissioned. Weight: 2.8kg. Construction time: 400 hours. The internal blind-stitch scaffolding redistributes gravitational load perfectly across the iliac crest.'
  },
];

const TRAIL_IMAGES = [
  "/images/lore/tenet_silence.png",
  "/images/lore/tenet_gravity.png",
  "/images/lore/tenet_void.png",
  "/images/lore/tenet_raw_matter.png",
  "/images/lore/tenet_endurance.png",
  "/images/lore/zero_synthetic.png",
  "/images/lore/law_of_fourteen.png",
  "/images/lore/first_principles.png"
];

export function Atelier() {
  const [activeAccId, setActiveAccId] = useState<string | null>(null);
  const [expandedDoc, setExpandedDoc] = useState<number | null>(null);
  
  // Hero Trail Refs
  const heroRef = useRef<HTMLElement>(null);
  const trailRefs = useRef<(HTMLImageElement | null)[]>([]);
  const trailIndexRef = useRef(0);

  // Component 1: Zoom Refs
  const storyContainerRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Component 2: Philosophy Refs
  const philosophyContainerRef = useRef<HTMLDivElement>(null);
  const philosophyMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-text', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: 'power4.out', delay: 0.2 });

      // 1. Our Story (Reverse Zoom & Text Reveal)
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
           tl.to(labelRef.current, { opacity: 1, duration: 0.5 }, "-=0.5"); 
        }

        const words = storyContainerRef.current.querySelectorAll('.story-word');
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

      // 2. Philosophy (The Scrubbing Text Mask)
      if (philosophyContainerRef.current && philosophyMaskRef.current) {
         const tl = gsap.timeline({
            scrollTrigger: {
               trigger: philosophyContainerRef.current,
               start: 'top top',
               end: 'bottom bottom',
               scrub: 1,
            }
         });

         tl.to(philosophyMaskRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            duration: 1
         });

         const philosophyLore = philosophyContainerRef.current.querySelector('.philosophy-lore');
         if (philosophyLore) {
            tl.to(philosophyLore, { opacity: 1, duration: 0.3 }, "+=0.1");
         }
      }

      // 4. The Archive (Polaroid Stack)
      const stackCards = gsap.utils.toArray('.stack-card') as HTMLElement[];
      stackCards.forEach((card, i) => {
         if (i === stackCards.length - 1) return;
         const nextContainer = card.parentElement?.nextElementSibling as HTMLElement;
         if (nextContainer) {
            gsap.to(card, {
               scale: 0.95,
               opacity: 0.3,
               filter: 'blur(4px)',
               ease: 'power2.inOut',
               scrollTrigger: {
                  trigger: nextContainer,
                  start: 'top bottom',
                  end: 'top top',
                  scrub: true,
               }
            });
         }
      });
    });

    // Recalculate after lore images finish loading — prevents scroll spacer undershoot
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
     if (expandedDoc !== null) {
        document.body.style.overflow = 'hidden';
     } else {
        document.body.style.overflow = 'auto';
     }
     return () => { document.body.style.overflow = 'auto'; };
  }, [expandedDoc]);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
     if (!heroRef.current) return;
     const rect = heroRef.current.getBoundingClientRect();
     const x = e.clientX - rect.left;
     const y = e.clientY - rect.top;

     const currentImg = trailRefs.current[trailIndexRef.current];
     if (currentImg) {
        gsap.set(currentImg, { 
           x: x, 
           y: y, 
           opacity: 1, 
           scale: 1, 
           rotation: Math.random() * 20 - 10,
           zIndex: trailIndexRef.current
        });
        
        gsap.to(currentImg, {
           opacity: 0,
           scale: 0.8,
           y: y + 100,
           duration: 1.5,
           ease: 'power2.out',
           overwrite: 'auto'
        });
     }
     trailIndexRef.current = (trailIndexRef.current + 1) % TRAIL_IMAGES.length;
  };

  return (
    <div className="bg-[#050505] text-white selection:bg-white selection:text-black font-sans">
      
      // 0. The Interactive Trail Hero
      <section 
         ref={heroRef}
         className="h-screen w-full relative overflow-hidden bg-black z-20 border-b border-white/10"
         onMouseMove={handleHeroMouseMove}
      >
        {/* Render Trail Images */}
        {TRAIL_IMAGES.map((img, i) => (
           <img 
             key={i}
             ref={el => trailRefs.current[i] = el}
             src={img}
             className="absolute w-48 md:w-[20vw] h-auto object-cover pointer-events-none opacity-0 shadow-2xl"
             style={{ transform: 'translate(-50%, -50%)', top: 0, left: 0 }}
             alt="Trail"
           />
        ))}

        <div className="z-10 relative h-full flex flex-col justify-between p-6 md:p-12 w-full pointer-events-none">
          <p className="hero-text text-[10px] tracking-[0.4em] uppercase text-white/50">Les Archives</p>
          
          <div className="flex flex-col w-full justify-center flex-1">
            <h1 className="hero-text text-[25vw] md:text-[20vw] font-extralight tracking-tighter leading-[0.7] uppercase text-white mix-blend-difference text-left ml-[5vw] drop-shadow-2xl">
              L'
            </h1>
            <h1 className="hero-text text-[25vw] md:text-[20vw] font-extralight tracking-tighter leading-[0.7] uppercase text-white mix-blend-difference text-right mr-[5vw] drop-shadow-2xl">
              ATELIER
            </h1>
          </div>

          <p className="hero-text text-xl font-serif italic text-white/50 w-full text-center">
             L'héritage revisité. Move your cursor.
          </p>
        </div>
      </section>

      {/* 1. Our Story (The Reverse Typographic Zoom) */}
      <section id="our-story" ref={storyContainerRef} className="min-h-screen w-full relative bg-black overflow-hidden pt-[15vh] pb-32">
         <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col items-start px-6 md:px-12">
            
            <span ref={labelRef} className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4 border-b border-white/20 pb-2 opacity-0 w-max">01 — La Genèse</span>
               
               {/* The Drop Cap (Isolated to preserve exact GSAP math) */}
               <div className="w-full">
                  <span 
                    ref={textMaskRef} 
                    className="inline-block font-sans font-bold tracking-tighter text-white ml-[8vw] text-4xl md:text-6xl lg:text-[6vw] leading-none"
                  >
                    1947.
                  </span>
               </div>
               
               {/* The Editorial Column */}
               <div className="editorial-column mt-4 md:mt-6 ml-[8vw] max-w-3xl flex flex-col gap-4 md:gap-5 pb-12">
                  <p className="text-xl md:text-2xl lg:text-[1.8vw] font-serif italic text-white leading-tight flex flex-wrap gap-x-[0.5vw] gap-y-1">
                     {"In the winter of 1947, while Paris celebrated the New Look — twenty-five meters of silk for a single skirt — an architect walked out of the presentation and never returned. He saw garments not as decoration, but as shelter. The excess disgusted him. He founded L'Atelier in a decommissioned concrete facility with three people and a single conviction: clothing is structure."
                      .split(' ')
                      .map((word, i) => (
                        <span key={`p1-${i}`} className="story-word opacity-[0.2]">{word}</span>
                      ))
                     }
                  </p>

                  <p className="text-sm md:text-base font-sans font-light tracking-wide text-white/80 leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
                     {"He drafted the first garment on architectural blueprint paper. Not a sketch — a structural calculation. The weight distribution across the clavicle. The drape coefficient of unbleached highland wool. The precise 8 millimeters of air between the fabric and the skin — The Void — where a garment stops being clothing and becomes private architecture."
                      .split(' ')
                      .map((word, i) => (
                        <span key={`p2-${i}`} className="story-word opacity-[0.2]">{word}</span>
                      ))
                     }
                  </p>

                  <p className="text-sm md:text-base font-sans font-light tracking-wide text-white/80 leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
                     {"By 1953, he banned every synthetic fiber from the workshop. By 1972, he decreed that no garment would ever be touched by more than fourteen artisans. By 1992, he withdrew from fashion weeks entirely. The runway, he said, was theatre for the temporary. L'Atelier produces fewer than sixty garments a year. They are not purchased. They are commissioned and inherited."
                      .split(' ')
                      .map((word, i) => (
                        <span key={`p3-${i}`} className="story-word opacity-[0.2]">{word}</span>
                      ))
                     }
                  </p>

                  <p className="text-xs md:text-sm font-sans font-bold tracking-widest uppercase text-white/60 leading-loose flex flex-wrap gap-x-2 gap-y-1 mt-6">
                     {"Perfection is not a destination. It is the absolute minimum requirement. This is not fashion. This is physical architecture."
                      .split(' ')
                      .map((word, i) => (
                        <span key={`p4-${i}`} className="story-word opacity-[0.2]">{word}</span>
                      ))
                     }
                  </p>
               </div>
            </div>
      </section>

      {/* 2. Philosophy (The Scrubbing Text Mask) */}
      <section 
         id="philosophy" 
         ref={philosophyContainerRef}
         className="h-[300vh] w-full bg-[#111111] relative border-t border-white/10"
      >
         <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden p-6 md:p-12">
            
            {/* Concrete texture overlay for this section only */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('/images/lore/first_principles.png')] bg-cover bg-center grayscale"></div>

            <p className="absolute top-12 left-12 text-[10px] tracking-[0.4em] uppercase text-white/30 z-20">02 — Le Standard</p>
            
            <div className="relative w-full max-w-[1400px] flex flex-col items-center">
               <div className="relative w-full text-center">
                  {/* Dust/Chalk Outline Text */}
                  <h2 
                    className="text-[9vw] md:text-[6vw] font-extralight uppercase leading-[0.9] tracking-tighter text-white/5"
                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
                  >
                    Perfection is not a destination.<br/>It is the absolute minimum requirement.
                  </h2>

                  {/* Solid Fill Text (Masked) */}
                  <div 
                    ref={philosophyMaskRef}
                    className="absolute top-0 left-0 w-full h-full flex justify-center"
                    style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
                  >
                    <h2 className="text-[9vw] md:text-[6vw] font-extralight uppercase leading-[0.9] tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                      Perfection is not a destination.<br/>It is the absolute minimum requirement.
                    </h2>
                  </div>
               </div>

               {/* Lore Subtext */}
               <div className="philosophy-lore opacity-0 mt-12 md:mt-20 max-w-2xl text-center flex flex-col items-center gap-6 relative z-20">
                  <div className="w-[1px] h-12 bg-white/20"></div>
                  <p className="text-sm md:text-base font-serif italic text-white/70 leading-relaxed px-6">
                    This phrase—known internally as Le Standard—is never printed on garments and never used in marketing. It exists only in chalk on the raw concrete wall above The Keeper's inspection table. It is the final filter before a piece is permitted to leave the archive.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 3. The Raw Matter (The Fluid Accordion) */}
      <section id="raw-matter" className="h-[90vh] w-full flex overflow-hidden bg-black relative z-10 border-t border-b border-white/10">
        <p className="absolute top-12 left-12 text-[10px] tracking-[0.4em] uppercase text-white/50 z-50 mix-blend-difference pointer-events-none">03 — Matière Première</p>
        {THE_RAW_MATTER_PILLARS.map((pillar) => {
           const isActive = activeAccId === pillar.id;
           const flexClass = activeAccId === null ? 'flex-1' : (isActive ? 'flex-[12]' : 'flex-[0.5]');
           
           return (
             <div 
               key={pillar.id}
               onMouseEnter={() => setActiveAccId(pillar.id)}
               onMouseLeave={() => setActiveAccId(null)}
               className={`relative h-full border-r border-white/10 group cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${flexClass}`}
             >
               <div className="absolute inset-0 w-[100vw] h-full z-0 pointer-events-none">
                  <img src={pillar.bg} className={`w-full h-full object-cover origin-left transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${isActive ? 'grayscale-0 brightness-[0.4] scale-100' : 'grayscale brightness-[0.2] scale-[1.15]'}`} alt={pillar.title} />
               </div>
               <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat z-10" />

               {/* Closed State */}
               <div className={`absolute inset-0 p-4 md:p-8 flex flex-col justify-end items-center z-20 pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-0 delay-0' : 'opacity-100 delay-300'}`}>
                 <h3 className="text-2xl md:text-5xl font-extralight tracking-tighter uppercase [writing-mode:vertical-lr] rotate-180 mix-blend-difference whitespace-nowrap mb-8 text-white/80">{pillar.title}</h3>
                 <span className="text-[10px] tracking-[0.4em] uppercase text-white/50">{pillar.number}</span>
               </div>

               {/* Open State */}
               <div className={`absolute inset-0 w-screen h-full z-30 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100 delay-300' : 'opacity-0 delay-0'}`}>
                 {pillar.content}
               </div>
             </div>
           );
        })}
      </section>

      {/* 4. The Archive (The Sticky Polaroid Stack) */}
      <section id="archive" className="w-full relative bg-[#020202] pb-[20vh] pt-[10vh]">
         <p className="absolute top-12 left-12 text-[10px] tracking-[0.4em] uppercase text-white/30 z-50 mix-blend-difference pointer-events-none">04 — Les Archives</p>
         
         {STACK_IMAGES.map((item, i) => (
            <div key={i} className="sticky top-0 h-screen w-full flex items-center justify-center p-6 md:p-12" style={{ zIndex: i }}>
               <div 
                  className="w-full max-w-5xl h-[70vh] md:h-[85vh] relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] stack-card bg-black cursor-pointer group"
                  onClick={() => setExpandedDoc(i)}
               >
                  <img src={item.src} className="w-full h-full object-cover grayscale brightness-90 group-hover:brightness-100 transition-all duration-500" alt={item.label} />
                  
                  {/* Glassmorphic Label */}
                  <div className="absolute bottom-12 left-12 bg-black/60 backdrop-blur-md border border-white/10 p-6 z-10 flex flex-col group-hover:bg-white/10 transition-colors duration-500">
                     <span className="text-xl md:text-3xl font-extralight tracking-tighter uppercase text-white mb-2 flex items-center gap-4">
                        {item.label}
                        <span className="text-xs border border-white/30 rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">Expand</span>
                     </span>
                     <span className="text-[10px] tracking-[0.4em] uppercase text-white/50">Document 0{i + 1}</span>
                  </div>
               </div>
            </div>
         ))}
      </section>

      {/* Expanded Document Modal */}
      {expandedDoc !== null && (
         <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-[url('/images/close-cursor.svg'),_pointer]"
            onClick={() => setExpandedDoc(null)}
         >
            <div className="relative w-full max-w-6xl h-[80vh] md:h-[90vh] bg-[#0a0a0a] border border-white/10 flex flex-col md:flex-row shadow-2xl cursor-default" onClick={e => e.stopPropagation()}>
               {/* Close Button */}
               <button 
                  onClick={() => setExpandedDoc(null)}
                  className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white uppercase tracking-widest text-xs z-20"
               >
                  [ FERMER ]
               </button>
               
               {/* Document Viewer */}
               <div className="w-full md:w-2/3 h-[50vh] md:h-full bg-black relative p-4 md:p-8 flex items-center justify-center overflow-hidden">
                  <img src={STACK_IMAGES[expandedDoc].src} className="max-w-full max-h-full object-contain grayscale" alt={STACK_IMAGES[expandedDoc].label} />
               </div>

               {/* Document Meta */}
               <div className="w-full md:w-1/3 h-full flex flex-col justify-center p-8 md:p-12 border-l border-white/10 bg-[#111]">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-2">Document 0{expandedDoc + 1}</p>
                  <p className="text-[9px] tracking-widest uppercase text-[#a0a0a0] mb-8 pb-4 border-b border-white/10">{STACK_IMAGES[expandedDoc].meta}</p>
                  
                  <h3 className="text-2xl md:text-4xl font-extralight uppercase tracking-tighter mb-8 leading-none">
                     {STACK_IMAGES[expandedDoc].label.split(' / ')[1] || STACK_IMAGES[expandedDoc].label}
                  </h3>
                  
                  <p className="text-sm font-serif italic text-white/70 leading-relaxed mb-12">
                     {STACK_IMAGES[expandedDoc].desc}
                  </p>
                  
                  <button className="self-start text-[10px] tracking-widest uppercase border-b border-white/30 hover:border-white text-white/60 hover:text-white transition-colors pb-1">
                     Retrieve File [PDF]
                  </button>
               </div>
            </div>
         </div>
      )}

      {/* 5. The Commission */}
      <section
         id="commission"
         className="min-h-screen w-full bg-[#050505] relative flex flex-col justify-center items-center border-t border-white/10 p-6 md:p-12 xl:p-24 overflow-hidden"
      >
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-screen pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        <p className="absolute top-12 left-12 text-[10px] tracking-[0.4em] uppercase text-white/30 pointer-events-none font-mono">05 — Sur Mesure</p>

        {/* Console status bar */}
        <div className="absolute top-12 right-12 hidden md:flex flex-col items-end gap-1 pointer-events-none">
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-mono">Waiting List Status</p>
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/50 font-mono">18 MONTHS — OPEN</p>
          <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse mt-1 self-end" />
        </div>

        <div className="w-full max-w-7xl relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 mt-[8vh]">

           {/* Left — context */}
           <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-8 border-b border-white/10 pb-3 inline-block self-start font-mono">Le Processus</p>
              <h2 className="text-3xl md:text-5xl lg:text-[3.5vw] font-extralight tracking-tighter uppercase mb-10 leading-[1.05]">
                Une invitation<br/>à l'architecture.
              </h2>

              {/* Numbered process steps */}
              <div className="flex flex-col gap-6">
                {[
                  { n: '01', t: 'The Transmission', d: 'Submit this form. Not all transmissions result in an invitation.' },
                  { n: '02', t: 'The Assessment', d: 'Applications are reviewed quarterly by The Keeper. No appeals.' },
                  { n: '03', t: 'The Pilgrimage', d: 'If accepted, you travel to the Île-de-France facility in person.' },
                  { n: '04', t: 'The Listening', d: '147 measurements over 3 sessions of absolute silence.' },
                ].map(step => (
                  <div key={step.n} className="flex gap-5 items-start">
                    <span className="text-[10px] font-mono text-white/20 tracking-widest mt-1 shrink-0">{step.n}</span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-mono mb-1">{step.t}</p>
                      <p className="text-sm font-serif italic text-white/35 leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Right — form */}
           <div className="w-full lg:w-7/12 flex flex-col lg:pl-16 lg:border-l border-white/10">
               <h2 className="text-2xl md:text-3xl font-serif italic text-white/50 mb-12 max-w-xl leading-relaxed">
                 "What do you need<br/>this garment to do?"
               </h2>

               <form className="w-full flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>

                 {/* I — Purpose */}
                 <div className="w-full border border-white/8 bg-white/[0.02] p-6 flex flex-col gap-3 focus-within:border-white/25 transition-colors duration-500">
                   <label className="text-[9px] uppercase tracking-[0.4em] text-white/25 font-mono">I — Finalité (Purpose)</label>
                   <textarea
                     required
                     rows={3}
                     placeholder="Describe what you need this garment to do. Not what it should look like."
                     className="w-full bg-transparent text-base md:text-lg font-serif italic text-white placeholder:text-white/15 outline-none resize-none leading-relaxed"
                   />
                 </div>

                 {/* II — Email */}
                 <div className="w-full border border-white/8 bg-white/[0.02] p-6 flex flex-col gap-3 focus-within:border-white/25 transition-colors duration-500">
                   <label className="text-[9px] uppercase tracking-[0.4em] text-white/25 font-mono">II — Coordonnées (Contact)</label>
                   <input
                     type="email"
                     required
                     placeholder="Email address"
                     className="w-full bg-transparent text-base font-extralight tracking-wide text-white placeholder:text-white/15 outline-none"
                   />
                 </div>

                 {/* III — Name */}
                 <div className="w-full border border-white/8 bg-white/[0.02] p-6 flex flex-col gap-3 focus-within:border-white/25 transition-colors duration-500">
                   <label className="text-[9px] uppercase tracking-[0.4em] text-white/25 font-mono">III — Identité (Name)</label>
                   <input
                     type="text"
                     required
                     placeholder="Full name"
                     className="w-full bg-transparent text-base font-extralight tracking-wide text-white placeholder:text-white/15 outline-none"
                   />
                 </div>

                 {/* Disclaimer */}
                 <p className="text-[10px] font-mono tracking-wide text-white/20 leading-relaxed max-w-lg">
                   Submitting this transmission does not guarantee a commission. The waiting list is strictly chronological. Wealth does not move you forward. Status does not move you forward.
                 </p>

                 {/* Submit */}
                 <button
                   type="submit"
                   className="group mt-2 flex items-center justify-between border border-white/20 bg-transparent hover:bg-white px-8 py-5 transition-all duration-500 w-full lg:w-auto self-start"
                 >
                   <span className="text-[10px] tracking-[0.4em] uppercase text-white group-hover:text-black font-mono font-bold transition-colors duration-500">
                     Submit Transmission
                   </span>
                   <span className="text-white/30 group-hover:text-black font-mono ml-8 transition-colors duration-500">→</span>
                 </button>

               </form>
           </div>
        </div>
      </section>


    </div>
  );
}
