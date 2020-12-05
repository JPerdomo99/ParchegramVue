<template>
  <div class="chatComponent">
    <ListChatComponent :showListChatProp="showListChat"></ListChatComponent>
    <span @click="changeShowListChat()">
      <ButtonChatComponent></ButtonChatComponent>
    </span>
  </div>
</template>

<script>
import ButtonChatComponent from '@/components/ButtonChatComponent.vue'
import ListChatComponent from '@/components/ListChatComponent.vue'

export default {
  name: 'ChatComponent',
  components: {
    ButtonChatComponent,
    ListChatComponent
  },
  data () {
    return {
      showListChat: false
    }
  },
  methods: {
    changeShowListChat () {
      this.showListChat = !this.showListChat
    }
  }
}
</script>
