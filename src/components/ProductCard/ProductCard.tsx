import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {  Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ProductResponse } from '../../types/product.type'
import { useCart } from '../../contexts/useCart'
import { useMutation } from '@tanstack/react-query'
import { cartApi } from '../../apis/cart.api'
import { CartItemRequest } from '../../types/cart.type'
import { useAuth } from '../../contexts/useAuth'
import { useNavigate } from 'react-router-dom'
import ProductDetailPage from '../../pages/productDetail/ProductDetailPage'
import { toast } from 'react-toastify'

interface Props
{
    product: ProductResponse
}

const ProductCard: React.FC<Props> = ( { product }: Props ) =>
{
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const { toggleCartDrawer } = useCart();
    const { mutateAsync, isSuccess } = useMutation( {
        mutationFn: ( data: CartItemRequest ) => cartApi.create( data )
    } )

    const handleAddToCart = async ( event: React.MouseEvent | React.KeyboardEvent ) =>
    {
        if ( !isLoggedIn() )
        {
            navigate( '/login' )
            toast.info( 'Please login to add to cart' )
            return
        }
        await cartApi.create( { productId: product.id, quantity: 1 } )
            .then( ( res ) =>
            {
                if ( res.status === 200 )
                {
                    toast.success( 'Product added to cart' )
                    toggleCartDrawer( true )( event )
                }
            } )
    }
    const handleCardClick = () => {
  navigate(`/product/${product.id}`);    };
    
  
    return (
     

        <Card sx={{ border: 2, height: 430, width: '100%', borderRadius: 2, cursor: 'pointer' }}>
          <CardActionArea onClick={handleCardClick}>
            <CardMedia
              component="img"
              height="220"
              image="https://www.crunchlabs.com/cdn/shop/files/Untitleddesign_d57d8055-deff-42bd-8b80-8bb47a91ff6d.png?v=1716312776"
              alt={product.name}
              sx={{ objectFit: 'cover', width: '100%' }}
            />
          </CardActionArea>
          <CardContent sx={{ px: 2 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">
                {product.categories ? product.categories.map((c) => c.name).join(', ') : 'Others'}
              </Typography>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">${product.price}</Typography>
            </Stack>
            <Button onClick={handleAddToCart} variant="contained" sx={{ mt: 2, width: '100%' }}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
        
    );
}

export default ProductCard