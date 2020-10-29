<template>
  <div class="dataUserProfileComponent">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="12">
        <el-card
        :body-style="{ padding: '0px' }"
        class="box-card">
          <div class="data-user-profile-container">
            <div class="image-user">
              <el-avatar
              v-if="user.imageProfile !== null"
              class="avatar-orbe"
              :src="getUrlAvatarImage(user.imageProfile)"
              :size="100">
              </el-avatar>
              <el-avatar
              v-else
              :src="avatarDefault"
              :size="100">
              </el-avatar>
            </div>
            <div class="data-user">
              <p class="name-user">@{{ user.nameUser }}</p>
              <p class="email">{{ user.email }}</p>
              <p class="age">{{ getAge(user.dateBirth) }} años</p>
            </div>
            <div class="follow-button">
              <el-button
              v-if="user.follow"
              size="medium"
              type="primary" round plain>
              Dejar de seguir
              </el-button>
              <el-button
              v-else
              size="medium"
              type="primary"
              round>
              Seguir
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { avatarMixin } from '@/mixins/Avatar.js'
import { commonMixin } from '@/mixins/Common.js'

export default {
  name: 'DataUserProfileComponent.vue',
  props: {
    idUser: Number
  },
  directives: {
    moment
  },
  mixins: [avatarMixin, commonMixin],
  data () {
    return {
      user: {
        id: 0,
        nameUser: '',
        email: '',
        imageProfile: null,
        dateBirth: '',
        follow: false
      }
    }
  },
  methods: {
    async getUserById () {
      await axios
        .get(`https://localhost:44377/api/User/GetById/${this.idUser}/${this.$session.get('nameUser')}`)
        .then(result => {
          this.setModel(result.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    setModel (data) {
      this.user.id = data.idUser
      this.user.nameUser = data.nameUser
      this.user.email = data.email
      this.user.imageProfile = data.imageProfile
      this.user.dateBirth = data.dateBirth
      this.user.follow = data.follow
    }
  },
  async mounted () {
    await this.getUserById()
  }
}
</script>

<style scoped>
.dataUserProfileComponent {
  margin-top: 20px;
}
.data-user-profile-container {
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-content: flex-start;
}
.avatar-orbe {
  animation-duration: 1.5s;
  animation-name: orbe;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes orbe {
  from {
      box-shadow: 0 0 10px 2px #409EFF;
  }
  to {
      box-shadow: 0 0 5px 2px #409EFF;
  }
}
.data-user {
  text-align: center;
}
.name-user {
  font-size: x-large;
  margin-bottom: 8px;
}
.email, .age {
  color: #828387;
  line-height: 24px;
}
@media (max-width: 520px) {
  .data-user-profile-container {
    flex-direction: column;
  }
  .image-user {
    margin-bottom: 8px;
  }
}
</style>
