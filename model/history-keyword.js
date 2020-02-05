class HistoryKeyword {
    static MAX_ITEM_COUNT = 10;
    static KEY = 'keywords';

    // 代理模式 keywords 是代理
    keywords = [];

    // 单例模式
    constructor() {
        if(typeof HistoryKeyword.instance === 'object') {
            return HistoryKeyword.instance;
        }
        this.keywords = this._getLocalKeywords();
        HistoryKeyword.instance = this;
        return this;
    }

    save(keyword) {
        const items = this.keywords.filter(k => {
            return k === keyword;
        });
        if(items.length !== 0) {
            return;
        }
        if(this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
            this.keywords.pop();
        }
        this.keywords.unshift(keyword);
        this._refreshLocal();
    }

    get() {
        return this.keywords;
    }

    clear() {
        this.keywords = [];
        this._refreshLocal();
    }

    _refreshLocal() {
        wx.setStorageSync(HistoryKeyword.KEY, this.keywords);
    }

    _getLocalKeywords() {
        const keyword =  wx.getStorageSync(HistoryKeyword.KEY);
        if(!keyword) {
            wx.setStorageSync(HistoryKeyword.KEY, []);
            return [];
        }
        return keyword;
    }

    _clearLocalKeyword() {
        wx.removeStorageSync(HistoryKeyword.KEY);
    }
}

export { HistoryKeyword };