import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormProvider from '../../../components/hook-form/FormProvider';
import Box from '@mui/material/Box';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import { authApi } from '../../../apis/auth.api';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface Props
{
    phoneNumber: string
    handleChangeFormLogin: () => void;
}
export const ResetPasswordSchema = z.object( {
    otp: z
        .string()
        .length( 6, "OTP must be exactly 6 characters" )
        .regex( /^\d+$/, "OTP must contain only digits" ),
    password: z
        .string()
        .min( 8, "Password must be at least 8 characters long" )
        .max( 100, "Password cannot exceed 100 characters" )
        .regex( /[a-zA-Z]/, "Password must contain at least one letter" )
        .regex( /[0-9]/, "Password must contain at least one number" )
        .regex( /[!@#$%^&*]/, "Password must contain at least one special character" ),
    confirmPassword: z.string(),
} ).refine( ( data ) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: [ "confirmPassword" ]
} );

export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>

const ResetPasswordForm: React.FC<Props> = ( { phoneNumber, handleChangeFormLogin } ) =>
{
    const [ isSentSMS, setIsSentSMS ] = useState( false )
    const [ isButtonDisabled, setIsButtonDisabled ] = useState( false )
    const methods = useForm<ResetPasswordValues>( {
        resolver: zodResolver( ResetPasswordSchema ),
        defaultValues: {
            otp: '',
            password: '',
            confirmPassword: ''
        }
    } )
    const {
        handleSubmit
    } = methods;

    const handleResetPassword = async ( data: ResetPasswordValues ) =>
    {
        await authApi.resetPassword( { phoneNumber, otp: data.otp, password: data.password } )
            .then( res =>
            {
                if ( res.status === 200 )
                {
                    toast.success( 'Reset password successfully' );
                    handleChangeFormLogin();
                }
            } )
    }
    const handleSendSMS = async () =>
    {
        setIsSentSMS( true )
        await authApi.sendSMS( phoneNumber )
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
        <FormProvider onSubmit={ handleSubmit( handleResetPassword ) } methods={ methods } >
            <Box sx={ {
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                width: { xs: '100%', sm: '40%' },
                margin: 'auto',
                mb: 2
            } }
            >
                <RHFTextField name='otp' label='OTP' required
                    slotProps={ {
                        input: {
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <LoadingButton disabled={ isButtonDisabled } loading={ isSentSMS } variant='contained' onClick={ handleSendSMS }>Send Again</LoadingButton>
                                </InputAdornment>
                            ),
                        }
                    } }
                />
                <RHFTextField name='password' label='Password' type='password' required />
                <RHFTextField name='confirmPassword' label='Confirm Password' type='password' required />
                <Button type='submit' variant='contained' color='primary' sx={ { borderRadius: 5, py: 2 } }>
                    Reset Password
                </Button>
            </Box>
        </FormProvider>
    )
}


export default ResetPasswordForm