import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Map } from '@tarojs/components'

import './index.scss'

type PageStateProps = {}

interface CustomMap {
  props: PageStateProps
  state: {
    longitude: number
    latitude: number
  }
}

class CustomMap extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '腾讯地图'
  }

  componentWillMount () {
    const { longitude, latitude } = this.$router.params
    this.setState({
      longitude,
      latitude
    })
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  componentDidShow () {
  }

  componentDidHide () {
  }

  render () {
    return (
      <View className='index'>
        <Map longitude={this.state.longitude} latitude={this.state.latitude} className={'mapClass'}></Map>
      </View>
    )
  }
}

export default CustomMap as ComponentType
