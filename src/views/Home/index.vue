<template>
  <div class="home">
    <van-nav-bar title="搜索" class="page-nav-bar" fixed>
      <template #title>
        <van-button  icon="search" to="/search" class="search-btn" type="primary">主要按钮</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" class="home_tab" swipeable animated>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list :channelsId='item.id'/>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="right_menu" @click="isShowEditPopup=true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isShowEditPopup"
      position="bottom"
      :style="{ height: '90%' }"
      class="edit_Popup"
      closeable
      close-icon-position="top-left"
    >
    <channel-edit :channels='channels'  :active='active' @setActive='active--' @onGo='onGo'/>
    </van-popup>
  </div>
</template>

<script>
import { getUserchannels } from '@/api/user.js'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { getStorage } from '@/utils/storage.js'
import { Toast } from 'vant'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      channels: [],
      isShowEditPopup: false
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  created () {
    this.loadUserchannels()
  },

  methods: {
    async loadUserchannels () {
      const getStorageDate = getStorage('MY-Channel')
      try {
        if (!this.$store.state.user && getStorageDate) {
          this.channels = getStorageDate
          return false
        }
        const res = await getUserchannels()
        this.channels = res.channels
      } catch (error) {
        Toast.fail('获取用户频道列表失败')
      }
    },
    onGo (e) {
      this.active = e
      this.isShowEditPopup = false
    }
  }
}
</script>

<style scoped lang='less'>
.home{
  .search-btn{
    width: 555px;
    height: 64px;
    background:rgba(255, 2555, 255, .2);
    border: none;
    border-radius: 32px;
  }
  /deep/.van-nav-bar__title{
    max-width: unset;
  }
  .van-icon-search{
    color: #fff;
  }
  /deep/.home_tab{
    .van-tab{
      min-width: 200px;
      border-right: 1px solid #edeff3;
      height: 82px;
      .van-tab__text{
        font-size: 28px;
        color: #777;
      }
    }
    .van-tabs__wrap{
      height: 82px;
      border-bottom: 1px solid #edeff3;
    }
    .van-tab--active{
      .van-tab__text{
        font-size: 30px;
        color:#333
      }
    }
    .van-tabs__line{
      width: 31px;
      height: 6px;
      background: #3296fa;
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav--line{
      padding-bottom: 0;
    }
    .right_menu{
      width: 66px;
      height: 82px;
      background-color: #fff;
      position:fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
        font-size: 40px;
      }
      &::before{
        content: '';
        width: 2px;
        height: 58px;
        position: absolute;
        left: 0;
        top: 12px;
        background-image: url(~@/assets/images/gradient-gray-line.png);
        background-size: 100% 100%;
      }
    }
    .placeholder-box{
      width: 66px;
      flex-shrink: 0;
    }
  }
  .van-tabs__wrap{
    position: fixed;
    top: 92px;
    z-index: 2;
    width: 100%;
  }
  .home_tab{
    padding-top: 90px;
  }
  .edit_Popup{
    padding: 100px 20px 0 20px ;
  }
}
</style>
