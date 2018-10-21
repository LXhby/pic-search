// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   like:[
     "美短",
     "哈士奇",
     "英短"
   ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

 query(e){
   let q = e.detail.value.q;
   wx.navigateTo({
     url: '/pages/images?q='+q,
   })
 }
})