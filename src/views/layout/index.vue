<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>

    <!-- 标签导航栏 -->
    <!-- route  开启路由模式 to：要前往的路径 -->
    <van-tabbar route>
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="tv-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayouIndex',
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
