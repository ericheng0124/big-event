<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

const channelList = ref([])
const loading = ref(false) // 用于配置loading效果
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}

getChannelList()

const onEditChannel = (row, $index) => {
  console.log(row, $index)
  dialog.value.open(row)
}

const onDelChannel = (row, $index) => {
  console.log(row, $index)
}

const onAddChannel = () => {
  dialog.value.open({})
}

const onSuccess = () => {
  getChannelList()
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <!-- 主体部分是 表格 -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="180">
        <!-- row 是 channelList 的一项，$index 下标 -->
        <template #default="{ row, $index }">
          <el-tooltip class="box-item" effect="dark" content="编辑" placement="left">
            <el-button
              type="primary"
              :icon="Edit"
              circle
              plain
              @click="onEditChannel(row, $index)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="删除" placement="right">
            <el-button
              type="danger"
              :icon="Delete"
              circle
              plain
              @click="onDelChannel(row, $index)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 配置空数据效果 -->
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
  </page-container>
</template>
<style lang="scss" scoped></style>
