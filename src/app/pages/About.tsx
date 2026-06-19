import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// THE INTERACTIVE DESK: Historical Archive Documents
// Each card is a real artifact from L'Atelier's founding history
// ============================================================
const archiveDocuments = [
  {
    num: 'I',
    title: 'THE FIRST PRINCIPLES',
    year: '1947',
    image: '/images/lore/first_principles.png',
    frontLabel: 'FOUNDING DOCUMENT',
    desc: '"A garment is a structure, not a decoration. It must be engineered to distribute weight across the human skeleton — the clavicle, the scapulae, the iliac crest — so that posture is commanded, not constrained."',
    rotate: -6, initialX: '10%', initialY: '5%', zIndex: 10,
  },
  {
    num: 'II',
    title: 'THE ZERO-SYNTHETIC DECREE',
    year: '1953',
    image: '/images/lore/zero_synthetic.png',
    frontLabel: 'FORMAL DECREE',
    desc: '"No material synthesized from petroleum, coal tar, or any non-biological feedstock shall be permitted inside the walls of this facility. This applies to thread, interlining, buttons, and any adhesive compound. Violation is grounds for immediate dismissal."',
    rotate: 4, initialX: '35%', initialY: '8%', zIndex: 15,
  },
  {
    num: 'III',
    title: 'THE LAW OF FOURTEEN',
    year: '1972',
    image: '/images/lore/law_of_fourteen.png',
    frontLabel: 'OPERATIONAL LAW',
    desc: '"No garment shall be touched by more than fourteen artisans during its construction. No assembly line. No division of labor beyond fourteen. If a garment cannot be completed by fourteen people, it is too complex and must be redesigned."',
    rotate: -3, initialX: '65%', initialY: '12%', zIndex: 20,
  },
  {
    num: 'IV',
    title: 'THE REJECTION',
    year: '1992',
    image: '/images/lore/the_rejection.png',
    frontLabel: 'FINAL PUBLIC STATEMENT',
    desc: '"The runway is theatre for the temporary. It exists to generate excitement about garments that will be obsolete in six months. We have no interest in excitement. We have no interest in the temporary. Effective immediately, L\'Atelier will not participate in any fashion week."',
    rotate: 8, initialX: '20%', initialY: '25%', zIndex: 25,
  },
  {
    num: 'V',
    title: 'THE OVERCOAT',
    year: '1951',
    image: '/images/lore/the_overcoat.png',
    frontLabel: 'ARCHIVAL BLUEPRINT',
    desc: '"The first garment. 2.8 kilograms. 8,000 individual pad stitches. 400 hours of construction. Commissioned by a retired officer who wanted a coat that could withstand twenty winters. His son still wears it today."',
    rotate: -12, initialX: '55%', initialY: '30%', zIndex: 30,
  }
];

