const eventsMap = new Map()

const on = (name, fn) => {
  if (eventsMap.has(name)) {
    eventsMap.get(name).push(fn)
  } else {
    eventsMap.set(name, [fn])
  }
}

const emit = (name, ...args) => {
  if (eventsMap.has(name)) {
    const fns = [...eventsMap.get(name)]
    
    fns.forEach(fn => {
      fn(...args)
    })
  }
}

const off = (name, fn) => {
  if (eventsMap.has(name)) {
    const fns = eventsMap.get(name)
    const index = fns.indexOf(fn)
    
    if (index > -1) {
      fns.splice(index, 1)
    }
  }
}

const once = (name, fn) => {
  const onceFn = (...args) => {
    off(name, onceFn)
    fn(...args)
  }
  
  on(name, onceFn)
}

const fn = (a1, a2) => {
  console.log('click1: ', a1, a2)
}

once('click', fn)
on('click', fn)

emit('click', 'ev1', '_e')
emit('click', 'ev2', '_e')
emit('click', 'ev3', '_e')