<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },

  created () {

  },

  methods: {
    async onConfirm (val, inx) {
      // console.log('点击保存')
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        DragEvent: 0
      })
      try {
        await updateUserProfile({
          gender: inx
        })
        Toast.success('更新成功')
        this.$emit('close')
        this.$emit('input', inx)
      } catch (error) {
        console.dir(error)
        Toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
