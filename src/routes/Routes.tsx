import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainLayout from "../layouts/main/MainLayout";
import AboutPage from "../pages/about/AboutPage";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/auth/LoginPage";
import CheckoutLayout from "../layouts/checkout/CheckoutLayout";
import ShippingInformation from "../pages/shipping-information/ShippingInformation";
import PaymentSuccessPage from "../pages/payment/PaymentSuccessPage";
import ShopPage from "../pages/shop/ShopPage";
import PaymentCancelPage from "../pages/payment/PaymentCancelPage";
export const router = createBrowserRouter( [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <MainLayout />,
                children: [
                    { path: "", element: <HomePage /> },
                    { path: "shop", element: <ShopPage /> },
                    { path: "profile", element: <ProfilePage /> },
                    { path: "about", element: <AboutPage /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "success", element: <PaymentSuccessPage /> },
                    { path: "cancel", element: <PaymentCancelPage /> },
                ]
            },
            {
                path: "checkout",
                element: <CheckoutLayout />,
                children: [
                    { path: "information", element: <ShippingInformation /> },
                ]
            }
        ]
    }
] )