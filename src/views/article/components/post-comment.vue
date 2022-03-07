<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button @click="onPost" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    // 如果是发布文章评论，则传递文章ID
    // 如果是发布评论回复，则传递评论ID
    target: {
      type: [Number, String, Object],
      required: true
    },
    // 如果是发布评论回复，则也需要传递文章ID
    articleId: {
      type: [Number, String, Object],
      // 默认值是null
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClickL: true // 禁止背景点击
      })
      // 找到数据接口
      // 封装响应方法
      // 请求提交数据
      // 处理响应结果
      const { data: res } = await addComment({
        target: this.target,
        content: this.message,
        // 为了防止超出安全整数范围所以tostring一下
        art_id: this.articleId ? this.articleId.toString() : null
      })
      console.log(res)
      this.$emit('post-success', res.data.new_obj)
      this.$toast.success('发布成功')
      // 发布成功以后，清空文本框内容
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
}
</style>
