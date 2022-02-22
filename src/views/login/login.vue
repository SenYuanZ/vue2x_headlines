<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登入" class="page-nav-bar" />
    <!-- 登入的表单 -->
    <!-- 表单验证：
      1. 给van-field 组件配置 rules 验证规则
      2. 当表单提交的稍后自动触发表单验证
         如果验证通过，会触发submit 事件，失败则不会触发submit事件
     -->
    <van-form ref="loginFormRef" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        left-icon="phone-o"
        type="numbser"
        maxlength="11"
        :rules="userFormRules.mobile"
      />
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        left-icon="bag-o"
        type="numbser"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <template #button>
          <!-- time 倒计时时间 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
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
import { login, sendSms } from '@/api/user.js'

export default {
  name: 'login',
  data () {
    return {
      // 表单提交的数据
      user: {
        // 手机号
        mobile: '13888888123',
        // 验证码
        code: '246810'
      },
      // 表单的验证规则
      userFormRules: {
        mobile: [
          { required: true, message: '请填手机号' },
          // 正则验证
          { pattern: /1[3|5|7|8]\d{9}/, message: '请输入正确格式' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /\d{6}/, message: '请输入正确格式' }
        ]
      },
      // 控制验证码显示与隐藏
      isCountDownShow: false
    }
  },
  created () {},
  methods: {
    // 表单提交事件
    async onSubmit () {
      // 1. 获取表单数据
      // 2. 表单验证
      this.$toast.loading({
        message: '登入中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续时间 是200，  如果为0 则持续展示
      })
      // 3. 提交表单请求
      try {
        const { data } = await login(this.user)
        // 将后端返回的登入状态(token数据) 保存到vuex容器中
        this.$store.commit('setUser', data.data)
        // 处理响应结果
        this.$toast.success('登入成功')
        // 登入成功，跳转页面
        this.$router.back() // 先用这种方式 不太好
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码')
        } else {
          this.$toast.fail('登入失败，请稍后重试')
        }
      }
    },
    // 发送手机验证码
    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.$toast('发送失败')
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
