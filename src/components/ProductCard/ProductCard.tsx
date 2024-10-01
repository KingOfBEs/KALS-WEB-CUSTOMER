import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ProductResponse } from '../../types/product.type'

interface Props
{
    product: ProductResponse
}

const ProductCard: React.FC<Props> = ( { product }: Props ) =>
{
    return (
        <Box sx={ { border: 2, height: 430, width: '100%', borderRadius: 2 } } >
            <Box sx={ { pt: 1 } }>
                <img style={ { objectFit: 'cover' } } height={ 220 } width={ '100%' } src="https://www.crunchlabs.com/cdn/shop/files/Untitleddesign_d57d8055-deff-42bd-8b80-8bb47a91ff6d.png?v=1716312776" />
            </Box>
            <Box sx={ { px: 2 } }>
                <Stack spacing={ 1 }>
                    <Typography variant='subtitle1'>{ product.categories ? product.categories.map( c => c.name ).join( "," ) : "Others" }</Typography>
                    <Typography variant='h6'>{ product.name }</Typography>
                    <Typography variant='body1' >${ product.price }</Typography>
                </Stack>
                <Button variant='contained' sx={ { mt: 2, width: '100%' } } >Add to Cart</Button>
            </Box>
        </Box>
    )
}

export default ProductCard