import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment } from 'react';
import { cartApi } from '../../apis/cart.api';
import { CartItem} from '../../types/cart.type';
import CartItemCard from '../../components/CartItemCard/CartItemCard';
import CartDrawer from '../../components/Drawer/CartDrawer/CartDrawer';
import { useNavigate } from 'react-router-dom';
import CartItemPage from '../../components/CartItemCard/CartItemPage';

  const CartPage = () => {
    const queryClient = useQueryClient();
  
    const { data: cart } = useQuery({
      queryKey: ['cart'],
      queryFn: () => cartApi.get(),
      select: (data) => data.data,
    });
  
    const handleDeleteCartItem = async (productId: string) => {
      await cartApi.deleteCartItem({ productId }).then((res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries({ queryKey: ['cart'] });
        }
      });
    };
  
    return (
        
      <Box sx={{ width: 450, minHeight: '100vh', display: 'flex', flexDirection: 'column' }} role="presentation">
        <Typography sx={{ ml: 3, mt: 2 }} variant="h6">
          Your Cart ({cart?.length})
        </Typography>
        {cart?.length !== 0 &&
          cart?.map((item: CartItem) => (
            <Fragment key={item.productId}>
              <CartItemPage item={item} handleDeleteCartItem={handleDeleteCartItem} />
              <Divider sx={{ mx: 3 }} />
            </Fragment>
          ))}
  
        <Divider />
        <Box sx={{ mx: 3, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">
            ${!cart?.length ? 0 : cart.reduce((total, item) => total + item.price * item.quantity, 0)}
          </Typography>
        </Box>
  
        <Button
          disabled={!cart?.length}
          sx={{ mx: 3, mt: 2, height: 40 }}
          variant="contained"
          color="primary"
        >
          Checkout
        </Button>
      </Box>
    );
  };
  
  export default CartPage;