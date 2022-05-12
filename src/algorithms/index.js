import { bubbleSort } from './bubbleSort'
import { insertionSort } from './insertionSort'
import { selectionSort } from './selectionSort'
import { mergeSort } from './mergeSort'
import { quickSort } from './quickSort'

const algorithms = [
  {
    function: bubbleSort,
    name: 'bubbleSort',
  },
  {
    function: insertionSort,
    name: 'insertionSort',
  },
  {
    function: selectionSort,
    name: 'selectionSort',
  },
  {
    function: quickSort,
    name: 'quickSort',
  },
  {
    function: mergeSort,
    name: 'mergeSort',
  },
]

export default algorithms
