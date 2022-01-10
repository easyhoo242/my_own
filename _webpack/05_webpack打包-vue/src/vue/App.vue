<template>
  <div>
    <Login />
    <div>这是template的内容</div>
    <h2>{{ person.name }}</h2>
    <h2>{{ person.age }}</h2>
    <h2>{{ person.height }}</h2>
  </div>
</template>

<script>
import Login from '../components/login.vue'

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

    return {
      person,
    }
  },
}
</script>

<style scoped></style>
