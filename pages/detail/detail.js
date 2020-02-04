// pages/detail/detail.js
import { Spu } from "../../model/Spu";
import { ShoppingWay } from "../../core/enum";
import {SaleExplain} from "../../model/sale-explain";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm: Boolean
  },
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);

    const explain = await SaleExplain.getFixed();

    this.setData({
      spu,
      explain
    });
  },

  onGotoHome(event) {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },

  onGotoCart(event) {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },

  onAddToCart(event) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    });
  },

  onBuy() {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    });
  },

  onSpecChange(event) {
    this.setData({
      specs: event.detail
    });
  },

  onShareAppMessage: function () {

  }
});