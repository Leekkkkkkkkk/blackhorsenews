<template>
  <div class="serachHistory">
    <van-cell :title="item" @click="onSearch(item)"  icon="search" v-for="item in suggestions"  :key="item">
      <template #title>
        <div v-html="HighText(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  beforeDestroy () {
    clearTimeout(this.id)
  },
  watch: {
    value: {
      immediate: true,
      handler (nvl) {
        if (this.id) {
          clearTimeout(this.id)
        }
        this.id = setTimeout(async () => {
          const res = await getSearchSuggestion(nvl)
          this.suggestions = res.options
        }, 700)
      }
    }
  },
  created () {

  },

  methods: {
    HighText (ite) {
      const itext = '<span style="color:red">' + this.value + '</span>'
      const reg = new RegExp(this.value, 'gi')
      return ite.replace(reg, itext)
    },
    onSearch (ite) {
      console.log(ite)
      this.$emit('onSearch', ite)
    }
  }
}
</script>

<style scoped lang='less'>

</style>
