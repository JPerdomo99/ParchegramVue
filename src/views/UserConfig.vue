<template>
    <div class="userConfig">
      <UserConfigComponent :fontSize="30" :marginTop="20"></UserConfigComponent>
    </div>
</template>

<script>
import UserConfigComponent from '@/components/UserConfigComponent.vue'

export default {
  name: 'UserConfig',
  components: {
    UserConfigComponent
  }
}
</script>

<style>

</style>
