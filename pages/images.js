const uLts = require("../ults/ults.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:"",//搜索的内容
    page:1,//加载第几页
    row:30,//每页加载的条目,
    list:3,//放多少页显示
    org:[],//图片的原始数据
    imgs:[],
    height:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createContainer();
    console.log(this.data)
    this.data.word = options.q || "猫";
    //分页加载
    //加载什么
    //内容容器
    //高度管理
    this.showPage();
    wx.setNavigationBarTitle({
      title: this.data.word
    })
  },
  createContainer(){
    this.data.height = new Array(this.data.list).fill(0);
    this.data.imgs = new Array(this.data.list).fill(0).map(()=>[]);
  },
  //请求页面数据
  showPage(){
    this.query()
      .then((res) => {
        let codeData = this.codeData(res.data.data)
        this.showData(codeData)
      })
  },
  
  //查询数据
  query(){
    //显示加载动画
    wx.showNavigationBarLoading();
    let queryUrl = uLts.codeUrl(this.data.word,this.data.page,this.data.row);
    return new Promise((resolve,reject)=>{
      wx.request({
        url: queryUrl,
        success:resolve,
        fail:reject
      })
    }) 
  },
  //数据更新
  showData(data){
    this.data.org.push(...data);
    data.forEach(item=>{
      let min = Math.min(...this.data.height);
      let index = this.data.height.findIndex(item=>min === item)
      this.data.imgs[index].push(item);
      this.data.height[index] += item.height;
    })
  // data.forEach((img)=>{
  //   if(this.data.height.left <= this.data.height.right){
  //     this.data.imgs.left.push(img)
  //     this.data.height.left += img.height;
  //   }else{
  //     this.data.imgs.right.push(img)
  //     this.data.height.right += img.height;
  //   }
  // });
  this.setData({
    imgs:this.data.imgs
  })
  wx.hideNavigationBarLoading();
},
  codeData(data){
    let codeData =[];
    data.forEach((img)=>{
      if(img.objURL){
        codeData.push(Object.assign({
          thumb:img.thumbURL,
          middle:img.middleURL,
          obj: uLts.imgUrlEncode(img.objURL)
        },uLts.zoom(img)))
      }
    });
    return codeData;
  },

  
 more(){
   this.data.page++;
   this.showPage()
 },
 top(){
   console.log("111")
 },
 //下载图片
 download(e){
   console.log(e);
   let src = e.currentTarget.dataset.src;
   console.log(src)
   wx.downloadFile({
     url:src,
     success(res){
       wx.saveImageToPhotosAlbum({
         filePath: res.tempFilePath,
       })
     }
   })
 },
  showImage(e){
    let current = e.currentTarget.dataset.src;
    let urls = this.data.org.map(item=>{return item.middle});
    wx.previewImage({
      urls,current
    })
  }
})