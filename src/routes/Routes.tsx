import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/main/MainLayout";
import AboutPage from "../pages/about/AboutPage";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/auth/LoginPage";
import ProductDetailPage from "../pages/productDetail/ProductDetailPage";
import CartPage from "../pages/Cart/CartPage";

const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    // Define your toggleDrawer behavior here
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <MainLayout />,
                children: [
                    { path: "", element: <HomePage /> },
                    { path: "profile", element: <ProfilePage /> },
                    { path: "about", element: <AboutPage /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "product/:id", element: <ProductDetailPage /> },
                    { path: "your-cart", element: <CartPage toggleDrawer={toggleDrawer} />  } 
                ]
            }
        ]
    }
]);
