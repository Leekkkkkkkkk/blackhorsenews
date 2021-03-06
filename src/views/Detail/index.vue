<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap" >
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell  class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate}}</div>
          <!-- <follow-user
          :isFollow='article.is_followed'
          @updateFollowed='article.is_followed=$event'
          :autId='article.aut_id'
          /> -->
          <follow-user
          v-model="article.is_followed"
          :autId='article.aut_id'
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div ref="content" class="article-content markdown-body" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <coumment-list @click-replay='onReplay' :source='this.artId' @onTotal='total = $event' :list='list' />
          <div class="article-bottom">
            <van-button
              class="comment-btn"
              type="default"
              round
              size="small"
              @click="isShowPostCoomentPopup =true"
            >写评论</van-button>
            <van-icon
              name="comment-o"
              :badge="total"
              color="#777"
            />
            <collect-article
            v-model="article.is_collected"
            :artID='article.art_id'
             />
            <van-icon
              color="#777"
              name="good-job-o"
            />
            <van-icon name="share" color="#777777"></van-icon>
          </div>
    <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="is404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else >
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleDetailList">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
      <van-popup v-model="isShowPostCoomentPopup" position="bottom" :style="{ height: '20%' }" >
      <comment-post :target='artId' @on-success='onSuccess' />
      </van-popup>
      <van-popup v-model="isShowPostReplyCommentPopup" position="bottom" :style="{ height: '100%' }" >
        <comment-replay v-if="isShowPostReplyCommentPopup" :comment='comment' @close='isShowPostReplyCommentPopup=false' />
      </van-popup>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import { ImagePreview } from 'vant'
import './github-markdown.css'
import FollowUser from '../../components/FollowUser.vue'
import CollectArticle from '../../components/CollectArticle.vue'
import CoummentList from './components/CoummentList.vue'
import CommentPost from './components/CommentPost.vue'
import CommentReplay from './components/CommentReplay.vue'
export default {
  props: {
    artId: {
      type: String,
      required: true
    }
  },
  name: 'ArticleIndex',
  components: { FollowUser, CollectArticle, CoummentList, CommentPost, CommentReplay },
  data () {
    return {
      article: [],
      isLoading: true,
      is404: false,
      total: 0,
      isShowPostCoomentPopup: false,
      list: [],
      isShowPostReplyCommentPopup: false,
      comment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleDetailList()
  },
  mounted () {},
  methods: {
    async getArticleDetailList () {
      this.isLoading = true
      try {
        const res = await getArticleDetail(this.artId)
        this.article = res
        this.isLoading = false
        this.$nextTick(_ => {
          this.imagePreview()
        })
      } catch (error) {
        console.dir(error)
        if (error.response && error.response.status === 404) {
          this.is404 = true
        }
        this.isLoading = false
      }
    },
    imagePreview () {
      const ims = this.$refs.content
      const imgs = ims.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = function () {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    onSuccess (e) {
      this.isShowPostCoomentPopup = false
      this.list.unshift(e)
    },
    onReplay (e) {
      this.isShowPostReplyCommentPopup = true
      this.comment = e
    }

  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