// ============================================================
// THE 3D CAROUSEL: The Five Tenets
// The unbreakable operational laws of the brand
// ============================================================
const tenets = [
  {
    num: 'I',
    title: 'THE SILENCE',
    image: '/images/lore/tenet_silence.png',
    desc: 'The rejection of noise — literal and metaphorical. The workshop operates without sound. The brand does not advertise. Silence is not the absence of speech; it is the presence of concentration.',
  },
  {
    num: 'II',
    title: 'THE GRAVITY',
    image: '/images/lore/tenet_gravity.png',
    desc: 'The mathematics of how fabric falls on the human skeleton. Every garment is engineered to a specific drape coefficient at every point on the body. Gravity is the enemy, and the seam is the weapon.',
  },
  {
    num: 'III',
    title: 'THE VOID',
    image: '/images/lore/tenet_void.png',
    desc: '8 millimeters of engineered air between the fabric and the skin. The void transforms a garment from clothing into architecture — a private space you inhabit rather than simply wear.',
  },
  {
    num: 'IV',
    title: 'THE RAW MATTER',
    image: '/images/lore/tenet_raw_matter.png',
    desc: 'Every material must be born from the earth. No petroleum. No coal tar. No synthetic compound of any kind. The fabric must be capable of memory — of learning the body it shelters.',
  },
  {
    num: 'V',
    title: 'THE ENDURANCE',
    image: '/images/lore/tenet_endurance.png',
    desc: 'A garment must outlast its owner. Seasonal obsolescence is not merely wasteful; it is a form of structural failure. We engineer for the archive, not the season.',
  }
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Interactive Desk State
  const [flippedItems, setFlippedItems] = useState<Record<string, boolean>>({});
  const [zIndexMap, setZIndexMap] = useState<Record<string, number>>({});
  const [maxZIndex, setMaxZIndex] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Vertical Carousel State
  const [activePhase, setActivePhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Desk logic
  const toggleFlip = (id: string, e: React.MouseEvent) => {
    if (isDragging) return;
    setFlippedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };
  const bringToFront = (id: string) => {
    setMaxZIndex(prev => prev + 1);
    setZIndexMap(prev => ({ ...prev, [id]: maxZIndex + 1 }));
  };

  // 10/10 Vertical Carousel Logic
  useEffect(() => {
    let ctx = gsap.context(() => {
      // The massive 3D wheel rotates on the X axis
      gsap.to('.carousel-wheel', {
        rotateX: -288, // Rotate through exactly 4 intervals (4 * 72 = 288) to stop at Phase V
        ease: 'none',
        scrollTrigger: {
          trigger: '.carousel-section',
          pin: true,
          start: 'top top',
          end: '+=4000', // 4000px of scrolling distance to rotate the wheel
          scrub: 1.2, // buttery smooth mechanical scrub
          onUpdate: (self) => {
            // Calculate which index is currently at the front based on 288 deg rotation
            const degrees = self.progress * 288;
            let idx = Math.round(degrees / 72);
            // Cap between 0 and 4 to ensure it locks on the final phase
            idx = Math.max(0, Math.min(4, idx));
            setActivePhase(idx);
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const activeData = tenets[activePhase] || tenets[0];

  return (
    <div className="pt-32 min-h-screen relative overflow-hidden bg-black">
      
      {/* 
        =========================================
        TOP SECTION: INTERACTIVE DESK
        =========================================
      */}
      <div className="px-6 lg:px-12 max-w-[1800px] mx-auto mb-12 relative z-10 pointer-events-none">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight mb-2 text-white">LES ARCHIVES 1947</h1>
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase">Faites glisser pour découvrir les documents fondateurs</p>
          </div>
          <div className="hidden md:block text-right text-[10px] tracking-widest text-white/40 uppercase leading-loose">
            Faites glisser les documents pour explorer <br />
            Cliquez pour lire les décrets originaux
          </div>
        </div>
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full h-[85vh] min-h-[850px] touch-none mb-32 bg-transparent"
      >
        {archiveDocuments.map((item, index) => {
          const id = `archive-card-${item.num}`;
          const isFlipped = flippedItems[id] || false;
          const currentZ = zIndexMap[id] || item.zIndex;

          return (
            <motion.div
              key={id}
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragMomentum={true}
              onDragStart={() => {
                setIsDragging(true);
                bringToFront(id);
              }}
              onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
              onMouseDown={() => bringToFront(id)}
              initial={{ opacity: 0, y: 100, rotate: item.rotate - 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, rotate: item.rotate, scale: 1 }}
              transition={{ opacity: { duration: 0.8, delay: index * 0.15 }, y: { duration: 0.8, ease: 'easeOut', delay: index * 0.15 }, rotate: { duration: 1.2, type: 'spring', delay: index * 0.15 }, scale: { duration: 0.8, ease: 'easeOut', delay: index * 0.15 } }}
              style={{ position: 'absolute', top: isDesktop ? item.initialY : `${index * 15}%`, left: isDesktop ? item.initialX : '10%', zIndex: currentZ, perspective: 1500 }}
              className="cursor-grab active:cursor-grabbing group pointer-events-auto"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 90, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-[220px] h-[300px] md:w-[280px] md:h-[380px] transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-[1.08]"
                onClick={(e) => toggleFlip(id, e)}
              >
                <div className="absolute inset-0 bg-black/80 blur-2xl opacity-60 translate-y-6 translate-x-2 transition-all duration-300 group-hover:blur-3xl group-hover:translate-y-10 group-hover:opacity-40 group-active:blur-3xl group-active:translate-y-14 group-active:opacity-30 pointer-events-none rounded-sm" />

                <div className="absolute inset-0 bg-[#e3e3e3] p-2 md:p-3 flex flex-col pointer-events-none rounded-sm" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="flex-1 relative overflow-hidden bg-neutral-200 shadow-inner">
                    <img src={item.image} alt={`Archive ${item.num}`} className="w-full h-full object-cover pointer-events-none grayscale-[0.2]" />
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] pointer-events-none" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 px-3 py-1 shadow-md border border-black/10">
                    <p className="text-[10px] md:text-[11px] text-black tracking-widest uppercase font-mono font-bold">
                      {item.frontLabel} // {item.year}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-[#f0f0f0] p-6 md:p-8 flex flex-col items-center justify-center pointer-events-none shadow-inner rounded-sm" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <div className="absolute inset-0 opacity-40 mix-blend-multiply rounded-sm" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                  <div className="relative z-10 w-full h-full flex flex-col justify-between">
                    <div className="border-b border-black/30 pb-3 mb-3">
                      <p className="text-[11px] text-black/80 font-mono tracking-widest uppercase text-left font-bold">
                        {item.title} // {item.year}
                      </p>
                    </div>
                    <p className="text-black/90 font-serif text-xs md:text-sm leading-relaxed tracking-wide text-left mix-blend-multiply">
                      {item.desc}
                    </p>
                    <div className="pt-3 border-t border-black/30 mt-3 flex justify-between items-end">
                      <div className="text-[9px] md:text-[10px] text-black/50 font-mono tracking-widest uppercase">
                        L'ATELIER 1947
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* 
        =========================================
        10/10 TRUE 3D CYLINDER VERTICAL CAROUSEL
        =========================================
      */}
      <div className="carousel-section w-full h-screen bg-[#030303] relative border-t border-white/5 overflow-hidden">
        
        {/* Cinematic Volumetric Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-white opacity-[0.02] blur-[150px] rounded-full pointer-events-none z-0" />

        {/* Background Film Grain */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* 3D Scene Container */}
        <div className="w-full h-full flex items-center justify-between px-6 lg:px-24 perspective-[2500px] relative z-10">
           
           {/* Left Column: Phase Marker */}
           <div className="w-1/4 h-full flex flex-col justify-center relative z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.num}
                  initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -60, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
                  className="absolute"
                >
                  <p className="text-white/40 text-xs tracking-[0.5em] uppercase font-mono mb-4 flex items-center gap-4">
                    Tenet <span className="w-8 h-px bg-white/20 inline-block" />
                  </p>
                  <h1 className="text-[12rem] lg:text-[18rem] font-serif italic text-white leading-none tracking-tighter drop-shadow-2xl">
                    {activeData.num}
                  </h1>
                </motion.div>
              </AnimatePresence>
           </div>

           {/* Center: The Massive 3D Wheel with Mouse Pivot */}
           <div 
             className="absolute top-1/2 left-1/2 w-[300px] md:w-[450px] lg:w-[500px] h-[400px] md:h-[550px] lg:h-[650px] pointer-events-none z-10 transition-transform duration-1000 ease-out" 
             style={{ 
               perspective: '3000px',
               transform: `translate(-50%, -50%) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`
             }}
           >
              <div 
                className="carousel-wheel relative w-full h-full" 
                style={{ transformStyle: 'preserve-3d' }}
              >
                 {tenets.map((phase, i) => {
                    const radius = isDesktop ? 650 : 450;
                    
                    // Faux-Lighting Engine Calculations
                    // Distance is 0 (front), 1 (adjacent), or 2 (back)
                    const dist = Math.min(Math.abs(activePhase - i), 5 - Math.abs(activePhase - i));
                    const blurAmount = dist === 0 ? 0 : dist === 1 ? 4 : 12;
                    const shadowOpacity = dist === 0 ? 0 : dist === 1 ? 0.6 : 0.9;

                    return (
                      <div 
                        key={phase.num}
                        className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
                        style={{ 
                          transform: `rotateX(${i * 72}deg) translateZ(${radius}px)`,
                          transformStyle: 'preserve-3d',
                          filter: `blur(${blurAmount}px)`
                        }}
                      >
                         {/* Front Face (The Image) */}
                         <div 
                           className="absolute inset-0 bg-black rounded-sm shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
                           style={{ backfaceVisibility: 'hidden' }}
                         >
                            <img 
                              src={phase.image} 
                              alt={phase.title} 
                              className="w-full h-full object-cover grayscale-[0.2]"
                            />
                            {/* Inset shadow for depth */}
                            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] pointer-events-none" />
                            
                            {/* Dynamic Shadow Overlay */}
                            <div 
                              className="absolute inset-0 bg-black transition-opacity duration-700 ease-out pointer-events-none" 
                              style={{ opacity: shadowOpacity }} 
                            />

                            {/* Glassmorphic Lens Overlay (Only on front item) */}
                            <div 
                              className={`absolute inset-0 bg-gradient-to-tr from-white/[0.0] via-transparent to-white/[0.1] border border-white/20 transition-opacity duration-700 ease-out pointer-events-none ${dist === 0 ? 'opacity-100' : 'opacity-0'}`} 
                            />
                         </div>

                         {/* Back Face (Visible when rotating to the back) */}
                         <div 
                           className="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-sm flex items-center justify-center shadow-2xl"
                           style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                         >
                            <span className="text-white/10 font-serif italic text-8xl">{phase.num}</span>
                         </div>
                      </div>
                    );
                 })}
              </div>
           </div>

           {/* Right Column: Narrative Typography */}
           <div className="w-[30%] h-full hidden lg:flex flex-col justify-center relative z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.title}
                  initial={{ opacity: 0, x: 60, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -60, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
                  className="absolute left-0"
                >
                  <h2 className="text-5xl lg:text-6xl font-extralight tracking-tighter text-white uppercase mb-8 leading-[1.1] drop-shadow-lg">
                    {activeData.title}
                  </h2>
                  <div className="w-12 h-px bg-white/30 mb-8" />
                  <p className="text-white/70 font-light tracking-wide leading-[2] text-lg max-w-sm">
                    {activeData.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
           </div>

        </div>
      </div>

    </div>
  );
}
