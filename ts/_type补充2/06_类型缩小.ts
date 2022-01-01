type idType = number | string
const printId = (id: idType) => {
  if (typeof id === 'number') {
    console.log(id)
  } else {
    // 一定为string类型
    console.log(id.toUpperCase)
  }
}

const printTime = (timer: string | Date) => {
  if (timer instanceof Date) {
    console.log(timer.toUTCString)
  } else {
    console.log(timer.split('').reverse().join(''))
  }
}

class Student {
  studying() { }
}
class Teacher {
  teaching() { }
}
const work = (person: Student | Teacher) => {
  if (person instanceof Student) {
    // 一定为学生类型
    person.studying()
  } else {
    // 一定为老师类型 
    person.teaching()
  }
}

// in关键字

type Fish = {
  swimming: () => void
}

type Dog = {
  running: () => void
}

const walk = (animal: Fish | Dog) => {
  if ('swimming' in animal) {
    animal.swimming()
  } else {
    animal.running()
  }
}

const fish: Fish = {
  swimming() {
    console.log('swimming')
  }
}

walk(fish)




export { }