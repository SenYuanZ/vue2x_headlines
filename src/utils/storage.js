/*
 **封装本地存储操作模块
 ****/

// 存储数据
export const setItem = (key, value) => {
  // 将数组对象类型的数据转换为 json 格式字符串进行储存
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    // 尝试把data 转为 JavaScript对象
    return JSON.parse(data)
  } catch (err) {
    // data 不是JSON 格式字符串 直接原样返回
    return data
  }
}

// 删除数据

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
