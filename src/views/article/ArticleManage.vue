<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'

const articleList = ref([]) // 文章列表

const total = ref(0) // 总条数

// 定义请求参数对象
const params = ref({
  pagenum: 1, // 单前页
  pagesize: 5, // 当前生效的每页条数
  cate_id: '',
  state: ''
})

const loading = ref(false) // 控制loading 状态

// 基于params参数，获取文章列表
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
// 获取文章列表
getArticleList()

const articleEditRef = ref()

// 添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}

// 编辑逻辑
const onEditAritcle = (row) => {
  articleEditRef.value.open(row)
}

// 删除逻辑
const onDelArticle = (row) => {
  console.log(row)
}

// 分页条目数变化的方法
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 只要是每页条数变化了，那么原本正在访问的当前页意义不大了，数据已经不在原来那一页了
  // 这里size变化了，就重新从第一页渲染即可
  params.value.pagenum = 1
  params.value.pagesize = size
  // 基于最新的 单前页 和 每页条数，渲染数据
  getArticleList()
}

// 当前页变化的方法
const onCurrentChange = (page) => {
  // console.log('页码变化了', page)
  // 更新当前页
  params.value.pagenum = page
  // 基于最新的当前页渲染
  getArticleList()
}

// 搜索逻辑 => 按照最新的条件，重新检索，从第一页开始展示
const onSearch = () => {
  params.value.pagenum = 1 // 重置页码
  getArticleList()
}

// 重置逻辑 => 将筛选条件清空，重新检索，从第一页开始展示
const onReset = () => {
  params.value.pagenum = 1 // 重置页码
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    // 更新成最大页码数在渲染
    params.value.pagenum = lastPage
  }
  // 如果是编辑，直接渲染当前页
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <!-- Vue2 => v-model 是 :value 和 @input 的简写 -->
        <!-- Vue3 => v-model 是 :modelValue 和 @update:modelValue 的简写 -->
        <!-- <ChannelSelect v-model:modelValue="params.cate_id"></ChannelSelect> -->
        <ChannelSelect width="200px" v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select style="width: 200px" v-model="params.state">
          <el-option lable="已发布" value="已发布"></el-option>
          <el-option lable="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="文章分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="文章状态" prop="state"></el-table-column>
      <!-- 利用作用域插槽 row 可以获取当前行的数据 => v-for 的 item -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button circle plain type="primary" :icon="Edit" @click="onEditAritcle(row)">
          </el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 文章分页 -->
    <!-- 
        current-page：当前页
        page-size：每页条数
        page-sizes：选项是控制每页多少条，设置此配置必须要包含前面的pagesize条目
        size：控制样式大小
        disabled：是否禁用
        background：配置背景颜色
        layout：控制工具栏的 
            total -> 总条目；
            sizes -> 控制分页条数；
            prev -> 上一页箭头；
            page -> 页码；
            next -> 下一页箭头；
            jumper -> 跳转
        size-change：控制分页的方法
        current-change：控制跳转当前页的方法
    -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <!-- 添加编辑的抽屉 -->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
