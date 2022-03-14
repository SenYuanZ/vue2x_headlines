<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 文本输入框 -->
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updatetUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    // 声明就收父组件 v-model 传递的 value 数据
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true // 禁止背景点击
      })
      try {
        // 请求提交更新用户昵称
        await updatetUserProfile({
          name: this.localName
        })
        this.$toast.success('保存成功')
        // 更新成功 ->修改父组件的 name ->关闭弹出层
        this.$emit('close')
        // 往父组件发送个事件，更新昵称
        // 发送input事件 更新父组件 v-model绑定的数据
        this.$emit('input', this.localName)
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.name-field-wrap {
  padding: 10px;
}
</style>
