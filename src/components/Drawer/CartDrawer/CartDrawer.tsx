import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';


interface Props
{
    toggleDrawer: ( open: boolean ) => ( event: React.KeyboardEvent | React.MouseEvent ) => void;
}

const CartDrawer: React.FC<Props> = ( { toggleDrawer }: Props ) =>
{
    return (
        <Box sx={ { width: 450, height: '100vh', display: 'flex', flexDirection: 'column' } } role="presentation" >
            <Typography sx={ { ml: 3, mt: 2 } } variant='h6'>Your Cart(4)</Typography>
            <Grid container sx={ { mx: 3, my: 2 } } spacing={ 2 }>
                <Grid size={ 3 }>
                    <img style={ { objectFit: 'cover' } } height={ 120 } width={ '100%' } src="https://www.crunchlabs.com/cdn/shop/files/preview_images/97fd59f272a44c32887a4920f79a1519.thumbnail.0000000000.jpg?v=1715981102&width=150" />
                </Grid>
                <Grid size={ 9 }>
                    <Typography sx={ { pt: 1 } } variant='h6'>Phat Gus Plush Toy</Typography>
                    <Typography variant='button' sx={ { fontSize: 11, borderBottom: 1, borderColor: 'red', ":hover": { cursor: 'pointer' } } }>Remove</Typography>
                </Grid>
                <Grid size={ 3 } sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                } }>
                    <Typography variant='subtitle2'>$30.00</Typography>
                </Grid>
                <Grid size={ 9 } sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                } }>
                    <TextField size='small' id="outlined-basic" hiddenLabel variant="outlined"
                        slotProps={ {
                            input: {
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton>
                                            <AddCircleIcon color='primary' />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <IconButton>
                                            <RemoveCircleIcon color='primary' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        } }
                        sx={ {
                            width: '150px',
                            height: '30px', // Adjust the height as needed
                            borderRadius: '15px', // Make the corners rounded
                            '& .MuiOutlinedInput-root': {
                                height: '30px', // Adjust the height of the input field
                                borderRadius: '15px', // Make the corners rounded
                            },
                            '& .css-fzxhed-MuiInputBase-root-MuiOutlinedInput-root': {
                                paddingX: '0px', // Adjust the padding as needed
                            },
                            '& .MuiOutlinedInput-input': {
                                textAlign: 'center', // Center the text inside the input
                                padding: 0, // Adjust padding if needed to fully center the text
                            },
                        } }
                    />
                    <Typography variant='subtitle1'>$120.00</Typography>
                </Grid>
            </Grid>
            <Divider sx={ { mx: 3 } } />
            <Grid container sx={ { mx: 3, my: 2 } } spacing={ 2 }>
                <Grid size={ 3 }>
                    <img style={ { objectFit: 'cover' } } height={ 120 } width={ '100%' } src="https://www.crunchlabs.com/cdn/shop/files/preview_images/97fd59f272a44c32887a4920f79a1519.thumbnail.0000000000.jpg?v=1715981102&width=150" />
                </Grid>
                <Grid size={ 9 }>
                    <Typography sx={ { pt: 1 } } variant='h6'>Phat Gus Plush Toy</Typography>
                    <Typography variant='button' sx={ { fontSize: 11, borderBottom: 1, borderColor: 'red', ":hover": { cursor: 'pointer' } } }>Remove</Typography>
                </Grid>
                <Grid size={ 3 } sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                } }>
                    <Typography variant='subtitle2'>$30.00</Typography>
                </Grid>
                <Grid size={ 9 } sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                } }>
                    <TextField size='small' id="outlined-basic" hiddenLabel variant="outlined"
                        slotProps={ {
                            input: {
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton>
                                            <AddCircleIcon color='primary' />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <IconButton>
                                            <RemoveCircleIcon color='primary' />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        } }
                        sx={ {
                            width: '150px',
                            height: '30px', // Adjust the height as needed
                            borderRadius: '15px', // Make the corners rounded
                            '& .MuiOutlinedInput-root': {
                                height: '30px', // Adjust the height of the input field
                                borderRadius: '15px', // Make the corners rounded
                            },
                            '& .css-fzxhed-MuiInputBase-root-MuiOutlinedInput-root': {
                                paddingX: '0px', // Adjust the padding as needed
                            },
                            '& .MuiOutlinedInput-input': {
                                textAlign: 'center', // Center the text inside the input
                                padding: 0, // Adjust padding if needed to fully center the text
                            },
                        } }
                    />
                    <Typography variant='subtitle1'>$120.00</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Box sx={ { mx: 3, mt: 2, display: 'flex', justifyContent: 'space-between' } }>
                <Typography variant='h6'>Total:</Typography>
                <Typography variant='h6'>$120.00</Typography>
            </Box>
            <Button sx={ { mx: 3, mt: 2, height: 40 } } variant='contained' color='primary'>Checkout</Button>
        </Box>
    )
}

export default CartDrawer