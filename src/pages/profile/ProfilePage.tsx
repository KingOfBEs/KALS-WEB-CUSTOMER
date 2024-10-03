import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/useAuth'
import { useTheme } from '@mui/material'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { useState } from 'react';

const option = {
    LAB_WAREHOUSE: 'Lab Warehouse',
    ORDER_MANAGEMENT: 'Order Management',
    SUPPORT_REQUEST: 'Support Request',
    ORDER_HISTORY: 'Order History'
}

type Props = {}

const ProfilePage = ( props: Props ) =>
{
    const theme = useTheme()
    const { user, logout } = useAuth()
    const [ choose, setChoose ] = useState( option.LAB_WAREHOUSE );

    const handleChangeOption = ( selectedOption: keyof typeof option ) =>
    {
        setChoose( option[ selectedOption ] );
    }

    return (
        <Box sx={ {
            minHeight: '100vh',
            bgcolor: 'background.default'
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
                        <Button onClick={ () => handleChangeOption( 'LAB_WAREHOUSE' ) } sx={ { width: '100%', height: 40, borderRadius: 0 } } variant={ choose === option.LAB_WAREHOUSE ? 'contained' : 'text' }>Lab Warehouse</Button>
                        <Button onClick={ () => handleChangeOption( 'ORDER_MANAGEMENT' ) } sx={ { width: '100%', height: 40, borderRadius: 0 } } variant={ choose === option.ORDER_MANAGEMENT ? 'contained' : 'text' }>Order Management</Button>
                        <Button onClick={ () => handleChangeOption( 'SUPPORT_REQUEST' ) } sx={ { width: '100%', height: 40, borderRadius: 0 } } variant={ choose === option.SUPPORT_REQUEST ? 'contained' : 'text' }>Support Request</Button>
                        <Button onClick={ () => handleChangeOption( 'ORDER_HISTORY' ) } sx={ { width: '100%', height: 40, borderRadius: 0 } } variant={ choose === option.ORDER_HISTORY ? 'contained' : 'text' }>Order History</Button>
                    </Stack>
                </Grid>
                <Grid size={ 9 } >
                    {
                        choose === option.LAB_WAREHOUSE && <Typography>Lab Warehouse</Typography>
                    }
                    {
                        choose === option.ORDER_MANAGEMENT && <Typography>Order Management</Typography>
                    }
                    {
                        choose === option.SUPPORT_REQUEST && <Typography>Support Request</Typography>
                    }
                    {
                        choose === option.ORDER_HISTORY && <Typography>Order History</Typography>
                    }
                </Grid>
            </Grid>
        </Box >
    )
}

export default ProfilePage