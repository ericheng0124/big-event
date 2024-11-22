<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)

// 组件对外暴漏一个方法 open ，基于open传来的参数，区分是添加操作还是编辑操作
// open({}) => 传来的是个空对象，说明是添加操作
// open({id,cate_name,...}) => 传来的有具体数据，表单需要渲染，说明是编辑操作
// open调用后，可以打开弹层

const open = (row) => {
  console.log(row)
  dialogVisible.value = true
}

// 向外暴漏方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="提示" width="500">
    <span>弹层内容部分</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
