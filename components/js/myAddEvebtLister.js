export const eventsMap = new Map()

export const on = (name, fn) => {
  if (eventsMap.has(name)) {
    eventsMap.get(name).push(fn)
  } else {
    eventsMap.set(name, [fn])
  }
}

export const emit = (name, ...args) => {
  if (eventsMap.has(name)) {
    const fns = [...eventsMap.get(name)]

    fns.forEach(fn => {
      fn(...args)
    })
  }
}

export const off = (name, fn) => {
  if (eventsMap.has(name)) {
    const fns = eventsMap.get(name)
    const index = fns.indexOf(fn)

    if (index > -1) {
      fns.splice(index, 1)
    }
  }
}

export const once = (name, fn) => {
  const onceFn = (...args) => {
    off(name, onceFn)
    fn(...args)
  }

  on(name, onceFn)
}

export const fn = (a1, a2) => {
  console.log('click1: ', a1, a2)
}

once('click', fn)
on('click', fn)

emit('click', 'ev1', '_e')
emit('click', 'ev2', '_e')
emit('click', 'ev3', '_e')