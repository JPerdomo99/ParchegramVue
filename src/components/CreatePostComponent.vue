<template>
  <div class="createPostComponent">
      <el-card class="box-card">
        <h4 class="titleNewPost">Nueva publicación</h4>
        <el-input
        type="textarea"
        v-model="textareaTest"
        :rows="3"
        maxlength="500"
        show-word-limit
        class="postDescription"
        >
        </el-input>
        <el-row type="flex" justify="space-between">
            <el-upload
            class="uploadButton"
            :limit="1"
            :multiple="false"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
            :on-change="handleChange"
            >
            <el-button icon="el-icon-upload2" circle></el-button>
            </el-upload>
            <el-button type="primary" class="subir" round>Publicar</el-button>
        </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CreatePostComponent',
  data () {
    return {
      textareaTest: '',
      file: '',
      fileDetail: Object
    }
  },
  methods: {
    handleChange (file, fileList) {
      console.log(file)
      console.log(fileList)
      this.file = file
      this.fileDetail = file.raw
      console.log(typeof this.fileDetail)
      console.log(this.fileDetail)
    }
  }
}
</script>

<style>
    .el-textarea__inner {
      background: #f9f9f9 !important;
      border: none !important;
      resize: none !important;
      border-radius: 25px !important;
    }
    .homeComponent {
      margin-top: 20px;
    }
    .uploadButton {
      margin-top: 10px;
    }
    .titleNewPost {
      margin-bottom: 10px;
    }
    .subir {
      height: 38px;
      margin-top: 10px !important;
    }
</style>
