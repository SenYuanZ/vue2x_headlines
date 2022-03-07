<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // 数据或对象的默认值必须通过函数返回
      default: () => []
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      // 获取下一页数据的页码
      offset: null,
      // 每页10条数据
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data: res } = await getComments({
        type: 'a',
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })

      // 2.把数据存到列表中
      const { results } = res.data
      this.list.push(...results)
      // 3.将本次的 loading 关闭
      this.loading = false
      // 4. 判断是否还有数据
      if (results.length) {
        //      如果有，更新获取下一页数据页码
        this.offset = res.data.last_id
      } else {
        //      如果没有，则将 finished 设置为true，不在触发加载更多
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
