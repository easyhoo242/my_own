// 枚举类型 只能使用固定的值 

enum Direction {
  TOP, //0    如果从100开始 则后面的值从100开始递增 100 101 102 103  
  BOTTOM,//1
  LEFT,//2
  RIGHT//3    如果最后一个值为100 则前面的值不会改变
}

// 默认为从0开始的递增


const turnDirection = (direction: Direction) => {
  switch (direction) {
    case Direction.TOP:
      console.log('turn top')
      break;

    case Direction.BOTTOM:
      console.log('turn BOTTOM')
      break;
    case Direction.LEFT:
      console.log('turn left')
      break;
    case Direction.RIGHT:
      console.log('turn right')
      break;
    default:
      // 必须将所有的类型枚举完 都则会报错
      const foo: never = direction
  }
}

turnDirection(Direction.LEFT)


export { }