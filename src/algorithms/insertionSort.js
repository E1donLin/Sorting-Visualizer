export function* insertionSort(array, compare, swap, markSort) {
  for (let i = 0; i < array.length; i++) {
    let keyIndex = i
    for (var j = i - 1; j >= 0; j--) {
      yield compare(j, keyIndex)

      if (array[j] > array[keyIndex]) {
        yield swap(j, keyIndex)
        keyIndex = j
      } else {
        break
      }
    }

    yield markSort(i)
  }
}
