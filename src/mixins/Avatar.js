export const avatarMixin = {
  data () {
    return {
      avatarDefault: require('@/assets/avatarDefault.png')
    }
  },
  methods: {
    getUrlAvatarImage (imageProfile) {
      const avatarBlob = `data:image/png;base64,${imageProfile}`
      return avatarBlob
    }
  }
}
