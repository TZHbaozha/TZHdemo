Page({
  data: {
    flag: true
  },
  //点击切换打包
  change: function(e) { 
    if (e.currentTarget.dataset.id == true) {
      return;
    } else {
      this.setData({
        flag: !this.data.flag
      });
    }
  },
  onShow : function(){
    wx.getStorage({
      key:'crat',
      success:function(res){
        console.log(res)
      }
    })
  }
});
