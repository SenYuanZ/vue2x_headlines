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
    <van-cell title="头像" is-link center>
      <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow = true"
    />
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" />
    <van-cell title="生日" is-link :value="user.birthday" />

    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        @close="isEditNameShow = false"
        :name="user.name"
      ></update-name>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/updata-name.vue'
export default {
  name: 'UserProfile',
  components: { UpdateName },
  data () {
    return {
      // 用户数据
      user: {},
      // 编辑昵称的显示状态
      isEditNameShow: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data: res } = await getUserProfile()
      this.user = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
</style>
