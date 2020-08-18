export const avatarMixin = {
  methods: {
    getUrlAvatarImage (imageProfile) {
      const avatarBlob = `data:image/png;base64,${imageProfile}`
      return avatarBlob
    }
  }
}
