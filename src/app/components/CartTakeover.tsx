import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X } from 'lucide-react';

export function CartTakeover() {
  const { cartItems, isCartOpen, closeCart, removeFromCart } = useCart();
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Small delay/lerp can be done via css transition on the image
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    if (isCartOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isCartOpen]);

  const total = cartItems.reduce((acc, item) => {
    const priceStr = item.product.price?.replace('$', '').replace(',', '') || '0';
    return acc + parseInt(priceStr, 10);
  }, 0);

  // If cart is closed, we still render it to allow the fade out animation
  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#030303] text-white transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
        isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Dynamic Hover Image */}
      {hoveredImage && (
        <img 
          src={hoveredImage} 
          alt="Hover Preview" 
          className="fixed pointer-events-none z-0 w-80 h-[26rem] object-cover grayscale opacity-40 transition-opacity duration-500"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Header */}
      <div className="h-24 px-8 md:px-16 flex items-center justify-between border-b border-white/10 shrink-0 relative z-10 mix-blend-difference">
        <p className="text-xs uppercase tracking-[0.4em] font-mono text-white/50">Invoice / {cartItems.length} Items</p>
        <button onClick={closeCart} className="text-white hover:text-white/50 transition-colors p-4 -mr-4">
          <X size={24} strokeWidth={1} />
        </button>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto px-8 md:px-16 py-12 md:py-24 relative z-10 scrollbar-hide mix-blend-difference" data-lenis-prevent="true">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter uppercase mb-4">No Entries</h2>
            <p className="text-xs tracking-[0.3em] font-mono">The collection awaits.</p>
          </div>
        ) : (
          <div className="flex flex-col w-full max-w-7xl mx-auto space-y-4">
            {cartItems.map((item, index) => (
              <div 
                key={item.cartId}
                className="group relative flex flex-col md:flex-row md:items-baseline justify-between border-b border-white/10 pb-4 md:pb-8 cursor-crosshair transition-colors duration-500 hover:border-white/40"
                onMouseEnter={() => setHoveredImage(item.product.img)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="text-sm md:text-lg font-mono text-white/30 group-hover:text-white/60 transition-colors">
                    [0{index + 1}]
                  </span>
                  <div className="flex flex-col">
                    <h3 className="text-3xl md:text-5xl lg:text-7xl font-extralight tracking-tighter uppercase transition-transform duration-500 origin-left group-hover:scale-[1.02]">
                      {item.product.title}
                    </h3>
                    <div className="flex items-center gap-6 mt-2 md:mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-[10px] md:text-xs tracking-[0.3em] font-mono uppercase">Size: {item.size}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(item.cartId);
                          setHoveredImage(null);
                        }}
                        className="text-[10px] md:text-xs tracking-[0.3em] font-mono uppercase underline underline-offset-4 hover:text-red-400 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:text-right">
                  <p className="text-2xl md:text-4xl font-light tracking-widest">{item.product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer / Checkout */}
      {cartItems.length > 0 && (
        <div className="shrink-0 relative z-10 border-t border-white/10 bg-[#030303]">
          <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] font-mono text-white/50 mb-2">Total Extracted</p>
              <p className="text-5xl md:text-7xl font-extralight tracking-tighter">${total.toLocaleString()}</p>
            </div>
            
            <button className="w-full md:w-auto px-16 py-6 md:py-8 border border-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase bg-white text-black hover:bg-transparent hover:text-white transition-all duration-500">
              Complete Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
