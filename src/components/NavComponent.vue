<template>
    <div class="navComponent">
        <el-menu :default-active="activeIndex" active-text-color="#409EFF" class="nav-bar" mode="horizontal">
            <div class="title">
                <el-menu-item><router-link class="router-link" :to="{ name: 'Home' }"><h1>Parchegram</h1></router-link></el-menu-item>
            </div>
            <div class="search" v-if="loginState">
                <el-menu-item class="item">
                  <SearchUserComponent></SearchUserComponent>
                </el-menu-item>
            </div>
            <div class="menu-items" v-if="loginState">
                <el-menu-item class="item" index="1"><i class="el-icon-s-home"></i></el-menu-item>
                <!-- <el-menu-item class="item"><i class="el-icon-chat-dot-round"></i></el-menu-item> -->
                <el-menu-item>
                  <el-dropdown trigger="click">
                    <el-avatar class="avatar-nav" v-if="imageProfile !== ''" :size="25" :src="imageProfile"></el-avatar>
                    <el-avatar class="avatar-nav" v-else :size="25" :src="avatarDefault"></el-avatar>
                    <el-dropdown-menu>
                      <router-link class="router-link" :to="{ name: 'UserConfig' }">
                        <el-dropdown-item
                        :style="{ color: '#b8c5d1' }"
                        icon="el-icon-setting">Ajustes
                        </el-dropdown-item>
                      </router-link>
                      <el-dropdown-item
                      @click="logout()"
                      :style="{ color: '#FF0000' }"
                      icon="el-icon-switch-button">Salir
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { avatarMixin } from '@/mixins/Avatar.js'
import SearchUserComponent from '@/components/SearchUserComponent.vue'

export default {
  name: 'NavComponent',
  components: {
    SearchUserComponent
  },
  mixins: [avatarMixin],
  data () {
    return {
      activeIndex: '1',
      value: []
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
.router-link {
  text-decoration: none;
}
h1 {
  font-family: 'SummerVibes';
  color: #409EFF;
  font-size: 32px;
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
.avatar-nav {
  animation-duration: 1.5s;
  animation-name: orbe;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes orbe {
  from {
    box-shadow: 0 0 6px 2px #409EFF;
  }
  to {
    box-shadow: 0 0 3px 1px #409EFF;
  }
}
@media (max-width: 768px) {
  .search {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
    background: #f0f2f5;
    border-top: 2px solid #DCDFE6;
  }
}
@media (max-width: 450px) {
  h1 {
    font-size: 25px;
  }
}
</style>

<style>
@media (max-width: 768px) {
  .search {
    width: 50px;
  }
  .search-text {
    transform: translateY(-5px);
  }
}
</style>
