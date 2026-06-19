import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogDescription } from './ui/dialog';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface RichDetail {
  label: string;
  value: string;
}

interface Product {
  id: number;
  title: string;
  category?: string;
  price?: string;
  year?: string;
  specs: string;
  desc: string;
  img: string;
  sizes?: string[];
  gallery?: string[];
  richDetails?: RichDetail[];
}

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();

  const gallery = product.gallery || [product.img];
  const sizes = product.sizes || ["ONE SIZE"];
  const richDetails = product.richDetails || [];

  useEffect(() => {
    if (isOpen) {
      setActiveImageIndex(0);
      setSelectedSize(null);
    }
  }, [isOpen, product]);

  const handlePurchase = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!max-w-[1400px] w-[95vw] h-[90vh] md:h-[85vh] p-0 border border-white/10 rounded-none bg-[#030303] overflow-hidden shadow-2xl [&>button]:hidden text-white flex flex-col md:flex-row">
        <DialogTitle className="sr-only">{product.title}</DialogTitle>
        <DialogDescription className="sr-only">Details for {product.title}</DialogDescription>
        
        {/* Left Column: Image Carousel */}
        <div className="w-full md:w-1/2 lg:w-[55%] h-[50vh] md:h-full relative bg-[#0a0a0a] flex border-b md:border-b-0 md:border-r border-white/10">
          {/* Thumbnails */}
          <div className="w-20 md:w-24 h-full border-r border-white/10 flex flex-col gap-2 p-4 overflow-y-auto shrink-0 z-10 bg-[#050505]/50 backdrop-blur-sm">
            {gallery.map((imgSrc, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-full aspect-[3/4] relative overflow-hidden transition-all duration-300 ${activeImageIndex === idx ? 'border border-white opacity-100' : 'border border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={imgSrc} alt={`${product.title} angle ${idx + 1}`} className="w-full h-full object-cover grayscale" />
              </button>
            ))}
          </div>

          {/* Main Display Image */}
          <div className="flex-1 relative overflow-hidden">
            {gallery.map((imgSrc, idx) => (
              <img
                key={idx}
                src={imgSrc}
                alt={product.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeImageIndex === idx ? 'opacity-100 scale-100 grayscale-0' : 'opacity-0 scale-105 grayscale'}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Content & Cart Flow */}
        <div className="w-full md:w-1/2 lg:w-[45%] h-full flex flex-col bg-[#050505] relative overflow-hidden">
          <DialogClose className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors duration-500 focus:outline-none z-20 bg-black/50 p-2 backdrop-blur-md">
            <X size={20} strokeWidth={1} />
          </DialogClose>

          <div className="flex-1 overflow-y-auto p-8 md:p-12 lg:p-16 space-y-12 animate-in fade-in duration-1000 fill-mode-both scrollbar-hide" style={{ animationDelay: '100ms' }} data-lenis-prevent="true">
            
            {/* Header */}
            <div className="space-y-4">
              <p className="text-xs text-white/50 uppercase tracking-[0.4em] font-mono">
                {product.category || 'Collection'}
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter uppercase">
                {product.title}
              </h2>
              <p className="text-2xl tracking-wide font-light">{product.price}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-lg">
                {product.desc}
              </p>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xs uppercase text-white/50 tracking-[0.2em]">Select Size</p>
                <button className="text-[10px] uppercase text-white/30 hover:text-white transition-colors underline underline-offset-4 tracking-widest">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border text-xs tracking-widest uppercase transition-all duration-300 ${
                      selectedSize === size 
                        ? 'border-white bg-white text-black' 
                        : 'border-white/20 text-white/60 hover:border-white/50 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Action */}
            <div className="pt-4 pb-8">
              <button
                onClick={handlePurchase}
                disabled={!selectedSize}
                className={`w-full h-16 flex items-center justify-center transition-all duration-500 border relative overflow-hidden ${
                  !selectedSize 
                    ? 'border-white/10 text-white/30 cursor-not-allowed bg-transparent' 
                    : 'border-white bg-white text-black hover:bg-neutral-200'
                }`}
              >
                <span className="text-sm tracking-[0.3em] uppercase font-medium relative z-10 flex items-center gap-3">
                  {!selectedSize ? 'Select a Size' : 'Add to Cart'}
                </span>
              </button>
            </div>

            {/* Rich Details Accordion (Simulated with stacked list for luxury minimalism) */}
            <div className="space-y-6 pt-8 border-t border-white/10">
              <p className="text-xs uppercase text-white/50 tracking-[0.2em]">Details</p>
              
              <div className="space-y-6">
                {richDetails.map((detail, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 border-b border-white/5 pb-6 last:border-0">
                    <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] md:w-24 shrink-0 font-mono">
                      {detail.label}
                    </span>
                    <span className="text-sm text-white/80 leading-relaxed">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}