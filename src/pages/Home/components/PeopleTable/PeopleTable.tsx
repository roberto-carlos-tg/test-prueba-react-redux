import React, { useEffect, useState } from 'react'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Person } from '@/models';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { addFavorite } from '@/redux/states';


export interface PeopleTableInterface {}

const PeopleTable: React.FC<PeopleTableInterface> = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])
  const dispatch = useDispatch()

  const statePeople = useSelector((store: AppStore) => store.people)
  const favoritePeople = useSelector((store: AppStore) => store.favorites)
  const pageSize = 5

  const findPerson = (person: Person) => !!favoritePeople.find(p => p.id === person.id)
  const filterPerson = (person: Person) => favoritePeople.filter(p => p.id !== person.id)

  const handleChange = (person: Person) => {
    const filterPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person]
    dispatch(addFavorite(filterPeople))
    setSelectedPeople(findPerson(person) ? filterPerson(person) : [...selectedPeople, person])
  }
  
  useEffect(() => {
    setSelectedPeople(favoritePeople)
  },[favoritePeople])

  const colums = [
    {
      field: 'actions',
      type: 'actions',
      soteable: false,
      headerName: '',
      width: 50,
      renderCell: (params: GridRenderCellParams) => <>{<Checkbox size="small" checked={findPerson(params.row)} onChange={() => handleChange(params.row)}/>}</>
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
  return (
    <DataGrid
      rows={statePeople}
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
export default PeopleTable
