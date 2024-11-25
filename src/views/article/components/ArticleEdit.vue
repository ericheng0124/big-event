<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artPublishService } from '@/api/article'
// 控制抽屉弹层的显示和隐藏
const visibleDrawer = ref(false)

// 默认数据
const defaultForm = {
  title: '', // 标题
  cate_id: '', // 分类ID
  cover_img: '', // 封面图片 file 对象
  content: '', // string 内容
  state: '' // 状态
}

// 准备数据
const formModel = ref({
  ...defaultForm
})

const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  cate_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
  cover_img: [{ required: true, message: '请上传封面', trigger: 'change' }],
  content: [{ required: true, message: '输入内容', trigger: 'blur' }]
}

// 图片上传相关
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

const emit = defineEmits(['success'])

// 发布方法
const onPublish = async (state) => {
  formModel.value.state = state
  // 请注意当前接口需要的事 formData 对象
  // 将普通对象 => 转换成 => formData对象
  const formData = new FormData()
  for (let key in formModel.value) {
    formData.append(key, formModel.value[key])
  }
  // 发请求
  if (formModel.value.id) {
    // 有id表示是编辑
    console.log('编辑操作')
  } else {
    await artPublishService(formData)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    // 通知父组件添加成功
    emit('success', 'add')
  }
}

const richEditRef = ref()

// 组件对外暴漏一个方法 open ，基于open传来的参数，区分是添加操作还是编辑操作
// open({}) => 传来的是个空对象，说明是添加操作
// open({id,cate_name,...}) => 传来的有具体数据，表单需要渲染，说明是编辑操作
// open调用后，可以打开弹层
const open = (row) => {
  visibleDrawer.value = true // 显示抽屉
  if (row.id) {
    // 有id表示是编辑更新操作
    // 需要基于 row.id 发送请求，获取编辑对应的详情数据，进行回显
    console.log('编辑回显')
  } else {
    // 没有id表示是添加操作
    formModel.value = { ...defaultForm } // 基于默认的数据，重置form数据
    // 此处只是重置了表单的数据，但是图片上传img地址和富文本编辑器内容，需要手动重置
    imgUrl.value = ''
    richEditRef.value.setHTML('')
    console.log('添加')
  }
  console.log(row)
}

defineExpose({
  open
})
</script>

<template>
  <!-- 抽屉弹层 -->
  <!-- 
        title：标题
        direction：弹出方向 默认是从右往左 
            rtl -> right to left
            ltr -> left to right
            ttb -> top to bottom
            btt -> bottom to top
        size：弹出的大小，可以 使用 像素px 也可以使用 百分比
    -->
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input style="width: 90%" v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="90%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 
          此处需要关闭 element-plus 的自动上传，不需要配置 action 等参数
          只需要做前端的本地预览图片即可，无需在提交之前上传图片
          语法：URL.createObjectURL(...)创建本地预览地址，来预览
        -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <!-- 富文本编辑器 -->
          <quill-editor
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
            ref="richEditRef"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 90%;
  :deep(.ql-editor) {
    min-height: 300px;
  }
}
</style>
