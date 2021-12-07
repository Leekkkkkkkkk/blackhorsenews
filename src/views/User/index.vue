<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <input type="file"  @change="onClick" ref="inputFile" hidden>
    <van-cell title="头像"  @click="$refs.inputFile.click()" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" @click="isShowEdit=true" :value="user.name" is-link />
    <van-cell title="性别" :value="user.gender ? '女' : '男' " is-link  @click="isShowEditSex=true" />
    <van-cell title="生日" @click="isShowEditBirthday=true" :value="user.birthday" is-link />
    <van-popup v-model="isShowEdit" position="bottom" :style="{ height: '100%' }">
      <user-edit v-model="user.name" @close='isShowEdit=false' />
    </van-popup>
    <van-popup v-model="isShowEditSex" position="bottom" >
      <user-edit-sex  v-model="user.gender" @close='isShowEditSex=false' />
    </van-popup>
     <van-popup v-model="isShowEditBirthday" position="bottom" >
       <user-edit-birth-day v-model="user.birthday" @close='isShowEditBirthday=false' />
    </van-popup>
    <van-popup v-model="isShowEditAvatar" position="bottom" >
       <user-edit-avatar v-if="isShowEditAvatar" @update-photo='user.name=$event' @close='isShowEditAvatar=false' :img='imgUrl' />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UserEdit from './components/UserEdit.vue'
import UserEditSex from './components/UserEditSex.vue'
import UserEditBirthDay from './components/UserEditBirthDay.vue'
import UserEditAvatar from './components/UserEditAvatar.vue'
export default {
  components: { UserEdit, UserEditSex, UserEditBirthDay, UserEditAvatar },
  data () {
    return {
      user: [],
      isShowEdit: false,
      isShowEditSex: false,
      isShowEditBirthday: false,
      isShowEditAvatar: false,
      imgUrl: ''
    }
  },

  created () {
    this.getProfile()
  },

  methods: {
    async getProfile () {
      try {
        const res = await getUserProfile()
        console.log(res)
        this.user = res
      } catch (error) {
        console.dir(error)
      }
    },
    onClick (e) {
      console.log(e.target.value)
      if (e.target.value === '') return
      this.isShowEditAvatar = true
      this.imgUrl = URL.createObjectURL(e.target.files[0])
      e.target.value = ''
    }
  }
}
</script>

<style scoped lang='less'>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  /deep/.van-nav-bar__arrow {
    color: #fff;
  }
}
</style>
