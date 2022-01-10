var arr = [5, 9, 3, 6, 8, 10, 1, 4];
var reversArr = function (arr) {
    var max = -Infinity;
    var finalArr = [];
    for (var i = 0; i < arr.length; i++) {
        var j = i + 1;
        while (j < arr.length) {
            if (arr[i] > arr[j] && arr[i] + arr[j] > max) {
                max = arr[i] + arr[j];
                finalArr = [arr[i], arr[j]];
            }
            j++;
        }
    }
    return { max: max, finalArr: finalArr };
};
var finalArr = reversArr(arr);
console.log(finalArr);
