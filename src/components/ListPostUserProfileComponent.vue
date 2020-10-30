<template>
  <div class="listPostUserProfileComponent">
      <el-tabs type="card">
      <el-tab-pane label="Todo"><ListPostComponent :nameUser="nameUser"></ListPostComponent></el-tab-pane>
      <el-tab-pane label="Pensamientos"><ListPostComponent :nameUser="nameUser" :idTypePost="3"></ListPostComponent></el-tab-pane>
      <el-tab-pane label="Imagenes"><ListPostComponent :nameUser="nameUser" :idTypePost="1"></ListPostComponent></el-tab-pane>
      <el-tab-pane label="Videos"><ListPostComponent :nameUser="nameUser" :idTypePost="2"></ListPostComponent></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ListPostComponent from '@/components/ListPostComponent.vue'

export default {
  name: 'ListPostUserProfileComponent',
  components: {
    ListPostComponent
  },
  props: {
    nameUser: String
  }
}
</script>

<style scoped>

</style>
