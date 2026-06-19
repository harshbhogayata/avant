import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { CartTakeover } from './components/CartTakeover';

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <CartTakeover />
    </CartProvider>
  );
}
