import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象,用来存储当前登入用户信息（token等数据）
    user: getItem(TOKEN_KEY),
    /* user: JSON.parse(window.localStorage.getItem(TOKEN_KEY)) */

    cachePages: ['LayouIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了就是防止刷新丢失，把数据备份到本地存储中
      setItem(TOKEN_KEY, state.user)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    },
    // 添加缓存页面
    addCachePage (state, pagaName) {
      if (!state.cachePages.includes(pagaName)) {
        state.cachePages.push(pagaName)
      }
    },

    // 移出缓存页面
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {},
  modules: {}
})
