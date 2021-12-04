<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <!-- <van-cell v-for="item in list" :key="item.com_id + ''" :title="item.content" /> -->
    <comment-item  v-for="item in list" :key="item.com_id + ''" :title="item.content" :CommentItem='item' />
  </van-list>
</template>

<script>
import { getCommentList } from '@/api/user.js'
import CommentItem from '@/components/CommentItem.vue'
export default {
  components: { CommentItem },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: {
    type: {
      type: String,
      default: 'a'
    },
    source: {
      type: [String, Number, Object],
      required: true
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { results, last_id: lastId, total_count: total } = await getCommentList({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        console.log(total)
        console.log(results)
        this.$emit('onTotal', total)
        this.list.push(...results)
        this.loading = false
        if (!this.list.length) {
          this.finished = true
        } else {
          this.offset = lastId
        }
      } catch (error) {
        // 加载状态结束

        // 数据全部加载完成

      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
