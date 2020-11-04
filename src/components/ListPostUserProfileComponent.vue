<template>
  <div class="listPostUserProfileComponent">
      <el-tabs :stretch="true" type="card">
      <el-tab-pane label="Todo"><ListPostComponent :nameUser="nameUser" :fromProfile="true"></ListPostComponent></el-tab-pane>
      <el-tab-pane label="Pensamientos"><ListPostComponent :nameUser="nameUser" :idTypePost="3" :fromProfile="true"></ListPostComponent></el-tab-pane>
      <el-tab-pane label="Imagenes"><ListPostComponent :nameUser="nameUser" :idTypePost="1" :fromProfile="true"></ListPostComponent></el-tab-pane>
      <el-tab-pane label="Videos"><ListPostComponent :nameUser="nameUser" :idTypePost="2" :fromProfile="true"></ListPostComponent></el-tab-pane>
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

<style>
.listPostUserProfileComponent .el-tabs .el-tabs__header {
  margin: 0;
  background: #fff;
  border-radius: 15px;
  border: none;
}
.listPostUserProfileComponent .el-tabs .el-tabs__header .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav .is-active {
  border-bottom: none !important;
}
</style>
