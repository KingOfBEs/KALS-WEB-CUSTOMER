import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../contexts/useAuth';
import { useQuery } from '@tanstack/react-query';
import { memberApi } from '../../apis/member.api';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { paymentApi } from '../../apis/payment.api';
import { handleError } from '../../utils/axios';

type Props = {}

const ShippingInformation = ( props: Props ) =>
{
    const { user } = useAuth();
    const theme = useTheme();
    const { data: member, isLoading } = useQuery( {
        queryKey: [ 'member' ],
        queryFn: async () =>
        {
            return await memberApi.getMemberInformation();
        },
        select: ( data ) => data.data
    } )
    const handlePayment = async () =>
    {
        const address: string = `${ member?.address }, ${ member?.ward }, ${ member?.district }, ${ member?.province }`;
        await paymentApi.checkout( address )
            .then( ( res ) =>
            {
                if ( res.status === 200 )
                {
                    const url = res.data;
                    window.location.href = url;
                }
            } )
            .catch( ( err ) =>
            {
                handleError( err );
            } )
    }
    return (
        <Box sx={ { mt: 2, pr: 5 } }>
            <Box sx={ { width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 } }>
                <Breadcrumbs
                    separator={ <NavigateNextIcon fontSize="small" /> }
                    aria-label="breadcrumb"
                >
                    <Link to={ '/cart' } key="1" style={ { color: theme.palette.text.primary, textDecorationLine: 'none' } }>
                        Cart
                    </Link>,
                    <Typography key="2" sx={ { color: 'text.primary', fontWeight: 500 } }>
                        Information
                    </Typography>,
                    <Typography key="3" >
                        Payment
                    </Typography>,
                </Breadcrumbs>
            </Box>
            <Stack spacing={ 2 }>
                <Typography variant='h5'>Contact Information</Typography>
                <Typography
                    variant='body1'
                    sx={ {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    } }
                >
                    <AccountCircleIcon /> { user?.fullName }
                </Typography>
                <Typography
                    variant='body1'
                    sx={ {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    } }
                >
                    <PhoneInTalkOutlinedIcon /> { user?.phoneNumber }
                </Typography>
                <Typography variant='h5' sx={ { my: 2 } }>
                    Shipping Address
                </Typography>
                <Box sx={ {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                } }>
                    <Typography
                        variant='body1'
                        sx={ {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        } }
                    >
                        <LocationOnIcon /> { isLoading ? 'Loading...' : `${ member?.address }, ${ member?.ward }, ${ member?.district }, ${ member?.province }` }
                    </Typography>
                    <IconButton to={ '/profile' } component={ Link }>
                        <EditIcon />
                    </IconButton>
                </Box>
            </Stack>
            <Box sx={ {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mt: 3,
            } }>
                <Button
                    variant='text'
                    color='primary'
                    component={ Link }
                    to='/cart'
                    sx={ { borderRadius: 0, height: 50 } }
                    startIcon={ <ArrowBackIosNewIcon /> }
                >
                    Return to Cart
                </Button>
                <Button
                    sx={ { width: 300, borderRadius: 0, height: 50 } }
                    variant='contained'
                    color='primary'
                    onClick={ handlePayment }
                    endIcon={ <ArrowForwardIosIcon /> }
                >
                    Continue to Payment
                </Button>
            </Box>
        </Box>
    );
};

export default ShippingInformation;
