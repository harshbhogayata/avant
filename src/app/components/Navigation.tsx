import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { cartItems, openCart } = useCart();

  useEffect(() => {
    // Smart Header - Hide on scroll down, show on scroll up
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        onUpdate: (self) => {
          setIsScrolled(self.direction === 1 || window.scrollY > 100);
          
          if (self.direction === 1 && window.scrollY > 100) {
            // Scrolling down
            gsap.to(navRef.current, { yPercent: -100, duration: 0.5, ease: 'power3.out' });
          } else {
            // Scrolling up
            gsap.to(navRef.current, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
          }
        }
      });
      
      // Magnetic hover effect
      const magnetics = document.querySelectorAll('.magnetic');
      magnetics.forEach((element) => {
        element.addEventListener('mousemove', (e: any) => {
          const rect = element.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
          gsap.to(element, { x, y, duration: 0.5, ease: 'power2.out' });
        });
        element.addEventListener('mouseleave', () => {
          gsap.to(element, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power4.inOut' }
      );

      const links = menuRef.current.querySelectorAll('.menu-link');
      gsap.fromTo(
        links,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3 }
      );
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-700 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-xl py-5 border-b border-white/5'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-20">
              <Link to="/" className="group hover:opacity-80 transition-opacity">
                <h1 className="text-2xl tracking-[0.3em] font-extralight text-white transition-all duration-300 group-hover:tracking-[0.35em]">
                  AVANT
                </h1>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden xl:flex items-center gap-12 text-sm">
                <Link
                  to="/shop"
                  className="relative text-white/80 hover:text-white transition-colors group p-2 magnetic inline-block"
                >
                  <span className="tracking-[0.2em] uppercase">Collection</span>
                  <span className="absolute bottom-1 left-2 w-0 h-px bg-white group-hover:w-[calc(100%-16px)] transition-all duration-500" />
                </Link>
                <Link
                  to="/runway"
                  className="relative text-white/80 hover:text-white transition-colors group p-2 magnetic inline-block"
                >
                  <span className="tracking-[0.2em] uppercase">Runway</span>
                  <span className="absolute bottom-1 left-2 w-0 h-px bg-white group-hover:w-[calc(100%-16px)] transition-all duration-500" />
                </Link>
                <Link
                  to="/atelier"
                  className="relative text-white/80 hover:text-white transition-colors group p-2 magnetic inline-block"
                >
                  <span className="tracking-[0.2em] uppercase">L'Atelier</span>
                  <span className="absolute bottom-1 left-2 w-0 h-px bg-white group-hover:w-[calc(100%-16px)] transition-all duration-500" />
                </Link>
                <Link
                  to="/about"
                  className="relative text-white/80 hover:text-white transition-colors group p-2 magnetic inline-block"
                >
                  <span className="tracking-[0.2em] uppercase">About</span>
                  <span className="absolute bottom-1 left-2 w-0 h-px bg-white group-hover:w-[calc(100%-16px)] transition-all duration-500" />
                </Link>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <button 
                onClick={openCart} 
                className="hidden md:flex relative text-white/80 hover:text-white transition-colors group p-2 magnetic items-center justify-center"
              >
                <span className="tracking-[0.2em] text-[10px] uppercase border border-white/20 px-4 py-2 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  Cart ({cartItems.length})
                </span>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="xl:hidden p-2 text-white/80 hover:text-white transition-colors magnetic"
              >
                {isMenuOpen ? (
                  <X size={24} strokeWidth={1.5} />
                ) : (
                  <Menu size={24} strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 bg-black z-[99] flex items-center justify-center"
        >
          <div className="text-center space-y-8 relative z-10">
            <Link
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="menu-link block text-5xl font-extralight text-white tracking-tight hover:text-white/60 transition-colors"
            >
              Collection
            </Link>
            <Link
              to="/runway"
              onClick={() => setIsMenuOpen(false)}
              className="menu-link block text-5xl font-extralight text-white tracking-tight hover:text-white/60 transition-colors"
            >
              Runway
            </Link>
            <Link
              to="/atelier"
              onClick={() => setIsMenuOpen(false)}
              className="menu-link block text-5xl font-extralight text-white tracking-tight hover:text-white/60 transition-colors"
            >
              L'Atelier
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="menu-link block text-5xl font-extralight text-white tracking-tight hover:text-white/60 transition-colors"
            >
              About
            </Link>

            <div className="menu-link pt-8">
              <p className="text-xs tracking-[0.5em] text-white/40 uppercase">Paris • Since 1947</p>
            </div>
          </div>

          {/* Grain texture */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}
    </>
  );
}
