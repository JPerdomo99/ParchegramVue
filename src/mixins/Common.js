const moment = require('moment')

export const commonMixin = {
  data () {
    return {
      loading: false,
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
      const IMAGEBLOB = `data:image/png;base64,${image}`
      return IMAGEBLOB
    },
    getVideo (video) {
      const VIDEOBLOB = `data:video/mp4;base64,${video}`
      return VIDEOBLOB
    },
    getNameUser () {
      return this.$session.get('nameUser')
    },
    getDate (date) {
      return moment(date, 'YYYY-MM-DDTHH:mm:ss.SSS', 'es').fromNow()
    },
    getAge (date) {
      const A = moment()
      const B = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSS')
      return moment.duration(A.diff(B))._data.years
    },
    showUserProfile (idUser, nameUser) {
      this.$router.push({ name: 'Profile', params: { id: idUser, user: nameUser } })
    }
  }
}
