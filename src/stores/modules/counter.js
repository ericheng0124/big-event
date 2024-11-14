import { defineStore } from 'pinia'
import { ref } from 'vue'
// 计数器模块  count addCount
export const useCountStore = defineStore('big-counter', () => {
  const count = ref(100)
  const addCount = (num) => {
    count.value += num
  }
  return {
    count,
    addCount
  }
})
