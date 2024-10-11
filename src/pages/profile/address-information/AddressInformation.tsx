import { FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addressApi } from '../../../apis/address.api';
import { memberApi } from '../../../apis/member.api';
import FormProvider from '../../../components/hook-form/FormProvider';
import RHFSelect from '../../../components/hook-form/RHFSelect';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import { useAuth } from '../../../contexts/useAuth';
import { MemberRequest } from '../../../types/member.type';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';

type Props = {}
type FormValues = {
    province: string;
    district: string;
    ward: string;
    address: string;
};

const AddressInformation = ( props: Props ) =>
{
    const queryClient = useQueryClient();

    const { user } = useAuth();

    const [ isUpdate, setIsUpdate ] = useState( false );

    const [ isUpdating, setIsUpdating ] = useState( false );

    const handleCancel = () =>
    {
        setIsUpdate( false );
        reset( {
            province: member?.provinceCode || '',
            district: member?.districtCode || '',
            ward: member?.wardCode || '',
            address: member?.address || '',
        } );
    }

    const methods = useForm<FormValues>( {
        defaultValues: {
            province: '',
            district: '',
            ward: '',
            address: '',
        },
    } );
    const { handleSubmit, watch, reset, setValue, } = methods;

    const selectedProvince = watch( 'province' );
    const selectedDistrict = watch( 'district' );

    // Fetch member data using useQuery
    const { data: member } = useQuery( {
        queryKey: [ 'member' ],
        queryFn: () => memberApi.getMemberInformation(),
        select: ( data ) => data?.data,
    } );

    // Fetch provinces
    const { data: provinces } = useQuery( {
        queryKey: [ 'province' ],
        queryFn: () => addressApi.getProvinces(),
    } );

    // Fetch districts only if `province` from member exists or user selects province
    const { data: districts } = useQuery( {
        queryKey: [ 'district', selectedProvince ],
        queryFn: () => addressApi.getDistricts( selectedProvince || member?.provinceCode ),
        enabled: !!( selectedProvince || member?.provinceCode ), // only fetch when province is selected or member has provinceCode
    } );

    // Fetch wards only if `district` from member exists or user selects district
    const { data: wards } = useQuery( {
        queryKey: [ 'ward', selectedDistrict ],
        queryFn: () => addressApi.getWards( selectedDistrict || member?.districtCode ),
        enabled: !!( selectedDistrict || member?.districtCode ), // only fetch when district is selected or member has districtCode
    } );

    // Khi member data có mã tỉnh, huyện, xã, set giá trị vào form
    useEffect( () =>
    {
        if ( member && member.provinceCode && member.districtCode && member.wardCode )
        {
            reset( {
                province: member.provinceCode,
                district: member.districtCode,
                ward: member.wardCode,
                address: member.address,
            } );
        }
    }, [ member, reset ] );


    const handleOnSubmit = async ( data: FormValues ) =>
    {
        setIsUpdating( true );
        const province = await addressApi.getProvinceById( data.province );
        const district = await addressApi.getDistrictById( data.district );
        const ward = await addressApi.getWardById( data.ward );
        // console.log( {
        //     username: user?.username,

        //     province: province.name,
        //     district: district.name,
        //     ward: ward.name,
        //     address: data.address
        // } )
        const memberRequest: MemberRequest = {
            username: user!.username,
            fullName: user!.fullName,
            province: province.name,
            district: district.name,
            ward: ward.name,
            provinceCode: data.province,
            districtCode: data.district,
            wardCode: data.ward,
            address: data.address,
        }
        await memberApi.updateMemberInformation( memberRequest ).
            then( res =>
            {
                if ( res.status === 200 )
                {
                    setIsUpdating( false );
                    queryClient.invalidateQueries( { queryKey: [ 'member' ] } );
                    setIsUpdate( false );
                    toast.success( 'Update successfully' );
                }
            } )
    };
    return (
        <FormProvider onSubmit={ handleSubmit( handleOnSubmit ) } methods={ methods }>
            <Box sx={ {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            } }>
                <Typography variant='h5' sx={ { my: 2 } }>
                    Shipping Address
                </Typography>
                <Box sx={ {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                } }>
                    {
                        isUpdate ? (
                            <Fragment>
                                <Button onClick={ handleCancel } variant='outlined' color='primary'>Cancel</Button>
                                <LoadingButton loading={ isUpdating } type="submit" variant='contained' color='primary'>Save</LoadingButton>
                            </Fragment>
                        ) : (
                            <Button onClick={ () => setIsUpdate( true ) } variant='contained' color='primary'>Update</Button>
                        )
                    }
                </Box>
            </Box>
            <Stack spacing={ 3 }>
                {/* Province Select */ }
                <Grid container spacing={ 2 }>
                    <Grid size={ 2 } sx={ {
                        display: 'flex',
                        alignItems: 'center',

                    } }>
                        <Typography variant='h6'>Province</Typography>
                    </Grid>
                    <Grid size={ 10 } sx={ { display: 'flex', alignItems: 'center' } }>
                        {
                            isUpdate ? (
                                <RHFSelect
                                    name='province'
                                    label='Select province'
                                    required
                                    onChange={ ( e ) =>
                                    {
                                        setValue( 'province', e.target.value ); // Cập nhật giá trị của province
                                        setValue( 'district', '' ); // Reset district khi province thay đổi
                                        setValue( 'ward', '' ); // Reset ward khi province thay đổi
                                    } }>
                                    { provinces?.map( ( province: any ) => (
                                        <MenuItem key={ province.code } value={ province.code }>
                                            { province.name }
                                        </MenuItem>
                                    ) ) }
                                </RHFSelect>
                            ) : (
                                <FormLabel>{ member?.province || "No address" }</FormLabel>
                            )
                        }
                    </Grid>
                </Grid>

                {/* District Select */ }
                <Grid container spacing={ 2 }>
                    <Grid size={ 2 } sx={ {
                        display: 'flex',
                        alignItems: 'center',
                    } }>
                        <Typography variant='h6'>District</Typography>
                    </Grid>
                    <Grid size={ 10 } sx={ { display: 'flex', alignItems: 'center' } }>
                        {
                            isUpdate ? (
                                <RHFSelect
                                    name='district'
                                    label='Select district'
                                    required
                                    onChange={ ( e ) =>
                                    {
                                        setValue( 'district', e.target.value ); // Cập nhật giá trị của district
                                        setValue( 'ward', '' ); // Reset ward khi district thay đổi
                                    } }
                                    disabled={ !selectedProvince }>
                                    { districts?.map( ( district: any ) => (
                                        <MenuItem key={ district.code } value={ district.code }>
                                            { district.name }
                                        </MenuItem>
                                    ) ) }
                                </RHFSelect>
                            ) : (
                                <FormLabel>{ member?.district || "No address" }</FormLabel>
                            )
                        }
                    </Grid>
                </Grid>

                {/* Ward Select */ }
                <Grid container spacing={ 2 }>
                    <Grid size={ 2 } sx={ {
                        display: 'flex',
                        alignItems: 'center',
                    } }>
                        <Typography variant='h6'>Ward</Typography>
                    </Grid>
                    <Grid size={ 10 } sx={ { display: 'flex', alignItems: 'center' } }>
                        {
                            isUpdate ? (
                                <RHFSelect name='ward' label='Select ward' disabled={ !selectedDistrict } required>
                                    { wards?.map( ( ward: any ) => (
                                        <MenuItem key={ ward.code } value={ ward.code }>
                                            { ward.name }
                                        </MenuItem>
                                    ) ) }
                                </RHFSelect>
                            ) : (
                                <FormLabel>{ member?.ward || "No address" }</FormLabel>
                            )
                        }
                    </Grid>
                </Grid>

                {/* Address */ }
                <Grid container spacing={ 2 }>
                    <Grid size={ 2 } sx={ {
                        display: 'flex',
                        alignItems: 'center',
                    } }>
                        <Typography variant='h6'>Address</Typography>
                    </Grid>
                    <Grid size={ 10 } sx={ { display: 'flex', alignItems: 'center' } }>
                        {
                            isUpdate ? (
                                <RHFTextField name='address' label='Address' required />
                            ) : (
                                <FormLabel>{ member?.address || "No address" }</FormLabel>
                            )
                        }
                    </Grid>
                </Grid>
                {/* <Button type='submit' variant='contained' color='primary'>Pay</Button> */ }
            </Stack>
        </FormProvider>
    )
}

export default AddressInformation