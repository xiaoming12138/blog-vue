export default {
  // 请求地址设置
  baseUrl: {
    dev: 'http://60.205.170.188:3000/',
    prod: 'http://60.205.170.188:3000/',
    mock: 'https://www.fastmock.site/mock/2f572a6975b9cc96b054aba2fa94c30f/api/'
  },
  // 是否开启全局mock状态
  isMock: false,
  // 本地存储命名空间
  stroageSpace: 'community',
  // webSocket链接地址设置
  socketUrl: {
    dev: 'ws://60.205.170.188:3001',
    prod: 'ws://60.205.170.188:3001'
  }
}
