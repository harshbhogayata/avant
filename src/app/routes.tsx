import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { About } from "./pages/About";
import { Cart } from "./pages/Cart";
import { Runway } from "./pages/Runway";
import { Atelier } from "./pages/Atelier";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "about", Component: About },
      { path: "cart", Component: Cart },
      { path: "runway", Component: Runway },
      { path: "atelier", Component: Atelier },
    ],
  },
]);
