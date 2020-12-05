<template>
  <div class="buttonChatComponent">
    <el-card
    class="button-chat box-card">
      <i class="el-icon-chat-dot-round"></i>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ButtonChatComponent'
}
</script>

<style>
.buttonChatComponent {
  position: fixed;
  bottom: 15px;
  right: 15px;
}
.buttonChatComponent .button-chat {
  cursor: pointer;
  border-radius: 50% !important;
  animation-duration: 1.5s;
  animation-name: orbe;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.buttonChatComponent .button-chat .el-card__body {
  padding: 10px;
}
.el-card .el-icon-chat-dot-round {
  color: #54E80F;
  font-size: 30px;
}
@media (max-width: 768px) {
  .buttonChatComponent {
    bottom: 60px;
    right: 5px;
  }
  .buttonChatComponent .button-chat .el-card__body {
    padding: 8px;
  }
  .el-card .el-icon-chat-dot-round {
    color: #54E80F;
    font-size: 28px;
  }
}
@keyframes orbe {
  from {
    box-shadow: 0 0 4px 1px #54E80F;
  }
  to {
    box-shadow: 0 0 0px 1px transparent;
  }
}
</style>
