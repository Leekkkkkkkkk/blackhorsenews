<template>
  <div class="channeledit">
    <van-cell title="我的频道" :border='false'>
      <van-button class="edit_btn" @click="isedit = !isedit" round size="small" type="danger" color="linear-gradient(to right, #ff6034, #ee0a24)">{{isedit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :border='false' class="my_grid" :gutter="10">
      <van-grid-item @click="myGridClick(index,item.id)" v-for="(item,index) in channels" :key="item.id" :class="{active:index===active}" :text="item.name" :icon="isedit&&index!==0 ? 'close' : ''"/>
    </van-grid>
    <van-cell title="我的频道" :border='false'/>
    <van-grid :border='false' class="my_grid" :gutter="10" direction="horizontal" icon-size="0.5rem">
      <van-grid-item @click="onRecommendChannels(item)" icon="plus" :text="item.name" v-for="item in recommendChannels" :key="item.id" />
    </van-grid>
  </div>
</template>

<script>
import { getChannels } from '@/api/article.js'
import { Toast } from 'vant'
import { setStorage } from '@/utils/storage.js'
import { mapState } from 'vuex'
import { UserchannelsItem, RemovehannelsItem } from '@/api/user.js'
export default {
  name: 'channeledit',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isedit: false,
      allchannelslist: []
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allchannelslist.filter(item => {
        return !this.channels.some(item2 => item2.id === item.id)
      })
    }
  },
  created () {
    this.getChannelsList()
  },

  methods: {
    myGridClick (inx, id) {
      if (this.isedit) {
        if (inx === 0) return
        if (inx <= this.active) {
          this.$emit('setActive')
        }
        this.channels.splice(inx, 1)
        this.deleteChnnelStorage(id)
      } else {
        this.$emit('onGo', inx)
      }
    },
    async  getChannelsList () {
      try {
        const res = await getChannels()
        this.allchannelslist = res.channels
      } catch (error) {
        Toast('获取频道失败')
      }
    },
    async  onRecommendChannels (obj) {
      this.channels.push(obj)
      Toast.loading({
        message: '添加中...',
        forbidClick: true,
        duration: 0
      })
      if (this.user) {
        try {
          await UserchannelsItem({
            id: obj.id,
            seq: this.channels.length
          })
          Toast.success('添加成功')
        } catch (error) {
          console.dir(error)
          Toast.fail('添加失败')
        }
      } else {
        setStorage('MY-Channel', this.channels)
      }
    },
    async deleteChnnelStorage (id) {
      if (!this.user) return setStorage('MY-Channel', this.channels)
      // 已登录
      Toast.loading({
        message: '添加中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await RemovehannelsItem(id)
        Toast.success('删除成功')
      } catch (error) {
        Toast.fail('删除失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.channeledit{
  .edit_btn{
    width: 104px;
    height: 48px;
  }
  /deep/.my_grid{
    .van-grid-item{
      width: 160px;
      height: 86px;
      border-radius: 6px;
    }
    .van-grid-item__content{
      background-color: #f4f5f6;
    }
    .van-icon-close {
      font-size: 35px;
      position: absolute;
      top: -10.5px;
      right: 5px;
      }
    .van-grid-item__icon+.van-grid-item__text {
      margin-top: 0;
    }
    .active{
      .van-grid-item__text{
      color: red;
      }
    }
  }
}

</style>
