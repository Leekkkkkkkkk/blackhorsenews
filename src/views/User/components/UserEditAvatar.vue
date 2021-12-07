<template>
  <div class="update-avatar">
    <img :src="img" alt="" id="image">
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="onConfirm">完成</span>
    </div>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  props: {
    img: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    const image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      autoCropArea: 1, // 自动调整裁剪图片
      viewMode: 1, // 只能在裁剪的图片范围内移动
      cropBoxMovable: false, // 禁止裁剪区移动
      aspectRatio: 1,
      dragMode: 'move',
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false
    })
  },
  created () {

  },

  methods: {
    onConfirm () {
      // console.log('完成')
      console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData()
        formData.append('photo', blob)
        try {
          const res = await updateUserPhoto(formData)
          this.$emit('close')
          this.$emit('update-photo', res.photo)
          this.$toast.success('更新成功')
        } catch (error) {
          this.$toast.fail('更新失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
