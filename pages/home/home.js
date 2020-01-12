import { Theme } from "../../model/theme";
import { Banner } from "../../model/banner";
import { Category } from "../../model/category";
import { Activity } from "../../model/activity";
import { SpuPaging } from "../../model/spu-paging";

// pages/home/home.js

Page({

  /**
   * 页面的初始数据
   */

  data: {
    themeA: null,
    bannerB: null,
    categoryC: [],
    activityD: null,
    themeE: null,
    themeESpu: [],
    themeF: null,
    bannerG: null,
    themeH: null,
    spuPaging: null,
    loadingType: 'loading'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initAllData();
    this.initBottomSpuList();
  },

  async initBottomSpuList() {
    const paging = new SpuPaging.getLatestPaging();
    this.data.spuPaging = paging;
    const data = await paging.getMoreData();
    if(!data) {
      return ;
    }
    wx.lin.renderWaterFlow(data.items);
  },

  async initAllData() {
    const theme = new Theme();
    await theme.getThemes();
    const themeA = theme.getHomeLocationA();
    const bannerB = await Banner.getHomeLocationB();
    const categoryC = await Category.getHomeLocationC();
    const activityD = await Activity.getHomeLocationD();
    const themeE = theme.getHomeLocationE();
    const themeF = theme.getHomeLocationF();
    const bannerG = await Banner.getHomeLocationG();
    const themeH = theme.getHomeLocationH();

    let themeESpu = [];
    if(themeE.online) {
      const data = await Theme.getHomeLocationESpu();
      if(data) {
        themeESpu = data.spu_list.slice(0, 8);
      }
    }

    this.setData({
      themeA,
      bannerB,
      categoryC,
      activityD,
      themeE,
      themeESpu,
      themeF,
      bannerG,
      themeH
    });
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const data = await this.data.spuPaging.getMoreData();
    if(!data) {
      return ;
    }
    wx.lin.renderWaterFlow(data.items);
    if(!data.moreData) {
      this.setData({
        loadingType: 'end'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});