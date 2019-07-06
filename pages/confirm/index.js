const app = getApp()

Page({
  data: {
    flag: true,
    cratArr: null,
    crat_list: null,
    total_num: null,
    quantity_price: null,
    time: null,
    openId: null,
  },
  //点击切换打包
  change: function (e) {
    if (e.currentTarget.dataset.id == true) {
      return;
    } else {
      this.setData({
        flag: !this.data.flag
      });
    }
  },

  judge(item) {
    return item = item < 10 ? '0' + item : item
  },

  getTime: function () {
    let date = new Date()
    let time = this.judge(date.getHours()) + ':' + this.judge(date.getMinutes()) + ':' + this.judge(date.getSeconds())
    let ymd = date.getFullYear() + '-' + this.judge(date.getMonth() + 1) + '-' + this.judge(date.getDate())
    let newTime = ymd + ' ' + time

    return newTime
  },
  sum : function(){
      return this.data.cratArr.reduce((ele,next)=>{
      return ele + next
    })
  },

  pay: function (e) {
    let newTime = this.getTime()
    let sum = this.sum()

    wx.showToast({
      title: '支付成功',
    })
    wx.clearStorage()

    const db = wx.cloud.database()
    db.collection('order').add({
      data: {
        order: {
          userName: '不勤',
          sumPirce: this.data.total_num,
          address: '南湖市场店',
          time: newTime,
          goodNum: this.data.cratArr,
          goodSum : sum,
          goods: this.data.crat_list,
          orderNum : 'TZH29596845985',
          state: '已完成',
        }
      }

    }).then((res) => {
      app.globalData.flag = true
      wx.switchTab({
        url : "../order/index"     
      })

      wx.removeTabBarBadge({
        index: 3
      });
    })
  },

  onLoad: function () {
   
  },

  onShow: function () {
    wx.getStorage({
      key: 'cratArr',
      success:  (res)=> {
        let quantity_price = []
        for (var i = 0; i < res.data.checkCache_crat_list.length; i++) {
          quantity_price.push(res.data.checkCache_crat_list[i].price * res.data.checkCache_cratArr[i])
        }
       this.setData({
          cratArr: res.data.checkCache_cratArr,
          crat_list: res.data.checkCache_crat_list,
          total_num: res.data.total_num,
          quantity_price: quantity_price
        })
      }
    })
  }
});
