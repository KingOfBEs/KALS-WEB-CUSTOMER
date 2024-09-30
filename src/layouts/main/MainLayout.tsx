import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { HEADER } from '../../utils/config'
import MainFooter from './footer/MainFooter'
import MainHeader from './header/MainHeader'

type Props = {}

const MainLayout = ( props: Props ) =>
{

    return (
        <>
            <MainHeader />
            <Box sx={ { height: HEADER.MAIN_DESKTOP_HEIGHT } } />
            <Box sx={ {
                marginX: {
                    xs: 2,
                    sm: 5,
                    md: 10,
                    lg: 15,
                },
                paddingTop: 2,
                paddingBottom: 8,
            } }>
                <Outlet />
            </Box>
            <MainFooter />
        </>
    )
}

export default MainLayout