<template>
  <div class="commentComponent">
    <el-form
    :model="commentModel"
    :rules="rules"
    ref="commentModel"
    v-loading="loading"
    @submit.native.prevent="submit('commentModel')">
      <el-form-item prop="CommentText" class="form-item-container">
        <el-input
        placeholder="Comenta aqui..."
        v-model="commentModel.CommentText"
        :rows="1">
        </el-input>
      </el-form-item>
      <el-button
      type="primary"
      icon="el-icon-position button-send-comment"
      circle
      @click="submit('commentModel')">
      </el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { commonMixin } from '@/mixins/Common.js'
import { commentMixin } from '@/mixins/Comment.js'

export default {
  name: 'PostCommentComponent',
  mixins: [commonMixin, commentMixin],
  props: {
    idPost: Number
  },
  data () {
    var lenCommentText = (rule, value, callback) => {
      return this.lenComment(value, callback)
    }
    return {
      commentModel: {
        CommentText: '',
        NameUser: '',
        IdPost: 0
      },
      rules: {
        CommentText: [
          { validator: lenCommentText, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submit (commentModel) {
      this.$refs[commentModel].validate(async (valid) => {
        if (!valid) {
          this.notifyError('Ups!', 'Revisa tu comentario')
          return false
        }
        if (this.$session.exists()) {
          this.buildBody()
          await this.saveComment()
        } else {
          this.notifyError('Ups!', 'No existe la sesión de usuario')
          return false
        }
      })
    },
    async saveComment () {
      this.showLoading()
      await axios
        .post('https://localhost:44377/api/Comment/Create', this.commentModel)
        .then(result => {
          if (result.data.success === 1) {
            this.getListComment(3)
          } else {
            console.error(result.data.message)
            this.notifyError('Ups!', 'Hubieron problemas al publicar el comentario')
          }
        })
        .catch(error => {
          console.error(error)
          this.notifyError('Ups!', 'Ha ocurrido un error al publicar el comentario')
        })
        .finally(() => {
          this.commentModel.CommentText = ''
          this.hiddenLoading()
        })
    },
    buildBody () {
      this.commentModel.NameUser = this.getNameUser()
      this.commentModel.IdPost = this.idPost
    }
  },
  async mounted () {
    await this.getListComment(2)
  }
}
</script>

<style scoped>
  form {
    display: flex;
  }
  form .el-form-item {
    width: 94%;
  }
  .el-button {
    height: min-content;
    margin-left: 1%;
  }
</style>

<style>
.commentComponent .el-form .el-form-item .el-form-item__content .el-input .el-input__inner {
  background: #f0f2f5 !important;
  border: none !important;
  border-radius: 25px !important;
}
</style>
