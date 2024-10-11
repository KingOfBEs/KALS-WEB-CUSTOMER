import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import FormProvider from '../../components/hook-form/FormProvider'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { useAuth } from '../../contexts/useAuth'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'
import ForgetPasswordForm from './ForgetPasswordForm/ForgetPasswordForm'

type Props = {}

const LoginPage = ( props: Props ) =>
{
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth()
    useEffect( () =>
    {
        if ( isLoggedIn() )
        {
            navigate( '/' )
        }
    }, [] )
    const methods = useForm( {

    } );
    const handleSendEmail = async () =>
    {
        console.log( 'register' )
    }

    const handleChangeFormForgotPassword = () =>
    {
        setIsForgotPassword( true )
    }
    const handleChangeFormLogin = () =>
    {
        setIsForgotPassword( false )
    }

    const [ isLogin, setIsLogin ] = useState( true );
    const [ isForgotPassword, setIsForgotPassword ] = useState( false );
    return (
        <Box sx={ {
            minHeight: '100vh',
            marginX: {
                xs: 2,
                sm: 5,
                md: 10,
                lg: 15,
            },
            paddingTop: 2,
            paddingBottom: 8,
        } }>
            <Box sx={ { display: 'flex', gap: 3, justifyContent: 'center', pt: 2, pb: 6 } }>
                <Button variant={ isLogin ? 'contained' : 'outlined' } color='primary' sx={ { borderRadius: 5, px: 3, py: 1 } } onClick={ () => { setIsLogin( true ) } }>Login</Button>
                <Button variant={ isLogin ? 'outlined' : 'contained' } color='primary' sx={ { borderRadius: 5, py: 1 } } onClick={ () => { setIsLogin( false ); setIsForgotPassword( false ) } }>Create Account</Button>
            </Box>
            {
                isLogin && !isForgotPassword ? (
                    <LoginForm handleChangeFormForgotPassword={ handleChangeFormForgotPassword } />
                ) :
                    isForgotPassword ?
                        (
                            <ForgetPasswordForm handleChangeFormLogin={ handleChangeFormLogin } />
                        ) : (
                            <RegisterForm />
                        )
            }

        </Box>
    )
}

export default LoginPage