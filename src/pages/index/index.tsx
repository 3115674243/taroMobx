import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import {
  AtForm,
  AtButton,
  AtInput,
  AtRadio,
  AtRate,
  AtSwitch,
  AtTextarea,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from 'taro-ui'

import './index.scss'

type PageStateProps = {
  counterStore: {
    counter: number
    increment: Function
    decrement: Function
    incrementAsync: Function
    changeCounter: Function
  }
  userStore: {
    user: any
    setUser: Function
    wxPower: boolean
    changeWXPower: Function
  }
}

interface Index {
  props: PageStateProps
  state: {
    redio: string
    rate: number
    switch: boolean
    comment: string
    isSubmit: boolean
  }
}

@inject('counterStore', 'userStore')
@observer
class Index extends Component {

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

  componentWillMount () {
  }

  componentWillReact () {
    console.log('componentWillReact')
  }

  async componentDidMount () {
    const setting = await Taro.getSetting()
    if (setting.authSetting['scope.userInfo']) {
      const { userInfo } = await Taro.getUserInfo()
      if (userInfo) {
        await this.props.userStore.setUser(userInfo)
        await this.props.userStore.changeWXPower(true)
      }

    }

  }

  componentWillUnmount () {
  }

  componentDidShow () {
  }

  componentDidHide () {
  }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }

  async changeCounter (value: number) {
    this.props.counterStore.changeCounter(value)
    return value
  }

  handleChange (key: string, value: any) {
    this.setState({
      [key]: value
    })
    return value
  }

  handleClose (isSubmit: boolean) {
    this.setState({ isSubmit })
    return isSubmit
  }
  handleChangeText(key: string, e: any){
    this.setState({
      [key]: e.target.value
    })
    return e.target.value
  }
  render () {
    const { counterStore: { counter } } = this.props
    return (
      <View className='index'>
        <AtForm onSubmit={() => this.setState({ isSubmit: true })}>
          <AtButton className='at-row' type='primary' onClick={this.increment}>+</AtButton>
          <AtButton className='at-row' type='secondary' onClick={this.decrement}>-</AtButton>
          <AtButton className='at-row' type='primary' onClick={this.incrementAsync}>Add Async</AtButton>
          <Text>{counter}</Text>
          <AtInput
            name='value'
            title='数字'
            type='number'
            placeholder='单行文本'
            value={counter.toString()}
            onChange={this.changeCounter.bind(this)}
          />
          <AtRadio
            className='at-row'
            options={[
                     { label: '单选项一', value: '1', desc: '单选项描述' },
                     { label: '单选项二', value: '2' },
                     { label: '单选项三禁用', value: '3', desc: '单选项描述', disabled: true }
                   ]}
            value={this.state.redio}
            onClick={this.handleChange.bind(this, 'redio')}
          />
          <AtRate
            className='at-row'
            size={15}
            max={9} margin={5} value={this.state.rate} onChange={this.handleChange.bind(this, 'rate')}
          />

          <AtSwitch
            className='at-row'
            title={this.state.switch ? '开启中' : '已禁止'}
            checked={this.state.switch} onChange={this.handleChange.bind(this, 'switch')}
          />
          <AtTextarea
            count={false}
            value={this.state.comment}
            onChange={this.handleChangeText.bind(this, 'comment')}
            maxLength={200}
            placeholder='请输入您的反馈建议...'
          />
          <AtButton formType='submit'>提交</AtButton>
          <AtButton formType='reset'>重置</AtButton>
        </AtForm>
        <AtModal isOpened={this.state.isSubmit}>
          <AtModalHeader>标题</AtModalHeader>
          <AtModalContent>
            你确定要提交吗？？？
          </AtModalContent>
          <AtModalAction>
            <View className='at-row'>
              <View className='at-col'>
                <AtButton onClick={this.handleClose.bind(this, false)}>取消</AtButton>
              </View>
              <View className='at-col'>
                <AtButton type='primary' className='at-col' onClick={this.handleClose.bind(this, false)}>确定</AtButton>
              </View>
            </View>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default Index as ComponentType
