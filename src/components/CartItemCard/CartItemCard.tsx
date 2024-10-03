import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { cartApi } from '../../apis/cart.api';
import { CartItem } from '../../types/cart.type';

interface Props
{
    item: CartItem;
    handleDeleteCartItem: ( productId: string ) => void;
}

const CartItemCard = ( { item, handleDeleteCartItem }: Props ) =>
{
    const queryClient = useQueryClient();

    const handleChangeQuantity = async ( newQuantity: number ) =>
    {
        if ( newQuantity < 1 ) return; // Prevent invalid quantity

        await cartApi.updateCart( { productId: item.productId, quantity: newQuantity } )
            .then( ( res ) =>
            {
                if ( res.status === 200 )
                {
                    queryClient.invalidateQueries( { queryKey: [ 'cart' ] } );
                }
            } );
    };

    const handleIncrement = () =>
    {
        handleChangeQuantity( item.quantity + 1 );
    };

    const handleDecrement = () =>
    {
        if ( item.quantity > 1 )
        {
            handleChangeQuantity( item.quantity - 1 );
        }
    };

    const handleTextFieldChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        const value = parseInt( e.target.value, 10 );
        if ( !isNaN( value ) && value > 0 )
        {
            handleChangeQuantity( value );
        }
    };

    return (
        <Grid container sx={ { mx: 3, my: 2 } } spacing={ 2 }>
            <Grid size={ 3 }>
                <img
                    style={ { objectFit: 'cover' } }
                    height={ 120 }
                    width={ '100%' }
                    src="https://www.crunchlabs.com/cdn/shop/files/preview_images/97fd59f272a44c32887a4920f79a1519.thumbnail.0000000000.jpg?v=1715981102&width=150"
                />
            </Grid>
            <Grid size={ 9 }>
                <Typography sx={ { pt: 1 } } variant="h6">
                    { item.name }
                </Typography>
                <Typography
                    variant="button"
                    sx={ { fontSize: 11, borderBottom: 1, borderColor: 'red', ':hover': { cursor: 'pointer' } } }
                    onClick={ () => handleDeleteCartItem( item.productId ) }
                >
                    Remove
                </Typography>
            </Grid>
            <Grid
                size={ 3 }
                sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                } }
            >
                <Typography variant="subtitle2">${ item.price }</Typography>
            </Grid>
            <Grid
                size={ 9 }
                sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                } }
            >
                <TextField
                    value={ item.quantity }
                    onChange={ handleTextFieldChange }
                    size="small"
                    variant="outlined"
                    InputProps={ {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={ handleIncrement }>
                                    <AddCircleIcon color="primary" />
                                </IconButton>
                            </InputAdornment>
                        ),
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={ handleDecrement } disabled={ item.quantity === 1 }>
                                    <RemoveCircleIcon color={ item.quantity === 1 ? 'disabled' : 'primary' } />
                                </IconButton>
                            </InputAdornment>
                        ),
                    } }
                    sx={ {
                        width: '150px',
                        height: '30px',
                        borderRadius: '15px',
                        '& .MuiOutlinedInput-root': {
                            height: '30px',
                            borderRadius: '15px',
                            paddingX: '0px',
                        },
                        '& .MuiOutlinedInput-input': {
                            textAlign: 'center',
                            padding: 0,
                        },
                    } }
                />
                <Typography variant="subtitle1">${ item.price * item.quantity }</Typography>
            </Grid>
        </Grid>
    );
};

export default CartItemCard;
