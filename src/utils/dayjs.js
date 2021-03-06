/**
 * 初始化 dayjs 相关配置
 */

import Vue from 'vue'
import dayjs from 'dayjs'
// 配置中文语言包
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 把处理相对时间的代码包装为全局过滤器
// 然后就可以再任何组件的模板使用了
// 再组件的模板中使用过滤器：{{ xxx| 过滤器名称}}
// 管道符前面的内容会作为参数传递给过滤器函数
// 过滤器的返回值会渲染到使用过滤器的模板中
Vue.filter('relativeTime', (value) => {
  return dayjs(value).from(dayjs())
})
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

// 例如日期格式化
/* dayjs().format('YYYY-MM-DD')
console.log(dayjs('2019-01-09').from(dayjs())) */
