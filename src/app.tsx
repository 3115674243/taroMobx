
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/index'

import counterStore from './store/counter'
import userStore from './store/user'

import './app.scss'


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore,
  userStore
}

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/user/user',
      'pages/customMap/customMap'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color:'#000',
      selectedColor: '#CC3333',
      backgroundColor: '#FFFFFF',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页'
        },{
          pagePath: 'pages/user/user',
          text: '用户'
        }
      ]
    },
    networkTimeout: {
      request : 60000, //请求超时时间
      connectSocket: 60000, //socket超时时间
      uploadFile: 60000, //文件上传超时时间
      downloadFile: 60000 //文件下载超时时间
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    }
  }

  async componentDidMount () {
  }

  componentDidShow () {
    Taro.showToast({
      title: '欢迎回来',
      icon: 'success',
      duration: 2000
    })
  }

  componentDidHide () {}

  componentDidCatchError () {}
  onShareAppMessage(obj: any) {
    if (obj.from === 'button') {
      // 来自页面内转发按钮
      console.log(obj.target)
    }
    return{
      title: '测试转发',
      path: 'pages/index/index',
      imageUrl:'https://www.mop.com/shouyou/imgfile/202003/04/1583305526_5.jpg'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
