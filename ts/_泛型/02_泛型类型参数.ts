// 泛型的缩写

// T -> type
// K, V -> key, value
// O -> object
// E -> element


const foo = <T, E, O>(n1: T, n2: E, n3: O) => {
  return [n1, n2, n3]
}

// 不传参则会类型推导成字面量类型 （因为字面量类型能够满足当前的需求）

foo<number, string, boolean>(1, '2', true)