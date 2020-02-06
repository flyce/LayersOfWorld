import { HistoryKeyword } from "../../model/history-keyword";
import {Tag} from "../../model/tag";
import {Search} from "../../model/search";
import date from "../../miniprogram_npm/lin-ui/common/async-validator/validator/date";
import {showToast} from "../../utils/ui";

const history = new HistoryKeyword();

Page({
    data: {},
    onLoad: async function (options) {
        const historyTags = history.get();
        const hotTags = await Tag.getSearchTags();
        this.setData({
            historyTags,
            hotTags
        });
    },

    onCancel() {
        this.setData({
            items: [],
            search: false
        });
    },

    async onSearch(event) {
        let keyword = event.detail.value;
        if(!keyword) {
            showToast('请输入关键字');
            return;
        }

        history.save(keyword);

        this.setData({
            historyTags: history.get()
        });

        this.getSearchResult(keyword);
    },

    async getSearchResult(keyword) {
        this.setData({
            items: [],
            search: true
        });
        wx.lin.showLoading({
            color: "#157658",
            type: "flash",
            fullScreen: true
        });
        const paging = Search.search(keyword);
        const data = await paging.getMoreData();
        wx.lin.hideLoading();
        this.bindItems(data);
    },

    bindItems(data) {
        if(data.accumulator.length != 0) {
            this.setData({
                items: data.accumulator
            });
        }
    },

    onTagClick(event) {
        const keyword = event.detail.name;
        this.getSearchResult(keyword);
    },

    onDeleteHistory() {
        history.clear();
        this.setData({
            historyTags: []
        });
    }
});