
import fakeDate from './fakeData'
export function getFakeData () {
  return Promise({

  }).then(res => {
    res = fakeDate
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
