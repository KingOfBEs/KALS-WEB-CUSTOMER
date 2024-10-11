import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productApi from '../../apis/product.api';
import { ProductDetailResponse } from '../../types/product.type';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useCart } from '../../contexts/useCart';
import { useMutation } from '@tanstack/react-query';
import { cartApi } from '../../apis/cart.api';
import { CartItemRequest } from '../../types/cart.type';
import { useAuth } from '../../contexts/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toggleCartDrawer } = useCart();
  const { id } = useParams(); // Get the product ID from the route params

  const [productDetail, setProductDetail] = useState<ProductDetailResponse | null>(null);

  useEffect(() => {
    if (!id) {
      console.error('Product ID is missing');
      return;
    }

    const fetchProductDetail = async () => {
      try {
        const response = await productApi.getProductById(id);
        const productData = response.data;

        // Manually map the ProductResponse to ProductDetailResponse
        const productDetailData: ProductDetailResponse = {
          id: productData.id,
          name: productData.name,
          price: productData.price,
          categories: productData.categories,
          description: productData.description || 'No description available', // Provide a fallback if description is missing
        };

        setProductDetail(productDetailData);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      }
    };
    
    fetchProductDetail();
  }, [id]);

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

    if (productDetail) {
      await mutateAsync({ productId: productDetail.id, quantity: 1 });
    }
  };

  if (!productDetail) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <Box
      sx={{ border: 2, height: 430, width: '100%', borderRadius: 2, cursor: 'pointer' }}
      onClick={() => navigate(`/product/${productDetail.id}`)}
    >
      <Box sx={{ pt: 1 }}>
        <img
          style={{ objectFit: 'cover' }}
          height={220}
          width={'100%'}
          src={'https://www.crunchlabs.com/cdn/shop/files/Untitleddesign_d57d8055-deff-42bd-8b80-8bb47a91ff6d.png?v=1716312776'}
          alt={productDetail.name}
        />
      </Box>
      <Box sx={{ px: 2 }}>
        <Stack spacing={1}>
          <Typography variant='subtitle1'>
            {productDetail?.categories && productDetail.categories.length > 0 
              ? productDetail.categories.map(c => c.name).join(', ') 
              : 'Others'}
          </Typography>
          <Typography variant='h6'>{productDetail.name}</Typography>
          <Typography variant='body1'>${productDetail.price}</Typography>
          <Typography variant='body2'>{productDetail.description}</Typography>
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
