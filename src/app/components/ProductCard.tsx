import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Eye, Heart } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';
import { toast } from 'sonner';

interface Product {
  id: number;
  title: string;
  category?: string;
  year: string;
  specs: string;
  desc: string;
  img: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.6,
      ease: 'power2.out',
      transformPerspective: 1000,
    });

    gsap.to(imageRef.current, {
      scale: 1.12,
      duration: 0.6,
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
    });

    gsap.to(actionsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.8,
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
    });

    gsap.to(actionsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.4,
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast('Added to wishlist', {
        icon: <Heart size={14} className="fill-white" />
      });
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className="product-card group"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
      {/* Image Container */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-6"
        onClick={() => setIsQuickViewOpen(true)}
      >
        <div
          ref={imageRef}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 pointer-events-none grayscale group-hover:grayscale-0"
          style={{ backgroundImage: `url(${product.img})` }}
        />

        {/* Gradient Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 pointer-events-none"
        />

        {/* Collection Badge */}
        <div className="absolute top-6 left-6 pointer-events-none">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white">
              {product.year}
            </span>
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:border-white group/like transition-all duration-300 z-10"
        >
          <Heart
            size={16}
            className={`transition-all duration-300 ${
              isLiked
                ? 'fill-white text-white group-hover/like:fill-black group-hover/like:text-black'
                : 'text-white group-hover/like:text-black'
            }`}
            strokeWidth={1.5}
          />
        </button>

        {/* Actions */}
        <div
          ref={actionsRef}
          className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-5 z-10"
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsQuickViewOpen(true);
            }}
            className="w-full py-4 bg-white text-black flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all duration-500 group/btn"
          >
            <Eye size={18} strokeWidth={1.5} />
            <span className="text-xs tracking-[0.3em] uppercase">Quick View</span>
          </button>
        </div>

        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="text-lg font-light tracking-widest text-black uppercase">{product.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xs font-serif italic text-neutral-500">{product.category}</p>
          <div className="h-px w-12 bg-black/20 group-hover:w-20 group-hover:bg-black transition-all duration-500" />
        </div>
      </div>
    </div>

    <QuickViewModal 
      product={product} 
      isOpen={isQuickViewOpen} 
      onClose={() => setIsQuickViewOpen(false)} 
    />
  </>
  );
}
