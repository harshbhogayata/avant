import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';
import { LoadingScreen } from './LoadingScreen';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const appRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Reset scroll and scroll triggers on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [location.pathname]);

  useEffect(() => {
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sync GSAP with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Prevent background scrolling when Radix modals are open
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-scroll-locked') {
          if (document.body.hasAttribute('data-scroll-locked')) {
            lenis.stop();
          } else {
            lenis.start();
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    // Global resize observer to recalculate GSAP scroll math when images load and change page height
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div ref={appRef} className="bg-black text-white antialiased min-h-screen flex flex-col">
        <Toaster position="bottom-right" toastOptions={{ className: 'rounded-none border-white/20 bg-black/80 backdrop-blur-md text-white font-light tracking-wide', style: { borderRadius: 0 } }} />
        <Navigation />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
