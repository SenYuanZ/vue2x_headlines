<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      // 页码
      page: 1,
      // 每次加载多少条数据
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data: res } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })

      // 2.将数据放到数据列表中
      const { results } = res.data
      this.list.push(...results)

      // 3.关闭本次的 loading
      this.loading = false

      // 4. 判断是否还有数据
      if (results.length) {
        // 如果有,则更新获取下一页数据的页码
        this.page++
      } else {
        // 如果没有，则把finished 设置为true 关闭加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
