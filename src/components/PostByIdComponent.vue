<template>
  <div class="postByIdComponent">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        <el-card
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
            <LikePostComponent
            v-if="showLike"
            :likeUserProp="post.likeUser"
            :numberLikesProp="post.numberLikes"
            :idPostProp="post.idPost">
            </LikePostComponent>
            <CommentComponent :idPost="post.idPost"></CommentComponent>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
  props: {
    id: Number
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
        likeUser: false,
        numberLikes: 0
      },
      showLike: false
    }
  },
  methods: {
    async getPost () {
      await axios
        .get(`https://localhost:44377/api/Post/GetPostById/${this.id}`)
        .then(result => {
          console.log(result)
          this.setModel(result.data.data)
          this.showLike = true
        })
        .catch(error => {
          console.error(error)
        })
    },
    setModel (data) {
      this.post.idPost = data.idPost
      this.post.datePost = data.date
      this.post.idTypePost = data.idTypePost
      this.post.description = data.description
      this.post.file = data.file
      this.post.idUserOwner = data.idUserOwner
      this.post.nameUserOwner = data.nameUserOwner
      this.post.likeUser = data.likeUser
      this.post.numberLikes = data.numberLikes
    }
  },
  async mounted () {
    await this.getPost()
  }
}
</script>

<style>

</style>
