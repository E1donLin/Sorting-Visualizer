import { bubbleSort } from './bubbleSort'
import { insertionSort } from './insertionSort'
import { selectionSort } from './selectionSort'
import { mergeSort } from './mergeSort'
import { quickSort } from './quickSort'
import {
  BUBBLE_SORT,
  INSERTION_SORT,
  SELECTION_SORT,
  QUICK_SORT,
  MERGE_SORT,
} from '../constants'

const algorithms = [
  {
    function: bubbleSort,
    name: BUBBLE_SORT,
  },
  {
    function: insertionSort,
    name: INSERTION_SORT,
  },
  {
    function: selectionSort,
    name: SELECTION_SORT,
  },
  {
    function: quickSort,
    name: QUICK_SORT,
  },
  {
    function: mergeSort,
    name: MERGE_SORT,
  },
]

export default algorithms
