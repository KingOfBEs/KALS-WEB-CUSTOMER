import { Fragment } from 'react'
import CheckoutHeader from './header/CheckoutHeader'
import Grid from '@mui/material/Grid2'
import { Outlet } from 'react-router-dom'
import SideCart from './cart/SideCart'
import { Box } from '@mui/material'
import { HEADER } from '../../utils/config'

type Props = {}

const CheckoutLayout = ( props: Props ) =>
{
    return (
        <Fragment>
            <CheckoutHeader />
            <Grid container spacing={ 0 }>
                <Grid size={ { sm: 12, lg: 7 } }>
                    <Box sx={ {
                        ml: 25
                    } }>
                        <Outlet />
                    </Box>

                </Grid>
                <Grid size={ { sm: 12, lg: 5 } }>
                    <SideCart />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default CheckoutLayout