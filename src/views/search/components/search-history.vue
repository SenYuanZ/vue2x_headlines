<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <!--
          prop 数据如果是引用类型（数组，对象）可以修改
          注意这个修改指的是：user.name = 'jack'、arr.push(123)
          但是任何 prop 数据都不能重新赋值：xxx=xxx
         -->
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onDelete(history, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
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
  },
  data () {
    return {
      // 删除的显示状态
      isDeleteShow: false
    }
  },
  methods: {
    onDelete (history, i) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(i, 1)
        // 持久化处理
        // 1.修改本地存储的数据
        // setItem('search-histories', this.searchHistories)
        // 2. 删除线上数据(没有接口)
        return
      }

      // 非删除状态，展示搜索结果
      this.$emit('search', history)
    }
  }
}
</script>

<style></style>
