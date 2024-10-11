import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/useAuth'
import { useTheme } from '@mui/material'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Fragment, useState } from 'react';
import AddressInformation from './address-information/AddressInformation';

const option = {
    SHIPPING_ADDRESS: 'Shipping Address',
    ORDER_MANAGEMENT: 'Order Management',
    SUPPORT_REQUEST: 'Support Request',
    LABS_WAREHOUSE: 'Labs Warehouse'
}

type Props = {}

const ProfilePage = ( props: Props ) =>
{
    const theme = useTheme()
    const { user, logout } = useAuth()
    const [ choose, setChoose ] = useState( option.SHIPPING_ADDRESS );

    const handleChangeOption = ( selectedOption: keyof typeof option ) =>
    {
        setChoose( option[ selectedOption ] );
    }

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
            <Grid container spacing={ 4 }>
                <Grid size={ 3 } sx={ { height: '100vh' } }>
                    <Box sx={ {
                        borderRadius: 2,
                        width: '100%',
                        height: 300,
                        paddingLeft: 2,
                        paddingTop: 2,
                        color: '#ffffff',
                        bgcolor: `${ theme.palette.primary.main }`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        boxShadow: 10
                    } }
                    >
                        <Typography variant='h5'>Account Information</Typography>
                        <Typography variant='h6'>Hi { user?.fullName }</Typography>
                        <Typography variant='body1' sx={ {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        } }
                        ><AccountCircleIcon /> { user?.username }</Typography>
                        <Typography variant='body1' sx={ {
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        } }
                        ><PhoneInTalkOutlinedIcon /> { user?.phoneNumber }</Typography>
                        <Typography variant='subtitle1' sx={ { textDecorationLine: 'underline', ":hover": { cursor: 'pointer' } } } onClick={ logout } >Logout</Typography>
                    </Box>
                    <Stack spacing={ 4 } sx={ { mt: 4 } }>
                        <Button onClick={ () => handleChangeOption( 'SHIPPING_ADDRESS' ) } sx={ { width: '100%', height: 40, borderRadius: 0 } } variant={ choose === option.SHIPPING_ADDRESS ? 'contained' : 'text' }>Shipping Address</Button>
                        <Button onClick={ () => handleChangeOption( 'ORDER_MANAGEMENT' ) } sx={ { width: '100%', height: 40, borderRadius: 0 } } variant={ choose === option.ORDER_MANAGEMENT ? 'contained' : 'text' }>Order Management</Button>
                        <Button onClick={ () => handleChangeOption( 'SUPPORT_REQUEST' ) } sx={ { width: '100%', height: 40, borderRadius: 0 } } variant={ choose === option.SUPPORT_REQUEST ? 'contained' : 'text' }>Support Request</Button>
                        <Button onClick={ () => handleChangeOption( 'LABS_WAREHOUSE' ) } sx={ { width: '100%', height: 40, borderRadius: 0 } } variant={ choose === option.LABS_WAREHOUSE ? 'contained' : 'text' }>Labs Warehouse</Button>
                    </Stack>
                </Grid>
                <Grid size={ 9 } >
                    {
                        choose === option.SHIPPING_ADDRESS && <AddressInformation />
                    }
                    {
                        choose === option.ORDER_MANAGEMENT && <Typography>Order Management</Typography>
                    }
                    {
                        choose === option.SUPPORT_REQUEST && <Typography>Support Request</Typography>
                    }
                    {
                        choose === option.LABS_WAREHOUSE && <Typography>Labs Warehouse</Typography>
                    }
                </Grid>
            </Grid>
        </Box >
    )
}

export default ProfilePage