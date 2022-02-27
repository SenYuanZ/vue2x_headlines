<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 联想建议数据列表
      suggestions: []
    }
  },
  watch: {
    // 监视数据的变化
    searchText: {
      // 当数据发生变化则会执行 handler处理函数
      // debounce 函数   参数1:函数    参数2:事件   返回值:防抖处理的函数
      handler: debounce(async function () {
        const { data: res } = await getSearchSuggestions(this.searchText)
        this.suggestions = res.data.options
      }, 500),
      immediate: true
    }
  },
  methods: {
    // 处理搜索高亮

    highlight (str) {
      // 错误写法：/this.searchText/gi
      // RegExp 是正则表达式的构造函数
      // 参数1:字符串   参数2:匹配模式   返回值：正则对象
      const regex = new RegExp(this.searchText, 'gi')
      return str.replace(
        regex,
        `<span style="color: red">${this.searchText}</span>`
      )
    }
  }
}
</script>

<style></style>
