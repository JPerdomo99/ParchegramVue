export const commonMixin = {
  data () {
    return {
      loading: false,
      test1: 123,
      imageExtensions: ['image/jpeg', 'image/jpg', 'image/png', 'image/x-icon', 'image/svg+xml', 'image/gif'],
      videoExtensions: ['video/mp4', 'video/x-ms-wmv', 'video/3gpp', 'video/avi'],
      heartRegular: require('@/assets/svg/heart-regular.svg'),
      heartSolid: require('@/assets/svg/heart-solid.svg')
    }
  },
  methods: {
    notifyError (title, message) {
      this.$notify.error({
        title: title,
        message: message
      })
    },
    notifySuccess (title, message) {
      this.$notify({
        title: title,
        message: message,
        type: 'success'
      })
    },
    showLoading () {
      this.loading = true
    },
    hiddenLoading () {
      this.loading = false
    },
    validateExtensionFile (typeFile) {
      return this.imageExtensions.concat(this.videoExtensions).some(extension => extension === typeFile)
    },
    validateExtensionImage (typeFile) {
      return this.imageExtensions.some(extension => extension === typeFile)
    },
    validateSizeFile (size, limit) {
      return size <= limit
    },
    getImage (image) {
      const imageBlob = `data:image/png;base64,${image}`
      return imageBlob
    }
  }
}
