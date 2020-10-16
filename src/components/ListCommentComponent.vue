<template>
  <div class="listCommentComponent" :style="{ marginTop: '8px' }">
    <transition-group name="fade">
      <el-container v-for="(comment, index) in listCommentProp" :key="index"
        class="comment-container">
        <div class="comment">
            <div class="header-comment">
              <strong>{{ comment.nameUser }}</strong>
              <el-dropdown
              @command="handleCommand"
              v-if="comment.nameUser === getNameUser() && index !== indexTarget"
              placement="top-start"
              trigger="click"
              size="mini">
                <i class="el-icon-more"></i>
                <el-dropdown-menu>
                  <el-dropdown-item :style="{ color: '#b8c5d1' }"
                  icon="el-icon-edit"
                  :command="index + comment.commentText">Editar
                  </el-dropdown-item>
                  <el-dropdown-item :style="{ color: '#FF0000' }">
                    <el-popconfirm
                    confirmButtonText="Si"
                    cancelButtonText="No, Dejalo"
                    icon="el-icon-info"
                    iconColor="red"
                    title="Quieres Retirar lo dicho?"
                    @onConfirm="handleConfirmCommentDelete(comment.idComment, comment.nameUser)">
                      <span slot="reference"><i class="el-icon-delete"></i>Eliminar</span>
                    </el-popconfirm>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="comment-text">
              <transition name="fade">
                <div v-if="index === indexTarget"
                class="comment-text-edit">
                  <el-input
                  v-model="commentTarget"
                  type="textarea"
                  size="mini"
                  autosize
                  autofocus
                  ></el-input>
                  <div v-if="index === indexTarget"
                  class="edit-comment-buttons">
                    <transition name="fade2">
                      <el-button
                      v-if="!commentTargetInvalid"
                      @click="editComment(comment.idComment)"
                      type="primary"
                      icon="el-icon-position button-send-comment"
                      plain circle
                      size="mini">
                      </el-button>
                    </transition>
                    <el-button
                      @click="cancelEditComment()"
                      type="danger"
                      icon="el-icon-remove-outline button-send-comment"
                      plain circle
                      size="mini">
                    </el-button>
                  </div>
                  <transition name="fade">
                    <div v-if="commentTargetInvalid"
                    class="el-form-item__error commentInvalidEditMessage">
                      {{ commentInvalidEditMessage }}
                    </div>
                  </transition>
                </div>
                <p v-else>{{ comment.commentText }}</p>
              </transition>
            </div>
        </div>
      </el-container>
    </transition-group>
  </div>
</template>

<script>
import axios from 'axios'
import { commonMixin } from '@/mixins/Common.js'
import { commentMixin } from '@/mixins/Comment.js'

export default {
  name: 'ListCommentComponent',
  props: {
    idPost: Number,
    limitComments: Number,
    listCommentProp: Array
  },
  mixins: [commonMixin, commentMixin],
  data () {
    return {
      commentTargetInvalid: false,
      commentInvalidEditMessage: '',
      indexTarget: -1,
      commentTarget: '',
      commentModel: {
        IdComment: 0,
        CommentText: '',
        NameUser: '',
        IdPost: 0
      }
    }
  },
  watch: {
    commentTarget () {
      if (this.commentTarget.length === 0) {
        this.commentInvalidEditMessage = 'Dejale saber que piensas🤔'
        this.commentTargetInvalid = true
      } else if (this.commentTarget.length > 500) {
        this.commentInvalidEditMessage = 'Piensas demasiado🧠'
        this.commentTargetInvalid = true
      } else {
        this.commentInvalidEditMessage = ''
        this.commentTargetInvalid = false
      }
    }
  },
  methods: {
    async handleConfirmCommentDelete (idComment, nameUser) {
      await this.deleteComment(idComment, nameUser)
    },
    async deleteComment (idComment, nameUser) {
      await axios
        .delete(`https://localhost:44377/api/Comment/Delete/${this.idPost}/${idComment}/${nameUser}`)
        .then(result => {
          if (result.data.success === 1) {
            this.getListComment(this.limitComments)
          } else {
            console.error(result.data.message)
            this.notifyError('Ups!', 'No se pudo eliminar el comentario')
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    async editComment (idComment) {
      this.buildBody(idComment)
      await axios
        .put('https://localhost:44377/api/Comment/Update', this.commentModel)
        .then(result => {
          if (result.data.success === 1) {
            this.listCommentProp[this.indexTarget].commentText = this.commentTarget
          } else {
            console.error(result.data.message)
            this.notifyError('Ups!', 'No se puedo editar el comentario')
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          this.resetCommentModelTarget()
        })
    },
    handleCommand (data) {
      console.log(data)
      const index = Number.parseInt(data.slice(0, 1))
      const commentText = data.slice(1)
      this.indexTarget = index
      this.commentTarget = commentText
    },
    cancelEditComment () {
      this.resetCommentModelTarget()
    },
    resetCommentModelTarget () {
      this.indexTarget = -1
      this.commentTarget = ''
    },
    buildBody (idComment) {
      this.commentModel.IdComment = idComment
      this.commentModel.CommentText = this.commentTarget
      this.commentModel.nameUser = this.getNameUser()
      this.commentModel.idPost = this.idPost
    }
  },
  async mounted () {
    await this.getListComment(this.limitComments)
  }
}
</script>

<style scoped>
.comment {
  font-size: 14px;
  margin-bottom: 10px;
  border-radius: 18px;
  width: max-content;
  padding: 10px;
  background: #f0f2f5;
  width: inherit;
  display: inline-flex;
  flex-direction: column;
}
.header-comment {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}
.header-comment i {
  color: #b8c5d1;
  cursor: pointer;
}
.header-comment i:hover{
  color: #303133;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.fade2-enter-active, .fade2-leave-active {
  transition: opacity .4s
}
.fade2-enter, .fade2-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.el-dropdown-menu {
  border-radius: 8px;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background: #f0f2f5;
}
.comment-text {
  display: flex;
}
.el-button {
  height: min-content;
}
.edit-comment-buttons {
  display: flex;
  justify-content: flex-end;
}
form {
  display: inline-flex;
}
.commentInvalidEditMessage {
  position: static;
  padding-top: 6px;
}
</style>

<style>
.el-popconfirm__main {
  margin-bottom: 5px;
}
.comment-text .el-textarea textarea {
  padding: 0;
  background: #f0f2f5 !important;
  border: none !important;
  font-size: 14px;
  color: black;
  border-radius: 0 !important;
}
</style>
