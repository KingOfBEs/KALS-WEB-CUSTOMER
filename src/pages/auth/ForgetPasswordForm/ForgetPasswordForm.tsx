import Box from "@mui/material/Box"
import FormProvider from "../../../components/hook-form/FormProvider"
import RHFTextField from "../../../components/hook-form/RHFTextField"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { string, z } from "zod"
import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Fragment } from "react/jsx-runtime"
import { useState } from "react"
import InputAdornment from "@mui/material/InputAdornment"
import LoadingButton from '@mui/lab/LoadingButton'
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm"
import { authApi } from "../../../apis/auth.api"
import { toast } from "react-toastify"

export const ForgotPasswordSchema = z.object( {
    phoneNumber: z
        .string()
        .length( 10, "Phone number must be 10 digits long" )
        .regex( /^0(9[0-9]|1[0-9]|3[0-9]|4[0-9]|5[0-9]|7[0-9]|8[0-9])\d{7}$/, "Invalid phone number" ),
} )
export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>

interface Props
{
    handleChangeFormLogin: () => void;
}

const ForgetPasswordForm: React.FC<Props> = ( { handleChangeFormLogin }: Props ) =>
{
    const [ isSendSMS, setIsSendSMS ] = useState( false )

    // ====================
    const methods = useForm<ForgotPasswordValues>( {
        resolver: zodResolver( ForgotPasswordSchema ),
        defaultValues: {
            phoneNumber: '',
        }
    } )
    const {
        handleSubmit
    } = methods;

    const handleSendSMS = async ( data: ForgotPasswordValues ) =>
    {
        await authApi.sendSMS( data.phoneNumber )
            .then( ( res ) =>
            {
                if ( res.status === 200 )
                {
                    toast.success( 'Send OTP successfully' )
                    setIsSendSMS( true )
                }
            } )
            .catch( ( err ) =>
            {
                toast.error( 'Send OTP failed' )
            } )
    }

    return (
        <Fragment>
            {
                isSendSMS ? (
                    <ResetPasswordForm handleChangeFormLogin={ handleChangeFormLogin } phoneNumber={ methods.getValues( 'phoneNumber' ) } />
                ) : (
                    <FormProvider onSubmit={ handleSubmit( handleSendSMS ) } methods={ methods } >
                        <Box sx={ {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            width: { xs: '100%', sm: '40%' },
                            margin: 'auto',
                            mb: 2
                        } }
                        >
                            <RHFTextField name='phoneNumber' label='Phone Number' required />
                            <Button type='submit' variant='contained' color='primary' sx={ { borderRadius: 5, py: 2 } }>
                                Send OTP
                            </Button>

                        </Box>
                    </FormProvider>
                )
            }
            <Box sx={ {
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '100%', sm: '40%' },
                margin: 'auto'
            } }>
                <Typography variant='button' sx={ { textAlign: 'center', textDecorationLine: 'underline', ":hover": { cursor: 'pointer' } } } onClick={ handleChangeFormLogin }>Cancel</Typography>
            </Box>
        </Fragment>

    )
}

export default ForgetPasswordForm