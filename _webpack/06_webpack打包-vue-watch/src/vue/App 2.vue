<template>
  <div>
    <Login />
    <div>这是template的内容</div>
    <h2>{{ person.name }}</h2>
    <h2>{{ person.age }}</h2>
    <h2>{{ person.height }}</h2>
    <h2>{{ person.height }}</h2>
    {{ data }}
    <ul>
      <li v-for="item in data.replies" :key="item.id">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import Login from '../components/login.vue'
import { getTopic } from '../api'

export default {
  components: {
    Login,
  },
  setup() {
    const person = {
      name: 'dc',
      age: 18,
      height: 1.88,
    }

    let data = {}
    getTopic('5433d5e4e737cbe96dcef312').then((res) => {
      data = res.data
    })

    console.log(data)

    return {
      data,
      person,
    }
  },
}
</script>
