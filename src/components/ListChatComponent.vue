<template>
  <div class="listChatComponent">
    <el-card v-if="showListChatProp" class="list-chat box-card">
        <div slot="header" class="clearfix">
        <span>Chat</span>
      </div>
       <div v-for="(following, index) in followings" :key="index"
        class="text-following">{{ following.nameUserFollowing }}</div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'listChatComponent',
  props: {
    showListChatProp: Boolean
  },
  data () {
    return {
      followings: []
    }
  },
  methods: {
    async getFollowings () {
      await axios
        .get(`https://localhost:44377/api/Follow/Get/${this.$session.get('nameUser')}`)
        .then(result => {
          const DATA = result.data.data
          let i = 0
          while (i < DATA.length) {
            this.followings.push(DATA[i])
            i = i + 1
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  async mounted () {
    axios.defaults.headers.common.Authorization = `Bearer ${this.$session.get('jwt')}`
    await this.getFollowings()
  }
}
</script>

<style>
.listChatComponent {
  position: fixed;
  top: 70px;
  right: 15px;
  height: 100%;
}
.listChatComponent .list-chat {
  width: 200px;
  height: 75%;
  overflow-y: auto;
}
.text-following {
  padding: 13px 0;
  cursor: pointer;
}
.text-following:hover {
  color: #409EFF;
}
@media (max-width: 768px) {
  .listChatComponent {
    position: fixed;
    right: 5px;
  }
}
</style>
