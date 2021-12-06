<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="value"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
    :disabled='!value'
      class="post-btn"
      @click="onPost"
    >发布</van-button>
  </div>
</template>
<script>
import { PostComment } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: null
    }
  },
  data () {
    return {
      value: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      Toast.loading({
        message: '发布中....',
        duration: 0,
        forbidClick: true
      })
      try {
        const res = await PostComment({
          target: this.target,
          content: this.value,
          art_id: this.artId
        })
        console.log(res)
        Toast.success('发布成功')
        this.$emit('on-success', res.new_obj)
        this.value = ''
      } catch (error) {
        console.dir(error)
        Toast.fail('发布失败')
      }
    }
  }
}
</script>
<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
