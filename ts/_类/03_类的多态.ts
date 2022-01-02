class Animal {
  action(): void {
    console.log('animal walking!')
  }
}

class Fish extends Animal {
  action(): void {
    console.log('fish swimming!')
  }
}


class Dog extends Animal {
  action(): void {
    console.log('dog running')
  }
}

const howToWalk = (animals: Animal[]) => {
  animals.forEach(animal => {
    animal.action()
  })
}

howToWalk([new Fish(), new Dog()])
// 