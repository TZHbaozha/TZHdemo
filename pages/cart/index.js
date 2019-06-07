var app = getApp();
var in_dec = require("../in_dec/index");
Page({
  data: {
    cratArr: null,
    crat_list: null,
    total_num: null
  },

  add_num: function(e) {
    const cratArr = this.data.cratArr;
    in_dec(e, cratArr, "cratArr", this);
    this.add_dec_num(e);
  },
  reduce_num: function(e) {
    const cratArr = this.data.cratArr;
    in_dec(e, cratArr, "cratArr", this);
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

  bindViewTap : function(){
    wx.switchTab({
      url: '../menu/index',
      success: function(){
        console.log('菜单页跳转成功')
      },
      fail:function(){
        console.log('菜单页跳转失败')
      }
    })
  },
  onShow: function() {
    var self = this;
    wx.getStorage({
      key: "cargo",
      success: function(res) {
        const cratArr = res.data.crat_arr;
        const crat_list = res.data.Milk_arr;

        if (cratArr != null && crat_list != null) {
          const cratNum = self
            .total(cratArr, crat_list)
            .reduce(function(ele, next) {
              return ele + next;
            },0);
          self.setData({
            cratArr: res.data.crat_arr,
            crat_list: res.data.Milk_arr,
            total_num: cratNum
          });
        }
      }
    });
  },

  onHide: function() {
    if (this.data.cratArr != null && this.data.total_num != null) {
      var crat = {
        crat_arr: this.data.cratArr
      };
      wx.setStorage({
        key: "crat",
        data: crat
      });
    }
  }
});
