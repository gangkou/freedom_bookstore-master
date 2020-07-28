// pages/near/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[]
  },
  onLoad: function (options) {
    var that=this;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
      console.log(res)
      that.setData({
      'latitude': res.latitude,
      'longitude': res.longitude
      })
      this.near(res.longitude,res.latitude)
      }
      })
  },
  onReady:function(){
   
  },
  onShow:function(){
    
  },
  onUnload:function(){
    wx.reLaunch({
      url: '../lookbookstore/lookbookstore'
    })
  },
  
 
  near(longitude,latitude){
   wx.u.near(longitude,latitude).then(res=>{
       let data=[];
       res.result.forEach((resEach)=>{
          data.push({
            
                'iconPath': resEach.image.split(";")[0],
                'id': resEach.objectId,
                'latitude':Number(resEach.local.latitude),
                'longitude':Number(resEach.local.longitude),
                'width': 30,
                'height': 30
                
            
          })
          this.setData({
            detail:res.result
          })
       })
       if(data.length){
         let markers=this.data.markers;
         markers.push.apply(markers,data);

         this.setData({
           'markers':markers
         })
         console.log(this.data.markers[0])
       }
   })
  },

  markertap(ev){
     wx.navigateTo({
       url: '/pages/bookstoredetail/index?id='+ev.markerId,
     })
  }
})