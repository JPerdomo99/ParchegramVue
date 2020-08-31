<template>
    <div class="registerComponent">
        <el-col :span="11" :xs="24">
            <span :style="{ fontSize: fontSize + 'px' }">Registráte!</span>
            <el-form :label-position="labelPosition" :model="registerModel" ref="registerModel" :rules="rules">
                <el-form-item label="Usuario" prop="NameUser">
                  <el-input type="text" v-model="registerModel.NameUser"></el-input>
                </el-form-item>
                <el-form-item label="Correo" prop="Email">
                  <el-input type="text" v-model="registerModel.Email"></el-input>
                </el-form-item>
                <el-form-item label="Fecha de nacimiento" prop="DateBirth">
                  <el-date-picker type="date" v-model="registerModel.DateBirth" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="Contraseña" prop="Password">
                  <el-input type="password" v-model="registerModel.Password"></el-input>
                </el-form-item>
                <el-form-item label="Repite la contraseña" prop="PasswordRepeat">
                  <el-input type="password" v-model="registerModel.PasswordRepeat"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submit('registerModel')">Crear cuenta</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterComponent',
  props: {
    fontSize: Number,
    labelPosition: String
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value !== this.registerModel.Password) {
        callback(new Error('Las contraseñas no coinciden'))
      } else {
        callback()
      }
    }
    var validateMaxDate = (rule, value, callback) => {
      if (value > new Date()) {
        callback(new Error('Oops, ese tiempo no ha llegado'))
      } else {
        callback()
      }
    }
    return {
      registerModel: {
        NameUser: '',
        Email: '',
        DateBirth: '',
        Password: '',
        PasswordRepeat: ''
      },
      rules: {
        NameUser: [
          { required: true, message: 'Ingresa tu usuario', trigger: ['blur', 'change'] },
          { min: 1, max: 40, message: 'De 1 a 40 carácteres', trigger: ['blur', 'change'] }
        ],
        Email: [
          { required: true, message: 'Ingresa tu correo', trigger: ['blur', 'change'] },
          { min: 5, max: 100, message: 'De 8 a 100 carácteres', trigger: ['blur', 'change'] },
          { type: 'email', message: 'Correo invalido', trigger: ['blur', 'change'] }
        ],
        DateBirth: [
          { required: true, message: 'Fecha de nacimiento requerida', trigger: ['blur', 'change'] },
          { type: 'date', message: 'Formato de fecha invalido', trigger: ['blur', 'change'] },
          { validator: validateMaxDate, trigger: ['blur', 'change'] }
        ],
        Password: [
          { required: true, message: 'Ingresa tu contraseña', trigger: ['blur', 'change'] },
          { min: 8, max: 100, message: 'De 8 a 100 carácteres', trigger: ['blur', 'change'] }
        ],
        PasswordRepeat: [
          { required: true, message: 'Ingrese la contraseña una vez mas', triger: ['blur', 'change'] },
          { validator: validatePass, triger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submit (registerModel) {
      this.$refs[registerModel].validate((valid) => {
        if (valid) {
          this.register()
        } else {
          this.$message.error('Osh, Datos invalidos')
        }
      })
    },
    register () {
      const registerRequest = this.registerModel
      axios
        .get(`https://localhost:44377/api/User/NameUserUnique/${registerRequest.NameUser}`)
        .then(result => {
          if (result.data.data === true) {
            axios
              .get(`https://localhost:44377/api/User/EmailUnique/${registerRequest.Email}`)
              .then(result => {
                if (result.data.data === true) {
                  axios
                    .post('https://localhost:44377/api/User/Register', registerRequest)
                    .then(result => {
                      if (result.data.succes === 1) {
                        this.$notify({
                          title: 'Exito!',
                          message: 'Te has registrado exitosamente, ahora revisa tu correo para confirmar tu cuenta',
                          position: 'bottom-right',
                          type: 'success',
                          offset: 100,
                          duration: 18000
                        })
                      }
                    })
                    .catch(error => {
                      console.error(error)
                      this.$message.error('Oops, ha ocurrido un error')
                    })
                } else {
                  this.$notify.error({
                    title: 'Oops!',
                    message: 'Ya hay un usuario con este correo',
                    position: 'bottom-right',
                    offset: 100,
                    duration: 4500
                  })
                }
              })
              .catch(error => {
                console.error(error)
              })
          } else {
            this.$notify.error({
              title: 'Oops!',
              message: 'El nombre de usuario ya esta ocupado, intenta con otro',
              position: 'bottom-right',
              offset: 100,
              duration: 4500
            })
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>

</style>
