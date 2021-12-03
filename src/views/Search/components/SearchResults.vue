<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResults',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      try {
        const res = await getSearchResults({
          page: this.page,
          per_page: 20,
          q: this.searchText
        })
        if (Math.random() > 0.5) {
          console.lg(1)
        }
        console.log(res)
        this.list.push(...res.results)
        this.loading = false
        if (!this.list.length) {
          this.finished = true
        } else {
          this.page++
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
