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
        >{{ article.is_followed ? '已关注' : '关注' }}</van-button
      >
    </van-cell>
    <div class="markdown-body" v-html="article.content"></div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
// 再组件中 获取动态路由参数：
// 方式一：this.$route.params.xxx
// 方式二：props 传参  推荐
//   this.articleId
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 文章数据
      article: {}
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data: res } = await getArticleById(this.articleId)
      this.article = res.data
    }
  }
}
</script>

<style lang="less" scoped>
@import url('~@/style/github-markdown.css');
.article-container {
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
}
</style>
