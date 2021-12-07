<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm='onconfirm'
      @cancel='$emit("close")'
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import dayJS from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentDate: null,
      minDate: new Date('200-01-01'),
      maxDate: new Date()
    }
  },

  created () {
    this.currentDate = new Date(this.value)
  },

  methods: {
    async onconfirm (val) {
      console.log(val)
      const formDate = dayJS(val).format('YYYY-MM-DD')
      console.log(formDate)
      try {
        await updateUserProfile({
          birthday: formDate
        })
        this.$toast.success('更新成功')
        this.$emit('close')
        this.$emit('input', formDate)
      } catch (error) {
        console.dir(error)
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
