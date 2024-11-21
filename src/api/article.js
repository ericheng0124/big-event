import request from '@/utils/request'
// 文章相关的接口

// 获取文章分类
export const artGetChannelsService = () => request.get('/my/cate/list')

// 删除文章分类
export const artDelChannelsService = (id) => request.delete('/my/cate/del', { id })
