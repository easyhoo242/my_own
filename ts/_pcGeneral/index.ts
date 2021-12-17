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