import { useState } from 'react';

const materials = [
  {
    id: '01',
    name: 'Highland Wool',
    source: 'The Cheviot Hills, Scottish Borders',
    spec: '19.5 Microns // 75mm Staple',
    desc: 'Sourced twice a year from specific flocks in the Cheviot Hills. The fleece is hand-shorn and scoured using only water and biodegradable soap. No chemical treatments. No synthetic dyes.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: '02',
    name: 'Raw Silk Organza',
    source: 'Suzhou, Jiangsu Province',
    spec: 'Bombyx Mori // Un-degummed',
    desc: 'Reeled using a technique that preserves the natural sericin coating. It is not degummed, preserving its structural rigidity to function as an architectural interlining rather than mere decoration.',
    img: 'https://images.unsplash.com/photo-1611244419377-b0a760c19719?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: '03',
    name: 'Horsehair Canvas',
    source: 'Buenos Aires, Argentina',
    spec: '0.15mm Diameter // 3.2N Tension',
    desc: 'Woven on mechanical looms at precisely 3.2 newtons per centimeter. It forms the rigid skeleton of every coat, maintaining the silhouette independently of the human body.',
    img: 'https://images.unsplash.com/photo-1584346850024-cd9bb4fba976?auto=format&fit=crop&q=80&w=2000'
  }
];

export function TheSourcing() {
  const [activeId, setActiveId] = useState('01');

  return (
    <section className="relative w-full min-h-screen bg-[#020202] py-24 px-6 md:px-12 overflow-hidden flex flex-col justify-center border-t border-white/5">
      
      {/* Heavy Film Grain */}
      <div 
        className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none z-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="w-full max-w-[1800px] mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-serif italic text-white/80 tracking-wide">
          The Raw Matter.
        </h2>
        <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-mono mt-4">
          Zero-Synthetic Doctrine // Chapter 03
        </p>
      </div>

      {/* Horizontal Accordion */}
      <div className="flex w-full h-[65vh] max-w-[1800px] mx-auto gap-4">
        {materials.map((mat) => {
          const isActive = activeId === mat.id;

          return (
            <div
              key={mat.id}
              onClick={() => setActiveId(mat.id)}
              className={`relative overflow-hidden cursor-pointer transition-all duration-[1000ms] cubic-bezier(0.7, 0, 0.3, 1) flex-shrink-0 ${
                isActive ? 'w-full lg:w-[60%]' : 'w-0 lg:w-[18%]' // On mobile, unselected items disappear. On desktop, they shrink.
              }`}
            >
              {/* Image Background */}
              <img 
                src={mat.img} 
                alt={mat.name} 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent" />

              {/* Accordion Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end h-full">
                
                {/* Always visible header */}
                <div className="flex items-baseline gap-4 whitespace-nowrap">
                  <span className="text-[10px] text-white/50 font-mono tracking-[0.4em]">[{mat.id}]</span>
                  <h3 className="text-3xl md:text-4xl font-sans font-light text-white uppercase tracking-tight">
                    {mat.name}
                  </h3>
                </div>

                {/* Details that fade in when active */}
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-out flex flex-col ${
                    isActive ? 'max-h-[300px] opacity-100 mt-6 delay-300' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <p className="text-[10px] tracking-[0.3em] text-white/40 font-mono uppercase mb-4">
                    {mat.source} <br/> {mat.spec}
                  </p>
                  <p className="text-lg md:text-xl font-serif italic text-white/70 max-w-xl">
                    {mat.desc}
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
