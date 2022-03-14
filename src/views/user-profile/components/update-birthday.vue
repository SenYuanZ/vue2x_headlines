<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updatetUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: false // 禁止点击背景
      })

      /*
      // 第一种方式
      const date = `
      ${this.currentDate.getFullYear()}-
      ${this.currentDate.getMonth() + 1}-
      ${this.currentDate.getDate()}
    ` */
      // 第二种用 dayjs 第三方包
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      // 更新用户的生日
      await updatetUserProfile({
        birthday: date
      })
      this.$emit('input', date)
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style></style>
