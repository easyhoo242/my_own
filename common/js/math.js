import { myReduce } from './index.js'
export const sum = (x, y) => x + y
export const average = (...args) => myReduce(args, sum) / args.length