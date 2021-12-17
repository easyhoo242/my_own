const ALL_KEY = 'ALL_KEY'
const __toNormalQuery = (
  data: { key: string; value: string | number }[]
) => {
  return data.reduce((acc, { key, value }) => {
    return {
      ...acc,
      [key]: value === ALL_KEY ? undefined : value
    }
  }, {})
}

const toNormalQuery = (data: any) => {
  return data.reduce((acc: any, { key, value }) => {
    return {
      ...acc,
      [key]: value === ALL_KEY ? undefined : value
    }
  })
}

const round = [
  {
    "id": 15,
    "name": "尚未获投"
  },
  {
    "id": 16,
    "name": "种子轮"
  },
  {
    "id": 4,
    "name": "天使轮"
  },
  {
    "id": 14,
    "name": "Pre-A轮"
  },
  {
    "id": 5,
    "name": "A轮"
  },
  {
    "id": 17,
    "name": "A+轮"
  },
  {
    "id": 18,
    "name": "Pre-B轮"
  },
  {
    "id": 6,
    "name": "B轮"
  },
  {
    "id": 19,
    "name": "B+轮"
  },
  {
    "id": 7,
    "name": "C轮"
  },
  {
    "id": 23,
    "name": "C+轮"
  },
  {
    "id": 8,
    "name": "D轮"
  },
  {
    "id": 24,
    "name": "D+轮"
  },
  {
    "id": 9,
    "name": "E轮"
  },
  {
    "id": 28,
    "name": "E+轮"
  },
  {
    "id": 13,
    "name": "F轮"
  },
  {
    "id": 29,
    "name": "G轮"
  },
  {
    "id": 30,
    "name": "H轮"
  },
  {
    "id": 31,
    "name": "Pre-IPO"
  },
  {
    "id": 26,
    "name": "基石轮"
  },
  {
    "id": 10,
    "name": "已上市"
  },
  {
    "id": 21,
    "name": "新三板"
  },
  {
    "id": 25,
    "name": "已退市"
  },
  {
    "id": 22,
    "name": "战略投资"
  },
  {
    "id": 1,
    "name": "不明确"
  },
  {
    "id": 11,
    "name": "已被收购"
  },
  {
    "id": 27,
    "name": "已合并"
  }
]

console.log(round)
