export function* mergeSort(
  array,
  compare,
  combine,
  markSort,
  offSet = 0,
  finalMerge = true
) {
  if (array.length === 1) {
    if (finalMerge) markSort(0)
    return array
  }

  const middle = Math.floor(array.length / 2)
  const left = array.slice(0, middle)
  const right = array.slice(middle)

  const arr = yield* merge(
    yield* mergeSort(left, compare, combine, markSort, offSet, false),
    yield* mergeSort(right, compare, combine, markSort, offSet + middle, false),
    offSet,
    offSet + middle,
    finalMerge,
    markSort
  )
  return arr

  function* merge(left, right, off1, off2, finalMerge = false, markSort) {
    let result = []
    let leftIndex = 0
    let rightIndex = 0

    while (leftIndex < left.length && rightIndex < right.length) {
      yield compare([off1 + leftIndex + rightIndex, off2 + rightIndex])
      if (left[leftIndex] <= right[rightIndex]) {
        yield combine(off1 + leftIndex + rightIndex, off1 + result.length)
        if (finalMerge) yield markSort(off1 + result.length)
        result.push(left[leftIndex])
        leftIndex++
      } else {
        // yield compare([off1 + leftIndex + rightIndex, off2 + rightIndex])

        yield combine(off2 + rightIndex, off1 + result.length)
        if (finalMerge) yield markSort(off1 + result.length)
        result.push(right[rightIndex])
        rightIndex++
      }
    }

    while (leftIndex < left.length) {
      if (finalMerge) yield markSort(off1 + leftIndex + rightIndex)
      result.push(left[leftIndex])
      leftIndex++
    }

    while (rightIndex < right.length) {
      if (finalMerge) yield markSort(off1 + leftIndex + rightIndex)
      result.push(right[rightIndex])
      rightIndex++
    }

    return result
  }
}
