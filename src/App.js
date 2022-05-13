import { useState } from 'react'
import SortVisualizer from './components/SortVisualizer/SortVisualizer'
import NavBar from './components/NavBar/NavBar'
import algorithms from './algorithms'
import { DEFAULT_ARRAY_SIZE, DEFAULT_SPEED, PAUSE, RESET } from './constants'
import './App.css'

function makeArray(length = DEFAULT_ARRAY_SIZE) {
  const array = []
  for (let i = 1; i <= length; i++) {
    array.push(i)
  }
  array.sort(() => (Math.random() < 0.5 ? 1 : -1))
  array.sort(() => (Math.random() < 0.5 ? 1 : -1))
  return array
}

function App() {
  const [array, setArray] = useState(makeArray())
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const [algorithm, setAlgorithm] = useState(() => algorithms[0])
  const [sortStatus, setSortStatus] = useState(PAUSE)

  function newArray(length) {
    setSortStatus(RESET)
    setArray(makeArray(length))
  }

  return (
    <div className='container'>
      <NavBar
        newArray={newArray}
        setSortStatus={setSortStatus}
        algorithms={algorithms}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        setSpeed={setSpeed}
      />
      <SortVisualizer
        algorithm={algorithm}
        array={array}
        sortStatus={sortStatus}
        speed={speed}
      />
    </div>
  )
}

export default App
