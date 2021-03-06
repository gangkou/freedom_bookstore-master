//app.js
const Bmob = require('utils/Bmob-1.6.5.min.js')
const utils = require('utils/util.js')
wx.u = utils
Bmob.initialize("eca239805eeed5e90663fe180d6d1f63","41f2e27fd8da949f6bf338541734b460");
App({
  onLaunch: function () {
    //一键登录
    Bmob.User.auth().then(res=>{
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})