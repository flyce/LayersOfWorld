// components/hot-list/index.js
Component({
  properties: {
    banner: Object
  },

  observers: {
    'banner': function(banner) {
      if(!banner) {
        return ;
      }

      if(banner.items.length === 0) {
        return ;
      }

      const left = banner.items.find(b => b.name === 'left');
      const rightTop = banner.items.find(b => b.name === 'right-top');
      const rightBottom = banner.items.find(b => b.name === 'right-bottom');

      this.setData({
        left,
        rightTop,
        rightBottom
      });
    }
  },

  data: {

  },

  methods: {

  }
})
