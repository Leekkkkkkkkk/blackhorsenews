<template>
  <div>
    <van-nav-bar
    :title="comment.reply_count ? comment.reply_count +'条回复': '暂无回复'"
    >
      <template #left>
        <van-icon name="cross" size="18" @click="$emit('close')" />
      </template>
    </van-nav-bar>
    <div class="scroll_box">
      <comment-item :CommentItem="comment" />
        <van-cell title="全部回复" />
      <coumment-list type="c" :source="comment.com_id+''" :list="list" />
    </div>
    <div class="post-warp">
      <van-button @click="isShowReplyPostComment=true" round>评论</van-button>
    </div>
    <van-popup v-model="isShowReplyPostComment">
      <comment-post @on-success='onSuccess' :target="comment.com_id+ ''" :artId="$route.params.artId" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem.vue'
import CoummentList from './CoummentList.vue'
import CommentPost from './CommentPost.vue'
export default {
  components: { CommentItem, CoummentList, CommentPost },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      isShowReplyPostComment: false
    }
  },

  created () {

  },

  methods: {
    onSuccess (e) {
      this.list.unshift(e)
      this.isShowReplyPostComment = false
      console.log(e)
      this.comment.reply_count++
    }
  }
}
</script>

<style scoped lang='less'>
.post-warp {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hotpink;
  .van-button {
    width: 640px;
    height: 80px;
  }
}
.scroll_box{
  position: absolute;
  top: 92px;
  bottom: 100px;
  overflow-y: scroll;
  width: 100%;
}
</style>
