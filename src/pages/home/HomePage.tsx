import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import { Fragment, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import Pagination from '../../components/Pagination/Pagination'
import Button from '@mui/material/Button'
import TuneIcon from '@mui/icons-material/Tune';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FilterDrawer from '../../components/FilterDrawer/FilterDrawer'

type Props = {}

const HomePage = ( props: Props ) =>
{
    const [ page, setPage ] = useState( 1 );
    const handleChange = ( event: React.ChangeEvent<unknown>, value: number ) =>
    {
        setPage( value );
    };
    const [ open, setOpen ] = useState( false );

    const toggleDrawer = ( newOpen: boolean ) => () =>
    {
        setOpen( newOpen );
    };

    return (
        <Box sx={ { minHeight: '100vh' } } >

            <Box sx={ { bgcolor: '#00416c', height: 300, width: '100%', borderRadius: 5, mb: 8 } } />
            <Box sx={ { display: 'flex', justifyContent: 'flex-end', mb: 4 } }>
                <TextField sx={ { mr: 2 } } label='Search' variant='outlined'
                    slotProps={ {
                        input: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    } }
                />

                <Button onClick={ toggleDrawer( true ) } sx={ { py: 1, px: 2 } } variant='outlined' color='primary' endIcon={ <TuneIcon /> }>Filter</Button>
                <Drawer anchor={ 'right' } open={ open } onClose={ toggleDrawer( false ) }>
                    <FilterDrawer toggleDrawer={ toggleDrawer } />
                </Drawer>

            </Box>

            <Grid container spacing={ 4 }>
                {
                    Array.from( { length: 8 } ).map( ( _, index ) => (
                        <Grid key={ index } size={ 3 }>
                            <ProductCard />
                        </Grid>
                    ) )
                }
            </Grid>
            <Box sx={ { display: 'flex', justifyContent: 'center', mt: 4 } }>
                <Pagination totalPage={ 10 } page={ page } handleChangePage={ handleChange } />
            </Box>
        </Box>
    )
}

export default HomePage