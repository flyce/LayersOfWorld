Component({
    properties: {
        data: Object
    },
    data: {
        tags: Array
    },
    methods: {
        onItemTap(event) {
            const pid = event.currentTarget.dataset.pid;
            wx.navigateTo({
                url: `/pages/detail/detail?pid=${pid}`
            });
            // 不建议采用上述方式
            // 利用事件机制 把 pid 抛出
            // this.triggerEvent('itemTap', { data }, {});
        }
    },
    observers: {
        data: function (data) {
            if(!data) {
                return;
            }
            if(!data.tags) {
                return;
            }
            const tags = data.tags.split('$');
            this.setData({
               tags
            });
        }
    }
});
