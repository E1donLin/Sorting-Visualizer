import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Box,
  Typography,
} from '@mui/material'
import React from 'react'
import {
  DEFAULT_ARRAY_SIZE,
  DEFAULT_SPEED,
  PAUSE,
  RESET,
  START,
} from '../../constants'
import './NavBar.css'

function NavBar({
  newArray,
  setSortStatus,
  algorithms,
  algorithm,
  setAlgorithm,
  setSpeed,
}) {
  const handleALgoChange = (event) => {
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
          onChange={handleALgoChange}
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
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 200 }}>
          <Typography sx={{ textAlign: 'left' }}>Size: </Typography>
          <Slider
            defaultValue={DEFAULT_ARRAY_SIZE}
            min={10}
            max={150}
            onChangeCommitted={(_, value) => newArray(value)}
            valueLabelDisplay='auto'
          />
        </Box>
        <Box ml={2} sx={{ width: 200 }}>
          <Typography sx={{ textAlign: 'left' }}>Speed: </Typography>
          <Slider
            defaultValue={DEFAULT_SPEED}
            min={1}
            max={10}
            onChangeCommitted={(_, value) => {
              setSpeed(value)
            }}
            valueLabelDisplay='auto'
          />
        </Box>
      </Box>

      <Box>
        <Button sx={{ mr: 1 }} variant='outlined' onClick={() => newArray()}>
          New Array
        </Button>

        <Button
          sx={{ mr: 1 }}
          variant='outlined'
          onClick={() => setSortStatus(START)}
        >
          start sorting
        </Button>
        <Button
          sx={{ mr: 1 }}
          variant='outlined'
          onClick={() => setSortStatus(PAUSE)}
        >
          pause
        </Button>
        <Button
          sx={{ mr: 1 }}
          variant='outlined'
          onClick={() => setSortStatus(RESET)}
        >
          Reset
        </Button>
      </Box>
    </div>
  )
}

export default NavBar
