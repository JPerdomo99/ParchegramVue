<template>
  <div class="userProfileComponent">
    <DataUserProfileComponent :idUser="idUser"></DataUserProfileComponent>
    <!-- <ListPostUserProfileComponent :idUser="idUser"></ListPostUserProfileComponent> -->
  </div>
</template>

<script>
import DataUserProfileComponent from '@/components/DataUserProfileComponent.vue'
// import ListPostUserProfileComponent from '@/components/ListPostUserProfileComponent.vue'

export default {
  name: 'UserProfileComponent',
  components: {
    DataUserProfileComponent
    // ListPostUserProfileComponent
  },
  props: {
    idUser: Number
  }
}
</script>

<style scoped>

</style>
