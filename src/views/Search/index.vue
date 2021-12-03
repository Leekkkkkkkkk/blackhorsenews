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
      <search-results v-if="isShowRes" :searchText='value'/>
      <search-history @clear="History = []" @onsearch="onSearch" :history='History' v-else-if="!value" />
      <search-suggestion v-else :value='value' @onSearch='onSearch' />

    </form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResults from './components/SearchResults.vue'
import { getStorage, setStorage } from '@/utils/storage.js'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResults },
  name: 'search',
  data () {
    return {
      value: '',
      isShowRes: false,
      History: getStorage('TT-history') || []
    }
  },
  watch: {
    History: {
      deep: true,
      handler (val) {
        setStorage('TT-history', val)
      }
    }
  },
  created () {

  },

  methods: {
    onSearch (val) {
      this.value = val
      this.isShowRes = true
      this.History.unshift(val)
      this.History = [...new Set(this.History)]
    },
    onCancel () {
      Toast('取消')
    }
  }
}
</script>

<style scoped lang='less'>
</style>
