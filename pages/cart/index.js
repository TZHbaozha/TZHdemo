var app = getApp();
var in_dec = require("../../public/indec");
const init = require('../../public/init')
Page({
  data: {
    cratArr: null,
    crat_list: null,
    total_num: null,
    middleArr : null,
    cratStr : null
  },


  add_num: function(e) {
    in_dec(e, this.data.cratArr, "cratArr", this);
    this.add_dec_num(e);
  },
  reduce_num: function(e) {
    in_dec(e, this.data.cratArr, "cratArr", this);
    this.add_dec_num(e);
  },

  add_dec_num: function(e) {
    var cratId = e.currentTarget.dataset.id;
    var typeId = e.currentTarget.id;
    var add_dec = null;
    if (typeId == "add_btn") {
      add_dec = this.data.total_num + this.data.crat_list[cratId].price;
    } else if (typeId == "reduc_btn") {
      add_dec = this.data.total_num - this.data.crat_list[cratId].price;
    } else {
      return;
    }
    this.setData({
      total_num: add_dec
    });
  },

  total: function(cratArr, crat_list) {
    var arr = [];
    cratArr.forEach(function(ele, index) {
      if (ele > 0) {
        arr.push(ele * crat_list[index].price);
      }
    });
    return arr;
  },

  bindViewTap: function() {
    wx.switchTab({
      url: "../menu/index",
    });
  },

  invoicing: function(e) {
    if (this.data.total_num == 0 || this.data.total_num == null ){
      wx.showToast({
        title: '请前往菜单栏',
      })
      return
    }

    wx.navigateTo({
      url: "../confirm/index",
      success: ()=> {
        let checkCache_cratArr = [];
        let checkCache_crat_list = [];
        for (let i = 0; i < this.data.cratArr.length; i++) {
          if (this.data.cratArr[i] > 0) {
            checkCache_cratArr.push(this.data.cratArr[i]);
            checkCache_crat_list.push(this.data.crat_list[i]);
          }
        }

        let cratArr = {
          checkCache_cratArr: checkCache_cratArr,
          total_num: this.data.total_num,
          checkCache_crat_list: checkCache_crat_list
        };
        wx.setStorage({
          key: "cratArr",
          data: cratArr
        })
      }
    });
  },
  cratNum(cratArr, crat_list){
     return this.total(cratArr, crat_list)
      .reduce(function (ele, next) {
        return ele + next;
      }, 0);
  },
  onLoad:function(){
    
  },
  onShow: function() {
    if(app.globalData.flag){
      const arr = init(this.data.crat_list)
      this.setData({
        cratArr: arr,
        total_num : 0
      })  
      app.globalData.flag = false;
    }else{

      wx.getStorage({
        key: "cargo",
        success: (res) => {
          const cratArr = res.data.crat_arr;
          const crat_list = res.data.Milk_arr;

          if (cratArr != null && crat_list != null) {
            const _str = res.data.crat_arr + ''
            const str = this.data.cratArr + ''

            if (_str != str) {
              console.log('购物车----修改数据')
              const cratNum = this.cratNum(cratArr, crat_list)
              this.setData({
                cratArr: res.data.crat_arr,
                crat_list: res.data.Milk_arr,
                total_num: cratNum
              });
            } 
            this.setData({
             cratStr: _str
            })
          }
        }
      });
    }  
  },

  // reset(){
  //   const arr = init(this.data.crat_list)
  //   this.setData({
  //     middleArr: arr
  //   })
  // },

  onHide: function() {
    if (this.data.cratArr != null && this.data.total_num != null) {

      const str = this.data.cratArr + ''

      console.log(this.data.cratStr, str,'购物车')
      if (str != this.data.cratStr){
        console.log('购物车设置缓存')
        let crat = {
          crat_arr: this.data.cratArr
        };
        wx.setStorage({
          key: "crat",
          data: crat
        });
      }
      wx.removeStorage({
        key: "cargo"
      });
    }
  }
});
