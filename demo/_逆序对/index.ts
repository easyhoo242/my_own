type TypeReverseArr = (arr: number[]) => {}

const arr = [5, 9, 3, 6, 8, 10, 1, 4]

const reversArr: TypeReverseArr = (arr: number[]) => {
  let max = -Infinity
  let finalArr: number[] = []

  for (let i = 0; i < arr.length; i++) {
    let j = i + 1
    while (j < arr.length) {
      if (arr[i] > arr[j] && arr[i] + arr[j] > max) {
        max = arr[i] + arr[j]
        finalArr = [arr[i], arr[j]]
      }
      j++
    }
  }

  return { max, finalArr }
}

const finalArr = reversArr(arr)


console.log(finalArr)
