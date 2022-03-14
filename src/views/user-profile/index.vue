<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 个人资料内容 -->
    <!--
      选择头像的input,点击头像手动的触发input的点击事件
      image/* 接收所有图片
      change是input的原生事件：文件发送改变就会触发
     -->
    <input
      type="file"
      hidden
      accept="image/*"
      ref="file"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow = true"
    />

    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <!--
        满足以下这种情况可以使用 v-model 简写
        :name="user.name"
        @update-name="user.name = $event"
      当你传递给子组件的数据既要使用又要修改，例如这里的 name
      这种情况下，我门可以使用 v-mode 简写
     -->
      <!--
       v-model ="user.name"
       默认传递一个名字叫 value 的数据   :value="user.name"
      默认监听 innput事件  触发后会 @input="user.name= $event"
      v-model 的本质还是父子组件通信，他仅仅简化了父组件的使用
      -->
      <!--
        // 如果有多个数据需要保存同步，使用 .sync 修饰符
        :gender.sync="user.gender"
       -->
      <update-name
        v-if="isEditNameShow"
        v-model="user.name"
        @close="isEditNameShow = false"
      ></update-name>
    </van-popup>

    <!-- 修改性别 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <update-gender
        v-model="user.gender"
        @close="isEditGenderShow = false"
      ></update-gender>
    </van-popup>

    <!-- 修改生日 -->
    <van-popup v-model="isEditBirthdayShow" position="bottom">
      <update-birthday
        v-if="isEditBirthdayShow"
        v-model="user.birthday"
        @close="isEditBirthdayShow = false"
      ></update-birthday>
    </van-popup>

    <!-- 修改用户头像 -->
    <van-popup
      class="update-photo-popup"
      v-model="isEditPhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <update-photo
        v-if="isEditPhotoShow"
        :file="previewImage"
        @close="isEditPhotoShow = false"
        @update-photo="user.photo = $event"
      ></update-photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/updata-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  data () {
    return {
      // 用户数据
      user: {},
      // 编辑昵称的显示状态
      isEditNameShow: false,
      // 编辑性别显示状态
      isEditGenderShow: false,
      // 编辑生日的显示状态
      isEditBirthdayShow: false,
      // 编辑用户头像显示状态
      isEditPhotoShow: false,
      // 上传预览图片
      previewImage: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data: res } = await getUserProfile()
      this.user = res.data
    },
    // input原生changge事件,发生改变就触发
    onFileChange () {
      // 在弹出层里面预览图片
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      const file = this.$refs.file.files[0]
      this.previewImage = file

      // 展示弹出层
      this.isEditPhotoShow = true
      /*  为了解决相同文件不触发 changge事件
       所以在这里手动清空 file 的value */
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}
</style>
