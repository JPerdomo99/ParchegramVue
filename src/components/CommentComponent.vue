<template>
  <div class="commentComponent">
    <ListCommentComponent :idPost="idPost" :limitComments="limitComments" :listCommentProp="listComment" @setListCommentEvent="setListComment"></ListCommentComponent>
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
    idPost: Number,
    limitComments: Number
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
