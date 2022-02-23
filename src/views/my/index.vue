<template>
  <div class="my-container">
    <!-- 登入状态 -->
    <van-cell-group v-if="user" class="my-info">
      <!-- 头部导航栏 -->
      <van-cell class="base-info" center :border="false">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="currentUser.photo"
        />
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button size="small" class="update-btn" round> 编辑资料</van-button>
      </van-cell>

      <!-- 用户数据 -->
      <van-grid class="data-info" :border="false">
        <van-grid-item>
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登入状态 -->
    <div v-else class="not-login">
      <div class="mobile" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" />
      </div>
      <div class="text">登入 / 注册</div>
    </div>

    <!-- 收藏和历史  -->
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <!-- 页面导航 -->
    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登入"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      // 当前登入用户信息的数据
      currentUser: {}
    }
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    // 退出登入按钮
    async onLogout () {
      // 提示用户确认退出
      const confirm = await this.$dialog
        .confirm({
          title: '退出提示',
          message: '弹窗内容'
        })
        .catch((err) => err)
      // 失败后
      if (confirm !== 'confirm') {
        return this.$notify({ type: 'warning', message: '已取消' })
      }
      // 成功后
      this.$toast.success('退出登入成功!')
      this.$store.commit('setUser', null)
    },
    // 获取用户个人信息
    async loadCurrentUser () {
      const { data: res } = await getCurrentUser()
      console.log(res)
      this.currentUser = res.data
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-info {
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    .base-info {
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      height: 115px;
      background-color: unset;
      .avatar {
        width: 66px;
        height: 66px;
        margin-right: 11px;
        border: 1px solid #fff;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .update-btn {
        height: 16px;
        color: #666;
        font-size: 10px;
      }
    }
    .data-info {
      .van-grid-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile > img {
      height: 66px;
      width: 66px;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav-grid {
    .van-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        color: #333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 5px;
  }
}
</style>
