<template>
  <div>
      <van-nav-bar
        title="更新昵称"
        left-text="返回"
        right-text="保存"
        left-arrow
        @click-left="$emit('close')"
        @click-right="onClickRight"
      />
      <van-field
        v-model.trim="message"
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },

  created () {
    this.message = this.value
  },

  methods: {
    async onClickRight () {
      // console.log('保存')
      if (this.message === '') return Toast('请输入昵称')
      try {
        const res = await updateUserProfile({
          name: this.message
        })
        console.log(res)
        Toast.success('更新成功')
        this.$emit('close')
        this.$emit('input', this.message)
      } catch (err) {
        console.dir(err)
        if (err.response && err.response.status === 409) {
          Toast.fail('昵称已存在')
          return
        }
        Toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
