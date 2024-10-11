import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { get } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentApi } from '../../apis/payment.api';
import { handleError } from '../../utils/axios';
type Props = {}

const PaymentCancelPage = ( props: Props ) =>
{
    const theme = useTheme();
    const [ count, setCount ] = useState( 5 );
    const navigate = useNavigate();
    const location = useLocation();

    // Function to get query parameters
    const queryParams = new URLSearchParams( location.search );
    const orderCode = queryParams.get( 'orderCode' );
    console.log( orderCode )
    useEffect( () =>
    {
        const completeOrder = async () =>
        {
            await paymentApi.completeOrder( Number( orderCode ) )
                .catch( err => handleError( err ) )
        }
        completeOrder();
        if ( count === 0 )
        {
            navigate( '/' )
        }

        const timer = setInterval( () =>
        {
            setCount( ( currentCount ) => currentCount - 1 );
        }, 1000 );

        return () =>
        {
            clearInterval( timer );
        };
    }, [ count ] );

    return (
        <Box sx={ {
            height: `100vh`,
            bgcolor: 'white',
            display: 'flex',
            justifyContent: 'center',
            pt: 10
        } }>
            <Stack spacing={ 2 }>
                <Box sx={ {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                } }>
                    <CancelIcon sx={ {
                        fontSize: 100,
                        color: 'red',
                    } } />
                </Box>
                <Typography variant="h4" sx={ { mt: 2, color: theme.palette.primary.main } } >
                    Your order has been canceled
                </Typography>
                <Box sx={ {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                } }>
                    <Typography variant="h6" sx={ { color: theme.palette.primary.main } } >
                        Redirect to Home Page in { count } seconds...
                    </Typography>
                </Box>
            </Stack>
        </Box>
    )
}

export default PaymentCancelPage