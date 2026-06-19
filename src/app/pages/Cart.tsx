import { useState } from 'react';
import { Link } from 'react-router';
import { X, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const initialItems = [
  {
    id: 1,
    name: 'The Overcoat',
    size: '36 (FR)',
    price: 4200,
    quantity: 1,
    image: '/images/runway/the_overcoat.png'
  },
  {
    id: 2,
    name: 'The Jacket',
    size: '38 (FR)',
    price: 3600,
    quantity: 1,
    image: '/images/runway/the_jacket.png'
  }
];

export function Cart() {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    toast('Item removed from bag');
  };

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      toast.success('Promo code applied');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your bag is empty');
      return;
    }
    toast.success('Proceeding to checkout...');
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1800px] mx-auto min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 flex items-end justify-between border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.1em]">SHOPPING BAG</h1>
          <span className="text-sm tracking-[0.1em] text-white/50">{items.length} ITEM{items.length !== 1 ? 'S' : ''}</span>
        </header>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 mb-16">
            <p className="text-white/60 tracking-widest text-sm uppercase mb-8">Your bag is empty.</p>
            <Link to="/shop" className="inline-block border border-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors">
              Explorer L'Oeuvre
            </Link>
          </div>
        ) : (
          <div className="space-y-8 mb-16">
            {items.map(item => (
              <div key={item.id} className="flex gap-8 items-center border-b border-white/5 pb-8 group">
                <div className="w-24 md:w-32 aspect-[3/4] bg-white/5 flex-shrink-0 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex-grow flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <h3 className="text-sm tracking-[0.15em] mb-2 uppercase">{item.name}</h3>
                    <p className="text-xs text-white/50 tracking-widest uppercase">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-sm border border-white/20 px-4 py-2 bg-white/5">
                      <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-white/50 transition-colors w-4 flex justify-center">-</button>
                      <span className="w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-white/50 transition-colors w-4 flex justify-center">+</button>
                    </div>
                    <span className="text-sm tracking-widest w-24 text-right">${(item.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-white transition-colors p-2">
                      <X size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 bg-white/5 border border-white/10 p-8 md:p-12">
          <div className="w-full md:w-1/2">
            <p className="text-xs tracking-[0.1em] text-white/60 leading-relaxed mb-8">
              COMPLIMENTARY EXPRESS SHIPPING AND RETURNS ON ALL ORDERS. <br />
              TAXES AND DUTIES CALCULATED AT CHECKOUT.
            </p>
            <form onSubmit={applyPromo} className="flex gap-4">
              <input 
                type="text" 
                placeholder="PROMO CODE" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-transparent border-b border-white/20 pb-2 text-sm tracking-widest focus:outline-none focus:border-white transition-colors w-full"
              />
              <button type="submit" className="text-xs tracking-[0.2em] uppercase border border-white/50 px-6 py-2 hover:border-white transition-colors">
                Apply
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/3 space-y-6">
            <div className="flex justify-between text-sm tracking-widest text-white/80">
              <span>SUBTOTAL</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm tracking-widest text-white/80">
              <span>SHIPPING</span>
              <span className="text-xs">COMPLIMENTARY</span>
            </div>
            <div className="flex justify-between text-lg tracking-widest border-t border-white/20 pt-6 mt-6">
              <span>TOTAL</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full group flex items-center justify-between bg-white text-black px-6 py-4 mt-8 hover:bg-white/90 transition-colors"
            >
              <span className="text-xs tracking-[0.2em] uppercase font-medium">Proceed to Checkout</span>
              <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/shop" className="text-[10px] tracking-[0.3em] text-white/50 hover:text-white uppercase transition-colors border-b border-white/20 pb-2 hover:border-white">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}