// pages/mine/mine.js
Page({
  data: {
    showQrcode: false,
    qrcodeTitle: '分享二维码',
    showAbout: false
  },

  onLoad() {
    // 页面加载
  },

  onShow() {
    // 页面显示
  },

  // 处理导航点击
  handleNavClick(e) {
    const { type, path, content, msg, phone, title, email } = e.currentTarget.dataset;

    switch (type) {
      case 'about':
        // 显示关于弹窗
        this.setData({
          showAbout: true
        });
        break;

      case 'page':
        // 跳转页面
        wx.navigateTo({
          url: path,
          fail: () => {
            wx.switchTab({ url: path });
          }
        });
        break;

      case 'qrcode':
        // 显示二维码
        this.setData({
          showQrcode: true,
          qrcodeTitle: title || '分享二维码'
        });
        break;

      case 'copy':
        // 复制文本或链接
        wx.setClipboardData({
          data: content,
          success: () => {
            wx.showToast({
              title: msg || '复制成功',
              icon: 'success'
            });
          }
        });
        break;

      case 'phone':
        // 拨打电话
        wx.showModal({
          title: '拨打电话',
          content: `确定要拨打 ${phone} 吗？`,
          success: (res) => {
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: phone
              });
            }
          }
        });
        break;

      case 'email':
        // 发送邮件（复制邮箱地址）
        wx.setClipboardData({
          data: email,
          success: () => {
            wx.showModal({
              title: '邮箱已复制',
              content: `邮箱地址 ${email} 已复制到剪贴板，请使用邮箱应用发送邮件。`,
              showCancel: false
            });
          }
        });
        break;

      default:
        break;
    }
  },

  // 关闭二维码弹窗
  closeQrcode() {
    this.setData({
      showQrcode: false
    });
  },

  // 关闭关于弹窗
  closeAbout() {
    this.setData({
      showAbout: false
    });
  },

  // 阻止事件冒泡
  stopPropagation() {
    // 阻止点击穿透
  },

  // 预览二维码图片
  previewQrcode() {
    wx.previewImage({
      current: '/images/donate.png',
      urls: ['/images/donate.png']
    });
  },

  // 分享给朋友
  onShareAppMessage: function() {
    return {
      title: '韵狸YUNLI',
      path: '/pages/index/index',
      imageUrl: '/images/dream.jpg'
    }
  },
  onShareTimeline: function() {
    return {
      title: '韵狸YUNLI',
      path: '/pages/index/index',
      imageUrl: '/images/avatar.jpg'
    }
  }
});
