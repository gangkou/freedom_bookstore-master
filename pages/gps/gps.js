// pages/gps/gps.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      mylatitude:'',
      mylongitude: '',
  },

  navigate() {
    ////使用微信内置地图查看标记点位置，并进行导航
    wx.openLocation({
    latitude: this.data.markers[0].latitude,//要去的纬度-地址
    longitude: this.data.markers[0].longitude,//要去的经度-地址
    })
    },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var longitude=options.longitude
    var latitude=options.latitude
    var image=options.image
    var name=options.name
    this.setData({
      markers: [
        {
        iconPath: image,
        id: 4,
        latitude:Number(latitude),
        longitude:Number(longitude),
        width: 30,
        height: 30,
        label:{
          'content':name,
          'color':'black',
          'bgColor':'#EEEE11',
          'fontSize':'12px',
          'padding':'4px',
          'borderRadius':'30px'
        }
        } 
        ],
    })
     console.log(longitude)
     console.log(latitude)

      //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
      console.log(res)
      this.setData({
      mylatitude: res.latitude,
      mylongitude: res.longitude
      })
      }
      })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})