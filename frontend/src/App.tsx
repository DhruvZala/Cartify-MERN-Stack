import Login from "./components/auth/Login";
import ProductPage from "./components/product/ProductPage";
import "./index.css";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import Cart from "./components/product/Cart";
import ProductDetailPage from "./components/product/ProductDetailPage";
import Register from "./components/auth/Register";
import ChangePassword from "./components/auth/ChangePassword";

const AppRoutes: React.FC = () => {
  const routes = [
    { path: "/login", element: <Login /> },
    { path: "/", element: <ProductPage /> },
    { path: "/productPage", element: <ProductPage /> },
    { path: "/cart", element: <Cart /> },
    { path: "/product/:id", element: <ProductDetailPage /> },
    { path: "/registerPage", element: <Register /> },
    { path: "/changePassword", element: <ChangePassword /> },
  ];

  return useRoutes(routes);
};

const Root: React.FC = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default Root;
