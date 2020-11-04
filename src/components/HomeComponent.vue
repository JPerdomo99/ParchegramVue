<template>
    <div class="homeComponent">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
            <CreatePostComponent></CreatePostComponent>
            <ListPostComponent :nameUser="this.$session.get('nameUser')" :fromProfile="false"></ListPostComponent>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import CreatePostComponent from '@/components/CreatePostComponent'
import ListPostComponent from '@/components/ListPostComponent'

export default {
  components: {
    CreatePostComponent,
    ListPostComponent
  }
}
</script>

<style>

</style>
