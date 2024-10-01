import Button from "@mui/material/Button"
import FormProvider from "../../../components/hook-form/FormProvider"
import RHFTextField from "../../../components/hook-form/RHFTextField"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { useForm } from "react-hook-form"
import React from "react"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from "../../../contexts/useAuth"


const LoginSchema = z.object( {
    usernameOrPhoneNumber: z.string().min( 1 ),
    password: z.string().min( 1 )
} )
export type LoginValues = z.infer<typeof LoginSchema>
interface Props
{
    handleChangeFormForgotPassword: () => void;
}
const LoginForm: React.FC<Props> = ( { handleChangeFormForgotPassword }: Props ) =>
{
    const { login } = useAuth()
    const methods = useForm<LoginValues>( {
        resolver: zodResolver( LoginSchema ),
        defaultValues: {
            usernameOrPhoneNumber: '',
            password: ''
        }
    } );
    const {
        handleSubmit
    } = methods;
    const handleLogin = async ( data: LoginValues ) =>
    {
        login( data )
    }
    return (
        <FormProvider onSubmit={ handleSubmit( handleLogin ) } methods={ methods } >
            <Box sx={ {
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                width: { xs: '100%', sm: '40%' },
                margin: 'auto'

            } }
            >
                <RHFTextField name='usernameOrPhoneNumber' label='Username or PhoneNumber' required />
                <RHFTextField name='password' label='Password' type='password' required />
                <Button type='submit' variant='contained' color='primary' sx={ { borderRadius: 5, py: 2 } }>Login</Button>
                <Typography variant='button' sx={ { textAlign: 'center', textDecorationLine: 'underline', ":hover": { cursor: 'pointer' } } } onClick={ handleChangeFormForgotPassword } >Forgot Password?</Typography>
            </Box>
        </FormProvider>
    )
}

export default LoginForm