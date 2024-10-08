import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCart } from '../../contexts/useCart';
import { useMutation } from '@tanstack/react-query';
import { cartApi } from '../../apis/cart.api';
import { CartItemRequest } from '../../types/cart.type';
import { useAuth } from '../../contexts/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductDetailResponse } from '../../types/product.type';

interface Props {
    productDetail: ProductDetailResponse;
}

const ProductDetailPage: React.FC<Props> = ({ productDetail }: Props) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { toggleCartDrawer } = useCart();
    
    const { mutateAsync } = useMutation({
        mutationFn: (data: CartItemRequest) => cartApi.create(data),
        onSuccess: (res) => {
            if (res.status === 200) {
                toast.success('Product added to cart');
                toggleCartDrawer(true); // Open the cart drawer
            }
        },
        onError: () => {
            toast.error('Failed to add product to cart. Please try again.');
        }
    });

    const handleAddToCart = async (event: React.MouseEvent | React.KeyboardEvent) => {
        if (!isLoggedIn()) {
            navigate('/login');
            toast.info('Please login to add to cart');
            return;
        }
        
        await mutateAsync({ productId: productDetail.id, quantity: 1 });
    };

    return (
        <Box
            sx={{ border: 2, height: 430, width: '100%', borderRadius: 2, cursor: 'pointer' }}
            onClick={() => navigate(`/product/${productDetail.id}`)} // Navigate to product detail on click
        >
            <Box sx={{ pt: 1 }}>
                <img
                    style={{ objectFit: 'cover' }}
                    height={220}
                    width={'100%'}
                    src={'https://www.crunchlabs.com/cdn/shop/files/Untitleddesign_d57d8055-deff-42bd-8b80-8bb47a91ff6d.png?v=1716312776'} 
                    alt={"LE Duc nam"} 
                />
            </Box>
            <Box sx={{ px: 2 }}>
                <Stack spacing={1}>
                    {/* <Typography variant='subtitle1'>
                        {productDetail.categories.length > 0 ? productDetail.categories.map((c) => c.name).join(', ') : 'Others'}
                    </Typography> */}
                    <Typography variant='h6'>{"LE Duc nam"}</Typography>
                    <Typography variant='body1'>${5000}</Typography>
                </Stack>
                <Button
                    onClick={handleAddToCart}
                    variant='contained'
                    sx={{ mt: 2, width: '100%' }}
                >
                    Add to Cart
                </Button>
            </Box>
        </Box>
    );
};

export default ProductDetailPage;
