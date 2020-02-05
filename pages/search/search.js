import { HistoryKeyword } from "../../model/history-keyword";
import {Tag} from "../../model/tag";

const history = new HistoryKeyword();

Page({
    data: {},
    onLoad: async function (options) {
        const historyTags = history.get();
        const hotTags = await Tag.getSearchTags();
        console.log(hotTags);
        this.setData({
            historyTags,
            hotTags
        });
    },

    onCancel() {
        console.log('aaa');
        wx.switchTab({
            url: `/pages/category/category`
        });
    },

    onSearch(event) {
        const keyword = event.detail.value;
        history.save(keyword);
        this.setData({
            historyTags: history.get()
        })
    },

    onDeleteHistory() {
        history.clear();
        this.setData({
            historyTags: []
        });
    }
});