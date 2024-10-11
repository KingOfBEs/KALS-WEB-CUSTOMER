import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginValues } from "../pages/auth/LoginForm/LoginForm";
import { RegisterValues } from "../pages/auth/RegisterForm/RegisterForm";
import { LoginUserResponse, ResetPasswordRequest, UserProfile } from "../types/auth.type";
import { authApi } from "../apis/auth.api";
import { toast } from "react-toastify";
import request, { handleError } from "../utils/axios";

type UserContextType = {
    user: UserProfile | null;
    login: ( loginValues: LoginValues ) => void;
    register: ( registerValues: Omit<RegisterValues, 'confirmPassword'> ) => void;
    // resetPassword: ( resetPasswordRequest: ResetPasswordRequest ) => void;
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

    const [ user, setUser ] = useState<UserProfile | null>( null );
    const [ token, setToken ] = useState<string | null>( null );
    const [ isReady, setIsReady ] = useState<boolean>( false );

    useEffect( () =>
    {
        const token = localStorage.getItem( 'accessToken' );
        const user = localStorage.getItem( 'user' );
        if ( token )
        {
            setToken( token );
        }
        if ( user )
        {
            setUser( JSON.parse( user ) )
        }
        setIsReady( true );
    }, [] )

    useEffect( () =>
    {
        if ( token )
        {
            request.defaults.headers.Authorization = `Bearer ${ token }`;
        } else
        {
            delete request.defaults.headers.Authorization;
        }
    }, [ token ] );
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
                    const authUser = {
                        username: res.data.username,
                        fullName: res.data.fullName,
                        phoneNumber: res.data.phoneNumber
                    }
                    localStorage.setItem( 'user', JSON.stringify( authUser ) );
                    setUser( authUser );
                    toast.success( 'Login successfully' );
                    navigate( '/' );
                }
            } )
            .catch( err =>
            {
                handleError( err );
            } )
    }
    const register = async ( registerValues: Omit<RegisterValues, 'confirmPassword'> ) =>
    {
        await authApi.register( registerValues )
            .then( res =>
            {
                if ( res.status === 201 )
                {
                    setToken( res.data.token );
                    localStorage.setItem( 'accessToken', res.data.token );
                    localStorage.setItem( 'refreshToken', res.data.refreshToken );
                    const authUser = {
                        username: res.data.username,
                        fullName: res.data.fullName,
                        phoneNumber: res.data.phoneNumber
                    }
                    localStorage.setItem( 'user', JSON.stringify( authUser ) );
                    setUser( authUser );
                    toast.success( 'Register successfully' );
                    navigate( '/' );
                }
            } )
            .catch( err =>
            {
                handleError( err );
            } )
    }
    // const resetPassword = async ( resetPasswordRequest: ResetPasswordRequest ) => {
    //     await authApi.resetPassword( resetPasswordRequest )
    //     .then ( res => {
    //         if ( res.status === 200 )
    //         {

    //             toast.success( 'Reset password successfully' )
    //         }
    //     })
    // }
    const logout = () =>
    {
        setToken( null );
        localStorage.removeItem( 'accessToken' );
        localStorage.removeItem( 'refreshToken' );
        localStorage.removeItem( 'user' );
        toast.success( 'Logout successfully' );
        navigate( '/login' );
    }
    const isLoggedIn = (): boolean => !!token;
    return (
        <UserContext.Provider value={ { user, login, register, logout, isLoggedIn } }>
            { isReady && children }
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext( UserContext );
