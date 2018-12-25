import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      'pages/mall/index'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#ffffff',
      backgroundColorTop: '#ffffff',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: '平安夜快乐',
      navigationBarTextStyle: 'black'
    }

  }
}
