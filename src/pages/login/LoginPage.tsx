import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormProvider from '../../components/hook-form/FormProvider'
import RHFTextField from '../../components/hook-form/RHFTextField'
import { useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

type Props = {}

const LoginPage = ( props: Props ) =>
{
    const handleLogin = async () =>
    {
        console.log( 'login' )
    }
    const methods = useForm( {

    } );

    const handleRegister = async () =>
    {
        console.log( 'register' )
    }

    const handleSendEmail = async () =>
    {
        console.log( 'register' )
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
                    <FormProvider onSubmit={ handleLogin } methods={ methods } >
                        <Box sx={ {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            width: { xs: '100%', sm: '40%' },
                            margin: 'auto'

                        } }
                        >
                            <RHFTextField name='username' label='Username or PhoneNumber' required />
                            <RHFTextField name='password' label='Password' type='password' required />
                            <Button type='submit' variant='contained' color='primary' sx={ { borderRadius: 5, py: 2 } }>Login</Button>
                            <Typography variant='button' sx={ { textAlign: 'center', textDecorationLine: 'underline', ":hover": { cursor: 'pointer' } } } onClick={ () => setIsForgotPassword( true ) } >Forgot Password?</Typography>
                        </Box>
                    </FormProvider>
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
                            <FormProvider onSubmit={ handleRegister } methods={ methods } >
                                <Box sx={ {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4,
                                    width: { xs: '100%', sm: '40%' },
                                    margin: 'auto'

                                } }
                                >
                                    <RHFTextField name='username' label='Username' required />
                                    <RHFTextField name='password' label='Password' type='password' required />
                                    <RHFTextField name='phone_number' label='Phone Number' required />
                                    <RHFTextField name='full_name' label='Full Name' required />
                                    <Button type='submit' variant='contained' color='primary' sx={ { borderRadius: 5, py: 2 } } >
                                        Create Account
                                    </Button>
                                </Box>
                            </FormProvider>
                        )
            }

        </Box>
    )
}

export default LoginPage