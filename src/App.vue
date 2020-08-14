<template>
  <div id="app">
    <login v-if="!logged"></login>
    <wheel v-if="logged"></wheel>
  </div>
</template>


<script>
import login from './components/login'

export default {
  components: {
    login
  },
  data() {
    return{
      logged: false,
    }
  },
}
</script>
