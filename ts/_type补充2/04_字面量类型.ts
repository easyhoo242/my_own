const msg: 'Hello World' = 'Hello World'

// 使用字面量类型最好配合使用联合类型

type constType = 'top' | 'bottom' | 'left' | 'right'

const top: constType = 'top'
const bottom: constType = 'bottom'
const left: constType = 'left'
const right: constType = 'right'

// 必须为constType联合类型的其中一个
// const up: constType = 'up'

export { }