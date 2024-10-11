import { Divider, Stack, Typography, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import { cartApi } from '../../../apis/cart.api'
import { useQuery } from '@tanstack/react-query'
import { CartItem } from '../../../types/cart.type'

type Props = {}

const SideCart = ( props: Props ) =>
{
    const theme = useTheme()
    const { data: cart } = useQuery( {
        queryKey: [ 'cart' ],
        queryFn: () => cartApi.get(),
        select: ( data ) => data.data
    } )
    return (
        <Box sx={ {
            backgroundColor: theme.palette.secondary.main,
            height: '100vh',
            width: '100%',
            p: 4,
            position: 'sticky',
            top: 0
        } }>
            <Box sx={ {
                width: '450px',

            } }>
                <Stack spacing={ 2 }>
                    {
                        cart?.map( ( item: CartItem ) => (
                            <Box key={ item.productId } sx={ {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            } }>
                                <Box sx={ {
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 2
                                } }>
                                    <Box sx={ {
                                        width: 60,
                                        height: 60,
                                        borderRadius: 2,
                                        backgroundColor: 'white'
                                    } }>

                                    </Box>
                                    <Box sx={ {
                                        display: 'flex',
                                        flexDirection: 'column',
                                    } }>
                                        <Typography variant="body2" >{ item.name }</Typography>
                                        <Typography variant="caption" >ID: { item.productId }</Typography>
                                    </Box>

                                </Box>
                                <Typography variant="subtitle2" >${ item.price * item.quantity }</Typography>
                            </Box>
                        ) )
                    }
                </Stack>
                <Stack spacing={ 0 } sx={ { pt: 2 } }>
                    <Box sx={ {
                        display: 'flex',
                        justifyContent: 'space-between'
                    } }>
                        <Typography variant="body1" >Subtotal - { cart?.length } items</Typography>
                        <Typography variant="body1" >${ !cart?.length ? 0 : cart.reduce( ( total, item ) => total + item.price * item.quantity, 0 ) }</Typography>
                    </Box>
                    <Box sx={ {
                        display: 'flex',
                        justifyContent: 'space-between'
                    } }>
                        <Typography variant="body1" >Shipping</Typography>
                        <Typography variant="body1" >Free</Typography>
                    </Box>
                    <Divider sx={ { my: 2 } } />
                    <Box sx={ {
                        display: 'flex',
                        justifyContent: 'space-between'
                    } }>
                        <Typography variant="h6" >Total</Typography>
                        <Typography variant="h6" >${ !cart?.length ? 0 : cart.reduce( ( total, item ) => total + item.price * item.quantity, 0 ) }</Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}

export default SideCart