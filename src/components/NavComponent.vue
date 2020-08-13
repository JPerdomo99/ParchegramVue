<template>
    <div class="navComponent">
        <el-menu :default-active="activeIndex" active-text-color="#409EFF" class="nav-bar" mode="horizontal">
            <div class="title">
                <el-menu-item><h1>Parchegram</h1></el-menu-item>
            </div>
            <div class="search" v-if="loginState">
                <el-menu-item class="item"><el-input
                placeholder="Buscar"
                prefix-icon="el-icon-search"
                class="search-text"
                size="small">
                </el-input></el-menu-item>
            </div>
            <div class="menu-items" v-if="loginState">
                <el-menu-item class="item" index="1"><i class="el-icon-s-home"></i></el-menu-item>
                <el-menu-item class="item"><i class="el-icon-chat-dot-round"></i></el-menu-item>
                <el-menu-item class="item"><router-link to="/userConfig"><i class="el-icon-setting"></i></router-link></el-menu-item>
                <el-menu-item @click="logout()"><i class="el-icon-turn-off"></i></el-menu-item>
                <el-menu-item class="item">
                  <el-avatar v-if="imageProfile !== ''" :size="25" :src="imageProfile"></el-avatar>
                  <el-avatar v-else :size="25" :src="avatarDefault"></el-avatar>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      activeIndex: '1',
      avatarDefault: require('@/assets/avatarDefault.png')
    }
  },
  methods: {
    logout () {
      this.$session.destroy()
      this.setImageProfile('')
      this.logoutNav()
      this.$router.push({ name: 'Authentication' })
      this.$notify({
        title: 'Hasta pronto!',
        message: 'Esperamos vuelvas pronto para que sigas compartiendo tus mejores momentos',
        position: 'bottom-right',
        offset: 100,
        duration: 9000
      })
    },
    ...mapMutations(['logoutNav', 'setImageProfile'])
  },
  computed: {
    ...mapState(['loginState', 'imageProfile'])
  },
  mounted () {
    // Esta logeado y tiene avatar
    const s = this.$session
    if (this.loginState && s.has('avatar')) {
      this.setImageProfile(s.get('avatar'))
    }
  }
}
</script>

<style scoped>
    @font-face {
      font-family: 'SummerVibes';
      src: url('../assets/fonts/Summer Vibes OTF.otf');
    }
    h1 {
      font-family: 'SummerVibes';
      color: #409EFF;
      font-size: 32px
    }
    i {
      font-size: 23px !important;
    }
    .nav-bar {
      display: flex;
      justify-content: space-between;
    }
    .menu-items {
        display: flex;
    }
    .el-menu-item:focus {
      background: transparent;
    }
    .el-menu-item:hover{
      background: transparent;
    }
    .el-menu-item.is-active {
      border-bottom: solid;
    }
    .el-icon-turn-off {
      color: #F56C6C;
    }
</style>
