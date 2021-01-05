<template>
  <div class="followComponent">
    <div>
      <el-button
      @click="deleteFollow()"
      v-if="userFollow"
      size="medium"
      type="primary" round plain>
      Dejar de seguir
      </el-button>
      <el-button
      @click="addFollow()"
      v-else
      size="medium"
      type="primary"
      round>
      Seguir
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { commonMixin } from '@/mixins/Common.js'

export default {
  name: 'FollowComponent',
  props: {
    idUserFollowing: {
      type: Number,
      required: true
    },
    userFollowProp: {
      type: Boolean,
      required: true
    }
  },
  mixins: [commonMixin],
  data () {
    return {
      userFollow: false
    }
  },
  methods: {
    // ${this.$session.get('nameUser')}
    async addFollow () {
      this.userFollow = true
      await axios
        .get(`http://julian1999-001-site1.btempurl.com/api/Follow/Add/${this.$session.get('nameUser')}/${this.idUserFollowing}`)
        .then(result => {
          if (result.data.success !== 1) {
            this.userFollow = false
            this.notifyError('Ups!', 'No se ha podido seguir a este usuario')
          }
        })
        .catch(error => {
          console.error(error)
          this.userFollow = false
          this.notifyError('Ups!', 'Ha ocurrido un error al intentar seguir a este usuario')
        })
    },
    async deleteFollow () {
      this.userFollow = false
      await axios
        .get(`http://julian1999-001-site1.btempurl.com/api/Follow/Delete/${this.$session.get('nameUser')}/${this.idUserFollowing}`)
        .then(result => {
          if (result.data.success !== 1) {
            this.userFollow = true
            this.notifyError('Ups!', 'No se ha podido dejar de seguir a este usuario')
          }
        })
        .catch(error => {
          console.error(error)
          this.userFollow = true
          this.notifyError('Ups!', 'Ha ocurrido un error al intentar dejar de seguir a este usuario')
        })
    }
  },
  mounted () {
    this.userFollow = this.userFollowProp
  }
}
</script>

<style>

</style>
