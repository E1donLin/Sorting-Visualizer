export function* selectionSort(array, compare, swap, markSort) {
  const n = array.length
  for (let i = 0; i < n; i++) {
    let minIndex = i
    for (var j = i + 1; j < n; j++) {
      yield compare([minIndex, j])
      if (array[minIndex] > array[j]) {
        minIndex = j
      }
    }

    if (minIndex !== i) {
      yield swap(minIndex, i)
    }

    yield markSort(i)
  }
}
