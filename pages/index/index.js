// index.js
Page({
  data: {
    avatar: '/images/avatar.jpg',
    nickname: '韵狸',
    bio: '一个热爱诗词书画的程序员',
    socials: {
      qq: '1598712209',
      wechat: 'yunliyo101',
      github: 'https://github.com/yunliyo',
      email: 'yunliyo@foxmail.com'
    },
    buttons: [
      {text: '查看我的名片', navigateTo: '/pages/index/logs/logs'},
    ],
    yiyan: '做梦想做的事',
    copyright: `© 2015-${new Date().getFullYear()} by Yunli.`,
  },
  navigateTo: function(e) {
    wx.showLoading({
      title: '加载中...'
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 500);
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
      success: () => {
        wx.hideLoading();
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('跳转失败:', err);
        wx.showToast({
          title: '跳转失败，请稍后再试',
          icon: 'none'
        });
      }
    });
  },
  copyText: function(e) {
    const text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success: function() {
        wx.showToast({
          title: '账号名称已复制',
          icon: 'success'
        });
      }
    });
  },
  copyURL: function(e) {
    const text = e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success: function() {
        wx.showToast({
          title: '链接已复制',
          icon: 'success'
        });
      }
    });
  },
  onShareAppMessage: function() {
    return {
      title: '韵狸YUNLI的主页',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '韵狸YUNLI的主页',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  }
})