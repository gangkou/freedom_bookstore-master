// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    current: '',
    current_scroll: '',
    category: '',
    moreData: true,//更多数据
    pageSize: 5,//数量
    pagination: 0,//页码
    articles: [],
    bottomWord:'',
    loadMore:false,
    loadMores:false
  },

  first_select: function() {
    // wx.redirectTo({
    //   url: '../square/square'
    // })
  },

  second_select: function() {
    wx.navigateTo({
      url: '../commit/commit'
    })
  },

  third_select: function() {
    wx.switchTab({
      url: '/pages/my/index'
    })
  },

  bindTextAreaBlur: function(e){
    console.log(e.detail.value);
    this.data.detail = e.detail.value;
  },


  onLoad: function(options) {
    var that = this
    this.getArticleList(this.data.pageSize, this.data.pagination);
    
    wx.stopPullDownRefresh({
      success: (res) => {},
    })
  },
  
  getArticleList(pageSize, pagination) {
    wx.u.getArticleList(pageSize, pagination, '').then(res => {
      console.log(res)
      let data = [];
      res.result.forEach((resEach) => {
        if(resEach.type==0){
        data.push({
          'objectId': resEach.objectId,
          'title': resEach.title,
          'read_counts': resEach.read_counts,
          'excerpt': resEach.excerpt,
          'content':resEach.mdcontent,
          'createdAt': resEach.createdAt.slice(0, 16),
          'category': resEach.category,
          'listPic': resEach.listPic,
          'author': resEach.author,
          'userId':resEach.postuserid
        })
        console.log(data)
    
      }
      })
      if (this.data.pagination == 0) {
        this.spinShow()
      }
      if (data.length) {
        let articles = this.data.articles;
        let pagination = this.data.pagination;
        articles.push.apply(articles, data);
        pagination = pagination ? pagination + 1 : 1;
        // 等待域名添加cname记录 
        var listpic=String(this.data.listPic).split(";");  
        this.setData({
          'articles': articles,
          'pagination': pagination,
          'bottomWord': '',
          'loadMore': false,
          // 'listpic':listpic
        })
      }else{
        this.setData({
          'moreData':false,
          'bottomWord': '加载完',
          'loadMore': false,
        })
      }  
    })
  },
  onReachBottom: function () {
    if(this.data.moreData){
      this.setData({
        'loadMore': true,
        'bottomWord': '加载中',
      })
      this.getArticleList(this.data.pageSize, this.data.pagination);
    }
  },

  spinShow: function() {
    var that = this
    setTimeout(function() {
      that.setData({
        loading: false,
      });
      console.log("spinShow");
    }, 1500)
  },
  detail(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/index?id='+id,
    })
  },
  onShareAppMessage() {
    return {
      title: '自由书店',
      path: 'pages/index/index',
      imageUrl: '/images/logo.jpg'
    }
  },
  onPullDownRefresh:function(){
      var that=this;
      that.setData({
        currentTab:0
      })
      this.onLoad();
  }
})
  