
const app = getApp()
Page({
  data: {
    imgUrls : [
      'https://images.pexels.com/photos/734214/pexels-photo-734214.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/6332/coffee-cup-books-home.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://images.pexels.com/photos/1204651/pexels-photo-1204651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
  ],
    btn_order: '现在下单',
    rec : '今日推荐',
    pre : '更多优惠'
  },
  //跳转菜单事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../menu/index',
      success: function(){
        console.log('菜单页跳转成功')
      },
      fail:function(){
        console.log('菜单页跳转失败')
      }
    })
  }
})
