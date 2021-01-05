<template>
  <div class="searchUserComponent">
    <el-select
    class="search-text"
    v-model="value"
    filterable
    remote
    reserve-keyword
    placeholder="Ingrese un nombre"
    :remote-method="findUser"
    :loading="loading"
    @change="goUserProfile()">
      <el-option
      v-for="item in users"
      :key="item.label"
      :label="item.label"
      :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'
import { commonMixin } from '@/mixins/Common.js'

export default {
  name: 'SearchUserComponent',
  mixins: [commonMixin],
  data () {
    return {
      value: '',
      users: [],
      loading: false
    }
  },
  methods: {
    goUserProfile () {
      const DATA = this.value
      setTimeout(() => {
        this.showUserProfile(DATA.id, DATA.nameUser)
      }, 0)
      this.value = ''
      this.users = []
    },
    async findUser (nameUserOrEmail) {
      this.users = []
      if (nameUserOrEmail === '') return
      this.loading = true
      await axios
        .get(`http://julian1999-001-site1.btempurl.com/api/User/Get/${nameUserOrEmail}`)
        .then(result => {
          const DATA = result.data.data
          let i = 0
          while (i < DATA.length) {
            this.users.push({
              value: {
                id: DATA[i].id,
                nameUser: DATA[i].nameUser
              },
              label: DATA[i].nameUser
            })
            i++
          }
        })
        .catch(err => {
          console.error(err)
          this.users = []
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
.searchUserComponent .search-text {
  width: 100%;
}
.search-text .el-input__inner {
  border-radius: 15px;
  height: 32px;
}
@media (max-width: 768px) {
  .search-text {
    transform: translateY(-5px);
  }
}
</style>
