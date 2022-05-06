import { useState } from 'react'
import SortVisualizer from './components/SortVisualizer'
import { bubbleSort } from './algorithms/bubbleSort'
import { selectionSort } from './algorithms/selectionSort'
import { insertionSort } from './algorithms/insertionSort'
import { quickSort } from './algorithms/quickSort'
import { mergeSort } from './algorithms/mergeSort'
import './App.css'

function makeArray(length) {
  const array = []
  for (let i = 0; i < length; i++) {
    array.push(i)
  }
  array.sort(() => (Math.random() < 0.5 ? 1 : -1))
  array.sort(() => (Math.random() < 0.5 ? 1 : -1))
  return array
}

function App() {
  const [baseArray, setArray] = useState(makeArray(20))
  const [algorithm, setAlgorithm] = useState(() => mergeSort)
  const [sortStatus, setSortStatus] = useState('pause')

  function newArray() {
    setSortStatus('reset')
    setArray(makeArray(20))
  }

  return (
    <div className='container'>
      <h1>Sorting example</h1>
      <SortVisualizer
        algorithm={algorithm}
        baseArray={baseArray}
        sortStatus={sortStatus}
      />

      <div>
        <h2> Controls: </h2>
        <button onClick={newArray}>New Array</button>
        <button onClick={() => setSortStatus('reset')}>Reset</button>
        <button onClick={() => setSortStatus('start')}>start sorting</button>
        <button onClick={() => setSortStatus('pause')}>pause</button>
      </div>
    </div>
  )
}

export default App
