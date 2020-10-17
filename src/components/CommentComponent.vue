<template>
  <div class="commentComponent">
    <ListCommentComponent :idPost="idPost"
    :limitComments="limitComments"
    :listCommentProp="listComment"
    @setListCommentEvent="setListComment"></ListCommentComponent>
    <PostCommentComponent :idPost="idPost" :saveLimitComments="saveLimitComments" @setListCommentEvent="setListComment"></PostCommentComponent>
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
    limitComments: Number,
    saveLimitComments: Number
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
