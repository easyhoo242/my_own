import { default as generalList } from './generalData.js'

console.log(generalList)

var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};



var ALL_KEY = 'ALL_KEY';
var __toNormalQuery = function (data) {
  return data.reduce(function (acc, _a) {
    var _b;
    var key = _a.key, value = _a.value;
    return __assign(__assign({}, acc), (_b = {}, _b[key] = value === ALL_KEY ? undefined : value, _b));
  }, {});
};

