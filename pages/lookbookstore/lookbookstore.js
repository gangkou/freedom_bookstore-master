const { getbookstoreList } = require("../../utils/util")

// pages/lookbookstore/lookbookstore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco:"#1ABDE6",
    secco:"#000000",
    loading: true,
    current: '',
    current_scroll: '',
    category: '',
    moreData: true,//更多数据
    pageSize: 5,//数量
    pagination: 0,//页码
    bookstore: [],
    bottomWord:'',
    loadMore:false,
    loadMores:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.getbookstoreList(this.data.pageSize, this.data.pagination);
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

  },
  first_select: function() {
    wx.switchTab({
      url: '../lookbookstore/lookbookstore'
    })
    this.setData({
      firco:"#1ABDE6",
      secco:"#000000"
    })
  },

  second_select: function() {
    wx.navigateTo({
      url: '../near/index'
    })
    this.setData({
      firco:"#000000",
      secco:"#1ABDE6"
    })
  },

  getbookstoreList(pageSize, pagination){
    wx.u.getbookstoreList(pageSize, pagination).then(res=>{
       console.log(res)
       let data=[];
       res.result.forEach((resEach)=>{
         if(resEach.top>0){
           data.push({
             'objectId':resEach.objectId,
             'name':resEach.name,
             'introduction':resEach.introduction.split(";"),
             'top':resEach.top,
             'image':resEach.image.split(";"),
           })
          
         }
         
       })
       if(data.length){
         let bs=this.data.bookstore;
         let pagination = this.data.pagination;
         bs.push.apply(bs,data);
        pagination = pagination ? pagination + 1 : 1;

        this.setData({
          'bookstore':bs,
          'pagination': pagination,
          'bottomWord': '',
          'loadMore': false,
        })
       }else{
         this.setData({
          'moreData':false,
          'bottomWord': '加载完',
          'loadMore': false,
         })
       }
    })
  }
})