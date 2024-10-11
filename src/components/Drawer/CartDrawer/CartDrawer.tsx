import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { cartApi } from '../../../apis/cart.api';
import { CartItem } from '../../../types/cart.type';
import CartItemCard from '../../CartItemCard/CartItemCard';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Props {
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const CartDrawer: React.FC<Props> = ({ toggleDrawer }: Props) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate(); // Initialize the navigate function

    const { data: cart } = useQuery({
        queryKey: ['cart'],
        queryFn: () => cartApi.get(),
        select: (data) => data.data
    });

    const handleDeleteCartItem = async (productId: string) => {
        await cartApi.deleteCartItem({ productId })
            .then((res) => {
                if (res.status === 200) {
                    queryClient.invalidateQueries({ queryKey: ['cart'] });
                }
            });
    };

    const handleNavigateToCart = () => {
        navigate('/your-cart'); // Navigate to the Your Cart page
    };

    return (
        <Box sx={{ width: 450, height: '100vh', display: 'flex', flexDirection: 'column' }} role="presentation">
            <Typography sx={{ ml: 3, mt: 2 }} variant='h6'>Your Cart({cart?.length})</Typography>
            {
                cart?.length !== 0 &&
                cart?.map((item: CartItem) => (
                    <Fragment key={item.productId}>
                        <CartItemCard item={item} handleDeleteCartItem={handleDeleteCartItem} />
                        <Divider sx={{ mx: 3 }} />
                    </Fragment>
                ))
            }

            <Divider />
            <Box sx={{ mx: 3, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h6'>Total:</Typography>
                <Typography variant='h6'>${!cart?.length ? 0 : cart.reduce((total, item) => total + item.price * item.quantity, 0)}</Typography>
            </Box>
            <Button
                
                disabled={!cart?.length}
                onClick={handleNavigateToCart} // Navigate to cart page
                sx={{ mx: 3, mt: 2, height: 40 }}
                variant='contained'
                color='primary'
            >
                Your Cart
            </Button>
            <Button disabled={!cart?.length} onClick={toggleDrawer(false)} sx={{ mx: 3, mt: 2, height: 40 }} variant='contained' color='primary'>Checkout</Button>
        </Box>
    );
};

export default CartDrawer;
