// pages/detail/index.js

Page({

  data: {
    loading: true,
    detail: {},
    gps:"../../images/gps.png"
  },

  onLoad: function(options) {
  
    var id = options.id

    wx.u.getbookstoreDetail(id).then(res => {
      console.log(res)
      res.result.introduction= res.result.introduction.split(";")
      res.result.image=res.result.image.split(";")
      this.setData({
        detail: res.result,
      })
      console.log(this.data.detail.local.longitude)
    })
  },

gps(){
this.setData({
  'gps':"../../images/gpsaft.png"
})
wx.redirectTo({
  url: '/pages/gps/gps?longitude='+this.data.detail.local.longitude+'&latitude='+this.data.detail.local.latitude+'&image='+this.data.detail.image[0]+'&name='+this.data.detail.name,
})
}

})