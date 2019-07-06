const app = getApp();
const in_dec = require('../../public/indec')
const init = require('../../public/init')
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
    Milk_tea: null,
    middleArr : null,
    a : null,
    b : null
  },

  change: function(e) {
    var tapId = e.currentTarget.dataset.id;
    this.setData({
      navId: tapId,
      prompt: this.data.nav_container[tapId]
    });
  },
  addgoods: function(e) {
    in_dec(e, this.data.cratArr,'cratArr',this);
  },
  reduc: function(e) {
      in_dec(e, this.data.cratArr,'cratArr',this);
  },

  onLoad: function() {
    const db = wx.cloud.database()
    db.collection('test').doc('5d12d05e010f117faf22ef7a').get({
      success : (res)=>{
        const arr = init(res.data.container)
        this.setData({
          cratArr: arr,
          Milk_tea: res.data.container,
        })
      }
    })
  },

  onShow:function(options){
    if (app.globalData.flag) {
      const arr = init(this.data.Milk_tea)
      this.setData({
        cratArr: arr
      })
      app.globalData.flag = false
    }else{
      wx.getStorage({
        key: "crat",
        success: (res) => {
          const crat_arr = res.data.crat_arr + ''
          const cratArr = this.data.cratArr + ''
          this.setData({
            cratStr: crat_arr
          }) 
          if (crat_arr == cratArr){
            console.log('菜单不获取缓存')
            return 
          }else{
            console.log('菜单获取缓存')
            this.setData({
              cratArr: res.data.crat_arr,
            })
          }
        }
      })
    }   
  },

  onHide: function(options) {
    const str = this.data.cratArr + ''
    console.log(this.data.cratStr, str  +"菜单")
    if (this.data.cratStr != str){
      console.log('菜单设置缓存')
      var cargo = {
        crat_arr: this.data.cratArr,
        Milk_arr: this.data.Milk_tea
      };
      wx.setStorage({
        key: "cargo",
        data: cargo
      });
    }

    wx.removeStorage({
      key: "crat"
    })
  }
});
