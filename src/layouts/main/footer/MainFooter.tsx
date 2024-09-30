import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import { FOOTER } from '../../../utils/config';

type Props = {}

const MainFooter = ( props: Props ) =>
{
  return (
    <Box sx={ {
      bgcolor: '#00416c',
      minHeight: FOOTER.MAIN_DESKTOP_HEIGHT,
    } }>
      <Grid container spacing={ { xs: 2, sm: 3, md: 10 } } sx={ {
        marginX: { xs: 2, sm: 5, md: 15 },
        paddingTop: 5,
      } }>
        <Grid size={ { xs: 12, md: 4 } }>
          <Typography variant='h6' color='white' > <span style={ { color: '#fed103' } }>Join our community</span> of builders, hackers, and thinkers! You’ll be the first to know about new videos, products, and deals - don’t miss out.</Typography>
          <input type='text' placeholder='Enter your email' style={ { width: '50%', height: 50, marginTop: 10, borderRadius: 5, padding: 10 } } />
        </Grid>
        <Grid container size={ { xs: 12, md: 8 } }>
          <Grid size={ { xs: 6, md: 4 } }>
            <Stack spacing={ 2 }>
              <Typography variant='h6' color='white' >Contact us</Typography>
              <Typography variant='body2' color='white' sx={ {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              } } ><MailOutlineSharpIcon /> help@crunchlabs.com</Typography>
              <Typography variant='body2' color='white' sx={ {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              } } > <PhoneInTalkOutlinedIcon /> 650-267-2473</Typography>
              <Typography variant='h6' color='white' >Our Company</Typography>
              <Typography variant='body2' color='white' >About Us</Typography>
              <Typography variant='body2' color='white' >FAQs</Typography>
              <Typography variant='body2' color='white' >Build Box Reviews</Typography>
              <Typography variant='body2' color='white' >Hack Pack Reviews</Typography>
              <Typography variant='body2' color='white' >Careers</Typography>
              <Typography variant='body2' color='white' >Press</Typography>
            </Stack>
          </Grid>
          <Grid size={ { xs: 6, md: 4 } }>
            <Stack spacing={ 2 }>
              <Typography variant='h6' color='white' >Products</Typography>
              <Typography variant='body2' color='white' >Build Box</Typography>
              <Typography variant='body2' color='white' >Hack Pack</Typography>
              <Typography variant='body2' color='white' >Merch & Extras</Typography>
              <Typography variant='body2' color='white' >Replacement Parts</Typography>
              <Typography variant='body2' color='white' >Give a Gift: Build Box</Typography>
              <Typography variant='body2' color='white' >Give a Gift: Hack Pack</Typography>
              <Typography variant='h6' color='white' >Contact us</Typography>
              <Typography variant='body2' color='white' >Educators (Bulk Orders)</Typography>
              <Typography variant='body2' color='white' >Class CrunchLabs</Typography>
              <Typography variant='body2' color='white' >Referral Program</Typography>
              <Typography variant='body2' color='white' >Affiliate Program</Typography>
              <Typography variant='body2' color='white' >Sponsor a Future Engineer</Typography>
            </Stack>
          </Grid>
          <Grid size={ { xs: 6, md: 4 } }>
            <Stack spacing={ 2 }>
              <Typography variant='h6' color='white' >Bonus</Typography>
              <Typography variant='body2' color='white' >Videos</Typography>
              <Typography variant='body2' color='white' >Roblox</Typography>
              <Typography variant='body2' color='white' >International</Typography>
              <Typography variant='body2' color='white' >Camp CrunchLabs</Typography>
              <Typography variant='h6' color='white' >Legal & Policies</Typography>
              <Typography variant='body2' color='white' >Terms & Conditions</Typography>
              <Typography variant='body2' color='white' >Privacy Notice</Typography>
              <Typography variant='body2' color='white' >Accessibility</Typography>
              <Typography variant='body2' color='white' >Other Policies</Typography>
              <Typography variant='body2' color='white' >Do Not Share or Sell My Personal Data</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant='caption' color='white' sx={ {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 2,
      } }>© 2024 CrunchLabs. All rights reserved.</Typography>
    </Box>
  )
}

export default MainFooter