import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { HEADER } from '../../utils/config'
import MainFooter from './footer/MainFooter'
import MainHeader from './header/MainHeader'
import { Fragment } from 'react'

type Props = {}

const MainLayout = ( props: Props ) =>
{

    return (
        <Fragment>
            <MainHeader />
            <Box sx={ { height: HEADER.MAIN_DESKTOP_HEIGHT } } />
            <Outlet />
            <MainFooter />
        </Fragment>
    )
}

export default MainLayout