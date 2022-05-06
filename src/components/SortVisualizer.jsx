import { useState, useEffect, useRef } from 'react'

const comparisonColor = 'pink'
const swapColor = 'cyan'
const sortedColor = 'springgreen'
const pivotColor = 'sandybrown'

function SortVisualizer({ baseArray, algorithm, sortStatus }) {
  const [done, setDone] = useState(true)
  const [highlightIndices, setHighlightIndices] = useState([])
  const [swapIndices, setSwapIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
  const pivotIndex = useRef(-1)
  const sortIterator = useRef(null)
  const intervalId = useRef(null)
  const algoArray = useRef([])

  const BAR_WIDTH = 12

  useEffect(() => {
    reset()
  }, [baseArray, algorithm])

  useEffect(() => {
    if (sortStatus === 'start' && !done) {
      runAlgo()
    }
    if (sortStatus === 'reset') {
      reset()
    }
    return () => window.clearInterval(intervalId.current)
  }, [done, sortStatus])

  function runAlgo() {
    intervalId.current = window.setInterval(() => {
      const algoStatus = sortIterator.current.next()
      if (algoStatus.done) {
        setDone(true)
      }
    }, 300)
  }

  function reset() {
    algoArray.current = [...baseArray]
    setDone(false)
    sortIterator.current = algorithm(
      algoArray.current,
      compare,
      combine,
      markSort
    )
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
      return swapColor
    }
    if (highlightIndices.includes(index)) {
      return comparisonColor
    }
    if (pivotIndex.current === index) {
      return pivotColor
    }
    if (sortedIndices.includes(index)) {
      return sortedColor
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
            left: index * BAR_WIDTH,
            width: BAR_WIDTH,
            height: `${((value + 1) / algoArray.current.length) * 100}%`,
            backgroundColor: getBackgroundColor(index),
          }}
          title={`Value: ${value}`}
        ></div>
      ))}
    </div>
  )
}

export default SortVisualizer
