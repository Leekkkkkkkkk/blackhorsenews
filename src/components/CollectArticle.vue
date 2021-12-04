<template>
  <div>
      <van-icon
        :color="value ? '#3296fa' : '#777'"
        :name="value ? 'star' : 'star-o'"
        @click="onCollect"
      />
  </div>
</template>

<script>
import { deleteCollectArticle, addCollectArticle } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    artID: {
      type: [Number, String, Object]
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {
    async onCollect () {
      try {
        if (this.value) {
        // 已收藏
          await deleteCollectArticle(this.artID)
        } else {
        // 关注
          await addCollectArticle(this.artID)
        }
        this.$emit('input', !this.value)
        Toast.success('操作成功')
      } catch (error) {
        Toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
