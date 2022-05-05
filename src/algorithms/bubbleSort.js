export function* bubbleSort(array, compare, swap, markSort) {
  for (let i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length - i - 1; j++) {
      yield compare(j, j + 1)

      if (array[j] > array[j + 1]) {
        yield swap(j, j + 1)
      }
    }

    yield markSort(j)
  }
}
