import Box from '@mui/material/Box'
import React from 'react'
import { HEADER } from '../../../utils/config'
import { Link } from 'react-router-dom'

type Props = {}

const CheckoutHeader = ( props: Props ) =>
{
    return (
        <Box sx={ {
            bgcolor: 'white',
            color: 'text.primary',
            borderBottom: 1,
            borderColor: '#e5e5eb',
            width: '100%',
            height: HEADER.MAIN_DESKTOP_HEIGHT,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } }>
            <Link to={ '/' } style={ { textDecoration: 'none', marginTop: "8px" } }>
                <img src="https://www.crunchlabs.com/cdn/shop/files/dark-logo.svg?v=1676481560&width=500" />
            </Link>
        </Box>
    )
}

export default CheckoutHeader