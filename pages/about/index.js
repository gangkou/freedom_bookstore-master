// pages/about/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QQ:"1593554685",
    email: "1593554685@qq.com",
    github:"https://github.com/gangkou",
    name: 'freedom bookstore'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  adLoad() {
    wx.hideLoading();
    console.log('Banner 广告加载成功')
  },
  adError(err) {
    wx.hideLoading();
    console.log('Banner 广告加载失败', err)
  },
  adClose() {
    wx.hideLoading();
    console.log('Banner 广告关闭')
  },
  copyDataTap: function (a) {
    var t = a.target.dataset.index;
    wx.setClipboardData({
      data: t,
      success: function (a) {
        wx.getClipboardData({
          success: function (a) {
            console.log(a.data);
          }
        });
      }
    });
  },
  open (){
    wx.navigateToMiniProgram({
      appId: 'wx7df186fa6b0094c1',
      path: 'pages/homepage/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })
  }
})