import { useState } from 'react';

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

const PILLARS = [
  {
    id: 'wool',
    title: 'Scottish Borders Wool',
    number: '01',
    mobileDesc: 'Shorn by hand in the Cheviot Hills. 19.5 microns. Capable of structural memory.',
    content: (
      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-mono mb-4 block">
          Cheviot Hills, Scotland / 19.5 Microns / Shorn by Hand
        </span>
        <h3 className="text-[8vw] md:text-[5vw] font-extralight tracking-tighter uppercase leading-none mix-blend-difference mb-6 text-white">
          The Fleece
        </h3>
        <p className="text-xl md:text-2xl font-serif italic text-white/70 max-w-xl leading-relaxed">
          Sourced twice a year from a single flock in the Cheviot Hills, shorn by hand at 19.5 microns. The fibers carry natural lanolin and structural memory — they learn the body they shelter.
        </p>
      </div>
    ),
    bg: '/images/lore/zero_synthetic.png'
  },
  {
    id: 'silk',
    title: 'Suzhou Raw Silk',
    number: '02',
    mobileDesc: 'Harvested at the dead-pupa stage. Never degummed. A load-bearing structural interlining.',
    content: (
      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-mono mb-4 block">
          Suzhou, Jiangsu / Bombyx Mori / Un-degummed
        </span>
        <h3 className="text-[8vw] md:text-[5vw] font-extralight tracking-tighter uppercase leading-none mix-blend-difference mb-6 text-white">
          The Architecture
        </h3>
        <p className="text-xl md:text-2xl font-serif italic text-white/70 max-w-xl leading-relaxed">
          Harvested at the dead-pupa stage to preserve the natural sericin coating. Never degummed. Used as a load-bearing organza interlining — it contributes to the garment's skeleton, not its surface.
        </p>
      </div>
    ),
    bg: '/images/lore/tenet_endurance.png'
  },
  {
    id: 'canvas',
    title: 'Argentine Horsehair',
    number: '03',
    mobileDesc: 'Woven at 3.2 newtons per centimeter in Buenos Aires. The internal skeleton of every coat.',
    content: (
      <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-mono mb-4 block">
          Buenos Aires / Argentine Criollo / 3.2 N/cm Tension
        </span>
        <h3 className="text-[8vw] md:text-[5vw] font-extralight tracking-tighter uppercase leading-none mix-blend-difference mb-6 text-white">
          The Skeleton
        </h3>
        <p className="text-xl md:text-2xl font-serif italic text-white/70 max-w-xl leading-relaxed">
          Woven in Buenos Aires at a tension of exactly 3.2 newtons per centimeter — a specification that has not changed since 1955. It forms the rigid internal skeleton of every coat. It defies gravity. It never collapses.
        </p>
      </div>
    ),
    bg: '/images/lore/law_of_fourteen.png'
  }
];

export function HomeSourcing() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#020202] border-t border-white/10">

      {/* Section Label */}
      <p className="px-6 md:px-12 pt-10 text-[10px] tracking-[0.4em] uppercase text-white/40 font-mono">
        03 — Matière Première
      </p>

      {/* Film Grain */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-screen pointer-events-none z-50" style={{ backgroundImage: GRAIN }} />

      {/* Desktop: horizontal accordion */}
      <div className="hidden md:flex h-[90vh] overflow-hidden relative">
        {PILLARS.map((pillar) => {
          const isActive = activeId === pillar.id;
          const flexClass = activeId === null ? 'flex-1' : (isActive ? 'flex-[12]' : 'flex-[0.5]');
          return (
            <div
              key={pillar.id}
              onMouseEnter={() => setActiveId(pillar.id)}
              onMouseLeave={() => setActiveId(null)}
              className={`relative h-full border-r border-white/10 cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${flexClass}`}
            >
              <div className="absolute inset-0 w-[100vw] h-full z-0 pointer-events-none">
                <img src={pillar.bg} className={`w-full h-full object-cover origin-left transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${isActive ? 'grayscale-0 brightness-[0.35] scale-100' : 'grayscale brightness-[0.15] scale-[1.15]'}`} alt={pillar.title} />
              </div>
              <div className={`absolute inset-0 p-4 md:p-8 flex flex-col justify-end items-center z-20 pointer-events-none transition-opacity duration-300 ${isActive ? 'opacity-0 delay-0' : 'opacity-100 delay-300'}`}>
                <h3 className="text-2xl md:text-4xl font-extralight tracking-tighter uppercase [writing-mode:vertical-lr] rotate-180 mix-blend-difference whitespace-nowrap mb-8 text-white/80">{pillar.title}</h3>
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-mono">{pillar.number}</span>
              </div>
              <div className={`absolute inset-0 w-screen h-full z-30 pointer-events-none transition-opacity duration-500 ${isActive ? 'opacity-100 delay-300' : 'opacity-0 delay-0'}`}>
                {pillar.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical stacked panels */}
      <div className="flex md:hidden flex-col">
        {PILLARS.map((pillar) => (
          <div key={pillar.id} className="relative w-full h-[60vw] min-h-[280px] overflow-hidden border-b border-white/10">
            <img src={pillar.bg} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3]" alt={pillar.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/40 font-mono block mb-2">{pillar.number}</span>
              <h3 className="text-3xl font-extralight tracking-tighter uppercase text-white mb-2">{pillar.title}</h3>
              <p className="text-sm font-serif italic text-white/60 leading-relaxed max-w-xs">{pillar.mobileDesc}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
