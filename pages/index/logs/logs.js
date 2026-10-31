// pages/index/logs/logs.js
const PROFILE = {
  avatar: '/images/avatar.jpg',
  name: '韵狸',
  bio: '一个热爱诗词书画的程序员',
  motto: '馀事做诗人'
};

const FIELDS = [
  { key: 'company', label: '单位', value: '自由职业', icon: 'hotel-o' },
  { key: 'job', label: '职务', value: '个人开发者', icon: 'manager-o' },
  { key: 'phone', label: '电话', value: '+86 13896074726', icon: 'phone-o', link: true, action: 'phone' },
  { key: 'email', label: '邮箱', value: 'yunliyo@foxmail.com', icon: 'envelop-o', link: true, action: 'copy' },
  { key: 'address', label: '地址', value: '重庆市渝中区华福巷36号', icon: 'location-o' },
  { key: 'zipcode', label: '邮编', value: '400015', icon: 'notes-o' },
  { key: 'homepage', label: '博客', value: 'https://www.liqiang.info', icon: 'link-o', link: true, action: 'copy' },
  { key: 'github', label: 'GitHub', value: 'github.com/yunliyo', icon: 'github', custom: true, link: true, action: 'copy' }
];

const LINKS = [
  { label: '个人主页', value: 'https://x.liqiang.info' },
  { label: 'ORCID 主页', value: 'https://orcid.org/0009-0008-0643-4914' },
];

Page({
  data: {
    profile: PROFILE,
    fields: FIELDS
  },

  // 点击信息行
  onFieldTap(e) {
    const field = this.data.fields[e.currentTarget.dataset.index];
    if (!field || !field.action) {
      return;
    }
    if (field.action === 'phone') {
      this.callPhone(field.value);
      return;
    }
    this.copyText(field.value, '已复制到剪贴板');
  },

  // 拨打号码
  callPhone(phoneNumber) {
    wx.showModal({
      title: '拨打电话',
      content: `确定要拨打 ${phoneNumber} 吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({ phoneNumber });
        }
      }
    });
  },

  // 复制文本
  copyText(data, title) {
    wx.setClipboardData({
      data,
      success: () => {
        wx.showToast({ title, icon: 'none' });
      }
    });
  },

  // 更多链接
  onMoreLinks() {
    wx.showActionSheet({
      itemList: LINKS.map((item) => item.label),
      success: (res) => {
        const link = LINKS[res.tapIndex];
        if (link) {
          this.copyText(link.value, `${link.label}链接已复制`);
        }
      }
    });
  },

  onShareAppMessage() {
    return {
      title: `${this.data.profile.name}的名片`,
      path: '/pages/index/logs/logs',
      imageUrl: this.data.profile.avatar
    };
  },

  onShareTimeline() {
    return {
      title: `${this.data.profile.name}的名片`,
      imageUrl: this.data.profile.avatar
    };
  }
});
