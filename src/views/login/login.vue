<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登入" class="page-nav-bar" />
    <!-- 登入的表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="用户名"
        placeholder="请输入手机号"
        left-icon="phone-o"
      />
      <van-field
        v-model="user.code"
        name="验证码"
        placeholder="请输入验证码"
        left-icon="passed"
      >
        <template #button>
          <van-button class="send-sms-btn" round size="small" type="default"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div style="padding: 53px 33px">
        <van-button block type="info" native-type="submit">登入</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user.js'

export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13888888123', // 手机号
        code: '246810' // 验证码
      }
    }
  },
  methods: {
    async onSubmit () {
      // 1. 获取表单数据
      // 2. 表单验证
      // 3. 提交表单请求
      try {
        const res = await login(this.user)
        console.log('登入成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码不正确')
        } else {
          console.log('登入失败，稍后重试', err)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send-sms-btn {
    background-color: #ededed;
  }
}
</style>
