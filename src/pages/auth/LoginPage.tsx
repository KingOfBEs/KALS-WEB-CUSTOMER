import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FormProvider from '../../components/hook-form/FormProvider'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { useAuth } from '../../contexts/useAuth'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'

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

    const [ isLogin, setIsLogin ] = useState( true );
    const [ isForgotPassword, setIsForgotPassword ] = useState( false );
    return (
        <Box sx={ { minHeight: '100vh' } }>
            <Box sx={ { display: 'flex', gap: 3, justifyContent: 'center', pt: 7, pb: 6 } }>
                <Button variant={ isLogin ? 'contained' : 'outlined' } color='primary' sx={ { borderRadius: 5, px: 3, py: 1 } } onClick={ () => { setIsLogin( true ) } }>Login</Button>
                <Button variant={ isLogin ? 'outlined' : 'contained' } color='primary' sx={ { borderRadius: 5, py: 1 } } onClick={ () => { setIsLogin( false ); setIsForgotPassword( false ) } }>Create Account</Button>
            </Box>
            {
                isLogin && !isForgotPassword ? (
                    <LoginForm handleChangeFormForgotPassword={ handleChangeFormForgotPassword } />
                ) :
                    isForgotPassword ?
                        (
                            <FormProvider onSubmit={ handleSendEmail } methods={ methods } >
                                <Box sx={ {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    width: { xs: '100%', sm: '40%' },
                                    margin: 'auto'

                                } }
                                >
                                    <RHFTextField name='username' label='Username Or PhoneNumber' required />
                                    <Button type='submit' variant='contained' color='primary' sx={ { borderRadius: 5, py: 2 } }>
                                        Submit
                                    </Button>
                                    <Typography variant='button' sx={ { textAlign: 'center', textDecorationLine: 'underline', ":hover": { cursor: 'pointer' } } } onClick={ () => setIsForgotPassword( false ) }>Cancel</Typography>
                                </Box>
                            </FormProvider>
                        ) : (
                            <RegisterForm />
                        )
            }

        </Box>
    )
}

export default LoginPage