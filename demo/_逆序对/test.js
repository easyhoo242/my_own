"use strict";
exports.__esModule = true;
var arr = [5, 9, 3, 6, 8, 10, 1, 4];
exports.arr = arr;
var arr1 = arr.forEach(function (item, index, arr) {
    var max = -Infinity;
    if (item > arr[index + 1]) {
        max = parseInt("" + item + arr[index + 1]);
    }
});
exports.arr1 = arr1;
var arr2 = arr.filter(function (item, index, arr) { return item < arr[index + 1]; });
exports.arr2 = arr2;
console.log(arr);
