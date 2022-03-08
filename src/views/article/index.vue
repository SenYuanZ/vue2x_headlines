<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章正文区域 -->
    <!-- 文章标题 -->
    <div class="article-wrap">
      <h1 class="title">{{ article.title }}</h1>
      <!-- 文章用户信息 -->
      <van-cell center class="user-info">
        <div slot="title" class="name">{{ article.aut_name }}</div>
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="article.aut_photo"
        />
        <div slot="label" class="pubdate">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-button
          :type="article.is_followed ? 'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          class="follow-btn"
          round
          size="small"
          :loading="isFollowLoading"
          @click="onFollow"
          >{{ article.is_followed ? '已关注' : '关注' }}</van-button
        >
      </van-cell>

      <!-- 内容区域 -->
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      ></div>

      <!-- 文章评论列表 -->
      <comment-list
        :source="articleId"
        :list="commentList"
        @update-total-count="totalCommentCount = $event"
      ></comment-list>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        icon="edit"
        type="default"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon
        class="comment-icon"
        name="comment-o"
        :badge="totalCommentCount"
        color="#777"
      />
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? '#3296fa' : '#777'"
        @click="onCollect"
      />
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? '#3296fa' : '#777'"
        @click="onLike"
      />
      <van-icon name="share" color="#3296fa"></van-icon>
    </div>

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment
        :target="articleId"
        @post-success="onPostSuccess"
      ></PostComment>
    </van-popup>
  </div>
</template>

<script>
import {
  getArticleById,
  addCollect,
  delCollect,
  addLike,
  delLike
} from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list.vue'
import PostComment from './components/post-comment.vue'

export default {
  name: 'ArticleIndex',
  components: { CommentList, PostComment },
  // 再组件中 获取动态路由参数：
  // 方式一：this.$route.params.xxx
  // 方式二：props 传参  推荐
  //   this.articleId
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 文章数据
      article: {},
      // 关注用户按钮的 loading 状态
      isFollowLoading: false,
      // 控制发布评论的显示状态
      isPostShow: false,
      // 文章评论列表
      commentList: [],
      // 评论总数量
      totalCommentCount: 0
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    // 根据Id获取文章详情
    async loadArticle () {
      const { data: res } = await getArticleById(this.articleId)
      this.article = res.data

      // 数据改变影响视图更新(DOM数据) 不是立即的
      // 如果需要再修改数据之后马上操作被该数据影响的视图DOM
      // 需要把这个代码放到 $nextTick中
      // $nextTick 是 Vue 中提供的一个方法
      // 得到所有的 img 标签
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
    },
    // 处理图片预览
    handlePerviewImage () {
      // 获取文章内容 DOM 容器
      const articleCountent = this.$refs['article-content']
      console.log(articleCountent)
      // 获取全部img标签
      const imgs = articleCountent.querySelectorAll('img')
      // 收集所有的图片路劲
      const imgPaths = []
      imgs.forEach((img, index) => {
        img.onclick = function () {
          imgPaths.push(img.src)
          ImagePreview({
            images: imgPaths, // 预览图片路径
            startPosition: index // 起始位置
          })
        }
      })
    },
    // 关注按钮处理函数
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 已关注，取消关注
        await deleteFollow(this.article.aut_id)
      } else {
        // 没有关注，添加关注
        await addFollow(this.article.aut_id)
      }
      // 更新视图
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    // 收藏事件
    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.is_collected) {
        // 已收藏，取消收藏
        await delCollect(this.articleId)
      } else {
        // 没有收藏，添加收藏
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected

      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    // 点赞事件
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.article.attitude === 1) {
        // 已点赞，取消点赞
        await delLike(this.articleId)
        this.article.attitude = -1
      } else {
        // 没有点赞，添加点赞
        await addLike(this.articleId)
        this.article.attitude = 1
      }

      this.$toast.success(
        `${this.article.attitude === 1 ? '' : '取消'}点赞成功`
      )
    },
    // 接收子组件传递过来的最新的评论对象
    onPostSuccess (comment) {
      // 把发布成功的评论数据对象放到评论列表顶部
      this.commentList.unshift(comment)
      // 更新评论的总数量
      this.totalCommentCount++
      // 关闭发布评论弹出层
      this.isPostShow = false
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/github-markdown.css');
.article-container {
  .article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 50px;
    overflow-y: auto;
  }
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
  }
  .user-info {
    .avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .name {
      font-size: 12px;
      color: #333;
    }
    .pubdate {
      font-size: 11px;
      color: #b4b4b4;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
  }
  ul {
    list-style: unset;
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
  .article-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 200px;
      height: 30px;
      border: 1px solid #3296fa;
      font-size: 18px;
      line-height: 43px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 25px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
