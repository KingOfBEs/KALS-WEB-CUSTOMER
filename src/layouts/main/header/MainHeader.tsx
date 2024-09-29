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
      paddingX: 10,
    } }>
      <Grid container spacing={ 2 } sx={ { height: '100%' } }>
        <Grid container size="grow" sx={ {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center ',
          textAlign: 'center',
        } }>
          <Grid size={ 4 } >
            <Typography variant="h6" sx={ { flexGrow: 1 } }>Home</Typography>
          </Grid>
          <Grid size={ 4 }>
            <Typography variant="h6" sx={ { flexGrow: 1 } }>Shop</Typography>
          </Grid>
          <Grid size={ 4 }>
            <Typography variant="h6" sx={ { flexGrow: 1 } }>About us</Typography>
          </Grid>
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
          <IconButton aria-label="account">
            <AccountCircleIcon />
          </IconButton>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={ 4 } color="primary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainHeader