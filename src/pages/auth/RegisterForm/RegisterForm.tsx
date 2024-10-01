import { zodResolver } from "@hookform/resolvers/zod"
import LoadingButton from '@mui/lab/LoadingButton'
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import InputAdornment from "@mui/material/InputAdornment"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { authApi } from "../../../apis/auth.api"
import FormProvider from "../../../components/hook-form/FormProvider"
import RHFTextField from "../../../components/hook-form/RHFTextField"
import { useAuth } from "../../../contexts/useAuth"
import { toast } from "react-toastify"

const RegisterSchema = z.object( {
    username: z
        .string()
        .min( 1, "Username is required" )
        .max( 30, "Username cannot exceed 30 characters" ),
    password: z
        .string()
        .min( 8, "Password must be at least 8 characters long" )
        .max( 100, "Password cannot exceed 100 characters" )
        .regex( /[a-zA-Z]/, "Password must contain at least one letter" )
        .regex( /[0-9]/, "Password must contain at least one number" )
        .regex( /[!@#$%^&*]/, "Password must contain at least one special character" ),
    fullName: z
        .string()
        .min( 1, "Full name is required" )
        .max( 50, "Full name cannot exceed 50 characters" ),
    phoneNumber: z
        .string()
        .length( 10, "Phone number must be 10 digits long" )
        .regex( /^0(9[0-9]|1[0-9]|3[0-9]|4[0-9]|5[0-9]|7[0-9]|8[0-9])\d{7}$/, "Invalid phone number" ),
    otp: z
        .string()
        .length( 6, "OTP must be exactly 6 characters" )
        .regex( /^\d+$/, "OTP must contain only digits" ),
} )
export type RegisterValues = z.infer<typeof RegisterSchema>

type Props = {}

const RegisterForm = ( props: Props ) =>
{
    const { register } = useAuth()
    const [ isSentSMS, setIsSentSMS ] = useState( false )
    const [ isButtonDisabled, setIsButtonDisabled ] = useState( false )
    const methods = useForm<RegisterValues>( {
        resolver: zodResolver( RegisterSchema ),
        defaultValues: {
            username: '',
            password: '',
            fullName: '',
            phoneNumber: '',
            otp: ''
        }
    } )
    const {
        handleSubmit
    } = methods
    const handleRegister = async ( data: RegisterValues ) =>
    {
        register( data )
    }
    const handleSendSMS = async () =>
    {
        setIsSentSMS( true )
        await authApi.sendSMS( methods.getValues( 'phoneNumber' ) )
            .then( res =>
            {
                if ( res.status === 200 )
                {
                    setIsSentSMS( false )
                    toast.success( 'OTP sent successfully' );
                    // Disable the button for 2 minutes (120000 milliseconds)
                    setIsButtonDisabled( true );
                    setTimeout( () =>
                    {
                        setIsButtonDisabled( false ); // Enable the button after 2 minutes
                    }, 120000 ); // 2 minutes
                } else
                {
                    setIsSentSMS( false )
                    toast.error( 'OTP sent failed' )
                }
            } )
    }
    return (
        <FormProvider onSubmit={ handleSubmit( handleRegister ) } methods={ methods } >
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
                <RHFTextField name='fullName' label='Full Name' required />
                <RHFTextField name='phoneNumber' label='Phone Number' required
                    slotProps={ {
                        input: {
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <LoadingButton disabled={ isButtonDisabled } loading={ isSentSMS } variant='contained' onClick={ handleSendSMS }>Send SMS</LoadingButton>
                                </InputAdornment>
                            ),
                        }
                    } }
                />
                <RHFTextField name='otp' label='OTP' required />
                <Button type='submit' variant='contained' color='primary' sx={ { borderRadius: 5, py: 2 } } >
                    Create Account
                </Button>
            </Box>
        </FormProvider>
    )
}

export default RegisterForm