<template>
    <div class="listPostComponent">
      <h3>{{ saludo }}</h3>
      <el-card v-for="post in listPost" :key="post.idPost"
      :body-style="{ padding: '0px' }"
      class="box-card post-card">
        <div slot="header" class="clearfix post-card-header">
          <el-avatar v-if="post.imageProfileUserOwner !== null"
          :src="getUrlAvatarImage(post.imageProfileUserOwner)"
          class="avatar"></el-avatar>
          <el-avatar v-else :size="25" :src="avatarDefault"
          class="avatar"></el-avatar>
          <span class="nameUser">{{ post.nameUserOwner }}</span>
        </div>
        <p v-if="post.description !== ''" style="padding: 15px;">{{ post.description }}</p>
        <img v-if="post.idTypePost === 1"
        :src="getImage(post.file)" alt=""
        width="100%" class="image">
        <LikePostComponent :likeUserProp="post.likeUser" :numberLikesProp="post.numberLikes" :idPostProp="post.idPost"></LikePostComponent>
      </el-card>
      <button @click="getPostList()">Obtener post</button>
    </div>
</template>

<script>
import axios from 'axios'
import { avatarMixin } from '@/mixins/Avatar.js'
import { commonMixin } from '@/mixins/Common.js'
import LikePostComponent from '@/components/LikePostComponent.vue'

export default {
  name: 'ListPostComponent',
  components: {
    LikePostComponent
  },
  mixins: [avatarMixin, commonMixin],
  data () {
    return {
      listPost: [],
      saludo: 'Saludo desde listPostComponent'
    }
  },
  methods: {
    async getPostList () {
      await axios
        .get(`https://localhost:44377/api/Post/GetPosts/${this.$session.get('nameUser')}`)
        .then(result => {
          console.log(result)
          if (result.data.success === 1) {
            this.listPost = result.data.data
          } else {
            this.listPost = []
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => console.log('Finish get'))
    }
  },
  async mounted () {
    await this.getPostList()
  }
}
</script>

<style scoped>
  .post-card {
    margin-top: 15px !important;
  }
  .post-card-header {
    display: flex;
    align-items: flex-end;
  }
  .avatar {
    margin-right: 6px;
  }
  .nameUser {
    font-size: 15px;
    font-weight: 600;
  }
</style>
