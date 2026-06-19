import { useEffect, useRef, useState } from 'react';
import { QuickViewModal } from '../components/QuickViewModal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ATELIER_ARCHIVES = [
  { 
    id: 101, 
    img: "/images/generated/overcoat_main_1781868422286.png", 
    title: "The Overcoat",
    price: "$4,200",
    category: "Outerwear",
    specs: "Heavy Wool. Invisible seams.",
    desc: "The first garment ever commissioned. The internal blind-stitch scaffolding redistributes gravitational load perfectly across the iliac crest.",
    sizes: ["46", "48", "50", "52", "54"],
    gallery: [
      "/images/generated/overcoat_main_1781868422286.png",
      "/images/generated/overcoat_angle1_1781868433655.png",
      "/images/generated/overcoat_angle2_1781868445733.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Virgin Heavyweight Wool (850gsm)" },
      { label: "Origin", value: "Woven in Biella, Italy. Constructed in Paris." },
      { label: "Fit", value: "Over-proportioned architectural shoulder. Fits true to size through the chest." },
      { label: "Care", value: "Dry clean only by a certified archivist." }
    ]
  },
  { 
    id: 102, 
    img: "/images/generated/trench_main_1781868466120.png", 
    title: "The Trench",
    price: "$3,800",
    category: "Outerwear",
    specs: "Waterproof gabardine. Double-breasted structure.",
    desc: "A brutalist approach to weather protection. The collar stands independent of the neck, offering shelter without contact.",
    sizes: ["46", "48", "50", "52"],
    gallery: [
      "/images/generated/trench_main_1781868466120.png",
      "/images/generated/trench_angle1_1781868477653.png",
      "/images/generated/trench_angle2_1781868488491.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Cotton Gabardine. Treated for absolute water resistance." },
      { label: "Origin", value: "Fabricated in London. Assembled in Paris." },
      { label: "Fit", value: "Extended length. Designed to break precisely 2 inches above the ankle." },
      { label: "Care", value: "Do not wash. Spot clean or professional dry clean only." }
    ]
  },
  { 
    id: 103, 
    img: "/images/generated/cape_main_1781868500274.png", 
    title: "The Cape",
    price: "$2,900",
    category: "Outerwear",
    specs: "Wool drape. Radial asymmetry.",
    desc: "Draped from a single unbroken piece of wool. It does not hang from the shoulders; it envelops the subject like a shadow.",
    sizes: ["ONE SIZE"],
    gallery: [
      "/images/generated/cape_main_1781868500274.png",
      "/images/generated/cape_angle1_1781868513363.png",
      "/images/generated/cape_angle2_1781868532197.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Double-faced Cashmere." },
      { label: "Origin", value: "Sourced from Inner Mongolia. Constructed in Paris." },
      { label: "Fit", value: "One size fits all. Radial drape conforms to any silhouette." },
      { label: "Care", value: "Professional dry clean only." }
    ]
  },
  { 
    id: 104, 
    img: "/images/generated/peacoat_main_1781868542884.png", 
    title: "The Peacoat",
    price: "$3,100",
    category: "Outerwear",
    specs: "Boiled wool. Buffalo horn buttons.",
    desc: "Dense, practically impenetrable boiled wool. The silhouette remains perfectly rigid regardless of the wearer's posture.",
    sizes: ["46", "48", "50", "52", "54"],
    gallery: [
      "/images/generated/peacoat_main_1781868542884.png",
      "/images/generated/peacoat_angle1_1781868554745.png",
      "/images/generated/peacoat_angle2_1781868567927.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Boiled Wool. Unlined." },
      { label: "Origin", value: "Woven in Yorkshire, England." },
      { label: "Fit", value: "Cropped rigid block. Boxy through the torso." },
      { label: "Care", value: "Dry clean only." }
    ]
  },
  { 
    id: 201, 
    img: "/images/generated/jacket_main_1781868579593.png", 
    title: "The Jacket",
    price: "$2,600",
    category: "Tailoring",
    specs: "Tolerance: 8.00mm. Suspended architecture.",
    desc: "Engineered around the absolute void. The shoulders do not rest on the clavicle; they hover, supported by architectural tension.",
    sizes: ["44", "46", "48", "50", "52"],
    gallery: [
      "/images/generated/jacket_main_1781868579593.png",
      "/images/generated/jacket_angle1_1781868597864.png",
      "/images/generated/jacket_angle2_1781868610009.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Cold Wool. Horsehair canvas interior." },
      { label: "Origin", value: "Constructed in Paris." },
      { label: "Fit", value: "Strict architectural shoulder. Suppressed waist." },
      { label: "Care", value: "Do not press. Steam and dry clean only." }
    ]
  },
  { 
    id: 202, 
    img: "/images/runway/the_trouser.png", 
    title: "The Trouser",
    price: "$1,200",
    category: "Tailoring",
    specs: "Argentine canvas. Millimeter-calibrated tension.",
    desc: "Gravity-mapped to the micro-millimeter. The canvas waistband functions as a structural foundation, never collapsing.",
    sizes: ["44", "46", "48", "50", "52"],
    gallery: [
      "/images/runway/the_trouser.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Cold Wool. Silk-lined to the knee." },
      { label: "Origin", value: "Constructed in Paris." },
      { label: "Fit", value: "High-waisted. Straight leg with a subtle break." },
      { label: "Care", value: "Dry clean only. Press with a damp cloth." }
    ]
  },
  { 
    id: 203, 
    img: "/images/runway/the_blazer.png", 
    title: "The Blazer",
    price: "$2,800",
    category: "Tailoring",
    specs: "Cold wool. Full canvas interlining.",
    desc: "A rejection of soft tailoring. The chest piece is forged with horsehair canvas to maintain a severe, permanent geometric form.",
    sizes: ["46", "48", "50", "52", "54"],
    gallery: [
      "/images/runway/the_blazer.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Tropical Wool. Full floating canvas." },
      { label: "Origin", value: "Constructed in Paris." },
      { label: "Fit", value: "Classic block. Sharp shoulder, soft drape." },
      { label: "Care", value: "Dry clean only." }
    ]
  },
  { 
    id: 204, 
    img: "/images/runway/the_waistcoat.png", 
    title: "The Waistcoat",
    price: "$950",
    category: "Tailoring",
    specs: "Heavy silk. Cupro back panel.",
    desc: "Designed not as an accessory, but as armor. The back panel is cut higher to force a straightened spine.",
    sizes: ["46", "48", "50", "52"],
    gallery: [
      "/images/runway/the_waistcoat.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Silk front. 100% Cupro back." },
      { label: "Origin", value: "Constructed in Paris." },
      { label: "Fit", value: "Second-skin fit. Adjustable back tensioner." },
      { label: "Care", value: "Dry clean only." }
    ]
  },
  { 
    id: 301, 
    img: "/images/runway/the_dress.png", 
    title: "The Dress",
    price: "$5,200",
    category: "Fluidity",
    specs: "Suzhou silk. Asymmetrical cut.",
    desc: "A study in fluid mechanics. The dead-pupa silk interlining provides immense tensile strength while remaining acoustically silent.",
    sizes: ["34", "36", "38", "40"],
    gallery: [
      "/images/runway/the_dress.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Suzhou Silk." },
      { label: "Origin", value: "Silk sourced from Suzhou, China. Constructed in Paris." },
      { label: "Fit", value: "Fluid, asymmetrical drape." },
      { label: "Care", value: "Specialist dry clean only." }
    ]
  },
  { 
    id: 302, 
    img: "/images/runway/the_gown.png", 
    title: "The Gown",
    price: "$8,500",
    category: "Fluidity",
    specs: "Silk chiffon. Full bias cut.",
    desc: "Constructed entirely on the bias. It conforms to the body solely through gravity, without a single dart or seam to enforce shape.",
    sizes: ["34", "36", "38", "40", "42"],
    gallery: [
      "/images/runway/the_gown.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Silk Chiffon." },
      { label: "Origin", value: "Constructed in Paris." },
      { label: "Fit", value: "Full bias cut. Extremely fluid." },
      { label: "Care", value: "Specialist dry clean only." }
    ]
  },
  { 
    id: 303, 
    img: "/images/runway/the_slip.png", 
    title: "The Slip",
    price: "$1,800",
    category: "Fluidity",
    specs: "Crepe de chine. 2mm spaghetti straps.",
    desc: "Stripped of all excess. The garment is held together by tension threads so fine they are virtually invisible to the naked eye.",
    sizes: ["34", "36", "38", "40"],
    gallery: [
      "/images/runway/the_slip.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Silk Crepe de Chine." },
      { label: "Origin", value: "Constructed in Paris." },
      { label: "Fit", value: "Close-to-body bias drape." },
      { label: "Care", value: "Hand wash cold or dry clean." }
    ]
  },
  { 
    id: 304, 
    img: "/images/runway/the_blouse.png", 
    title: "The Blouse",
    price: "$1,400",
    category: "Fluidity",
    specs: "Silk organza. High collar.",
    desc: "Translucent yet rigid. The organza is treated to hold sharp creases, challenging the traditional softness associated with blouses.",
    sizes: ["34", "36", "38", "40", "42"],
    gallery: [
      "/images/runway/the_blouse.png"
    ],
    richDetails: [
      { label: "Material", value: "100% Silk Organza." },
      { label: "Origin", value: "Constructed in Paris." },
      { label: "Fit", value: "Boxy, voluminous structure." },
      { label: "Care", value: "Specialist dry clean only. Do not crush." }
    ]
  }
];

