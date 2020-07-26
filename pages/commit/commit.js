// pages/commit/commit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: "",
    temp:[],
    picurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  selectphoto(){
    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success : (res)=>{
        const tempFilePaths = res.tempFilePaths;
        this.setData({
         temp: tempFilePaths
        }); 
        console.log(this.data.temp)
      }
    })
  },

 send(){
  console.log(this.data.temp)
  var temp=this.data.temp
  var userInfo = wx.getStorageSync('userInfo')
  if(userInfo){
    //图片上传
  this.data.picurl=wx.u.postuploadfile(temp);
 
  this.data.picurl.then(res=>{
    var picurllist=[]
    for(var i=0;i<res.result.length;i++){
      console.log(res.result[i].url)
      picurllist[i]=res.result[i].url;
    }

    console.log(picurllist)
    //提交文本
    var mdcontent=this.data.detail
    wx.u.saveposts(mdcontent,picurllist);
  
  })
  
setTimeout(function(){
  wx.switchTab({
    url: '../square/square',
  success() {
    var page = getCurrentPages().pop();
    if (page == undefined || page == null) return; 
    page.onLoad(); 
    page.onPullDownRefresh
  }
})
},3000)
  }else{
    wx.showToast({
      title: '您还没有登录,登录后解锁新功能吧!',//提示文字
      duration:2000,//显示时长
      mask:true,//是否显示透明蒙层，防止触摸穿透，默认： 
      icon:'none' 
   })
    setTimeout(function(){
      wx.switchTab({
        url: '../my/index',
    })
    },3000)
  }
},


/** 
 * 获取文本信息
*/
bindTextAreaBlur: function(e) {
  this.data.detail = e.detail.value
  console.log(this.data.detail)
},
})