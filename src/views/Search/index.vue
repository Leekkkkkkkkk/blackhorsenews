<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isShowRes=false"
      />
      <search-results v-if="isShowRes"/>
      <search-history  v-else-if="!value" />
      <search-suggestion v-else :value='value' />

    </form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResults from './components/SearchResults.vue'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResults },
  name: 'search',
  data () {
    return {
      value: '',
      isShowRes: false
    }
  },

  created () {

  },

  methods: {
    onSearch (val) {
      this.isShowRes = true
    },
    onCancel () {
      Toast('取消')
    }
  }
}
</script>

<style scoped lang='less'>

</style>
