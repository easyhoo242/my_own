<template>
  <div>
    <h2>person</h2>
    <h3>姓名：{{ name }}</h3>
    <button @click="person.name += '!'">姓名++</button>
    <h3>年龄：{{ age }}</h3>
    <button @click="person.age++">年龄++</button>
    <h3>工资{{ salary }}</h3>
    <button @click="salary++">工资++</button>
  </div>
</template>

<script>
import { reactive, toRef } from 'vue'

export default {
  name: 'demo3',
  setup() {
    const person = reactive({
      name: 'dc',
      age: 18,
      height: 1.88,
      p1: {
        job: {
          salary: 2200
        }
      }
    })
    return {
      person,
      name: toRef(person, 'name'),
      age: toRef(person, 'age'),
      salary: toRef(person.p1.job, 'salary')
    }
  }
}
</script>
