import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import React from 'react'
import './NavBar.css'

function NavBar({
  newArray,
  setSortStatus,
  algorithms,
  algorithm,
  setAlgorithm,
}) {
  const handleSelectChange = (event) => {
    const newAlgo = algorithms.find((algo) => algo.name === event.target.value)
    setAlgorithm(newAlgo)
    setSortStatus('reset')
  }

  return (
    <div className='nav'>
      <FormControl sx={{ m: 1, minWidth: 130 }}>
        <InputLabel>Algorithm</InputLabel>
        <Select
          value={algorithm.name}
          onChange={handleSelectChange}
          label='Algorithm'
          name='Algorithm'
          autoWidth
        >
          {algorithms.map((algo, index) => (
            <MenuItem key={index} value={algo.name}>
              {algo.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        <Button sx={{ mr: 1 }} variant='contained' onClick={() => newArray()}>
          New Array
        </Button>

        <Button
          sx={{ mr: 1 }}
          variant='contained'
          onClick={() => setSortStatus('start')}
        >
          start sorting
        </Button>
        <Button
          sx={{ mr: 1 }}
          variant='contained'
          onClick={() => setSortStatus('pause')}
        >
          pause
        </Button>
        <Button
          sx={{ mr: 1 }}
          variant='contained'
          onClick={() => setSortStatus('reset')}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default NavBar
