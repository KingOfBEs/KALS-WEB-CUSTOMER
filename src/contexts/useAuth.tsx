import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginValues } from "../pages/auth/LoginForm/LoginForm";
import { RegisterValues } from "../pages/auth/RegisterForm/RegisterForm";
import { LoginUserResponse } from "../types/auth.type";
import { authApi } from "../apis/auth.api";
import { toast } from "react-toastify";

type UserContextType = {
    login: ( loginValues: LoginValues ) => void;
    register: ( registerValues: RegisterValues ) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}
const UserContext = createContext<UserContextType>( {} as UserContextType );

interface AuthProviderProps
{
    children: React.ReactNode;
}

export const UserProvider: React.FC<AuthProviderProps> = ( { children }: AuthProviderProps ) =>
{
    const navigate = useNavigate();

    const [ user, setUser ] = useState<LoginUserResponse | null>( null );
    const [ token, setToken ] = useState<string | null>( null );
    const [ isReady, setIsReady ] = useState<boolean>( false );

    useEffect( () =>
    {
        const token = localStorage.getItem( 'accessToken' );
        if ( token )
        {
            setToken( token );
        }
        setIsReady( true );
    }, [] )
    const login = async ( loginValues: LoginValues ) =>
    {
        await authApi.login( loginValues )
            .then( res =>
            {
                if ( res.status === 200 )
                {
                    setToken( res.data.token );
                    localStorage.setItem( 'accessToken', res.data.token );
                    localStorage.setItem( 'refreshToken', res.data.refreshToken );
                    toast.success( 'Login successfully' );
                    navigate( '/' );
                }
            } )
    }
    const register = async ( registerValues: RegisterValues ) =>
    {
        await authApi.register( registerValues )
            .then( res =>
            {
                if ( res.status === 201 )
                {
                    setToken( res.data.token );
                    localStorage.setItem( 'accessToken', res.data.token );
                    localStorage.setItem( 'refreshToken', res.data.refreshToken );
                    toast.success( 'Register successfully' );
                    navigate( '/' );
                }
            } )
    }
    const logout = () =>
    {
        setToken( null );
        localStorage.removeItem( 'accessToken' );
        localStorage.removeItem( 'refreshToken' );
        navigate( '/auth/login' );
    }
    const isLoggedIn = (): boolean => !!token;
    return (
        <UserContext.Provider value={ { login, register, logout, isLoggedIn } }>
            { isReady && children }
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext( UserContext );
