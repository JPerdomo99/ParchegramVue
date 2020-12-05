<template>
  <div id="app">
    <div id="nav">
      <NavComponent></NavComponent>
    </div>
    <router-view/>
    <ChatComponent v-if="loginState"></ChatComponent>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { commonMixin } from '@/mixins/Common.js'
import NavComponent from '@/components/NavComponent.vue'
import ChatComponent from '@/components/ChatComponent.vue'

export default {
  name: 'App',
  components: {
    NavComponent,
    ChatComponent
  },
  mixins: [commonMixin],
  computed: {
    ...mapState(['loginState'])
  },
  created () {
    if (this.$session.has('jwt')) this.connectToChatHub()
  }
}
</script>

<style >
  * {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    margin: 0;
  }
</style>
