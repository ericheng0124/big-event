import request from '@/utils/request'
// 文章相关的接口

// 获取文章分类
export const artGetChannelsService = () => request.get('/my/cate/list')

// 删除文章分类
export const artDelChannelsService = (id) => request.delete('/my/cate/del', id)

// 添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 编辑文章分类
export const artEditChannelService = (data) => request.put('/my/cate/info', data)
