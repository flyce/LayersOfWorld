const showToast = function (title) {
    wx.showToast({
        title,
        icon: "none",
        duration: 2000
    });
};

export {
    showToast
};