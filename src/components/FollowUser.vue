<template>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading='isfollowloading'
            v-if="!isFollow"
            @click="onFollowed"
          >关注</van-button>
          <van-button
          v-else
            class="follow-btn"
            round
            size="small"
            :loading='isfollowloading'
            @click="onFollowed"
          >已关注</van-button>
</template>

<script>
import { deleteFollow, followUser } from '@/api/user.js'
export default {
  props: {
    isFollow: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isfollowloading: false
    }
  },

  created () {

  },
  model: {
    prop: 'isFollow',
    event: 'updateFollowed'
  },

  methods: {
    async onFollowed () {
      this.isfollowloading = true
      try {
        if (this.isFollow) {
        // console.log('取消关注')
          await deleteFollow(this.autId)
        } else {
        // console.log('关注')
          await followUser(this.autId)
        }
        this.$emit('updateFollowed', !this.isFollow)
        this.isfollowloading = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang='less'>

</style>
