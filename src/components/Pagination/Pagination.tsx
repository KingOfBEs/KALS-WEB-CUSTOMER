import MUIPagination from '@mui/material/Pagination';

interface Props
{
    totalPage: number;
    page: number;
    handleChangePage: ( event: React.ChangeEvent<unknown>, value: number ) => void;
}

const Pagination: React.FC<Props> = ( { totalPage, page, handleChangePage }: Props ) =>
{
    return (
        <MUIPagination count={ totalPage } page={ page } onChange={ handleChangePage } color="primary" />
    )
}

export default Pagination