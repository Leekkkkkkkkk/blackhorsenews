<template>
  <div class="profile">
    <!-- 未登录 -->
    <div v-if="!user" class="not_login header">
      <img @click="$router.push('/login')" src="@/assets/images/mobile.png" alt="">
      <span @click="$router.push('/login')" >登录/注册</span>
    </div>
    <!-- 已登录 -->
    <div v-else class="login_box header">
      <div class="user_info">
        <div class="lfet">
          <img src="https://img0.baidu.com/it/u=4046115836,3082470176&fm=253&fmt=auto&app=120&f=JPEG?w=440&h=440" alt="">
          <span>{{userInfo.name}}</span>
        </div>
        <van-button type="default">编辑信息</van-button>
      </div>
      <div class="user_data">
        <div class="data_item">
          <span>{{userInfo.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="data_item">
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="data_item">
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="data_item">
          <span>{{userInfo.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" class="my_Grid">
      <van-grid-item  text="文字" >
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item  text="文字" >
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="out_box">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell @click="login_out" v-if="user" title="退出" class="logout_btn" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Dialog, Toast } from 'vant'
import { getUserSelfInfo } from '@/api/user.js'
export default {
  name: 'profile',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },

  async created () {
    this.loginUserSelfInfo()
  },

  methods: {
    login_out () {
      Dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出'
      })
        .then(() => {
          // on confirm
          console.log('已退出')
          this.$store.commit('removeStorage')
        })
        .catch(() => {
          // on cancel
        })
    },
    async loginUserSelfInfo () {
      try {
        const res = await getUserSelfInfo()
        this.userInfo = res
      } catch (error) {
        Toast.fail('获取用户信息失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.profile{
  .header{
    width: 750px;
    height: 401px;
    background-image: url(~@/assets/images/banner.png);
    background-size: 100% 100%;
  }
  .not_login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    img{
      width: 132px;
      height: 132px;
    }
    span{
      font-size: 28px;
      margin-top: 15px;
      color: #fff;
    }
  }
  .login_box{
    overflow: hidden;
    .user_info{
      width: 100%;
      height: 132px;
      margin-top: 116px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      .lfet{
        display: flex;
        align-items: center;
        img{
          width: 132px;
          height: 132px;
          border-radius: 50%;
          border: 1px solid #fff;
        }
        span{
          font-size: 30px;
          color: #fff;
          margin-left: 22px;
        }
      }
      .van-button{
          width: 115px;
          height: 32px;
          background-color: #fff;
          border-radius: 16px;
          font-size: 20px;
          color: #666;
          padding: 0;
        }
    }
    .user_data{
      width: 100%;
      height: 156px;
      display: flex;
      .data_item{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        span:nth-child(1){
          font-size: 26px;
          margin-bottom: 8px;
        }
        span:nth-child(2){
          font-size: 22px;
        }
      }
    }
  }
  .my_Grid{
    .toutiao{
      font-size: 45px;
    }
    .toutiao-shoucang{
      color: red;
    }
    .toutiao-lishi{
      color: skyblue;
    }
  }
  .out_box{
    margin: 10px 0;
  }
  .logout_btn{
    text-align: center;
    color: red;
  }
}
</style>
