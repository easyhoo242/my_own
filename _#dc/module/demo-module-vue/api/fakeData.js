
let uid = 0
const createStu = {
  id: ++uid,
  name: 'poppy',
  sex: 'male',
  score: '68'
}
const createStuList = stu => {
  return new Array(15).fill(null).map(res => createStuList(stu))
}
const stuList = createStuList(createStu)

export { stuList }