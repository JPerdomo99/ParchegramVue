<template>
  <div class="commentComponent">
    <el-form
    :model="commentModel"
    ref="commentModel"
    :rules="rules"
    class="form-comment">
      <el-form-item prop="CommentText">
        <el-input
        type="textarea"
        v-model="commentModel.CommentText"
        :rows="1"
        maxlength="1200"
        @keyup.enter.native="submit('commentModel')"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { commonMixin } from '@/mixins/Common.js'

export default {
  name: 'CommentComponent',
  mixins: [commonMixin],
  props: {
    idPost: Number
  },
  data () {
    return {
      commentModel: {
        CommentText: '',
        NameUser: '',
        IdPost: 0
      },
      rules: {
        CommentText: [
          { min: 1, max: 1200, message: 'Minimo 1 carácter, maximo 1200', trigger: ['blur', 'change'] }
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
        await this.saveComment()
      })
    },
    async saveComment () {
      if (!this.$session.exists()) {
        return false
      }
      this.buildBody()
      await axios
        .post('https://localhost:44377/api/Comment/Create', this.commentModel())
        .then(result => {
          if (result.data.success !== 1) {
            console.log(result.data.message)
            this.notifyError('Ups!', 'Hubieron problemas al publicar el comentario')
          }
        })
        .catch(error => {
          console.log(error)
          this.notifyError('Ups!', 'Ha ocurrido un error al publicar el comentario')
        })
    },
    buildBody () {
      this.commentModel.NameUser = this.$session.get('nameUser')
      this.commentModel.IdPost = this.idPost
    }
  }
}
</script>

<style scoped>
.form-comment {
    padding-left: 15px;
    padding-right: 15px;
}
</style>>
