const app = getApp();

Page({
  data: {
    userInfo: {},
    showLoginDialog: false,
    state: false,
    openId: null,
    dbArr: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.checkSession({
      success: function () {
        console.log('已在登录状态')
      },
      fail: function () {
        console.log('登录失效')
        wx.login()
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {
    // this.setData({
    //   userInfo: app.globalData.userInfo,
    // });
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },

  onUserInfoClick: function () {
    if (this.data.state) {
      this.information()
    } else {
      this.showLoginDialog();
    }
  },

  showLoginDialog() {
    this.setData({
      showLoginDialog: true
    })
  },

  onCloseLoginDialog() {
    this.setData({
      showLoginDialog: false
    })
  },

  onDialogBody() {
    // 阻止冒泡
  },

  onWechatLogin(e) {
    console.log(e.detail)
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        this.setData({
          showLoginDialog: false
        })
        wx.showToast({
          title: '微信登录失败',
          icon: 'none'
        })
      }
      return false
    }

    wx.showToast({
      title: '微信登录成功',
    })
    this.setData({
      userInfo: e.detail.userInfo,
      showLoginDialog: false,
      state: true
    })

    wx.cloud.callFunction({
      name: 'getData',
      success: (res) => {
        console.log(res)
        if (res.result.getData.data.length > 0) {
          return false
        }
        wx.cloud.callFunction({
          name: 'addData',
          data: {
            data: e.detail.userInfo
          },
          success: (res) => {
            console.log(res)
          }
        })
      }
    })
  },

  information: function () {
    wx.navigateTo({
      url: '../personal/personal',
    })
  },

  // onWechatLogin(e) {
  //   if (e.detail.errMsg !== 'getUserInfo:ok') {
  //     if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
  //       return false
  //     }
  //     wx.showToast({
  //       title: '微信登录失败',
  //     })
  //     return false
  //   }
  //   util.login().then((res) => {
  //     return util.request(api.AuthLoginByWeixin, {
  //       code: res,
  //       userInfo: e.detail
  //     }, 'POST');
  //   }).then((res) => {
  //     console.log(res)
  //     if (res.errno !== 0) {
  //       wx.showToast({
  //         title: '微信登录失败',
  //       })
  //       return false;
  //     }
  //     // 设置用户信息
  //     this.setData({
  //       userInfo: res.data.userInfo,
  //       showLoginDialog: false
  //     });
  //     app.globalData.userInfo = res.data.userInfo;
  //     app.globalData.token = res.data.token;
  //     wx.setStorageSync('userInfo', JSON.stringify(res.data.userInfo));
  //     wx.setStorageSync('token', res.data.token);
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  // },



  onOrderInfoClick: function (event) {
    wx.navigateTo({
      url: '/pages/ucenter/order/order',
    })
  },

  onSectionItemClick: function (event) {

  },

  // TODO 移到个人信息页面
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
})