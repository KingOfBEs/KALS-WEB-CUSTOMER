import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import { FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Skeleton from '@mui/material/Skeleton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import productApi from '../../apis/product.api'
import FilterDrawer from '../../components/Drawer/FilterDrawer/FilterDrawer'
import Pagination from '../../components/Pagination/Pagination'
import ProductCard from '../../components/ProductCard/ProductCard'

const sortOption = {
    NAME_ASC: { label: 'Name (A-Z)', value: "name,true" },
    NAME_DESC: { label: 'Name (Z-A)', value: "name,false" },
    PRICE_ASC: { label: 'Price (Low to High)', value: "price,true" },
    PRICE_DESC: { label: 'Price (High to Low)', value: "price,false" },
    CREATED_AT_ASC: { label: 'Date (Oldest)', value: "createdAt,true" },
    CREATED_AT_DESC: { label: 'Date (Newest)', value: "createdAt,false" },
};

type Props = {}

const ShopPage = ( props: Props ) =>
{
    const [ sort, setSort ] = useState( sortOption.NAME_ASC.value )
    const [ page, setPage ] = useState( 1 );
    const [ currentSearch, setCurrentSearch ] = useState( '' )
    const [ search, setSearch ] = useState( '' )
    const [ categoryIds, setCategoryIds ] = useState<string[]>( [] )
    const [ sortBy, setSortBy ] = useState( sort.split( ',' )[ 0 ] )
    const [ isAsc, setIsAsc ] = useState( sort.split( ',' )[ 1 ] )


    const handleChangeSort = ( event: SelectChangeEvent ) =>
    {
        setSortBy( ( event.target.value as string ).split( ',' )[ 0 ] );  // Update the sort state with the selected option's value
        setIsAsc( ( event.target.value as string ).split( ',' )[ 1 ] );
        setSort( event.target.value as string );  // Update the sort state with the selected option's value
    };

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

    const { data: response, isLoading } = useQuery( {
        queryKey: [ 'products', { page, search, categoryIds, sortBy, isAsc } ],
        queryFn: () => productApi.getProducts( {
            page,
            size: 8,
            Name: search,
            CategoryIds: categoryIds,
            sortBy: sortBy,
            isAsc: isAsc
        } ),
        placeholderData: keepPreviousData,
        select: ( data ) => data.data
    } )
    return (
        <Box sx={ {
            minHeight: '100vh',
            marginX: {
                xs: 2,
                sm: 5,
                md: 10,
                lg: 15,
            },
            paddingTop: 2,
            paddingBottom: 8,
        } } >

            <Box sx={ { bgcolor: '#00416c', height: 300, width: '100%', borderRadius: 5, mb: 8 } } />
            <Box sx={ { mb: 4 } }>
                <Grid container spacing={ 2 } >
                    <Grid size={ { xs: 12, lg: 7 } }>

                    </Grid>
                    <Grid display="flex" justifyContent="center" alignItems="center" size={ { xs: 12, lg: 2 } }>
                        <TextField sx={ { width: '100%' } } label='Search' variant='outlined'
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
                    </Grid>
                    <Grid display="flex" justifyContent="center" alignItems="center" size={ { xs: 12, lg: 1 } }>
                        <Button onClick={ toggleDrawer( true ) } sx={ { width: '100%', height: '100%', px: 2 } } variant='outlined' color='primary' endIcon={ <TuneIcon /> }>Filter</Button>
                    </Grid>
                    <Grid display="flex" justifyContent="center" alignItems="center" size={ { xs: 12, lg: 2 } }>
                        <FormControl sx={ { minWidth: '100%' } }>
                            <Select
                                value={ sort }
                                onChange={ handleChangeSort }
                                displayEmpty
                                input={
                                    <OutlinedInput
                                        startAdornment={ <InputAdornment position='start'>Sort by</InputAdornment> }
                                        sx={ {
                                            '& .MuiOutlinedInput-input': {
                                                paddingTop: '17px'
                                            },
                                        } }
                                    />
                                }
                                MenuProps={ {
                                    disableScrollLock: true,
                                } }
                            >
                                { Object.keys( sortOption ).map( ( key ) => (
                                    <MenuItem key={ key } value={ sortOption[ key as keyof typeof sortOption ].value }>
                                        { sortOption[ key as keyof typeof sortOption ].label }
                                    </MenuItem>
                                ) ) }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Drawer anchor={ 'right' } open={ open } onClose={ toggleDrawer( false ) }>
                    <FilterDrawer categoryIds={ categoryIds } setCategoryIds={ setCategoryIds } toggleDrawer={ toggleDrawer } />
                </Drawer>
            </Box>

            <Grid container spacing={ { xs: 2, sm: 3, md: 4 } }>
                {
                    response?.items.map( ( product, index ) => (
                        <Grid key={ index } size={ { xs: 12, sm: 6, md: 4, lg: 3 } }>
                            <ProductCard product={ product } />
                        </Grid>
                    ) )
                }

            </Grid>
            {
                isLoading &&
                <Grid container spacing={ { xs: 2, sm: 3, md: 4 } }>
                    {
                        Array.from( { length: 8 } ).map( ( _, index ) => (
                            <Grid key={ index } size={ { xs: 12, sm: 6, md: 4, lg: 3 } }>
                                <Skeleton variant="rounded" width={ '100%' } height={ 430 } />
                            </Grid>
                        ) )
                    }
                </Grid>

            }
            {
                response?.total === 0 ?
                    <Typography variant='h4' align='center'>No products found</Typography>
                    :
                    <Box sx={ { display: 'flex', justifyContent: 'center', mt: 4 } }>
                        <Pagination totalPage={ response?.totalPages! } page={ page } handleChangePage={ handleChange } />
                    </Box>
            }

        </Box>
    )
}

export default ShopPage