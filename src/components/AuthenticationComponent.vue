<template>
    <div class="authenticationComponent">
      <!-- Auth/register element ui -->
      <el-container>
        <el-main>
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="16">
              <el-row :gutter="20">
                <el-card shadow="always">
                  <LoginComponent :fontSize="30" :marginTop="80" labelPosition="top"></LoginComponent>
                  <VerticalLine></VerticalLine>
                  <RegisterComponent :fontSize="30" labelPosition="top"></RegisterComponent>
                </el-card>
              </el-row>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'
import VerticalLine from '@/components/VerticalLineComponent.vue'

export default {
  name: 'AuthenticationComponent',
  components: {
    LoginComponent,
    RegisterComponent,
    VerticalLine
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .authenticationComponent {
    background-image: url('../assets/svg/social_media_login_background1.svg');
  }
</style>
