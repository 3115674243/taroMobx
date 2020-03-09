import { observable } from 'mobx'

const userStore = observable({
  user: {
    nickName:'小王'
  },
  wxPower:false,
  setUser(user){
    this.user=user;
    return this.user;
  },
  changeWXPower(b: boolean){
    this.wxPower=b;
    return this.wxPower;
  }
})
export default userStore
