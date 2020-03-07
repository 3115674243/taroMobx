import {ComponentType} from 'react'
import Taro, {Component, Config} from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'
import {AtButton, AtInput, AtDivider} from 'taro-ui'

import './index.scss'
import userStore from "../../store/user";

type PageStateProps = {
  userStore: {
    user: any
    setUser: Function
    wxPower: boolean
    changeWXPower: Function
  }
}

interface User {
  props: PageStateProps
}

@inject('userStore')
@observer
class User extends Component {

  constructor(props){
    super(props);
    this.state= {
      location: {
        longitude: 0,
        latitude: 0
      }
    }
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }


  componentWillMount() {
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleClick(user) {
    return this.props.userStore.setUser(user);
  }

  changeUser(key, value) {
    const {userStore: {user}} = this.props;
    user[key] = value;
    userStore.setUser(user);
    return value;
  }

  onShareAppMessage(obj: any) {
    if (obj.from === 'button') {
      // 来自页面内转发按钮
      console.log(obj.target)
    }
    return {
      title: '测试用户页面转发',
      path: 'pages/user/user',
      imageUrl: 'https://www.mop.com/shouyou/imgfile/202003/04/1583305526_5.jpg'
    }
  }

  setUserInfo = async (e) => {
    if (e.detail) {
      await this.props.userStore.setUser(e.detail.userInfo);
      await this.props.userStore.changeWXPower(true);
    } else {
      await this.props.userStore.changeWXPower(false);
    }
  }

  async setUserLoaction() {
    const res = await Taro.getLocation({});
    const {longitude, latitude} = res;
    this.setState({location: {longitude, latitude}});
  }

  render() {
    const {userStore: {user, wxPower}} = this.props;
    return (
      <View className='index'>
        {wxPower ? <View>
            <View className='userinfo'>
              <Image src={user.avatarUrl} className={'userinfo-avatar'} />
            </View>
            <AtInput name='name' type='text' placeholder='请输入内容' value={user.nickName}
                     onChange={this.changeUser.bind(this, 'nickName')} />
            <AtButton type='primary' onClick={this.handleClick.bind(this, {name: '小张'})}>SAVE USER</AtButton>
            <AtDivider content='>_<-快分开->_<' />
            <AtButton type='primary' openType='share'>SHARE</AtButton>
            <Text>{this.state.location.latitude},{this.state.location.longitude} </Text>
            <AtButton type='secondary' onClick={this.setUserLoaction.bind(this)}>LOCATION</AtButton>
          </View>
          : <AtButton openType='getUserInfo' onGetUserInfo={this.setUserInfo}>LOGIN</AtButton>}

      </View>
    )
  }
}

export default User as ComponentType
