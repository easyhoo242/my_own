type Person = {
  name: string,
  friend?: {
    name: string,
    age?: number,
    girlFriend?: {
      name: string
    }
  }
}

const person: Person = {
  name: 'dc',
  friend: {
    name: 'cd',
    girlFriend: {
      name: 'dcd'
    }
  }
}

console.log(person.name)
// dc
console.log(person.friend.age)
// undefined