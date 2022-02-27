<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，
      即可在 iOS 输入法中显示搜索按钮。
     -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>

    <!--搜索结果 -->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></SearchSuggestion>

    <!-- 历史记录 -->
    <SearchHistory v-else :search-histories="searchHistories"></SearchHistory>
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      // 搜索输入框的内容
      searchText: '',
      // 控制搜索结果的显示状态
      isResultShow: false,
      // 搜索历史数据,本地存储有则用，没有则空数组，防止第一次读到null
      searchHistories: getItem('search-histories') || []
    }
  },
  methods: {
    // 点击键盘上的搜索/回车按钮后触发
    onSearch (searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText

      // 去重处理
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项删除
        this.searchHistories.splice(index, 1)
      }

      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(searchText)

      // 如果用户已登入，则把搜索历史记录储存到线上(没有接口)
      // 如果没有登入，则把搜索历史记录存储到本地
      setItem('search-histories', this.searchHistories)

      // 展示搜索结果
      this.isResultShow = true
    }
  }
}
</script>

<style lang="less" scoped></style>
