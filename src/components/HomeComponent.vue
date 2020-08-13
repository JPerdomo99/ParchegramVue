<template>
    <div class="homeComponent">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
            <CreatePostComponent></CreatePostComponent>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
import CreatePostComponent from '@/components/CreatePostComponent'

export default {
  components: {
    CreatePostComponent
  },
  data () {
    return {
      listPosts: []
    }
  },
  methods: {
    getPosts () {
      axios
        .get(`https://localhost:44377/api/Post/GetPosts/${this.$session.get('nameUser')}`)
        .then(result => {
          if (result.status === 200) {
            this.listPosts = result.data
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>

<style>

</style>
