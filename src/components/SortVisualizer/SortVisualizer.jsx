import { useState, useEffect, useRef } from 'react'
import {
  BAR_WIDTH,
  COMPARISON_COLOR,
  SWAP_COLOR,
  PIVOT_COLOR,
  SORTED_COLOR,
  MERGE_SORT,
  START,
  RESET,
} from '../../constants'

import './SortVisualizer.css'

function SortVisualizer({ array, algorithm, sortStatus, speed }) {
  const [done, setDone] = useState(false)
  const [highlightIndices, setHighlightIndices] = useState([])
  const [swapIndices, setSwapIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const pivotIndex = useRef(-1)
  const sortIterator = useRef(null)
  const intervalId = useRef(null)
  const algoArray = useRef([])

  useEffect(() => {
    reset()
  }, [array, algorithm])

  useEffect(() => {
    if (sortStatus === START && !done) {
      runAlgo()
    }
    if (sortStatus === RESET) {
      reset()
    }
    return () => window.clearInterval(intervalId.current)
  }, [done, sortStatus, speed])

  function runAlgo() {
    intervalId.current = window.setInterval(() => {
      console.log('s: ', speed)
      const algoStatus = sortIterator.current.next()
      if (algoStatus.done) {
        setDone(true)
      }
    }, 1000 / (speed * 10))
  }

  function reset() {
    algoArray.current = [...array]
    setDone(false)
    sortIterator.current =
      algorithm.name === MERGE_SORT
        ? algorithm.function(algoArray.current, compare, combine, markSort)
        : algorithm.function(algoArray.current, compare, swap, markSort)
    pivotIndex.current = -1
    setHighlightIndices([])
    setSwapIndices([])
    setSortedIndices([])
  }

  function compare(indices, pivot) {
    pivotIndex.current = pivot
    setSwapIndices([])
    setHighlightIndices([...indices])
  }

  function swap(i, j) {
    const temp = algoArray.current[i]
    algoArray.current[i] = algoArray.current[j]
    algoArray.current[j] = temp
    setHighlightIndices([])
    setSwapIndices([i, j])
  }

  function combine(i, j) {
    if (i !== j) {
      const temp = algoArray.current.splice(i, 1)
      algoArray.current.splice(j, 0, temp[0])

      setHighlightIndices([])
      setSwapIndices([j, j + 1])
    }
  }

  function markSort(index) {
    pivotIndex.current = -1
    setHighlightIndices([])
    setSwapIndices([])
    setSortedIndices((prev) => [...prev, index])
  }

  function getBackgroundColor(index) {
    if (swapIndices.includes(index)) {
      return SWAP_COLOR
    }
    if (highlightIndices.includes(index)) {
      return COMPARISON_COLOR
    }
    if (pivotIndex.current === index) {
      return PIVOT_COLOR
    }
    if (sortedIndices.includes(index)) {
      return SORTED_COLOR
    }
    return ''
  }

  return (
    <div className='array'>
      {algoArray.current.map((value, index) => (
        <div
          key={index}
          className='bar'
          style={{
            width: BAR_WIDTH,
            height: `${(value / algoArray.current.length) * 100}%`,
            backgroundColor: getBackgroundColor(index),
          }}
          title={`Value: ${value}`}
        ></div>
      ))}
    </div>
  )
}

export default SortVisualizer
