<template>
  <div>
    <van-cell class="commenet-item">
      <van-image
        slot="icon"
        class="avater"
        round
        fit="cover"
        :src="comment.aut_photo"
      />
      <div slot="title">
        <!-- 评论用户名-->
        <div class="title-wrap">
          <div class="name">{{ comment.aut_name }}</div>
          <div class="like-wrap" @click="onCommentLike">
            <van-icon
              class="like-icon"
              :class="{
                liked: comment.is_liking
              }"
              :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            />
            <span class="like-count">{{ comment.like_count }}</span>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="content">{{ comment.content }}</div>
        <div class="date-wrap">
          <span class="pubdate">{{
            comment.pubdate | datetime('MM:DD HH:mm')
          }}</span>
          <van-button class="reply-btn" round size="mini"
            >{{ comment.reply_count }}回复</van-button
          >
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentLike, delCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    async onCommentLike () {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        // 已点赞，取消点赞
        await delCommentLike(commentId)
        this.comment.like_count--
      } else {
        // 没有点赞，添加点赞
        await addCommentLike(commentId)
        this.comment.like_count++
      }
      // 更新视图
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style lang="less" scoped>
.commenet-item {
  .avater {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .name {
    font-size: 14px;
    color: #406599;
  }
  .content {
    font-size: 16px;
    color: #222;
  }
  .pubdate {
    font-size: 10px;
    margin-right: 10px;
  }
  .date-wrap {
    display: flex;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
  }
  .like-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .like-icon.liked {
    color: #3296fa;
  }
}
</style>
