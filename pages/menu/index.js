var app = getApp();
var in_dec = require('../in_dec/index')
Page({
  data: {
    nav_container: [
      "人气Top",
      "奶茶",
      "果茶",
      "冰沙果茶",
      "柠檬茶",
      "可乐",
      "橙汁",
      "七喜",
      "王老吉"
    ],
    prompt: "人气Top",
    navId: 0,
    cratArr: null,
    Milk_tea: {
      container: [
        {
          name: "原味奶茶",
          price: 10
        },
        {
          name: '柠檬茶',
          price : 6
        },
        {
          name: '芒果冰',
          price : 8
        },
        {
          name: '蓝莓冰沙',
          price : 12
        },
        {
          name: '可乐',
          price : 12
        },
        {
          name: '东鹏',
          price : 12
        },
        {
          name: '王老吉',
          price : 12
        },
      ]
    }
  },

  change: function(e) {
    var tapId = e.currentTarget.dataset.id;
    this.setData({
      navId: tapId,
      prompt: this.data.nav_container[tapId]
    });
  },
  addgoods: function(e) {
    in_dec(e,this.data.cratArr,'cratArr',this);
  },
  reduc: function(e) {
    in_dec(e,this.data.cratArr,'cratArr',this);
  },

  onLoad: function() {
    var arr = [];
    for (var i = 0; i < this.data.Milk_tea.container.length; i++) {
      arr[i] = 0;
    }
    this.setData({
      cratArr: arr
    });
  },
  onShow:function(){
    var self = this
    wx.getStorage({
      key: "crat",
      success:function(res){
        
        self.setData({
          cratArr :res.data.crat_arr
        })
      }
    })
  },

  onHide: function(options) {
    var cargo = {
      crat_arr: this.data.cratArr,
      Milk_arr:this.data.Milk_tea.container
    };
    wx.setStorage({
      key: "cargo",
      data: cargo
    });
  }
});
