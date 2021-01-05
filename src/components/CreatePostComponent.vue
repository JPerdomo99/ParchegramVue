<template>
  <div class="createPostComponent">
      <el-card class="box-card" v-loading="loading">
        <h4 class="titleNewPost">Nueva publicación</h4>
        <el-form
        :model="postModel"
        :rules="rules"
        ref="postModel">
          <el-form-item class="textarea-form-item" prop="Description">
            <el-input
            placeholder="Que estas pensando...?"
            type="textarea"
            v-model="postModel.Description"
            :rows="3"
            maxlength="500"
            show-word-limit
            class="postDescription">
            </el-input>
          </el-form-item>
          <el-form-item class="upload-file-form-item">
            <el-row type="flex" justify="space-between">
              <el-upload
              class="uploadButton"
              ref="fileUpload"
              :multiple="false"
              :limit="1"
              action="http://julian1999-001-site1.btempurl.com/api/Post/ActionUpload"
              :auto-upload="true"
              :on-change="handleChange"
              :before-upload="beforeFileUpload">
              <el-button icon="el-icon-upload2" circle></el-button>
              </el-upload>
              <el-button type="primary" class="upload" round @click="submit('postModel', 'fileUpload')">Publicar</el-button>
            </el-row>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import { commonMixin } from '@/mixins/Common.js'

export default {
  name: 'CreatePostComponent',
  mixins: [commonMixin],
  data () {
    return {
      rules: {
        Description: [
          { min: 0, max: 500, message: 'De 1 a 500 carácteres', trigger: ['blur', 'change'] }
        ]
      },
      postModel: {
        Description: '',
        File: Object,
        IdUser: 0,
        IdTypePost: 0
      }
    }
  },
  methods: {
    handleChange (file) {
      this.postModel.File = file.raw
    },
    beforeFileUpload (file) {
      if (!this.validateExtensionFile(file.type)) {
        this.notifyError('Ups!', 'Solo se permiten imagenes y videos')
        return false
      }
      if (!this.validateSizeFile(file.size, 8000000)) {
        this.notifyError('Ups!', 'Archivo demasiado pesado máximo 8MB')
        return false
      }
      return true
    },
    async submit (postModel, fileUpload) {
      this.$refs[postModel].validate(async (valid) => {
        if (valid) {
          await (Object.entries(this.postModel.File).length > 0 || this.postModel.Description !== '') ? this.savePost(postModel, fileUpload) : this.notifyError('Ups!', 'Escribe algo para tus amigos ;)')
        } else {
          this.notifyError('Ups!', 'Datos no validos revisa los campos')
        }
      })
    },
    async savePost (postModel, fileUpload) {
      this.defineTypePost()
      this.showLoading()
      if (this.$session.exists()) {
        await axios
          .post('http://julian1999-001-site1.btempurl.com/api/Post/Create', this.buildFormData())
          .then(result => {
            if (result.data.success === 1) {
              this.clearForm(postModel, fileUpload)
              this.resetPostModel()
              this.notifySuccess('Exito', 'Post publicado correctamente')
            } else {
              console.error(result.data.message)
              this.notifyError('Ups!', 'Hubieron problemas al publicar el post')
            }
          })
          .catch(error => {
            console.error(error)
            this.hiddenLoading()
            this.notifyError('Ups!', 'Ha ocurrido un error al publicar el post')
          })
          .finally(() => this.hiddenLoading())
      }
    },
    buildFormData () {
      const FORMDATA = new FormData()
      FORMDATA.set('Description', this.postModel.Description)
      FORMDATA.set('File', this.postModel.File)
      FORMDATA.set('NameUser', this.$session.get('nameUser'))
      FORMDATA.set('IdTypePost', this.postModel.IdTypePost)
      return FORMDATA
    },
    clearForm (postModel, fileUpload) {
      this.$refs[postModel].resetFields()
      this.$refs[fileUpload].clearFiles()
    },
    defineTypePost () {
      if (Object.entries(this.postModel.File).length > 0) {
        let re = /image/
        if (re.test(this.postModel.File.type)) {
          this.postModel.IdTypePost = 1
        } else {
          re = /video/
          this.postModel.IdTypePost = re.test(this.postModel.File.type) ? 2 : 0
        }
      } else {
        this.postModel.IdTypePost = 3
      }
    },
    resetPostModel () {
      const MODEL = this.postModel
      MODEL.Description = ''
      MODEL.File = Object
      MODEL.IdUser = 0
      MODEL.IdTypePost = 0
    }
  }
}
</script>

<style scoped>
.createPostComponent {
  margin-bottom: 22px;
}
</style>

<style>
.el-textarea__inner {
    background: #f9f9f9 !important;
    border: none !important;
    resize: none !important;
    border-radius: 25px !important;
}
.homeComponent {
  margin-top: 20px;
}
.titleNewPost {
  margin-bottom: 10px;
}
.textarea-form-item {
  margin-bottom: 10px !important;
}
.upload-file-form-item {
  margin-bottom: 0 !important;
}
.upload  {
  height: 38px;
}
.el-input__count {
  background: #f9f9f9 !important;
}
.el-card {
  border-radius: 15px !important;
}
.el-card__body {
  padding: 8px;
}
</style>
