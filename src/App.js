import { useState } from 'react'
import SortVisualizer from './components/SortVisualizer/SortVisualizer'
import NavBar from './components/NavBar/NavBar'
import algorithms from './algorithms'
import './App.css'

function makeArray(length) {
  const array = []
  for (let i = 1; i <= length; i++) {
    array.push(i)
  }
  array.sort(() => (Math.random() < 0.5 ? 1 : -1))
  array.sort(() => (Math.random() < 0.5 ? 1 : -1))
  return array
}

function App() {
  const [baseArray, setArray] = useState(makeArray(100))
  const [algorithm, setAlgorithm] = useState(() => algorithms[0])
  const [sortStatus, setSortStatus] = useState('pause')

  function newArray() {
    setSortStatus('reset')
    setArray(makeArray(100))
  }

  return (
    <div className='container'>
      <NavBar
        newArray={newArray}
        setSortStatus={setSortStatus}
        algorithms={algorithms}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
      />
      <SortVisualizer
        algorithm={algorithm}
        baseArray={baseArray}
        sortStatus={sortStatus}
      />
    </div>
  )
}

export default App
