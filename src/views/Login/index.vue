<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      class="page-nav-bar"
    />
    <van-form @submit="onSubmit" ref="form">
    <van-field
      v-model="form.mobile"
      name="mobile"
      ref="mobile"
      placeholder="请输入手机号"
      :rules="[
      {required:true,message:'请输入手机号'},
      {pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,message:'你输入的手机号不符合规范'}
      ]"
    >
    <template #left-icon>
      <i class="toutiao toutiao-shouji login-icon"></i>
    </template>
    </van-field>
    <van-field
      v-model="form.code"
      name="code"
      placeholder="请输入验证码"
      :rules="[
      {required:true,message:'请输入验证码'},
      {pattern:/^[0-9]{6}$/,message:'你输入的验证码不符合规范'}
      ]"
    >
    <template #left-icon>
      <i class="toutiao toutiao-yanzhengma login-icon"></i>
    </template>
    <template #button>
      <van-count-down @finish='isCountDown=false' :time="60*1000" format="ss s" v-if="isCountDown" />
      <van-button native-type="button" v-else @click='onSed' class="sen-btn" size="small" type="primary">发送验证码</van-button>
    </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button class="login-btn" round block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>
  </div>
</template>

<script>
import { getCode, login } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      isCountDown: false
    }
  },

  created () {
  },

  methods: {

    async onSubmit () {
      try {
        const res = await login(this.form)
        console.log(res)
        this.$store.commit('initunser', res.data.data)
        this.$router.push('/profile')
      } catch (error) {
        Toast.fail('登录失败')
      }
    },
    async onSed () {
      try {
        await this.$refs.form.validate('mobile')
        await getCode(this.form.mobile)
        Toast.success('验证码已发送')
        this.isCountDown = true
      } catch (err) {
        if (!err.response) return
        if (err.response && err.response.status === 429) {
          return Toast.fail('亲点击的太频繁了哦')
        }
        Toast.fail('网络异常')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.login{
  .login-btn{
    background-color: #6db4fb;
    border: none;
    border-radius: 10px;
  }
  .login-icon{
    font-size: 37px;
  }
  .sen-btn{
    width: 152px;
    height: 46px;
    background: #EDEDED;
    border: none;
    border-radius: 23px;
    padding: 0;
    font-size: 22px;
    color: #666666;
  }
}
</style>
