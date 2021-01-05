<template>
  <div class="listPostComponent"
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="disabled"
  infinite-scroll-distance="15">
    <el-card v-for="(post, index) in posts" :key="index" :body-style="{ padding: '0px' }"
    class="box-card post-card">
      <div v-if="post.idUserShare !== 0"
      slot="header"
      :style="{ marginBottom: '10px' }"
      class="clearfix post-card-header">
        <div class="post-user"
        @click="showUserProfile(post.idUserShare, post.nameUserShare)">
          <el-avatar v-if="post.imageProfileUserShare !== null"
          :src="getUrlAvatarImage(post.imageProfileUserShare)"
          class="avatar"
          :size="25">
          </el-avatar>
          <el-avatar v-else
          :src="avatarDefault"
          :size="25"
          class="avatar"></el-avatar>
          <span class="nameUser">{{ post.nameUserShare }}</span>
        </div>
        <div class="post-date">
          <span>Compartido </span>
          <span>{{ getDate(post.dateShare) }}</span>
        </div>
      </div>
      <div slot="header" class="clearfix post-card-header">
        <div class="post-user"
        @click="showUserProfile(post.idUserOwner, post.nameUserOwner)">
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
      <p class="showPostById-action" @click="showPostById(post.idPost)" v-if="post.description !== ''" style="padding: 15px;">{{ post.description }}</p>
      <img @click="showPostById(post.idPost)" v-if="post.idTypePost === 1"
      :src="getImage(post.file)" alt=""
      width="100%" class="image showPostById-action">
      <video class="showPostById-action" @click="showPostById(post.idPost)" v-else-if="post.idTypePost === 2"
      width="100%"
      controls>
        <source :src="getVideo(post.file)" type="video/mp4">
      </video>
      <div :style="{ paddingLeft: '15px', paddingRight: '15px' }">
        <LikePostComponent :likeUserProp="post.likeUser" :numberLikesProp="post.numberLikes" :idPostProp="post.idPost"></LikePostComponent>
        <CommentComponent :idPost="post.idPost" :limitComments="2" :saveLimitComments="3"></CommentComponent>
      </div>
    </el-card>
    <!-- <NoMoreComponent :showNoMore="noMore"></NoMoreComponent> -->
    <!-- <SpinnerComponent :showSpinner="scrollLoading"></SpinnerComponent> -->
  </div>
</template>

<script>
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import { avatarMixin } from '@/mixins/Avatar.js'
import { commonMixin } from '@/mixins/Common.js'
// import NoMoreComponent from '@/components/NoMoreComponent.vue'
// import SpinnerComponent from '@/components/SpinnerComponent.vue'
import CommentComponent from '@/components/CommentComponent.vue'
import LikePostComponent from '@/components/LikePostComponent.vue'

export default {
  name: 'ListPostComponent',
  components: {
    // NoMoreComponent,
    // SpinnerComponent,
    CommentComponent,
    LikePostComponent
  },
  props: {
    idTypePost: {
      type: Number,
      default: 0
    },
    nameUser: String,
    fromProfile: Boolean
  },
  directives: {
    infiniteScroll
  },
  mixins: [avatarMixin, commonMixin],
  data () {
    return {
      posts: [],
      page: 1,
      totalRows: 0,
      disabled: false,
      full: false,
      executing: false,
      count: []
    }
  },
  computed: {
    scrollLoading () {
      return this.disabled
    },
    noMore () {
      return (this.posts).length >= this.totalRows
    }
  },
  methods: {
    async loadMore () {
      // Si no hay mas post no haga mas peticiones
      if (!this.full && !this.executing) {
        console.log(`Entro a consultar a la pagina ${this.page}`)
        this.disabled = true
        this.executing = true
        let url = ''
        if (this.fromProfile) {
          url = `http://julian1999-001-site1.btempurl.com/api/Post/GetPosts/${this.nameUser}/${this.page}/${this.idTypePost}/${this.$session.get('nameUser')}`
        } else {
          url = `http://julian1999-001-site1.btempurl.com/api/Post/GetPosts/${this.$session.get('nameUser')}/${this.page}`
        }
        await axios
          .get(url)
          .then(result => {
            if (result.data.success === 1) {
              const DATA = result.data.data
              this.totalRows = DATA.totalRows
              const POSTS = DATA.postList
              POSTS.forEach(post => {
                this.posts.push(post)
              })
              this.full = ((this.posts).length === this.totalRows)
              this.page = this.page + 1
            } else {
              console.error('Respuesta erronea!')
            }
          })
          .catch(error => {
            console.error(error)
          })
          .finally(() => {
            this.executing = false
            this.disabled = false
          })
      }
    },
    showPostById (idPost) {
      this.$router.push({ name: 'Post', params: { id: idPost } })
    }
  }
  // async mounted () {
  //   await this.loadMore()
  // }
}
</script>

<style scoped>
.post-card {
  margin-bottom: 15px;
}
.showPostById-action {
  cursor: pointer;
}
</style>

<style>
.post-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.post-user {
  display: flex;
  align-items: flex-end;
  cursor: pointer;
}
.post-date span {
  font-size: 14px;
  color: #828387;
}
.avatar {
  margin-right: 6px;
}
.nameUser {
  font-size: 15px;
  font-weight: 600;
}
</style>
