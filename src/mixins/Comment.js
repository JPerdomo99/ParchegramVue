const axios = require('axios')

export const commentMixin = {
  data () {
    return {
      listComment: []
    }
  },
  methods: {
    async getListComment (limit) {
      await axios
        .get(`https://localhost:44377/api/Comment/Get/${this.idPost}/${limit}`)
        .then(result => {
          this.listComment = []
          const COMMENTS = JSON.parse(JSON.stringify(result.data.data))
          COMMENTS.forEach(comment => {
            this.listComment.push(comment)
          })
          this.$emit('setListCommentEvent', this.listComment)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
