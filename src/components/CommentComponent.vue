<template>
  <div class="commentComponent">
    <ListCommentComponent :idPost="idPost" :listCommentProp="listComment" @setListCommentEvent="setListComment"></ListCommentComponent>
    <PostCommentComponent :idPost="idPost" @setListCommentEvent="setListComment"></PostCommentComponent>
  </div>
</template>

<script>
import ListCommentComponent from '@/components/ListCommentComponent.vue'
import PostCommentComponent from '@/components/PostCommentComponent.vue'

export default {
  name: 'CommentComponent',
  components: {
    ListCommentComponent,
    PostCommentComponent
  },
  props: {
    idPost: Number
  },
  data () {
    return {
      listComment: []
    }
  },
  methods: {
    setListComment (value) {
      this.listComment = value
    }
  }
}
</script>
