
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