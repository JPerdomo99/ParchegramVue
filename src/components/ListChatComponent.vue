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
    <div class="chat-container">
      <el-card v-for="(chat, index) in chats" :key="index" class="box-card chat-card">
        <div slot="header" class="header clearfix">
          <div class="receiver">{{ chat.receiver }}</div>
          <div @click="removeChat(index)"><i class="chat-close el-icon-close"></i></div>
        </div>
        <div class="messages">
          <span v-for="(message, index) in chat.conversation" :key="index">
            <div v-if="message.nameUserSender === $session.get('nameUser')" class="message message-sender">{{ message.messageText }}</div>
            <div v-else class="message message-receiver">{{ message.messageText }}</div>
          </span>
        </div>
        <div class="input-container">
          <el-input
          @keyup.enter.native="sendMessage(index)"
          class="input-message"
          placeholder="El mensaje aquí..."
          v-model="chat.inputMessage"
          ></el-input>
          <el-button
          @click="sendMessage(index)"
          type="primary"
          icon="el-icon-s-promotion"
          circle
          ></el-button>
        </div>
      </el-card>
    </div>
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
        .get(`http://parchegramtest.com/api/Follow/Get/${this.$session.get('nameUser')}`)
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
    removeChat (chatIndex) {
      this.chats.splice(chatIndex, 1)
      this.receivers.splice(chatIndex, 1)
    },
    async getMessages (sender, receiver) {
      let messages = []
      await axios
        .get(`http://parchegramtest.com/api/Message/Get/${sender}/${receiver}`)
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
      if (this.chats[chatIndex].inputMessage === '') return
      this.$socket.invoke('SendMessage',
        this.$session.get('nameUser'),
        this.chats[chatIndex].receiver,
        this.chats[chatIndex].inputMessage)
        .then(() => {
          this.chats[chatIndex].inputMessage = ''
        })
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
    async ReceiveMessage (data) {
      if (data.receiver === this.$session.get('nameUser') && !this.chatContains(data.sender)) {
        await this.addChat(data.sender)
      } else {
        // Ya existe chat
        let chatIndex = -1
        if (data.sender === this.$session.get('nameUser')) {
          // Soy el que envio el mensaje
          chatIndex = this.getChatIndex(data.receiver)
        } else {
          // Soy el que recibe
          chatIndex = this.getChatIndex(data.sender)
        }
        this.chats[chatIndex].conversation.push(this.createConversation(data.sender, data.receiver, data.message))
      }
    }
  }
}
</script>

<style>
.listChatComponent {
  height: 100%;
}
.listChatComponent .list-chat {
  position: fixed;
  top: 70px;
  right: 15px;
  width: 200px;
  height: 75%;
  overflow-y: auto;
  z-index: 999;
}
.text-following {
  padding: 13px 0;
  cursor: pointer;
}
.text-following:hover {
  color: #409EFF;
}
@media (max-width: 768px) {
  .chat-container {
    bottom: 58px !important;
  }
  .listChatComponent .list-chat {
    top: 40px;
  }
}
.chat-container {
  display: flex;
  flex-direction: row-reverse;
  overflow-x: auto;
  width: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
}
.chat-container .el-card {
  border-radius: 15px 15px 0 0 !important;
}
.chat-card {
  margin: 0 8px;
  width: 280px;
  flex-grow: 0;
  flex-shrink: 0;
}
.receiver {
  font-weight: 600;
}
.chat-close {
  color: #FF0000;
  text-shadow: 0 0 #FF0000;
  font-weight: bold !important;
  cursor: pointer;
}
.messages {
  overflow-y: auto;
  height: 270px;
}
.message {
  padding: 12px;
  margin: 6px 0;
  border-radius: 10px;
  width: fit-content;
  font-size: 15px;
}
.message-sender {
  margin-right: 10px;
  margin-left: auto;
  text-align: end;
  background: #409EFF;
  color: #fff;
}
.message-receiver {
  margin-right: auto;
  text-align: start;
  background: #f0f2f5;
  color: #000;
}
.messages-container {
  display: flex;
  flex-direction: column;
}
.chat-card .el-card__body {
  padding: 0 0 4px 15px;
}
.input-container {
  display: flex;
  justify-content: space-between !important;
  padding-top: 5px;
  margin-right: 15px;
}
.chat-card .input-container .el-input__inner {
  border-radius: 18px;
  background: #f0f2f5;
  border: none;
  width: 205px;
}
.header {
  display: flex;
  justify-content: space-between;
}
</style>
