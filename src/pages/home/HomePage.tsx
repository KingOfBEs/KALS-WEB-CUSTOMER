import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import productApi from '../../apis/product.api'
import FilterDrawer from '../../components/Drawer/FilterDrawer/FilterDrawer'
import Pagination from '../../components/Pagination/Pagination'
import ProductCard from '../../components/ProductCard/ProductCard'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'

type Props = {}

const HomePage = ( props: Props ) =>
{
    const [ page, setPage ] = useState( 1 );
    const [ currentSearch, setCurrentSearch ] = useState( '' )
    const [ search, setSearch ] = useState( '' )
    const handleChange = ( event: React.ChangeEvent<unknown>, value: number ) =>
    {
        setPage( value );
    };
    const [ open, setOpen ] = useState( false );
    const handleSearch = () =>
    {
        setSearch( currentSearch )
    }
    const toggleDrawer = ( newOpen: boolean ) => () =>
    {
        setOpen( newOpen );
    };

    const productsQuery = useQuery( {
        queryKey: [ 'products', { page, search } ],
        queryFn: () => productApi.getProducts( { page, size: 8, Name: search } ),
        placeholderData: keepPreviousData
    } )
    console.log( productsQuery.data?.data.total )

    return (
        <Box sx={ { minHeight: '100vh' } } >

            <Box sx={ { bgcolor: '#00416c', height: 300, width: '100%', borderRadius: 5, mb: 8 } } />
            <Box sx={ { display: 'flex', justifyContent: 'flex-end', mb: 4 } }>
                <TextField sx={ { mr: 2 } } label='Search' variant='outlined'
                    slotProps={ {
                        input: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <IconButton onClick={ handleSearch }>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    } }
                    value={ currentSearch }
                    onChange={ ( e ) => setCurrentSearch( e.target.value ) }
                    onKeyDown={ ( e ) =>
                    {
                        if ( e.key === 'Enter' )
                        {
                            handleSearch();
                        }
                    } }
                />
                <Button onClick={ toggleDrawer( true ) } sx={ { py: 1, px: 2 } } variant='outlined' color='primary' endIcon={ <TuneIcon /> }>Filter</Button>
                <Drawer anchor={ 'right' } open={ open } onClose={ toggleDrawer( false ) }>
                    <FilterDrawer toggleDrawer={ toggleDrawer } />
                </Drawer>
            </Box>

            <Grid container spacing={ { xs: 2, sm: 3, md: 4 } }>
                {
                    productsQuery.data?.data.items.map( ( product, index ) => (
                        <Grid key={ index } size={ { xs: 12, sm: 6, md: 4, lg: 3 } }>
                            {
                                productsQuery.isLoading ?
                                    <Skeleton variant="rounded" width={ '100%' } height={ 430 } />
                                    :
                                    <ProductCard product={ product } />
                            }
                        </Grid>
                    ) )
                }
            </Grid>
            {
                productsQuery.data?.data.total === 0 ?
                    <Typography variant='h4' align='center'>No products found</Typography>
                    :
                    <Box sx={ { display: 'flex', justifyContent: 'center', mt: 4 } }>
                        <Pagination totalPage={ productsQuery.data?.data.totalPages! } page={ page } handleChangePage={ handleChange } />
                    </Box>
            }

        </Box>
    )
}

export default HomePage