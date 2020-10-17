<template>
  <div class="postByIdComponent">
    <transition name="fade">
      <el-row v-if="show" type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
          <el-card
          :body-style="{ padding: '0px' }"
          class="box-card post-card">
            <div slot="header" class="clearfix post-card-header">
              <div class="post-user">
                <el-avatar v-if="post.imageProfileUserOwner !== null"
                :src="getUrlAvatarImage(post.imageProfileUserOwner)"
                class="avatar"
                :size="25">
                </el-avatar>
                <el-avatar v-else
                :src="avatarDefault"
                :size="25"
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
              <CommentComponent :idPost="id" :limitComments="0" :saveLimitComments="0"></CommentComponent>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </transition>
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
        date: '',
        idTypePost: 0,
        description: '',
        file: '',
        idUserOwner: 0,
        nameUserOwner: '',
        imageProfileUserOwner: null,
        likeUser: false,
        numberLikes: 0
      },
      showLike: false,
      show: false
    }
  },
  methods: {
    async getPost () {
      await axios
        .get(`https://localhost:44377/api/Post/GetPostById/${this.id}`)
        .then(result => {
          this.setModel(result.data.data)
          this.showLike = true
        })
        .catch(error => {
          console.error(error)
        })
    },
    setModel (data) {
      this.post.idPost = data.idPost
      this.post.date = data.date
      this.post.idTypePost = data.idTypePost
      this.post.description = data.description
      this.post.file = data.file
      this.post.idUserOwner = data.idUserOwner
      this.post.nameUserOwner = data.nameUserOwner
      this.post.imageProfileUserOwner = data.imageProfileUserOwner
      this.post.likeUser = data.likeUser
      this.post.numberLikes = data.numberLikes
    }
  },
  async mounted () {
    await this.getPost()
    this.show = true
  }
}
</script>

<style scoped>
.postByIdComponent {
  margin-top: 20px;
  margin-bottom: 20px;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  transition: opacity 1s;
}
</style>
