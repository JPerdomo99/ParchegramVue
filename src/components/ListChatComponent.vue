<template>
  <div class="listChatComponent">
    <el-card v-if="showListChatProp" class="list-chat box-card">
      <div slot="header" class="clearfix">
        <span>Chat</span>
      </div>
      <div v-for="(following, index) in followings" :key="index"
        class="text-following"
        @click="addChat(following.nameUserFollowing)">
        {{ following.nameUserFollowing }}
      </div>
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
      followings: [],
      chats: [],
      receivers: []
    }
  },
  methods: {
    async getFollowings () {
      await axios
        .get(`https://localhost:44377/api/Follow/Get/${this.$session.get('nameUser')}`)
        .then(result => {
          this.followings = result.data.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    async addChat (receiver) {
      if (this.chatContains(receiver)) return
      await this.getMessages(this.$session.get('nameUser'), receiver)
        .then((result) => {
          this.chats.push({
            receiver: receiver,
            sender: this.$session.get('nameUser'),
            conversation: result,
            inputMessage: ''
          })
          this.receivers.push(receiver)
        })
        .catch(err => {
          console.error(err)
        })
    },
    async getMessages (sender, receiver) {
      let messages = []
      await axios
        .get(`https://localhost:44377/api/Message/Get/${sender}/${receiver}`)
        .then((result) => {
          messages = result.data.data
        })
        .catch(err => {
          console.error(err)
          throw err
        })
      return messages
    },
    async sendMessage (chatIndex) {
      this.$socket.invoke('SendMessage',
        this.$session.get('nameUser'),
        this.chats[chatIndex].receiver,
        this.chats[chatIndex].inputMessage)
        .catch(err => {
          console.error(err)
        })
    },
    chatContains (receiver) {
      let i = 0
      while (i < this.receivers.length) {
        if (this.receivers[i] === receiver) return true
        i = i + 1
      }
      return false
    },
    createConversation (sender, receiver, message) {
      return {
        date: new Date(),
        idMessage: -1,
        messageText: message,
        nameUserReceiver: receiver,
        nameUserSender: sender
      }
    },
    getChatIndex (receiver) {
      return this.chats.findIndex(chat => chat.receiver === receiver)
    }
  },
  async mounted () {
    axios.defaults.headers.common.Authorization = `Bearer ${this.$session.get('jwt')}`
    await this.getFollowings()
  },
  sockets: {
    async ReceiveMessage (sender, receiver, message) {
      if (receiver === this.$session.get('nameUser') && !this.chatContains(sender)) {
        await this.addChat(sender)
      } else {
        // Ya existe chat
        let chatIndex = -1
        if (sender === this.$session.get('nameUser')) {
          // Soy el que envio el mensaje
          chatIndex = this.getChatIndex(receiver)
        } else {
          // Soy el que recibe
          chatIndex = this.getChatIndex(sender)
        }
        this.chats[chatIndex].conversation.push(this.createConversation(sender, receiver, message))
      }
    }
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
    right: 5px;
  }
}
</style>
