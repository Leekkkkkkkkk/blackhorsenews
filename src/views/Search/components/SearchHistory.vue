<template>
  <div>
    <van-cell title="历史记录" value="内容" >
      <template>
        <van-icon name="delete-o" v-if="!isDelete"  @click="isDelete=true"/>
        <div v-else>
          <!-- <span @click="history.splice(0)">全部删除</span> -->
          <span @click="$emit('clear')">全部删除</span>
          <span @click="isDelete=false" class="left">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell :title="item"   v-for="item in history" :key="item" @click="onClickHistory(item)">
      <template v-if="isDelete">
        <van-icon name="close" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    history: {
      type: Array,
      required: true
    }

  },
  data () {
    return {
      isDelete: false
    }
  },

  created () {

  },

  methods: {
    onClickHistory (val) {
      if (this.isDelete) {
        const index = this.history.indexOf(val)
        this.history.splice(index, 1)
      } else {
        this.$emit('onsearch', val)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.left{
  margin-left: 20px;
}
</style>
