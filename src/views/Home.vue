<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="欢迎来到您的 Vue.js App"/>
  </div>
</template>

<script>
// @是/src的别名，指向 src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
    return {}
  },
  methods: {},
  computed: {},
  mouthed: {},
  watch: {},
  components: {
    HelloWorld
  }
}
</script>

<style lang="less">

</style>