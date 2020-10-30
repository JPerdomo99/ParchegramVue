<template>
  <div class="userProfileComponent">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        <DataUserProfileComponent :idUser="idUser"></DataUserProfileComponent>
        <ListPostUserProfileComponent :nameUser="user"></ListPostUserProfileComponent>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DataUserProfileComponent from '@/components/DataUserProfileComponent.vue'
import ListPostUserProfileComponent from '@/components/ListPostUserProfileComponent.vue'

export default {
  name: 'UserProfileComponent',
  components: {
    DataUserProfileComponent,
    ListPostUserProfileComponent
  },
  props: {
    idUser: Number,
    user: String
  }
}
</script>

<style scoped>

</style>
