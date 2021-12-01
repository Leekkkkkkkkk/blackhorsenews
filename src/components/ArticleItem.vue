<template>
  <div class="articleitem">
    <van-cell :title="row.title" >
      <template>
        <van-image
          v-if="row.cover.type === 1"
          class="right-img"
          :src="row.cover[0]"
        />
      </template>
      <template #label>
        <div class="images_box" v-if="row.cover.type === 3">
          <van-image
            v-for="(item,index) in row.cover.images"
            :key="index"
            width="100"
            height="100"
            :src="item"
          />
        </div>
        <span>{{row.aut_name}}</span>
        <span class="commit_p">评论:{{row.comm_count}}</span>
        <span>{{row.pubdate | relativeTime}}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'articleitem',
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='less'>
.articleitem{
  .images_box{
    display: flex;
    justify-content: space-between;
  }
  .commit_p{
    margin: 0 15px;
  }
  .right-img{
    width: 232px;
    height: 146px;
  }
}
</style>
