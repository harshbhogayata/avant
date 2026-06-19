import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ARCHIVE_GARMENTS = [
  { 
    id: 1, 
    img: "/images/runway/the_overcoat.png", 
    title: "The Overcoat",
    chapter: "Ch. 08.1",
    year: "1951",
    specs: "2.8kg — 8,000 pad stitches — 400 hours",
    desc: "The first garment ever commissioned. A retired officer wanted a coat that could withstand twenty winters without losing its shape. His son still wears it today.",
    pullquote: "It does not hang from the body. It stands."
  },
  { 
    id: 2, 
    img: "/images/runway/the_jacket.png", 
    title: "The Jacket",
    chapter: "Ch. 08.2",
    year: "1963",
    specs: "680g — Void: 8.00mm — Canvas: Full",
    desc: "Sometimes called 'The Ghost' by archivists. It weighed only 680 grams but maintained a perfectly defined silhouette even when empty.",
    pullquote: "Present but absent. Hovering rather than resting."
  },
  { 
    id: 3, 
    img: "/images/runway/the_trouser.png", 
    title: "The Trouser",
    chapter: "Ch. 08.3",
    year: "1978",
    specs: "Grain: 7° rotation — Tension: 3.2 N/cm",
    desc: "Cut at a 7-degree deviation from the standard grain line — introducing a natural twist that causes the fabric to spiral around the thigh, appearing to be in motion even when still.",
    pullquote: "The fabric itself has momentum."
  },
  { 
    id: 4, 
    img: "/images/runway/the_dress.png", 
    title: "The Dress",
    chapter: "Ch. 08.4",
    year: "1985",
    specs: "1.2kg — Void: 12mm — 600 hours",
    desc: "The only garment ever designed for a specific event. The Founder later regretted it. After the commission he added a corollary: 'If the answer includes a date, we are the wrong house.'",
    pullquote: "A halo effect. 12mm of engineered air."
  }
];

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export function Runway() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // Hero entrance
      gsap.fromTo('.runway-hero-text',
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.6, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
      );

      // Each garment panel
      gsap.utils.toArray('.garment-panel').forEach((panel: any) => {

        // Spec card slides in from right
        gsap.fromTo(panel.querySelector('.spec-card'),
          { x: 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 65%', toggleActions: 'play none none reverse' }
          }
        );

        // Pull quote rises from below
        gsap.fromTo(panel.querySelector('.pull-quote'),
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.15,
            scrollTrigger: { trigger: panel, start: 'top 60%', toggleActions: 'play none none reverse' }
          }
        );

        // Title cuts in
        gsap.fromTo(panel.querySelector('.garment-title'),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 70%', toggleActions: 'play none none reverse' }
          }
        );

        // Image subtle parallax
        gsap.to(panel.querySelector('.garment-img'), {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      // Coda reveal - Chalk wipe effect
      if (document.querySelector('.coda-mask')) {
        gsap.to('.coda-mask', {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { 
            trigger: '.coda-section', 
            start: 'top top', 
            end: '+=100%', 
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true
          }
        });
      }

      gsap.fromTo('.coda-element',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.coda-section', start: 'top 50%', toggleActions: 'play none none reverse' }
        }
      );

    }, containerRef);

    // Ensure ScrollTrigger recalculates
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020202] min-h-screen text-white selection:bg-white selection:text-black">

      {/* ── Hero ── */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 opacity-25 mix-blend-luminosity bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/lore/the_rejection.png)', filter: 'grayscale(1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/70 to-transparent" />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none" style={{ backgroundImage: GRAIN }} />

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <p className="runway-hero-text text-[10px] tracking-[0.5em] text-white/40 uppercase font-mono mb-8">
            1992 — Le Manifeste / L'Archive Permanente
          </p>
          <h1 className="runway-hero-text text-[14vw] md:text-[10vw] font-extralight tracking-tighter leading-[0.85] uppercase mb-10">
            La Scène<br/>N'Existe Plus.
          </h1>
          <p className="runway-hero-text text-lg md:text-xl font-serif italic text-white/50 max-w-2xl leading-relaxed">
            "The runway is theatre for the temporary. We have no interest in the temporary."
          </p>
          <span className="runway-hero-text text-[10px] tracking-[0.3em] text-white/30 uppercase font-mono mt-4">
            — L'Atelier, 1992
          </span>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-mono">L'Archive</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Garment Panels — Full Bleed Editorial ── */}
      {ARCHIVE_GARMENTS.map((garment, index) => (
        <section
          key={garment.id}
          className="garment-panel relative min-h-screen w-full overflow-hidden flex items-end border-b border-white/5"
        >
          {/* Full-bleed image with parallax wrapper */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={garment.img}
              alt={garment.title}
              className="garment-img absolute inset-[-5%] w-[110%] h-[110%] object-cover grayscale mix-blend-luminosity brightness-[0.45] origin-center"
            />
          </div>

          {/* Gradient — heavy bottom, fades at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/70 via-transparent to-transparent" />

          {/* Grain */}
          <div className="absolute inset-0 opacity-[0.07] mix-blend-screen pointer-events-none" style={{ backgroundImage: GRAIN }} />

          {/* Ghost year watermark */}
          <div className="absolute top-1/2 right-6 md:right-16 -translate-y-1/2 text-white/[0.025] font-sans font-black text-[28vw] leading-none select-none pointer-events-none tracking-tighter">
            {garment.year}
          </div>

          {/* Chapter index — top left */}
          <div className="absolute top-10 left-6 md:left-12 z-20">
            <span className="text-[9px] tracking-[0.45em] uppercase text-white/25 font-mono">
              {garment.chapter} &nbsp;/&nbsp; {String(index + 1).padStart(2, '0')} of {String(ARCHIVE_GARMENTS.length).padStart(2, '0')}
            </span>
          </div>

          {/* Bottom content */}
          <div className="relative z-20 w-full max-w-[1800px] mx-auto px-6 md:px-12 pb-16 md:pb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

            {/* Left — year + title + italic desc */}
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.45em] text-white/35 uppercase font-mono mb-3">
                {garment.year}
              </span>
              <h2 className="garment-title text-[18vw] md:text-[10vw] font-extralight tracking-tighter uppercase leading-[0.82] text-white mb-8">
                {garment.title}
              </h2>
              <p className="pull-quote text-lg md:text-2xl font-serif italic text-white/55 leading-relaxed border-l border-white/15 pl-6 max-w-lg">
                {garment.desc}
              </p>
            </div>

            {/* Right — spec card */}
            <div className="spec-card shrink-0 border border-white/10 bg-black/50 backdrop-blur-md p-6 md:p-8 w-full md:w-72">
              <p className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-mono mb-4 pb-3 border-b border-white/10">
                Technical Specification
              </p>
              <p className="text-[11px] tracking-[0.15em] uppercase text-white/65 font-mono leading-[2] mb-6">
                {garment.specs}
              </p>
              <p className="text-sm font-serif italic text-white/40 leading-relaxed">
                "{garment.pullquote}"
              </p>
            </div>

          </div>
        </section>
      ))}

      {/* ── Coda ── */}
      <section className="coda-section h-screen w-full flex flex-col items-center justify-center text-center px-6 md:px-12 border-t border-white/10 relative bg-[#020202]">
        <p className="coda-element text-[9px] tracking-[0.45em] uppercase text-white/40 font-mono mb-10">L'Archive Permanente</p>
        
        <div className="relative w-full max-w-3xl flex justify-center text-center">
          {/* Ghost outline text */}
          <h2 
            className="text-3xl md:text-5xl font-serif italic text-transparent leading-relaxed"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
          >
            "What we build will endure.<br/>And if it doesn't, we will build it again."
          </h2>

          {/* Masked glowing text */}
          <div 
            className="coda-mask absolute top-0 left-0 w-full h-full flex justify-center"
            style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
          >
            <h2 className="text-3xl md:text-5xl font-serif italic text-white leading-relaxed drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]">
              "What we build will endure.<br/>And if it doesn't, we will build it again."
            </h2>
          </div>
        </div>

        <div className="coda-element w-px h-20 bg-white/20 mt-16" />
      </section>

    </div>
  );
}
