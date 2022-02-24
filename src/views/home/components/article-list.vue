<template>
  <div class="article-list">
    <!-- 文章列表 -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      :head-height="80"
      @refresh="onRefresh"
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img
          class="doge"
          src="https://img01.yzcdn.cn/vant/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        />
      </template>

      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge.png" />
      </template>

      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="https://img01.yzcdn.cn/vant/doge-fire.jpg" />
      </template>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in articleslist"
          :key="index"
          :article="article"
        />
        <!--  <van-cell
          v-for="(article, index) in articleslist"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      requireq: true
    }
  },
  data () {
    return {
      // 数据列表
      articleslist: [],
      // 控制加载中的 loading 状态
      loading: false,
      // 控制加载结束的状态，当加载结束不在触发加载更多
      finished: false,
      // 获取下一页数据的时间戳
      timestamp: null,
      // 控制刷新的 loading状态
      isRefreshLoading: false
    }
  },
  created () {},
  methods: {
    // 上拉刷新事件
    async onLoad () {
      // 1. 请求获取数据
      const { data: res } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now()
      })

      // 2. 把数据push 到list数组中
      const { results } = res.data
      this.articleslist.push(...results)

      // 3. 设置本次加载状态结束，他才可以判断是否需要加载下一次 否则就会永远停在这里
      this.loading = false

      // 4. 数据全部加载结束了，不会再触发加载更多
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = res.data.pre_timestamp
      } else {
        // 没有数据了，不在触发加载更多
        this.finished = true
      }
    },
    // 下拉刷新事件
    async onRefresh () {
      // 下拉刷新，组件自己就会展示 loading 状态
      try {
        // 1. 请求获取数据
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })

        // 2. 把数据放到数据列表中 （往顶部追加）
        const { results } = res.data
        this.articleslist.unshift(...results)

        // 3. 关闭刷新的状态 loading
        this.isRefreshLoading = false

        this.$toast(`更新了${results.length}条数据`)
      } catch (err) {
        this.$toast('更新数据失败')
        this.isRefreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
// 下拉刷新样式
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
