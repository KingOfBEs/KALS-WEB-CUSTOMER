import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { CartItem } from '../../types/cart.type';
import { cartApi } from '../../apis/cart.api';

interface Props {
    item: CartItem;
    handleDeleteCartItem: (productId: string) => void;
}

const CartItemPage = ({ item, handleDeleteCartItem }: Props) => {
    const queryClient = useQueryClient();

    const handleChangeQuantity = async (newQuantity: number) => {
        if (newQuantity < 1) return; // Prevent invalid quantity

        await cartApi.updateCart({ productId: item.productId, quantity: newQuantity }).then((res) => {
            if (res.status === 200) {
                queryClient.invalidateQueries({ queryKey: ['cart'] });
            }
        });
    };

    const handleIncrement = () => {
        handleChangeQuantity(item.quantity + 1);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            handleChangeQuantity(item.quantity - 1);
        }
    };

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 0) {
            handleChangeQuantity(value);
        }
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '30vh',  // Make the container cover the full viewport height
                width: '60vw',    // Make the container cover the full viewport width
                overflow: 'auto',   // Handle overflow
            }}
        >
            <Box 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    my: 2, 
                    p: 2, 
                    borderBottom: '1px solid #ccc', 
                    width: '100%', 
                    height: '120px',  // Set a fixed height for uniformity
                }}
            >
                <Box sx={{ width: '120px', height: '120px', marginRight: 2 }}>
                    <img
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
                        src="https://www.crunchlabs.com/cdn/shop/files/preview_images/97fd59f272a44c32887a4920f79a1519.thumbnail.0000000000.jpg?v=1715981102&width=150"
                        alt={item.name} 
                    />
                </Box>

                <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 2, minWidth: '120px' }}>
                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                    </Typography>
                    <Typography variant="subtitle2">
                        ${item.price.toFixed(2)}
                    </Typography>
                </Box>

                <TextField
                    value={item.quantity}
                    onChange={handleTextFieldChange}
                    size="small"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleIncrement}>
                                    <AddCircleIcon color="primary" />
                                </IconButton>
                            </InputAdornment>
                        ),
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={handleDecrement} disabled={item.quantity === 1}>
                                    <RemoveCircleIcon color={item.quantity === 1 ? 'disabled' : 'primary'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: '120px',
                        height: '40px',  // Adjust height for consistency
                        borderRadius: '15px',
                        '& .MuiOutlinedInput-root': {
                            height: '40px',
                            borderRadius: '15px',
                            paddingX: '0px',
                        },
                        '& .MuiOutlinedInput-input': {
                            textAlign: 'center',
                            padding: 0,
                        },
                        marginLeft: 0,
                        marginRight: 2, // Added margin to separate from total price
                    }}
                />
                <Typography variant="subtitle1" sx={{ marginLeft: 2, marginRight: 2 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                </Typography>
                <Typography
                    variant="button"
                    sx={{ 
                        fontSize: 11, 
                        borderBottom: 1, 
                        borderColor: 'red', 
                        ':hover': { cursor: 'pointer' },
                        marginLeft: 2 // Added margin for spacing
                    }}
                    onClick={() => handleDeleteCartItem(item.productId)}
                >
                    Remove
                </Typography>
            </Box>
        </Box>
    );
};

export default CartItemPage;
