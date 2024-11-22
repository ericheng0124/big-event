<script setup>
import { artAddChannelService, artEditChannelService } from '@/api/article'
import { ref } from 'vue'

const dialogVisible = ref(false)

const fromRef = ref()

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类名必须是1-10位字符或数字',
      trigger: 'blur'
    }
  ]
}

// 组件对外暴漏一个方法 open ，基于open传来的参数，区分是添加操作还是编辑操作
// open({}) => 传来的是个空对象，说明是添加操作
// open({id,cate_name,...}) => 传来的有具体数据，表单需要渲染，说明是编辑操作
// open调用后，可以打开弹层

const emit = defineEmits(['success'])

const onSubmit = async () => {
  await fromRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  formModel.value = { ...row } // 添加 -> 重置表单内容，编辑 -> 存储了需要回显的数据
}

// 向外暴漏方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '添加分类'" width="500">
    <el-form
      ref="fromRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px; padding-top: 20px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="请输出分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="请输出分类别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