export function Shop() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Create the Pinned Stack overlapping effect
      const panels = gsap.utils.toArray('.stack-panel');
      
      panels.forEach((panel: any, i) => {
        // We do not pin the last panel, otherwise it pins forever
        if (i !== panels.length - 1) {
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            pin: true,
            pinSpacing: false,
            // Subtle scale down, blur, and opacity fade as the next panel covers it
            animation: gsap.to(panel, { scale: 0.95, opacity: 0.3, filter: "blur(12px)", ease: "power2.inOut" }),
            scrub: true,
          });
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
}, []);

  return (
    <div className="bg-[#030303] text-white selection:bg-white selection:text-black">
      
      {/* Intro Header - Massive Brutalist Takeover */}
      <div className="h-screen w-full flex flex-col justify-center items-center text-center px-6 relative z-0 overflow-hidden bg-[#020202]">
        
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img 
            src="/images/runway/the_trench.png" 
            alt="Collection Atmosphere" 
            className="w-full h-full object-cover grayscale object-top animate-slow-zoom" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-transparent" />
        </div>

        {/* Editorial Floating Elements */}
        <p className="absolute top-12 left-6 md:left-12 text-[10px] tracking-[0.5em] uppercase text-white/50 font-mono z-10">
          FW26 — The Architecture of Silence
        </p>
        
        <p className="absolute bottom-12 right-6 md:right-12 text-[10px] tracking-[0.5em] uppercase text-white/50 font-mono z-10 [writing-mode:vertical-rl] rotate-180">
          12 Garments
        </p>

        {/* Core Typography */}
        <div className="relative z-10 mix-blend-difference flex flex-col items-center">
          <h1 className="text-7xl md:text-[12vw] font-extralight tracking-tighter uppercase leading-[0.8] text-white">
            The <br/> Collection
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-mono">Scroll</span>
          <div className="w-px h-24 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Cinematic Pinned Stack Layout */}
      <div ref={containerRef} className="relative z-10">
        {ATELIER_ARCHIVES.map((item, index) => (
          <div 
            key={item.id} 
            className="stack-panel isolate h-[100dvh] w-full relative bg-[#030303] flex items-center justify-between px-6 lg:px-12 overflow-hidden border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
            style={{ zIndex: index + 1 }}
          >
            {/* Title (Left Side - Wrapping & Overlapping Image) */}
            <div className="hidden md:flex w-[30vw] h-full items-center z-20 pointer-events-none">
              <h2 className="text-6xl md:text-8xl lg:text-[7vw] font-extralight tracking-tighter uppercase leading-[0.85] text-white mix-blend-difference -mr-32 relative left-12 break-words">
                {item.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h2>
            </div>

            {/* Image (Center) */}
            <div 
              className="relative w-full md:w-[40vw] h-[60vh] md:h-[85vh] group overflow-hidden bg-[#0a0a0a] cursor-pointer shrink-0 z-10"
              onClick={() => setSelectedProduct(item)}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale opacity-90 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:grayscale-0 group-hover:scale-[1.03] group-hover:opacity-100"
                loading="lazy"
              />
            </div>

            {/* Details (Right Side) */}
            <div className="hidden md:flex w-[30vw] flex-col justify-center items-end text-right z-20 pointer-events-auto pr-12">
              <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/40 mb-6 font-mono">
                {String(index + 1).padStart(2, '0')} — {item.category}
              </p>
              
              <p className="text-3xl md:text-5xl font-light tracking-tight text-white mb-6">
                {item.price}
              </p>
              
              <div className="w-16 h-px bg-white/20 mb-6" />
              
              <p className="text-xs text-white/50 tracking-widest uppercase mb-12 max-w-[250px] leading-relaxed">
                {item.specs}
              </p>
              
              <button 
                className="w-fit bg-transparent border border-white/30 text-white px-12 py-5 text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(item);
                }}
              >
                Purchase
              </button>
            </div>
            
            {/* Mobile View Title Overlay (since it's hidden on md+) */}
            <div className="md:hidden absolute bottom-12 left-6 mix-blend-difference pointer-events-none z-20">
              <h2 className="text-6xl font-extralight tracking-tighter uppercase leading-[0.85] text-white">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          isOpen={!!selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
