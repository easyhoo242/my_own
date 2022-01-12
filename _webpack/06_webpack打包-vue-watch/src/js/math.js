export const sum = (n1, n2) => n1 + n2

console.log('---这是regex--- start')
const data = '{a = 1, b = 2, c = 3}'
let regex = /(?<key>\w+?)=(?<value>\w?)/g

let result = data.matchAll(regex)

console.log(result)

let final = {}

for (let item of result) {
  let [key, value] = item.groups
  console.log('key & value', key, value)
  final[key] = value
}


console.log('---这是regex--- end')