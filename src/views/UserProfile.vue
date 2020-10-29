<template>
  <div class="userProfile">
    <UserProfileComponent :idUser="Number.parseInt($route.params.id)"></UserProfileComponent>
  </div>
</template>

<script>
import UserProfileComponent from '@/components/UserProfileComponent.vue'

export default {
  name: 'UserProfile',
  components: {
    UserProfileComponent
  }
}
</script>

<style>

</style>
