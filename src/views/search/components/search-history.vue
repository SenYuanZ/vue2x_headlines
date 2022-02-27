<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div>
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </div>
    </van-cell>
    <!-- <van-icon name="delete-o" /> -->
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
    >
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
