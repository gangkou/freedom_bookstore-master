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
    pageSize: 1000,//数量
    pagination: 0,//页码
    articles: [],
    bottomWord:'',
    loadMore:false,
    loadMores:false,
    isCollect: false,
    isLiked: false,
    userInfo: {},
    comments: {},
    comment_count: 0,
    userId: '',
    commentContent: '',
    firco:"#1296db",
    secco:"#000000",
    show:1
  },

  first_select: function() {
    wx.switchTab({
      url: '../square/square'
    })
    this.setData({
      firco:"#1296db",
      secco:"#000000"
    })
  },

  second_select: function() {
    wx.navigateTo({
      url: '../commit/commit'
    })
  },

  third_select: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
    this.setData({
      firco:"#000000",
      secco:"#1296db"
    })

  },

  bindTextAreaBlur: function(e){
    console.log(e.detail.value);
    this.data.detail = e.detail.value;
  },

  onLoad: function(options) {
    if(this.data.show==1){
    var that = this
    this.getArticleList(this.data.pageSize, this.data.pagination);
  }
  else{
    this.getArticleList(this.data.pageSize, 0);
  }
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
          'listPic': resEach.listPic.split(";"),
          'author': resEach.author,
          'userId':resEach.postuserid,
          'liked':resEach.liked
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
        console.log(articles[0].listPic)
        pagination = pagination ? pagination + 1 : 1;
        // 等待域名添加cname记录
       
        this.setData({
          'articles': articles,
          'pagination': pagination,
          'bottomWord': '',
          'loadMore': false,
          'show':0
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
 
  onShareAppMessage() {
    return {
      title: '自由书店',
      path: 'pages/index/index',
      imageUrl: '/images/logo.jpg'
    }
  },

  onShow(){
    if(this.data.show!=1){
    wx.showToast({
      title: '正在刷新数据...',
      icon: 'loading',
      duration: 2000
    });
    this.setData({articles:[]});//先清空数据
    this.onLoad();//再重新加载数据
    wx:wx.stopPullDownRefresh();//停止刷新操作
  }
  },

  onPullDownRefresh: function () {
    wx.showToast({
      title: '正在刷新数据...',
      icon: 'loading',
      duration: 2000
    });
    this.setData({articles:[]});//先清空数据
    this.onLoad();//再重新加载数据
    wx:wx.stopPullDownRefresh();//停止刷新操作
  },
})
  