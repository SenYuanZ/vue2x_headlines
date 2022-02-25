<template>
  <div class="channel-edit">
    <!-- 我的频道区域 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <!-- 编辑按钮 -->
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!--
      :class="{ active: index === 激活的状态 }"
     -->
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="isEdit && index !== 0 ? 'close' : ''"
        v-for="(channel, index) in UserChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(index)"
      />
    </van-grid>

    <!-- 频道推荐区域 -->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel.js'
export default {
  name: 'ChannelEdit',
  props: {
    UserChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 所有频道数据列表
      allChannels: [],
      // 控制编辑的显示状态
      isEdit: false
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    // 获取所有频道标签
    async loadAllChannels () {
      const { data: res } = await getAllChannels()
      this.allChannels = res.data.channels
    },
    // 频道推荐添加到我的频道事件
    onAdd (channel) {
      this.UserChannels.push(channel)

      //  TODO：数据持久化
    },
    // 删除我的频道标签事件
    onUserChannelClick (index) {
      if (this.isEdit && index !== 0) {
        // 编辑状态：删除频道
        this.deleteChannel(index)
      } else {
        // 非编辑状态，切换频道
        this.switchChannel(index)
      }
    },
    // 封装删除频道逻辑
    deleteChannel (index) {
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.UserChannels.splice(index, 1)

      // 数据持久化
    },
    // 封装切换频道逻辑
    switchChannel (index) {
      // 切换频道
      this.$emit('update-active', index)
      // 关闭弹出层
      this.$emit('close')
    }
  },
  computed: {
    // 推荐的频道列表
    // 计算属性会观测内部依赖数据的变化而重新求值
    recommendChannels () {
      // 思路，所有频道 - 我的频道 = 剩下频道
      // filter 方法：过滤数据，根据方法返回的布尔值 true 来收集数据
      // filter 方法查找满足条件的所有元素
      return this.allChannels.filter((channel) => {
        // 判断 channel 是否属于我的频道
        // find 方法查找满足条件的单个元素
        return !this.UserChannels.find((userChannel) => {
          // 找到满足该条件的元素
          return userChannel.id === channel.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;

    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -5px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: pink !important;
    }
  }
}
</style>
