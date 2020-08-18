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
                              action="https://localhost:44377/api/User/ActionUpload"
                              :auto-upload="true"
                              :on-change="handleChange"
                              :before-upload="beforeAvatarUpload">
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
import { mapMutations } from 'vuex'
// Mixins
import { avatarMixin } from '@/mixins/Avatar.js'
import { commonMixin } from '@/mixins/Common.js'

export default {
  props: {
    fontSize: Number,
    marginTop: Number
  },
  mixins: [avatarMixin, commonMixin],
  data () {
    return {
      textareaTest: '',
      file: '',
      fileDetail: Object,
      userConfigModel: {
        ImageProfile: Object,
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
    handleChange (file) {
      this.userConfigModel.ImageProfile = file.raw
    },
    beforeAvatarUpload (file) {
      if (!this.validateExtensionImage(file.type)) {
        this.notifyError('!Ups', 'Formato de imagen no valido')
        return false
      }
      if (!this.validateSizeImage(file.size)) {
        this.notifyError('!Ups', 'Maximo 5MB para la imagen')
        return false
      }
      return true
    },
    submit (userConfigModel) {
      this.$refs[userConfigModel].validate(async (valid) => {
        if (valid) {
          (this.userConfigModel.imageProfile !== null || this.userConfigModel.NameUser !== null) ? this.saveUserConfig() : this.notifyError('Ups!', 'Ningun campo lleno :/')
        } else {
          this.notifyError('Ups!', 'Datos no validos revisa los campos')
        }
      })
    },
    async saveUserConfig () {
      if (this.$session.get('nameUser')) {
        await axios
          .post('https://localhost:44377/api/User/UserConfig', this.buildFormData())
          .then(result => {
            const DATARESPONSE = result.data.data
            this.$session.set('nameUser', DATARESPONSE.nameUser)
            if (DATARESPONSE.imageProfile !== null) {
              try {
                const AVATAR = this.getUrlAvatarImage(DATARESPONSE.imageProfile)
                this.$session.set('avatar', AVATAR)
                this.setImageProfile(this.$session.get('avatar'))
              } catch (e) {
                console.log(e)
              }
            }
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        console.error('No existe el token o no existe el nameUser en el token')
      }
    },
    validateExtensionImage (typeFile) {
      const EXTENSIONS = ['image/jpeg', 'image/jpg', 'image/png', 'image/x-icon', 'image/svg+xml', 'image/gif']
      return EXTENSIONS.some(extension => extension === typeFile)
    },
    validateSizeImage (size) {
      return size <= 5000000
    },
    buildFormData () {
      const FORMDATA = new FormData()
      FORMDATA.set('NameUserToken', this.$session.get('nameUser'))
      FORMDATA.set('NameUser', this.userConfigModel.NameUser)
      FORMDATA.set('ImageProfile', this.userConfigModel.ImageProfile)
      return FORMDATA
    },
    ...mapMutations(['setImageProfile'])
  }
}
</script>

<style scoped>
  .confirmButton {
    float: right;
  }
</style>
