<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <template #title>
        <van-button
          type="info"
          class="search-btn"
          icon="search"
          round
          size="small"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 文章频道列表区域 -->
    <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面内容 -->
    <van-tabs v-model="active">
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <ArticleList :channel="channel" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      // 控制呗激活的标签
      active: 0,
      // 频道列表
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 请求获取频道数据
    async loadChannels () {
      const { data: res } = await getUserChannels()
      this.channels = res.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
  }
  .van-icon {
    color: white;
    font-size: 16px;
  }
  .van-button__text {
    font-size: 14px;
  }
}
</style>
