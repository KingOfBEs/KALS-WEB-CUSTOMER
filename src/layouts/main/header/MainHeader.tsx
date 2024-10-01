import { HEADER } from '../../../utils/config'
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import { BadgeProps } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid2';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Fragment, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CartDrawer from '../../../components/Drawer/CartDrawer/CartDrawer';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/useAuth';

const StyledBadge = styled( Badge )<BadgeProps>( ( { theme } ) => ( {
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${ theme.palette.background.paper }`,
    padding: '0 4px',
  },
} ) );

type Props = {}

const MainHeader = ( props: Props ) =>
{
  const { isLoggedIn } = useAuth();
  const [ drawerMenuOpen, setDrawerMenuOpen ] = useState( false );
  const [ drawerCartOpen, setDrawerCartOpen ] = useState( false );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery( theme.breakpoints.down( 'lg' ) );

  const toggleMenuDrawer = ( open: boolean ) => () =>
  {
    setDrawerMenuOpen( open );
  };

  const toggleCartDrawer = ( open: boolean ) => () =>
  {
    setDrawerCartOpen( open );
  };


  const navigationLinks = [ 'Home', 'Shop', 'About us' ];
  return (
    <Box sx={ {
      bgcolor: 'white',
      color: 'text.primary',
      borderBottom: 1,
      borderColor: '#e5e5eb',
      width: '100%',
      height: HEADER.MAIN_DESKTOP_HEIGHT,
      position: 'fixed',
      zIndex: 50,
      paddingX: {
        xs: 2,
        sm: 5,
        md: 10,
        lg: 15,
      },
    } }>
      <Grid container spacing={ { xs: 0, sm: 1, md: 2 } } sx={ { height: '100%' } }>
        <Grid container size="grow" sx={ {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center ',
          textAlign: 'center',
        } }
          spacing={ { xs: 0, sm: 1, md: 2 } }
        >
          {
            isSmallScreen ? (
              <Grid size={ 12 } >
                <IconButton onClick={ toggleMenuDrawer( true ) }
                  sx={ {
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center ',
                    textAlign: 'center',
                  } }>
                  <MenuIcon />
                </IconButton>
              </Grid>
            ) : (
              <Fragment>
                <Grid size={ 3 } >
                  <Link to={ '/' } style={ { textDecoration: 'none', color: 'black' } }>
                    <Typography variant="h6" sx={ { flexGrow: 1 } }>Home</Typography>
                  </Link>
                </Grid>
                <Grid size={ 3 }>
                  <Typography variant="h6" sx={ { flexGrow: 1 } }>Shop</Typography>
                </Grid>
                <Grid size={ 6 }>
                  <Typography variant="h6" sx={ { flexGrow: 1 } }>About us</Typography>
                </Grid>
              </Fragment>
            )
          }
        </Grid>
        <Grid size={ 6 } sx={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        } }>
          <img src="https://www.crunchlabs.com/cdn/shop/files/dark-logo.svg?v=1676481560&width=500" />
        </Grid>
        <Grid size="grow" sx={ {
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        } }>
          <Link to={ isLoggedIn() ? '/profile' : '/login' } style={ { textDecoration: 'none' } }>
            <IconButton aria-label="account">
              <AccountCircleIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="cart" onClick={ toggleCartDrawer( true ) }>
            <StyledBadge badgeContent={ 4 } color="primary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Grid>
      </Grid>
      <Drawer anchor="left" open={ drawerMenuOpen } onClose={ toggleMenuDrawer( false ) }>
        <List sx={ { width: 250 } }>
          { navigationLinks.map( ( text, index ) => (
            <ListItem key={ index } disablePadding>
              <ListItemButton>
                <ListItemText primary={ text } />
              </ListItemButton>
            </ListItem>
          ) ) }
        </List>
      </Drawer>
      <Drawer anchor="right" open={ drawerCartOpen } onClose={ toggleCartDrawer( false ) }>
        <CartDrawer toggleDrawer={ toggleCartDrawer } />
      </Drawer>
    </Box>
  )
}

export default MainHeader