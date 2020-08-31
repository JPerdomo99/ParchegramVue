<template>
  <div class="userConfigComponent">
    <el-container>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
                    <el-card shadow="never" v-loading="loading">
                      <span :style="{ fontSize: fontSize + 'px' }">Ajusta tu cuenta!</span>
                      <el-form
                      :model="userConfigModel"
                      ref="userConfigModel"
                      :rules="rules"
                      :style="{ marginTop: marginTop + 'px' }"
                      label-width="140px">
                        <el-form-item label="Foto de perfil">
                          <el-row type="flex" justify="center">
                            <el-upload
                            list-type="picture-card"
                            ref="avatarUpload"
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
                          <el-button round type="primary" @click="submit('userConfigModel', 'avatarUpload')" class="confirmButton">Confirmar</el-button>
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
      userConfigModel: {
        ImageProfile: Object,
        NameUser: ''
      },
      labelPosition: 'left',
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
        this.notifyError('Ups!', 'Formato de imagen no valido')
        return false
      }
      if (!this.validateSizeFile(file.size, 5000000)) {
        this.notifyError('Ups!', 'Máximo 5MB para la imagen')
        return false
      }
      return true
    },
    submit (userConfigModel, avatarUpload) {
      this.$refs[userConfigModel].validate(async (valid) => {
        if (valid) {
          (Object.entries(this.userConfigModel.ImageProfile).length > 0 || this.userConfigModel.NameUser !== '') ? this.saveUserConfig(userConfigModel, avatarUpload) : this.notifyError('Ups!', 'Ningun campo lleno :/')
        } else {
          this.notifyError('Ups!', 'Datos no validos revisa los campos')
        }
      })
    },
    async saveUserConfig (userConfigModel, avatarUpload) {
      this.showLoading()
      if (this.$session.get('nameUser')) {
        await axios
          .post('https://localhost:44377/api/User/UserConfig', this.buildFormData())
          .then(result => {
            // Respuesta exitosa
            if (result.data.success === 1) {
              this.clearForm(userConfigModel, avatarUpload)
              this.resetUserConfigModel()
              const DATARESPONSE = result.data.data
              this.$session.set('nameUser', DATARESPONSE.nameUser)
              if (DATARESPONSE.imageProfile !== null) {
                try {
                  const AVATAR = this.getUrlAvatarImage(DATARESPONSE.imageProfile)
                  this.$session.set('avatar', AVATAR)
                  this.setImageProfile(this.$session.get('avatar'))
                  this.notifySuccess('Enhorabuena!', 'Cuenta configurada correctamente')
                } catch (e) {
                  console.error(e)
                }
              }
            } else {
              console.error(result.data.message)
            }
          })
          .catch(error => {
            console.error(error)
            this.hiddenLoading()
            this.notifyError('Ups!', 'Ha ocurrido un error al guardar la configuración del usuario')
          })
          .finally(() => this.hiddenLoading())
      } else {
        console.error('No existe el token o no existe el nameUser en el token')
        this.hiddenLoading()
        this.notifyError('Ups!', 'Al parecer no existe la sesión')
      }
    },
    buildFormData () {
      const FORMDATA = new FormData()
      FORMDATA.set('NameUserToken', this.$session.get('nameUser'))
      FORMDATA.set('NameUser', this.userConfigModel.NameUser)
      FORMDATA.set('ImageProfile', this.userConfigModel.ImageProfile)
      return FORMDATA
    },
    clearForm (userConfigModel, avatarUpload) {
      this.$refs[userConfigModel].resetFields()
      this.$refs[avatarUpload].clearFiles()
    },
    resetUserConfigModel () {
      const MODEL = this.userConfigModel
      MODEL.ImageProfile = Object
      MODEL.NameUser = ''
    },
    ...mapMutations(['setImageProfile'])
  },
  mounted () {
    const songRoute = require('@/assets/Baseball Case - Backing Tracks [No Copyright Music].mp3')
    const song = new Audio(songRoute)
    song.play()
  }
}
</script>

<style scoped>
  .confirmButton {
    float: right;
  }
</style>
