<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChang"
    />
  </div>
</template>

<script>
import { updatetUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    onGenderChang (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true // 禁止背景点击
      })
      // 请求用户的性别
      await updatetUserProfile({
        gender: this.defaultIndex
      })

      this.$emit('input', this.defaultIndex)
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style></style>
