<template>
  <div class="articlelist">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-text='itpText' success-duration='1500'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item :row='item' v-for="item in list" :key="item.art_id" :title="item.title"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  components: { ArticleItem },
  name: 'articlelist',
  props: {
    channelsId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: Date.now(),
      error: false,
      isLoading: false,
      itpText: ''
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 1.发送请求获取数据
      try {
        const res = await getArticle({
          channel_id: this.channelsId,
          timestamp: this.timestamp,
          with_top: 1
        })
        if (Math.random() > 0.5) {
          console.l(1)
        }
        // 2.保存数据
        this.list.push(...res.results)
        this.timestamp = res.pre_timestamp
        // 3.让当前这一次加载状态结束
        this.loading = false
        // 4.数据全部加载完成
        if (!res.results.length) {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
      // this.list.push(this.list.length + 1)
    },
    async onRefresh () {
      try {
        const res = await getArticle({
          channel_id: this.channelsId,
          timestamp: Date.now(),
          with_top: 1
        })
        if (Math.random() > 0.5) {
          console.l(1)
        }
        this.list.unshift(...res.results)
        this.isLoading = false
        this.itpText = '刷新成功'
      } catch (error) {
        console.log(error)
        this.isLoading = false
        this.itpText = '刷新失败,稍后重试'
      }
    }
  }
}
</script>

<style scoped lang='less'>
.articlelist{
  height: 80vh;
  overflow-y: scroll;
}
</style>
