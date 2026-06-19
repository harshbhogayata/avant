import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      }
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 bg-black z-[10000] flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 w-full h-full p-8 md:p-16 flex flex-col justify-between">
        <div className="flex justify-between items-start w-full">
          <div>
            <h1 className="text-2xl tracking-[0.3em] font-extralight text-white">AVANT</h1>
          </div>
          <span className="text-xs tracking-[0.5em] text-white/50 uppercase">Paris • 1947</span>
        </div>
        
        <div className="flex items-baseline self-end" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span 
            ref={percentRef} 
            className="text-[25vw] md:text-[20vw] font-normal leading-none text-white tracking-tighter"
          >
            {progress}
          </span>
          <span className="text-3xl md:text-5xl text-white/50 ml-2">%</span>
        </div>
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
