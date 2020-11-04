<template>
  <div class="userProfile">
    <UserProfileComponent :user="$route.params.user"></UserProfileComponent>
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
