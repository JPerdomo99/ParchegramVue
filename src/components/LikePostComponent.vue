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
      await this.addLikeOperation()
    },
    deleteLike () {
      this.deleteLikeOperation()
    },
    async addLikeOperation () {

    },
    deleteLikeOperation () {

    },
    addLikeSet () {
      this.likeUser = true
      this.numberLikes += 1
    },
    deleteLikeSet () {
      this.likeUser = false
      this.numberLikes -= 1
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
    padding-left: 15px;
    padding-right: 5px;
    cursor: pointer;
  }
</style>>
