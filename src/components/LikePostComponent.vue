<template>
  <div class="likePostComponent">
    <div class="likes">
      <img v-if="likeUser" :src="heartSolid"
      @click="deleteLike()"
      class="heart">
      <img v-else :src="heartRegular"
      @click="addLike()"
      class="heart">
      <span v-if="numberLikes === 1">1 like</span>
      <span v-else-if="numberLikes === 0 || numberLikes > 1">{{ numberLikes }} likes</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { commonMixin } from '@/mixins/Common.js'

export default {
  name: 'LikePostComponent',
  mixins: [commonMixin],
  props: {
    likeUserProp: Boolean,
    numberLikesProp: Number,
    idPostProp: Number
  },
  data () {
    return {
      likeUser: false,
      numberLikes: 0,
      idPost: 0
    }
  },
  methods: {
    async addLike () {
      this.addLikeSet()
      await axios
        .post('https://localhost:44377/api/Like/Add', this.buildModel())
        .then(result => {
          if (result.data.success !== 1) {
            this.deleteLikeSet()
            console.log(result.data.message)
            this.notifyError('Ups!', 'No se ha podido agregar el like')
          }
        })
        .catch(error => {
          this.deleteLikeSet()
          console.error(error)
          this.notifyError('Ups!', 'Ha ocurrido un error al tratar de agregar el like')
        })
    },
    async deleteLike () {
      this.deleteLikeSet()
      await axios
        .delete(`https://localhost:44377/api/Like/Delete/${this.idPost}/${this.$session.get('nameUser')}`)
        .then(result => {
          if (result.data.success !== 1) {
            this.addLikeSet()
            console.log(result.data.message)
            this.notifyError('Ups!', 'No se ha podido eliminar el like')
          }
        })
        .catch(error => {
          this.addLikeSet()
          console.error(error)
          this.notifyError('Ups!', 'Ha ocurrido un error al tratar de eliminar el like')
        })
    },
    addLikeSet () {
      this.likeUser = true
      this.numberLikes += 1
    },
    deleteLikeSet () {
      this.likeUser = false
      this.numberLikes -= 1
    },
    buildModel () {
      const likeRequest = {
        idPost: this.idPost,
        nameUser: this.$session.get('nameUser')
      }
      return likeRequest
    }
  },
  mounted () {
    this.likeUser = this.likeUserProp
    this.numberLikes = this.numberLikesProp
    this.idPost = this.idPostProp
  }
}
</script>

<style scoped>
  .likes {
    display: flex;
    align-items: flex-end;
    padding-bottom: 5px;
  }
  .heart {
    width: 20px;
    padding-right: 5px;
    cursor: pointer;
  }
</style>>
