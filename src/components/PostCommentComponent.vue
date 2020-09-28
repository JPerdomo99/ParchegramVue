<template>
  <div class="commentComponent">
    <el-form
    :model="commentModel"
    ref="commentModel"
    :rules="rules"
    class="form-comment"
    v-loading="loading"
    @submit.native.prevent="submit('commentModel')">
      <el-form-item prop="CommentText">
        <el-input
        placeholder="Comenta aqui..."
        v-model="commentModel.CommentText"
        :rows="1"
        maxlength="1200"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { commonMixin } from '@/mixins/Common.js'
import { CommentMixin } from '@/mixins/Comment.js'

export default {
  name: 'PostCommentComponent',
  mixins: [commonMixin, CommentMixin],
  props: {
    idPost: Number
  },
  data () {
    var lenCommentText = (rule, value, callback) => {
      if (value.length === 0) return callback(new Error('Dejale saber que piensas🤔'))
      if (value.length > 500) return callback(new Error('Piensas demasiado🧠'))
    }
    return {
      listComment: [],
      commentModel: {
        CommentText: '',
        NameUser: '',
        IdPost: 0
      },
      rules: {
        CommentText: [
          { validator: lenCommentText, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async submit (commentModel) {
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
      this.commentModel.NameUser = this.$session.get('nameUser')
      this.commentModel.IdPost = this.idPost
    }
  },
  async mounted () {
    await this.getListComment(2)
  }
}
</script>

<style>
.commentComponent .el-form .el-form-item .el-form-item__content .el-input .el-input__inner {
  background: #f0f2f5 !important;
  border: none !important;
  border-radius: 25px !important;
}
</style>
