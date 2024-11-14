<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useCountStore } from './stores'

// 在 Vue3 CompositionAPI 中
// 1. 获取路由对象 router useRouter
//    const router = useRouter()
// 2. 获取路由参数 route useRoute
//    const route = useRoute()

const router = useRouter()
const route = useRoute()

const goList = () => {
  console.log(router, route)
  router.push('/list')
}

const userStore = useUserStore()

const useCounter = useCountStore()
</script>

<template>
  <div>
    <hr />
    <router-view></router-view>
    <hr />
    <hr />
    <hr />
    我是App
    <test-demo></test-demo>
    <el-button @click="$router.push('/home')">跳首页</el-button>
    <el-button @click="goList">跳列表页</el-button>

    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('Bearer sidfagaehjkewraera')"
      >登陆</el-button
    >
    <el-button @click="userStore.removeToken()">退出</el-button>
    <hr />
    <p>{{ useCounter.count }}</p>
    <el-button @click="useCounter.addCount(2)">加2</el-button>
  </div>
</template>

<style scoped></style>
