interface ISwimming {
  swimming: () => void
}

interface IEating {
  eating: () => void
}

type AgeType = number | string
class Animals {
  protected static type: string = 'cxk'
  public age: AgeType

  constructor(age: AgeType) {
    this.age = age
  }
  walking() {
    console.log('walking')
  }
}


class Fish extends Animals implements ISwimming, IEating {
  constructor(age: AgeType) {
    super(age)
  }

  swimming: () => void
  eating: () => void
}

const fish = new Fish('dog')
fish.walking()


export { }