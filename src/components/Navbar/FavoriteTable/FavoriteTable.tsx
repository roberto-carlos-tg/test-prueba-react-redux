import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Person } from '@/models';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { removeFavorite } from '@/redux/states';
import { IconButton } from '@mui/material';
import Delete from '@mui/icons-material/Delete';

export interface FavoriteTable {}

export const FavoriteTable: React.FC<FavoriteTable> = () => {
  const dispatch = useDispatch()

  const stateFavorites = useSelector((store: AppStore) => store.favorites)
  const pageSize = 5

  const handleClick = (person: Person) => {
    dispatch(removeFavorite(person))
  }

  const colums = [
    {
      field: 'actions',
      type: 'actions',
      soteable: false,
      headerName: '',
      width: 50,
      renderCell: (params: GridRenderCellParams) => <>{
        <IconButton color="secondary" aria-label="favorites" component="label" onClick={() => handleClick(params.row)}>
            <Delete />
          </IconButton>}</>
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'category',
      headerName: 'Categories',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'company',
      headerName: 'Company',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'levelOfHappiness',
      headerName: 'Level of happiness',
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    }
  ]
  return(
      <DataGrid
        rows={stateFavorites}
        columns={colums}
        disableColumnSelector
        disableSelectionOnClick
        autoHeight
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        getRowId={(row: any) => row.id}
        />
  )
}
export default FavoriteTable
