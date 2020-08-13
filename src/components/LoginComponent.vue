<template>
    <div class="loginComponent">
      <el-col :span="11" :xs="24">
          <span :style="{ fontSize: fontSize + 'px' }">Ingresa!</span>
          <el-form :label-position="labelPosition" :model="loginModel" ref="loginModel" :rules="rules" :style="{ marginTop: marginTop + 'px' }">
              <el-form-item label="Usuario o correo electrónico" prop="NameUser">
                <el-input type="text" v-model="loginModel.NameUser"></el-input>
              </el-form-item>
              <el-form-item label="Contraseña" prop="Password">
                <el-input type="password" v-model="loginModel.Password" @keyup.enter="submit('loginModel')"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit('loginModel')">Ingresar</el-button>
              </el-form-item>
          </el-form>
          <CarouselLoginComponent :marginTop="20"></CarouselLoginComponent>
      </el-col>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import CarouselLoginComponent from '@/components/CarouselLoginComponent.vue'

export default {
  name: 'LoginComponent',
  components: {
    CarouselLoginComponent
  },
  props: {
    fontSize: Number,
    marginTop: Number,
    labelPosition: String
  },
  data () {
    return {
      loginModel: {
        NameUser: '',
        Password: ''
      },
      emailConfirm: false,
      userExits: false,
      rules: { // Validaciones del formulario
        NameUser: [
          { required: true, message: 'Ingresa tu usuario', trigger: ['blur', 'change'] },
          { min: 1, max: 40, message: 'De 1 a 40 carácteres', trigger: ['blur', 'change'] }
        ],
        Password: [
          { required: true, message: 'Ingresa tu contraseña', trigger: ['blur', 'change'] },
          { min: 8, max: 100, message: 'De 8 a 100 carácteres', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submit (loginModel) {
      this.$refs[loginModel].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          this.$message.error('Datos no validos')
        }
      })
    },
    async login () {
      const loginRequest = this.loginModel
      await axios
        .post('https://localhost:44377/api/User/UserExists', loginRequest)
        .then(result => {
          if (result.data.data === true) {
            axios
              .get(`https://localhost:44377/api/User/EmailConfirmed/${this.loginModel.NameUser}`)
              .then(result => {
                if (result.data.data === true) {
                  axios
                    .post('https://localhost:44377/api/User/Login', loginRequest)
                    .then(result => {
                      if (result.status === 200 && result.data.data.token) {
                        const dataResponse = result.data.data
                        const d = this
                        const s = d.$session
                        s.start()
                        s.set('jwt', dataResponse.token)
                        s.set('email', dataResponse.email)
                        s.set('nameUser', dataResponse.nameUser)
                        if (dataResponse.imageProfile !== null) {
                          const avatar = d.getUrlAvatarImage(dataResponse.imageProfile)
                          s.set('avatar', avatar)
                          d.setImageProfile(s.get('avatar'))
                        }
                        d.$router.push({ name: 'Home' })
                        d.loginNav()
                      }
                    })
                    .catch(error => {
                      console.log(error)
                      if (error.response.data.success === 0) {
                        this.$message.error('Oops, Ha ocurrido un error')
                      }
                    })
                } else {
                  this.$notify({
                    title: 'Oops!',
                    message: 'El email no se ha verificado, revisa tu correo',
                    position: 'bottom-right',
                    offset: 100,
                    duration: 4500,
                    type: 'warning'
                  })
                }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.$notify.error({
              title: 'Oops!',
              message: 'Datos incorrectos',
              position: 'bottom-right',
              offset: 100,
              duration: 4500
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getUrlAvatarImage (imageProfile) {
      const avatarBlob = `data:image/png;base64,${imageProfile}`
      return avatarBlob
    },
    ...mapMutations(['loginNav', 'logoutNav', 'setImageProfile'])
  },
  mounted () {
    this.logoutNav()
  }
}
</script>

<style>

</style>
