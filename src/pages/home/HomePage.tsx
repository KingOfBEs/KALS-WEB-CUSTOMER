import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded'
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ClassIcon from '@mui/icons-material/Class';
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Img } from 'react-image'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'
import { HEADER } from '../../utils/config'

type Props = {}

function Item ( props: any )
{
    const theme = useTheme();
    return (
        <Box sx={ {
            height: 400,
            p: 5
        } }>
            <Grid container spacing={ 2 } sx={ { height: '100%' } }>
                <Grid size={ 3 }>
                    <Img
                        style={ {
                            width: '100%',
                            objectFit: 'contain',
                        } }
                        src="https://scontent.cdninstagram.com/v/t51.2885-15/325517689_1432614067145941_2149811090190374791_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=18de74&_nc_ohc=0JMe1lmJoy8Q7kNvgG795ce&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AYDUC4r9JbWttNKb917N3etYiXyCtcYZ10JRp_ctH2f9Tg&oe=670CE8FC"
                        alt=""
                    />
                </Grid>
                <Grid size={ 3 }>
                    <Img
                        style={ {
                            width: '100%',
                            objectFit: 'contain',
                        } }
                        src="https://scontent.cdninstagram.com/v/t51.2885-15/322974598_865134084729851_3002222174973748784_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=18de74&_nc_ohc=fHmcph__z_0Q7kNvgGWgwpa&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AYDWGbrr23HCVIs6UdT_oeJxVACogvT7PrNLyb45CHlpCw&oe=670CF242"
                        alt=""
                    />
                </Grid>
                <Grid size={ 3 }>
                    <Img
                        style={ {
                            width: '100%',
                            objectFit: 'contain',
                        } }
                        src="https://scontent.cdninstagram.com/v/t51.2885-15/324387184_105295949124697_830866568474708490_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=18de74&_nc_ohc=9H3fnodyOK8Q7kNvgFcRSlD&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AYDo4K5T2cJ1Aqo5U-eybcXHUSJQc5fXlj_D7Cu_V2E4Ug&oe=670CD15C"
                        alt=""
                    />
                </Grid>
                <Grid size={ 3 }>
                    <Img
                        style={ {
                            width: '100%',
                            objectFit: 'contain',
                        } }
                        src="https://scontent.cdninstagram.com/v/t51.2885-15/323819023_503586348585154_6315675553589825626_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=18de74&_nc_ohc=Frgyr8IIUQkQ7kNvgG1Su6U&_nc_ht=scontent.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AYBEBbdIN0z7ahdvHdOCEIkAKYd3ZToZ46Hxmtw-AxsRbw&oe=670CD2C7"
                        alt=""
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
const HomePage = ( props: Props ) =>
{
    const theme = useTheme();
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Box>
            <Grid container spacing={ 2 } sx={ {
                bgcolor: theme.palette.secondary.main,
                height: `calc(100vh - ${ HEADER.MAIN_DESKTOP_HEIGHT }px)`,
            } }>
                <Grid size={ 4 } >
                    <Stack spacing={ 0 } sx={ {
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        ml: 4
                    } }>
                        <Box>
                            <Typography variant='h3'>Play Like an Engineer</Typography>
                            <Typography variant='body1'>Build a new toy. Hack a robot. Years of learning and fun with Mark Rober!</Typography>
                            <Box>
                                <Button to={ '/shop' } component={ Link } sx={ { mt: 2, borderRadius: 0, width: '100%', height: 80, fontSize: 24 } } variant='contained' color='primary' endIcon={ <ArrowCircleRightRoundedIcon /> } >Explore products</Button>
                            </Box>
                        </Box>
                    </Stack>
                </Grid>
                <Grid size={ 8 } sx={ {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                } }>
                    <Img
                        style={ {
                            height: '500px',
                            objectFit: 'contain',
                        } }
                        src="https://www.cnx-software.com/wp-content/uploads/2019/09/Piper-Computer-2.jpg"
                        alt=""
                    />
                </Grid>
            </Grid>
            <Box sx={ { bgcolor: 'white', height: 420 } } >
                <Box sx={ { width: '100%', display: 'flex', justifyContent: 'center', mt: 3 } }>
                    <Typography variant='h4' color={ theme.palette.primary.main } sx={ { fontWeight: 500 } }>How CrunchLabs Work</Typography>
                </Box>
                <Grid container spacing={ 20 } sx={ {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: 15,
                    mt: 3
                } }>
                    <Grid size={ 4 } sx={ {
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '100%',
                        gap: 1
                    } }>
                        <BuildCircleIcon sx={ {
                            fontSize: 50,
                            color: theme.palette.primary.main
                        } } />
                        <Typography variant='h5' color={ theme.palette.primary.main } >STEM Kit</Typography>
                        <Typography variant='body1' align='center' color={ theme.palette.primary.main } >Choose from our Build Box, Hack Pack, or Merch & Extras.</Typography>
                        <Img
                            style={ {
                                width: '70%',
                                objectFit: 'contain',
                            } }
                            src="https://cdn.shopify.com/s/files/1/0634/1535/3575/files/CrunchLabs_HIW_01.png"
                        />
                    </Grid>
                    <Grid size={ 4 } sx={ {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        gap: 1
                    } }>
                        <ClassIcon sx={ {
                            fontSize: 50,
                            color: theme.palette.primary.main
                        } } />
                        <Typography variant='h5' color={ theme.palette.primary.main } >Attached Labs</Typography>
                        <Typography variant='body1' align='center' color={ theme.palette.primary.main } >Follow our step-by-step instructions to build and hack your toy.</Typography>
                        <Img
                            style={ {
                                width: '70%',
                                objectFit: 'contain',
                            } }
                            src="https://cdn.shopify.com/s/files/1/0634/1535/3575/files/CrunchLabs_HIW_02.png"
                        />
                    </Grid>
                    <Grid size={ 4 } sx={ {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        gap: 1
                    } }>
                        <ContactSupportIcon sx={ {
                            fontSize: 50,
                            color: theme.palette.primary.main
                        } } />
                        <Typography variant='h5' color={ theme.palette.primary.main } >Support clearly</Typography>
                        <Typography variant='body1' align='center' color={ theme.palette.primary.main } >Play with your new toy and learn about the science behind it.</Typography>
                        <Img
                            style={ {
                                width: '70%',
                                objectFit: 'contain',
                            } }
                            src="https://cdn.shopify.com/s/files/1/0634/1535/3575/files/CrunchLabs_HIW_03.png"
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={ {
                bgcolor: theme.palette.primary.main,
                height: 500,
                px: 12,
                pt: 3
            } } >
                <Grid container spacing={ 5 } sx={ { height: '100%' } }>
                    <Grid size={ 7 }>
                        <Stack spacing={ 3 }>
                            <Typography align='left' color='white' variant='h4'>"Thinking like an engineer means you're resilient. It's getting back up after being knocked down and approaching things differently. That determination helps kids tackle everyday challenges and it's the same determination that puts rovers on other dang planets!"</Typography>
                            <Typography color='white' variant='body1'>
                                - Khoa Ta<br />
                                Founder of CrunchLabs, NASA engineer for the Curiosity Mars Rover,
                                public enemy #1 of neighborhood squirrels,
                                & creator of the sparkliest glitter bomb pranks
                            </Typography>
                            <Button to={ '/about' } component={ Link } variant='contained' color='secondary' sx={ { bgcolor: theme.palette.secondary.main, borderRadius: 0, height: 60, width: 300, fontSize: 23 } }>About us</Button>
                        </Stack>
                    </Grid>
                    <Grid size={ 5 }>
                        <Box sx={ { height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' } }>
                            <Img
                                style={ {
                                    height: '450px',
                                    objectFit: 'contain',
                                } }
                                src="https://firebasestorage.googleapis.com/v0/b/stemlab-customer.appspot.com/o/images%2Fz5856138321375_0ab7a5bf2221dffda6e3121b83282180-removebg-preview.png?alt=media&token=db74ee68-fb27-4c7b-a187-dd16d544ba7b"
                                alt="khoa-ta"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={ { bgcolor: 'white', height: 100 } } >
                <Grid container spacing={ 2 } sx={ { height: '100%' } }>
                    <Grid size={ 7 } sx={ {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    } }>
                        <Stack spacing={ 2 } >
                            <Typography variant='h5' color={ theme.palette.primary.main } >
                                Empowering Future Innovators with Hands-On STEM Learning!
                            </Typography>
                            <Typography to={ '/login' } component={ Link } variant='body1' color={ theme.palette.primary.main } >
                                Register now for sale 20%
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid size={ 5 } sx={ {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    } }>
                        <Button to={ '/login' } component={ Link } variant='outlined' sx={ { borderRadius: 0, height: 50, width: 250, fontSize: 18 } }>Register now</Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={ {
                bgcolor: '#fed103',
                height: 450,
                px: 3,
                pt: 2
            } } >
                <Carousel
                    animation='slide'
                    indicators={ false }
                    height={ 400 }
                >
                    {
                        items.map( ( item, i ) => <Item key={ i } item={ item } /> )
                    }
                </Carousel>
            </Box>
        </Box>
    )
}

export default HomePage