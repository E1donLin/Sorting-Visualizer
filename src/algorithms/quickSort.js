export function* quickSort(
  arr,
  compare,
  swap,
  markSort,
  low = 0,
  high = arr.length - 1
) {
  if (low <= high) {
    let pi = yield* partition(arr, low, high)

    yield* quickSort(arr, compare, swap, markSort, low, pi - 1)
    yield* quickSort(arr, compare, swap, markSort, pi + 1, high)
  }

  function* partition(arr, low, high) {
    let pivot = high
    yield compare([], pivot)

    let i = low
    for (let j = low; j < high; j++) {
      yield compare([j], pivot)

      if (arr[j] < arr[pivot]) {
        // skip if comparing the same index
        if (i === j) {
          i++
          continue
        }
        yield swap(i, j)
        i++
      }
    }
    /// skip if it pivot is at correct position
    if (i !== high) {
      yield swap(i, high)
    }
    yield markSort(i)
    return i
  }
}
