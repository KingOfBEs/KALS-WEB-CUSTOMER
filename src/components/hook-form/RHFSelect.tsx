// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type IProps = {
    name: string;
    children: any;
};

type Props = IProps & TextFieldProps;

export default function RHFSelect ( { name, children, ...other }: Props )
{
    const { control } = useFormContext();

    return (
        <Controller
            name={ name }
            control={ control }
            render={ ( { field, fieldState: { error } } ) => (
                <TextField
                    { ...field }
                    select
                    fullWidth
                    // SelectProps={ { native: true } }
                    slotProps={ {
                        select: {
                            MenuProps: {
                                disableScrollLock: true
                            }
                        }
                    } }
                    error={ !!error }
                    helperText={ error?.message }
                    { ...other }
                >
                    { children }
                </TextField>
            ) }
        />
    );
}

