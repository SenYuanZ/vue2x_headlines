<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <template #title>
        <van-button
          type="info"
          class="search-btn"
          icon="search"
          round
          size="small"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 文章频道列表区域 -->
    <!-- 标签页组件有一个功能，只有你第一次查看标签页的时候才会渲染里面内容 -->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        v-for="channel in channels"
        :title="channel.name"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <ArticleList :channel="channel" />
      </van-tab>
      <!-- 汉堡按钮定位了把列表最后的位置给挡住了 -->
      <!-- 解决办法L:就是再这里添加一个占位元素 -->
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div
        slot="nav-right"
        class="wap-nav-warp"
        @click="isChannelEditShow = true"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>

    <!-- 频道弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <!-- 频道封装成一个组件 -->
      <!--
        模板中的 $event 表示事件参数
       -->
      <ChannelEdit
        :UserChannels="channels"
        :active="active"
        @close="isChannelEditShow = false"
        @update-active="active = $event"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      // 控制呗激活的标签
      active: 0,
      // 频道列表
      channels: [],
      // 控制编辑频道的显示状态
      isChannelEditShow: true
    }
  },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () {
      let channls = []
      if (this.user) {
        // 已登入，请求获取线上用户频道列表数据
        const { data: res } = await getUserChannels()
        channls = res.data.channels
      } else {
        // 没有登入，判断是否有本地存储的频道列表数据
        const localChannels = getItem('user-channel')
        // 如果有本地存储的频道列表，则使用
        if (localChannels) {
          channls = localChannels
        } else {
          // 用户没有登入，也没有本地存储的频道列表，
          // 那就请求获取默认推荐的频道列表
          const { data: res } = await getUserChannels()
          channls = res.data.channels
        }
      }
      // 把处理好的数据放到 data 中以供模板使用
      this.channels = channls
      // 请求获取频道数据
      /* const { data: res } = await getUserChannels()
      this.channels = res.data.channels */
    }
    // 更新修改的频道
    // onUpdateActive (index) {
    //   this.active = index
    // }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
  }
  .page-nav-bar {
    .van-icon {
      color: white;
      font-size: 16px;
    }
  }

  .van-button__text {
    font-size: 14px;
  }
  .channel-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      width: 15px;
      height: 3px;
      bottom: 20px;
      background: #3296fa;
    }
  }
  /deep/ .van-tab {
    padding: 0 30px;
  }
  /* 占位符 */
  .wap-nav-placeholder {
    width: 20px;
    flex-shrink: 0;
  }
  .wap-nav-warp {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    opacity: 0.9;
    .van-icon {
      font-size: 24px;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 43px;
      background: url('~@/assets/gradient-gray-line.png');
      background-size: contain;
    }
  }
}
</style>
