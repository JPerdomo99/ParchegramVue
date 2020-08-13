<template>
  <div class="userConfigComponent">
    <el-container>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
                    <el-card shadow="never">
                      <span :style="{ fontSize: fontSize + 'px' }">Ajusta tu cuenta!</span>
                      <el-form :model="userConfigModel" ref="userConfigModel" :rules="rules" :style="{ marginTop: marginTop + 'px' }" label-width="140px">
                          <el-form-item label="Foto de perfil">
                            <el-row type="flex" justify="center">
                            <el-upload
                              list-type="picture-card"
                              :multiple="false"
                              :limit="1"
                              action=""
                              :auto-upload="false"
                              :on-remove="handleRemove"
                              :on-change="handleChange">
                              <i class="el-icon-plus"></i>
                            </el-upload>
                            </el-row>
                          </el-form-item>
                          <el-form-item label="Nombre de usuario" prop="NameUser">
                            <el-input v-model="userConfigModel.NameUser"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button round type="primary" @click="submit('userConfigModel')" class="confirmButton">Confirmar</el-button>
                          </el-form-item>
                      </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    fontSize: Number,
    marginTop: Number
  },
  data () {
    return {
      textareaTest: '',
      file: '',
      fileDetail: Object,
      userConfigModel: {
        ImageProfile: null,
        NameUser: ''
      },
      labelPosition: 'left',
      uploadedFile: false,
      rules: {
        NameUser: [
          { min: 1, max: 40, message: 'De 1 a 40 carácteres', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.userConfigModel.ImageProfile = Object
    },
    handleChange (file, fileList) {
      console.log(file)
      console.log('Cambio')
      this.fileDetail = file.raw
      this.userConfigModel.ImageProfile = file.raw
    },
    submit (userConfigModel) {
      debugger
      if (this.userConfigModel.ImageProfile !== null) {
        console.log('File lleno')
        const resultValidateExtensionImage = this.validateExtImage(this.userConfigModel.ImageProfile.type)
        console.log(`Resultado de la validación ${resultValidateExtensionImage}`)
        if (!resultValidateExtensionImage) {
          this.$notify.error({
            title: 'Ups!',
            message: 'Extensión de imagen no válida',
            duration: 9000
          })
        }
      }
      this.$refs[userConfigModel].validate((valid) => {
        if (valid) {
          this.saveUserConfig()
        } else {
          this.$notify.error({
            title: 'Ups!',
            message: 'Datos no validos revisa los campos'
          })
        }
      })
    },
    async saveUserConfig () {
      const configUserRequest = new FormData()
      if (this.$session.get('nameUser')) {
        configUserRequest.append('NameUserToken', this.$session.get('nameUser'))
        configUserRequest.append('NameUser', this.userConfigModel.NameUser)
        configUserRequest.append('ImageProfile', this.userConfigModel.ImageProfile)
        await axios
          .post('https://localhost:44377/api/User/UserConfig', configUserRequest)
          .then(result => {
            debugger
            console.log(result)
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        console.error('No existe el token o no existe el nameUser en el token')
      }
    },
    validateExtImage (typeFile) {
      // typefile example = "image/jpeg"
      const extensions = ['image/jpeg', 'image/jpg',
        'image/png', 'image/x-icon', 'image/svg+xml',
        'image/gif']
      let resultValidation = false
      for (let index = 0; index < extensions.length; index++) {
        const element = extensions[index]
        if (element === typeFile) {
          resultValidation = true
          break
        }
      }
      return resultValidation
    }
  }
}
</script>

<style scoped>
  .confirmButton {
    float: right;
  }
</style>
