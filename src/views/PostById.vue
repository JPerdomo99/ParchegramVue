<template>
  <div class="postById">
    <PostByIdComponent :id="Number.parseInt($route.params.id)" ></PostByIdComponent>
  </div>
</template>

<script>
import PostByIdComponent from '@/components/PostByIdComponent.vue'

export default {
  name: 'PostById',
  components: {
    PostByIdComponent
  }
}
</script>

<style>

</style>
