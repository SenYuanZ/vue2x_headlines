<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <template #left>
        <van-icon name="cross" @click="$emit('close')" />
      </template>
    </van-nav-bar>
    <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>

    <!-- 所有评论回复 -->
    <van-cell title="所有回复" />
    <comment-list :source="comment.com_id" type="c" :list="commentList" />

    <!-- 底部区域(发送回复按钮) -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        icon="edit"
        type="default"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>

    <!-- 发布回复文本框 -->
    <van-popup v-model="isPostShow" position="bottom">
      <post-comment
        :target="comment.com_id"
        :article-id="articleId"
        @post-success="onPostSuccess"
      ></post-comment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import PostComment from './post-comment.vue'

export default {
  name: 'CommentReply',
  props: {
    comment: {
      // 查看回复评论项
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  components: { CommentItem, CommentList, PostComment },
  data () {
    return {
      // 控制发布回复的显示状态
      isPostShow: false,
      // 评论的回复列表
      commentList: []
    }
  },
  methods: {
    onPostSuccess (comment) {
      // 将发布成功的评论放到评论列表的顶部
      this.commentList.unshift(comment)

      // 更新评论回复的数量
      this.comment.reply_count++

      // 关闭发布回复的弹出层
      this.isPostShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 50px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 200px;
    height: 30px;
    border: 1px solid #3296fa;
    font-size: 18px;
    line-height: 43px;
    color: #a7a7a7;
  }
}
</style>
