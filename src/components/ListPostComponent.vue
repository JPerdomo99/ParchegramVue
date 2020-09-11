<template>
  <div class="listPostComponent"
  v-infinite-scroll="loadMore"
  :infinite-scroll-disabled="disabled">
    <el-card v-for="post in posts" :key="post.idPost"
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
      <LikePostComponent :likeUserProp="post.likeUser" :numberLikesProp="post.numberLikes" :idPostProp="post.idPost"></LikePostComponent>
    </el-card>
    <p v-if="noMore" class="no-more">No hay mas publicaciones para mostrar</p>
    <SpinnerComponent :showSpinner="scrollLoading"></SpinnerComponent>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'
import { avatarMixin } from '@/mixins/Avatar.js'
import { commonMixin } from '@/mixins/Common.js'
import LikePostComponent from '@/components/LikePostComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

export default {
  name: 'ListPostComponent',
  components: {
    LikePostComponent,
    SpinnerComponent
  },
  directives: {
    infiniteScroll,
    moment
  },
  mixins: [avatarMixin, commonMixin],
  data () {
    return {
      posts: [],
      page: 0,
      totalRows: 0,
      disabled: false,
      full: false
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
      if (!this.full) {
        this.page++
        this.disabled = true
        await axios
          .get(`https://localhost:44377/api/Post/GetPosts/${this.$session.get('nameUser')}/${this.page}`)
          .then(result => {
            console.log(result)
            if (result.data.success === 1) {
              this.totalRows = result.data.data.totalRows
              const posts = result.data.data.postList
              posts.forEach(post => {
                this.posts.push(post)
              })
              this.full = ((this.posts).length === this.totalRows)
              this.disabled = false
              this.page = result.data.data.currentPage
            } else {
              console.log('Respuesta erronea!')
              this.disabled = false
            }
          })
          .catch(error => {
            console.error(error)
          })
          .finally(() => {
            this.disabled = false
          })
      }
    },
    getDate (date) {
      return moment(date, 'YYYY-MM-DDTHH:mm:ss.SSS', 'es').fromNow()
    }
  },
  async mounted () {
    await this.loadMore()
  }
}
</script>

<style scoped>
  .post-card {
    margin-top: 15px !important;
  }
  .post-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .post-user {
    display: flex;
    align-items: flex-end;
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
  .no-more {
    text-align: center;
    padding: 25px;
    font-size: 20px;
    color: #828387;
  }
</style>
