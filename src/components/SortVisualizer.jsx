import { useState, useEffect, useRef } from 'react'

const comparisonColor = 'pink'
const swapColor = 'cyan'
const sortedColor = 'springgreen'

function SortVisualizer({ baseArray, algorithm, sortStatus }) {
  const [done, setDone] = useState(true)
  const [highlightIndices, setHighlightIndices] = useState([])
  const [swapIndices, setSwapIndices] = useState([])
  const [sortedIndices, setSortedIndices] = useState([])
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
    }, 100)
  }

  function reset() {
    algoArray.current = [...baseArray]
    setDone(false)
    sortIterator.current = algorithm(algoArray.current, compare, swap, markSort)
    setHighlightIndices([])
    setSwapIndices([])
    setSortedIndices([])
  }

  function compare(i, j) {
    setSwapIndices([])
    setHighlightIndices([i, j])
  }

  function swap(i, j) {
    setHighlightIndices([])
    setSwapIndices([i, j])

    const temp = algoArray.current[i]
    algoArray.current[i] = algoArray.current[j]
    algoArray.current[j] = temp
  }

  function markSort(index) {
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
