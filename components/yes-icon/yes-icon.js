// components/yes-icon/yes-icon.js
const ICONS = require('./icons');

function addUnit(value) {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  return typeof value === 'number' ? `${value}px` : String(value);
}

Component({
  properties: {
    // 图标名称，见 icons.js
    name: String,
    // 图标大小，支持rpx/px，如 48rpx
    size: {
      type: String,
      value: '48rpx'
    },
    // 图标颜色
    color: {
      type: String,
      value: '#333333'
    }
  },

  data: {
    src: '',
    iconSize: '48rpx'
  },

  observers: {
    'name, color, size': function (name, color, size) {
      this.setData({
        src: this.buildSrc(name, color),
        iconSize: addUnit(size)
      });
    }
  },

  methods: {
    // 拼装内联 SVG，并以 data URI 形式交给 image 渲染
    buildSrc(name, color) {
      const icon = ICONS[name];
      if (!icon) {
        console.warn(`[yes-icon] 未找到图标：${name}`);
        return '';
      }
      const paths = icon.paths.map((d) => `<path d="${d}"/>`).join('');
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" fill="${color}">${paths}</svg>`;
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }
  }
});
