export const commonMixin = {
  methods: {
    notifyError (title, message) {
      this.$notify.error({
        title: title,
        message: message
      })
    }
  }
}
