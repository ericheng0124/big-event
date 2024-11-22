<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const emit = defineEmits(['update:modelValue'])

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  console.log(channelList.value)
}

getChannelList()
</script>

<template>
  <el-select
    style="width: 200px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <!-- lable 展示给用户看的，value提交给后台看的 -->
    <el-option
      v-for="channel in channelList"
      :label="channel.cate_name"
      :value="channel.id"
      :key="channel.id"
    ></el-option>
  </el-select>
</template>
