<template>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">美团外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:loginWay}" @click="loginWay = true">短信登录</a>
            <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay = false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent="login">
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button
                  :disabled="!rightPhone"
                  class="get_verification"
                  :class="{right_phone:rightPhone}"
                  @click.prevent="getCode">{{computeTime ? `已发送(剩余${computeTime}s)`:'获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册美团外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input :type="showPWD ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                  <!-- <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd"> -->
                  <div class="switch_button" @click="showPWD = !showPWD" :class="showPWD ? 'on' : 'off'">
                    <div class="switch_circle" :class="{right:showPWD}"></div>
                    <span class="switch_text">{{showPWD ? 'abc' :'...'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification"
                  src="http://47.243.23.88:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:;" class="go_back" @click="goback">
          <i class="iconfont icon-left"></i>
        </a>
      </div>
      <alert-tip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"/>
    </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip.vue'
import { reqPwdLogin, reqSendCode, reqSmsLogin } from '../../api/index'
export default {
  data () {
    return {
      loginWay: true, // true为短信，false为密码
      phone: '', // 手机号
      computeTime: 0, // 倒计时时间
      showPWD: false, // 是否显示密码
      pwd: '', // 密码
      code: '', // 短信验证码
      name: '', // 用户名
      captcha: '', // 图片验证码
      alertText: '', // 提示信息
      showAlert: false // 是否显示提示
    }
  },
  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    // 回退功能
    goback () {
      this.$router.back()
    },

    // 异步获取验证码功能
    async getCode () {
      // 当前没有开始计时
      if (!this.computeTime) {
        // 启动倒计时
        this.computeTime = 30
        this.intervalID = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) {
            clearInterval(this.intervalID)
          }
        }, 1000)
        // 发送请求
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          // 顯示提示
          this.showAlertText(result.msg)
          // 停止計時
          if (this.computeTime) {
            this.computeTime = 0
            clearInterval(this.intervalID)
          }
        }
      }
    },

    // 验证方法
    showAlertText (alertText) {
      this.showAlert = true
      this.alertText = alertText
    },
    // 异步登录并验证表单数据
    async login () {
      let result
      // 判断登录方式
      if (this.loginWay) { // 短信
        const { rightPhone, phone, code } = this
        if (!rightPhone) {
          // 手机号不正确
          this.showAlertText('手机号不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码必须为6位数字
          this.showAlertText('验证码必须为6位数字')
          return
        }
        // 發送ajax請求短信登陸
        result = await reqSmsLogin(phone, code)
      } else { // 密码
        const { name, pwd, captcha } = this
        if (!name) {
          // 用户名不能为空
          this.showAlertText('用户名不能为空')
          return
        } else if (!pwd) {
          // 密码不能为空
          this.showAlertText('密码不能为空')
          return
        } else if (!captcha) {
          // 验证码不能为空
          this.showAlertText('验证码不能为空')
          return
        }
        // 發送ajax請求驗證碼登陸
        result = await reqPwdLogin({ name, pwd, captcha })
      }
      // 停止計時
      if (this.computeTime) {
        this.computeTime = 0
        clearInterval(this.intervalID)
      }

      // 根據結果處理數據
      if (result.code === 0) {
        const user = result.data
        // 1.將user保存到vuex的state
        this.$store.dispatch('recordUser', user)
        // 2.跳轉到個人中心
        this.$router.replace('/profile')
      } else {
        // 顯示新的驗證碼
        this.getCaptcha()
        this.captcha = ''
        this.showAlertText(result.msg)
      }
    },

    // 相應提示框自定義事件(關閉提升框)
    closeTip () {
      this.showAlert = false
      this.alertText = ''
    },

    // 獲取圖片驗證碼
    getCaptcha () {
      // 注意：使用src不會觸發跨域
      this.$refs.captcha.src = 'http://47.243.23.88:4000/captcha?time=' + Date.now()
    }
  },
  components: {
    AlertTip
  }
}
</script>

<style>
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;
}
.loginContainer .loginInner {
  padding-top: 60px;
  width: 80%;
  margin: 0 auto;
}
.loginContainer .loginInner .login_header .login_logo {
  font-size: 40px;
  font-weight: bold;
  color: #02a774;
  text-align: center;
}
.loginContainer .loginInner .login_header .login_header_title {
  padding-top: 40px;
  text-align: center;
}
.loginContainer .loginInner .login_header .login_header_title >a {
  color: #333;
  font-size: 14px;
  padding-bottom: 4px;
}
.loginContainer .loginInner .login_header .login_header_title >a:first-child {
  margin-right: 40px;
}
.loginContainer .loginInner .login_header .login_header_title >a.on {
  color: #02a774;
  font-weight: 700;
  border-bottom: 2px solid #02a774;
}
.loginContainer .loginInner .login_content >form >div {
  display: none;
}
.loginContainer .loginInner .login_content >form >div.on {
  display: block;
}
.loginContainer .loginInner .login_content >form >div input {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: 0;
  font: 400 14px Arial;
}
.loginContainer .loginInner .login_content >form >div input:focus {
  border: 1px solid #02a774;
}
.loginContainer .loginInner .login_content >form >div .login_message {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}
.loginContainer .loginInner .login_content >form >div .login_message .get_verification {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: 0;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}
.loginContainer .loginInner .login_content >form >div .login_message .right_phone{
  color:black;
}
.loginContainer .loginInner .login_content >form >div .login_verification {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}
.loginContainer .loginInner .login_content >form >div .login_verification .switch_button {
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: background-color 0.3s, border-color 0.3s;
  padding: 0 6px;
  width: 30px;
  height: 16px;
  line-height: 16px;
  color: #fff;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
.loginContainer .loginInner .login_content >form >div .login_verification .switch_button.off {
  background: #fff;
}
.loginContainer .loginInner .login_content >form >div .login_verification .switch_button.off .switch_text {
  float: right;
  color: #ddd;
}
.loginContainer .loginInner .login_content >form >div .login_verification .switch_button.on {
  background: #02a774;
}
.loginContainer .loginInner .login_content >form >div .login_verification .switch_button >.switch_circle {
  position: absolute;
  top: -1px;
  left: -1px;
  width: 16px;
  height: 16px;
  border: 1px solid #ddd;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  transition: transform 0.3s;
}
.loginContainer .loginInner .login_content >form >div .login_verification .switch_button >.right{
  transform: translateX(30px);
}
.loginContainer .loginInner .login_content >form >div .login_hint {
  margin-top: 12px;
  color: #999;
  font-size: 14px;
  line-height: 20px;
}
.loginContainer .loginInner .login_content >form >div .login_hint >a {
  color: #02a774;
}
.loginContainer .loginInner .login_content >form .login_submit {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  border-radius: 4px;
  background: #4cd96f;
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 42px;
  border: 0;
}
.loginContainer .loginInner .login_content .about_us {
  display: block;
  font-size: 12px;
  margin-top: 20px;
  text-align: center;
  color: #999;
}
.loginContainer .loginInner .go_back {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
}
.loginContainer .loginInner .go_back >.iconfont {
  font-size: 20px;
  color: #999;
}

</style>
