<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
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

// 图片上传相关
const imgUrl = ref('')

const onSelectFile = (uploadFile) => {
  // console.log(uploadFile)
  imgUrl.value = URL.createObjectURL(uploadFile.raw) // 预览图片
}

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
    <el-form :model="formModel" ref="formRef" label-width="100px">
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
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
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
</style>
