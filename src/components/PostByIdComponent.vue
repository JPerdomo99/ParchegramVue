<template>
  <div class="postByIdComponent">
    <el-card v-for="(post, index) in posts" :key="index"
    :body-style="{ padding: '0px' }"
    class="box-card post-card">
      <div slot="header" class="clearfix post-card-header">
        <div class="post-user">
          <el-avatar v-if="post.imageProfileUserOwner !== null"
          :src="getUrlAvatarImage(post.imageProfileUserOwner)"
          class="avatar" :size="25"></el-avatar>
          <el-avatar v-else :size="25" :src="avatarDefault"
          class="avatar"></el-avatar>
          <span class="nameUser">{{ post.nameUserOwner }}</span>
          </div>
        <div class="post-date">
          <span>{{ getDate(post.date) }}</span>
        </div>
      </div>
      <p v-if="post.description !== ''" style="padding: 15px;">{{ post.description }}</p>
      <img v-if="post.idTypePost === 1"
      :src="getImage(post.file)" alt=""
      width="100%" class="image">
      <div :style="{ paddingLeft: '15px', paddingRight: '15px' }">
        <LikePostComponent :likeUserProp="post.likeUser" :numberLikesProp="post.numberLikes" :idPostProp="post.idPost"></LikePostComponent>
        <CommentComponent :idPost="post.idPost"></CommentComponent>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { avatarMixin } from '@/mixins/Avatar.js'
import { commonMixin } from '@/mixins/Common.js'
import CommentComponent from '@/components/CommentComponent.vue'
import LikePostComponent from '@/components/LikePostComponent.vue'

export default {
  name: 'PostByIdComponent',
  components: {
    CommentComponent,
    LikePostComponent
  },
  directives: {
    moment
  },
  mixins: [avatarMixin, commonMixin],
  data () {
    return {
      post: {
        idPost: 0,
        datePost: '',
        idTypePost: 0,
        description: '',
        file: '',
        idUserOwner: 0,
        nameUserOwner: '',
        imageProfileUserOwner: '',
        likeUser: Object,
        numberLikes: 0
      }
    }
  }
}
</script>

<style>

</style>
