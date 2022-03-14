<template>
  <div class="update-photo">
    <img class="image" :src="image" alt="" ref="image" />
    <van-nav-bar
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  props: {
    // 这里不好指定type 因为他获取的是一个特殊的Object对象
    file: {
      required: true
    }
  },
  data () {
    return {
      // 拿到父组件传递过来的 文件对象
      image: window.URL.createObjectURL(this.file),
      // 裁切器实例
      cropper: null
    }
  },
  mounted () {
    // 获取需要裁切的图片 DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      // 查看模式
      viewMode: 1,
      // 拖动模式
      dragMode: 'move',
      // 1:1的裁切框
      aspectRatio: 1,
      // 自动区域
      // autoCropArea: 1,
      // 裁切框是否能拖动
      cropBoxMovable: false,
      // 裁切框是否能改变大小
      cropBoxResizable: false,
      // 默认有一个背景色
      background: false,
      // 图片是否可以移动
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise((resolve) => {
        // toBlob 不支持Promise
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示事件，0 表示持续展示
      })

      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)

      /* 如果要求 Content-Type 是 multipart/form-data，则一定要提交 FormDate数据对象
      专门用于文件上传的，不能提交{}，没用  */
      // fd.append('photo',文件对象)
      // const fd = new FormData()
      // fd.append('photo', this.file)
      await updateUserPhoto(fd)

      // 更新父组件中的用户头像
      this.$emit('update-photo', window.URL.createObjectURL(file))
      // 关闭弹出层
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #000;
}

.image {
  display: block;
  max-width: 100%;
}
</style>
