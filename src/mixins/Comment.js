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
        .get(`http://julian1999-001-site1.btempurl.com/api/Comment/Get/${this.idPost}/${limit}`)
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
    },
    lenComment (value, callback) {
      if (value.length === 0) {
        return callback(new Error('Dejale saber que piensas🤔'))
      } else if (value.length > 500) {
        return callback(new Error('Piensas demasiado🧠'))
      } else {
        return callback()
      }
    }
  }
}
