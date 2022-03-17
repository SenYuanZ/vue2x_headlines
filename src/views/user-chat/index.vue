<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息列表 -->
    <van-cell-group class="message-list" ref="message-list">
      <!-- <van-cell
        :title="item.data.msg"
        v-for="(item, index) in messages"
        :key="index"
      /> -->
      <div v-for="(item, index) in messages" :key="index">
        <!-- 小思机器人 -->
        <van-cell class="chat-xs" v-if="item.name === 'xs'">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-image
              class="photo"
              round
              fit="cover"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <span class="custom-title">{{ item.msg }}</span>
          </template>
        </van-cell>
        <!-- 我的消息 -->
        <van-cell class="chat-my" v-else>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">{{ item.msg }}</span>
            <van-image class="photo" round fit="cover" :src="myPhoto.photo" />
          </template>
        </van-cell>
      </div>
    </van-cell-group>

    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入消息" :border="false" />
      <van-button type="primary" size="small" @click="onSend">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { io } from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  data () {
    return {
      // 要发送的消息
      message: '',
      // WebSocket 通信对象
      socket: null,
      // 消息列表
      messages: getItem('chat-messages') || [],
      myPhoto: getItem('UserProfile')
    }
  },
  watch: {
    messages () {
      setItem('chat-messages', this.messages)

      // 如果你要在操作数据之后立即操作数据影响的视图DOM，
      // 那么最好把代码放到 nextTick 函数中
      // 数据改变影响视图更新这件事不是立即的
      this.$nextTick(() => {
        this.scrollTopBottom()
      })
    }
  },
  // 组件在内存中创建好了
  created () {
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: mapState
      },
      transports: ['websocket']
    })
    this.socket = socket
    socket.on('connect', function () {
      console.log('连接成功')
    })
    socket.on('disconnect', function () {
      console.log('断开连接')
    })
    // 监听 message 事件，接收服务端消息
    socket.on('message', ({ msg }) => {
      // 把对方发过来的消息 存放到数组中
      this.messages.push({ name: 'xs', msg })
      console.log(msg)
    })
  },
  // DOM元素创建好了
  mounted () {
    this.scrollTopBottom()
  },
  // 将要销毁组件
  beforeDestroy () {
    this.socket.close()
    this.socket = null
    localStorage.removeItem('chat-messages')
  },
  methods: {
    onSend () {
      // 请求发送消息
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      // 把用户发出去的消息存储到数组中
      this.messages.push({ name: 'my', msg: data.msg })
      // 清空输入框
      this.message = ''
    },
    scrollTopBottom () {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  }
}
</script>

<style lang="less" scoped>
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.van-button--small {
  width: 60px;
  height: 35px;
}
.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
}
.message-list {
  .photo {
    width: 50px;
    height: 50px;
  }
  .chat-xs {
    .custom-title {
      display: inline-block;
      height: 30px;
      background: #ccc;
      font-size: 16px;
      margin-left: 5px;
      padding: 10px 10px;
    }
  }
  .chat-my {
    margin-top: 10px;
    .custom-title {
      display: inline-block;
      height: 30px;
      background: #ccc;
      font-size: 16px;
      margin-right: 5px;
      padding: 10px 10px;
    }
  }
}
</style>
