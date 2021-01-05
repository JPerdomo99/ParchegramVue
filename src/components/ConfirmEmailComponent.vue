<template>
  <div></div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ConfirmEmailComponent',
  data () {
    return {
    }
  },
  methods: {
    confirmEmail () {
      const codeConfirmEmail = this.$route.params.codeConfirmEmail
      axios
        .post('http://julian1999-001-site1.btempurl.com/api/User/ConfirmEmail',
          JSON.stringify(codeConfirmEmail),
          { headers: { 'Content-Type': 'application/json' } })
        .then(result => {
          if (result.status === 200) {
            this.$router.push({ name: 'Authentication' })
            this.$notify({
              title: 'Exito!',
              message: 'Se ha activado correctamente tu cuenta ya te puedes logear',
              position: 'bottom-right',
              type: 'success',
              offset: 100,
              duration: 9000
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.$router.push({ name: 'Authentication' })
          this.$notify.error({
            title: 'Oops!',
            message: 'No se ha podido activar la cuenta, ponte en contacto con soporte',
            position: 'bottom-right',
            offset: 100,
            duration: 9000
          })
        })
    }
  },
  mounted () {
    this.confirmEmail()
  }
}
</script>

<style>

</style>
