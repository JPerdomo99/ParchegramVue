<template>
  <div id="app">
    <div id="nav">
      <NavComponent></NavComponent>
      <!-- <router-link to="/home" v-if="token">Home</router-link>
      <router-link to="/" v-else>Auth</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import NavComponent from '@/components/NavComponent.vue'

export default {
  name: 'App',
  components: {
    NavComponent
  },
  data () {
    return {
    }
  }
}
</script>

<style >
  * {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    margin: 0;
  }
</style>
