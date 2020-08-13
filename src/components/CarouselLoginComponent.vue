<template>
  <div class="CarouselLoginComponent" :style="{ marginTop: marginTop + 'px' }">
      <el-carousel height="200px" arrow="never" type="card">
        <el-carousel-item v-for="item in pathSvg" :key="item">
            <div class="login-svg">
              <el-image
              :src="item"
              style="width: 350px;">
              </el-image>
            </div>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'CarouselLoginComponent',
  props: {
    marginTop: Number
  },
  data () {
    return {
      pathSvg: [
        require('@/assets/svg/social_media_login1.svg'),
        require('@/assets/svg/social_media_login2.svg'),
        require('@/assets/svg/social_media_login3.svg')
      ]
    }
  }
}
</script>

<style scoped>
  .login-svg {
    display: flex;
    justify-content: center;
  }
</style>
