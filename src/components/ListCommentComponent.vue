<template>
  <div class="listCommentComponent" :style="{ marginTop: '8px' }">
    <transition-group name="fade">
      <div v-for="(comment, index) in listComment" :key="index"
        class="comment-container">
        <div class="comment">
            <div class="header-comment">
              <strong>{{ comment.nameUser }}</strong>
              <el-dropdown
              v-if="comment.nameUser === getNameUser()"
              placement="top-start"
              trigger="click"
              size="mini">
                <i class="el-icon-more"></i>
                <el-dropdown-menu>
                  <el-dropdown-item :style="{ color: '#b8c5d1' }" icon="el-icon-edit">Editar</el-dropdown-item>
                  <el-dropdown-item :style="{ color: '#FF0000' }">
                    <el-popconfirm
                    confirmButtonText="Si"
                    cancelButtonText="No, Dejalo"
                    icon="el-icon-info"
                    iconColor="red"
                    title="Quieres Retirar lo dicho?"
                    @onConfirm="handleConfirmCommentDelete(comment.idComment, comment.nameUser)">
                      <span slot="reference"><i class="el-icon-delete"></i>Eliminar</span>
                    </el-popconfirm>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="comment-text">
              <p>{{ comment.commentText }}</p>
            </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { commonMixin } from '@/mixins/Common.js'

export default {
  name: 'ListCommentComponent',
  mixins: [commonMixin],
  props: {
    listCommentProp: Array
  },
  data () {
    return {
      listComment: []
    }
  },
  methods: {
    async handleConfirmCommentDelete (idComment, nameUser) {
      await this.deleteComment(idComment, nameUser)
    },
    async deleteComment (idComment, nameUser) {
      console.log('asdf')
    }
  },
  mounted () {
    this.listComment = this.listCommentProp
    debugger
    console.log(99999)
  }
}
</script>

<style scoped>
.comment {
  font-size: 14px;
  margin-bottom: 10px;
  border-radius: 18px;
  width: max-content;
  padding: 10px;
  background: #f0f2f5;
  width: inherit;
  display: inline-flex;
  flex-direction: column;
}
.header-comment {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
}
.header-comment i {
  color: #b8c5d1;
  cursor: pointer;
}
.header-comment i:hover{
  color: #303133;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.el-dropdown-menu {
  border-radius: 8px;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background: #f0f2f5;
}
</style>

<style>
.el-popconfirm__main {
  margin-bottom: 5px;
}
</style>
