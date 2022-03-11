; (
  function () {
    const arr = [1, 1, 1, 3]
    for (var i = 0; i < 100; i++) {
      if (i > 2) {
        arr[i] = arr[i - 1] + arr[i - 2] + arr[i - 3]
      }
    }
    console.log(arr)

    // console.log(arr)
  }
)()