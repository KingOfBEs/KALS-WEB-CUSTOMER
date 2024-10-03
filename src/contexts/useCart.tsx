import { createContext, useContext, useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type CartContextType = {
    isCartDrawerOpen: boolean;
    toggleCartDrawer: ( open: boolean ) => ( event: React.KeyboardEvent | React.MouseEvent ) => void;
}
const CartContext = createContext<CartContextType>( {} as CartContextType );

interface CartProviderProps
{
    children: React.ReactNode;
}
export const CartProvider: React.FC<CartProviderProps> = ( { children }: CartProviderProps ) =>
{
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [ isCartDrawerOpen, setIsCartDrawerOpen ] = useState( false );
    const toggleCartDrawer = ( open: boolean ) => ( event: React.KeyboardEvent | React.MouseEvent ) => 
    {
        if ( open && !isLoggedIn() )
        {
            navigate( '/login' )
            toast.info( 'Please login to view cart' )
            return
        }
        setIsCartDrawerOpen( open );
    }
    return (
        <CartContext.Provider value={ { isCartDrawerOpen, toggleCartDrawer } }>
            { children }
        </CartContext.Provider>
    )
}
export const useCart = () => useContext( CartContext );
