<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'

const articleList = ref([
  {
    id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  }
])

// 编辑逻辑
const onEditAritcle = (row) => {
  console.log(row)
}
// 删除逻辑
const onDelArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <el-select style="width: 200px">
          <!-- lable 展示给用户看的，value提交给后台看的 -->
          <el-option lable="新闻" value="110"></el-option>
          <el-option lable="体育" value="107"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select style="width: 200px">
          <el-option lable="已发布" value="已发布"></el-option>
          <el-option lable="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="文章分类" prop="cate_name"></el-table-column>
      <el-table-column label="发布时间" prop="pub_date"></el-table-column>
      <el-table-column label="文章状态" prop="state"></el-table-column>
      <!-- 利用作用域插槽 row 可以获取当前行的数据 => v-for 的 item -->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditAritcle(row)"
          ></el-button>
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
  </page-container>
</template>
<style lang="scss" scoped></style>
