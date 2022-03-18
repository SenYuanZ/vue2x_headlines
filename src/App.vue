<template>
  <div id="app">
    <!-- 路由的出口 -->
    <!--
    因为 router-view 是一级路由出口，
    keep-alive 仅对该路由出口渲染的组件有效
     -->
    <keep-alive :include="['LayouIndex']">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
