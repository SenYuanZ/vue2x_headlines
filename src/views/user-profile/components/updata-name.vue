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
export default {
  name: 'UpdateName',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.name
    }
  },
  methods: {
    onConfirm () {
      console.log(123)
    }
  }
}
</script>

<style lang="less" scoped>
.name-field-wrap {
  padding: 10px;
}
</style>
