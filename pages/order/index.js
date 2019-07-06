//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    imageURL : '/images/food.jpg',
    data : null
  },

  onLoad:function(){

  },
  onShow: function () {
    const db = wx.cloud.database()
    db.collection('order').get({
      _openip: 'o3wS55ZAgwoDi6JCmRofXutf-W9Y'
    }).then(res=>{
      console.log(res.data)
        this.setData({
          data : res.data
        })
    })
  }
})
