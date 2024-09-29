import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { ChangeEvent, useState } from 'react';

interface Props
{
    toggleDrawer: ( open: boolean ) => ( event: React.KeyboardEvent | React.MouseEvent ) => void;
}

const FilterDrawer: React.FC<Props> = ( { toggleDrawer }: Props ) =>
{
    const [ value, setValue ] = useState( '$0 - $10' );

    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) =>
    {
        setValue( ( event.target as HTMLInputElement ).value );
    };
    return (
        <Box sx={ { width: 420, height: '100vh', display: 'flex', flexDirection: 'column' } } role="presentation" >
            <Box sx={ { flexGrow: 1 } }>
                <Typography sx={ { ml: 3, mt: 2 } } variant='h6'>Filter By</Typography>
                <FormControl sx={ { ml: 3, mt: 2, mb: 5 } } >
                    <FormLabel id="demo-controlled-radio-buttons-group">Price</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={ value }
                        onChange={ handleChange }
                    >
                        <FormControlLabel value="$0 - $10" control={ <Radio /> } label="$0 - $10" />
                        <FormControlLabel value="$10 - $50" control={ <Radio /> } label="$10 - $50" />
                        <FormControlLabel value="$50 - $100" control={ <Radio /> } label="$50 - $100" />
                        <FormControlLabel value="$100 - $200" control={ <Radio /> } label="$100 - $200" />
                        <FormControlLabel value="$200 & Above" control={ <Radio /> } label="$200 & Above" />
                    </RadioGroup>
                </FormControl>
                <Divider />
                <Typography sx={ { ml: 3, mt: 2 } } variant='h6'>Type</Typography>
                <FormGroup sx={ { ml: 3, mt: 2 } }>
                    <FormControlLabel control={ <Checkbox /> } label="Build Box Extras" />
                    <FormControlLabel control={ <Checkbox /> } label="Gifts" />
                    <FormControlLabel control={ <Checkbox /> } label="Hack Pack Extras" />
                    <FormControlLabel control={ <Checkbox /> } label="Merchandise" />
                </FormGroup>

            </Box>
            <Divider />
            <Box sx={ {
                display: 'flex',
                justifyContent: 'space-between',
                mx: 3, mt: 5, mb: 2,
                gap: 2
            } }>
                <Button onClick={ () => { } } variant='outlined' color='primary' fullWidth>Clear</Button>
                <Button onClick={ toggleDrawer( false ) } variant='contained' color='primary' fullWidth>Apply</Button>
            </Box>
        </Box>
    )
}

export default FilterDrawer