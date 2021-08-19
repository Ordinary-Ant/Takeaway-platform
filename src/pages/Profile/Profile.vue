<template>
    <section class="profile">
        <header-top title="我的"></header-top>
        <section class="profile-number">
          <router-link :to="userInfo._id ? '/userinfo':'/login'"  class="profile-link">
            <div class="profile_image">
              <i class="iconfont icon-profile-active"></i>
            </div>
            <div class="user-info">
              <p class="user-info-top" v-if="!userInfo.phone">{{userInfo.name || '登录/注册'}}</p>
              <p>
                <span class="user-icon">
                  <i class="iconfont icon-shouji icon-mobile"></i>
                </span>
                <span class="icon-shouji">{{userInfo.phone || '暂无绑定手机号'}}</span>
              </p>
            </div>
            <span class="arrow">
              <i class="iconfont icon-jiantou"></i>
            </span>
          </router-link>
        </section>
        <section class="profile_info_data border-1px">
          <ul class="info_data_list">
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0.00</span>元</span>
              <span class="info_data_bottom">我的余额</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0</span>个</span>
              <span class="info_data_bottom">我的优惠</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span>0</span>分</span>
              <span class="info_data_bottom">我的积分</span>
            </a>
          </ul>
        </section>
        <section class="profile_my_order border-1px">
          <!-- 我的订单 -->
          <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont icon-order"></i>
            </span>
            <div class="my_order_div">
              <span>我的订单</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou"></i>
              </span>
            </div>
          </a>
          <!-- 积分商城 -->
          <a href='javascript:' class="my_order">
            <span>
              <i class="iconfont icon-jifen"></i>
            </span>
            <div class="my_order_div">
              <span>积分商城</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou"></i>
              </span>
            </div>
          </a>
          <!-- 硅谷外卖会员卡 -->
          <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont icon-huiyuan-"></i>
            </span>
            <div class="my_order_div">
              <span>硅谷外卖会员卡</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou"></i>
              </span>
            </div>
          </a>
        </section>
        <section class="profile_my_order border-1px">
          <!-- 服务中心 -->
          <a href="javascript:" class="my_order">
            <span>
              <i class="iconfont icon-weibiaoti-1-05"></i>
            </span>
            <div class="my_order_div">
              <span>服务中心</span>
              <span class="my_order_icon">
                <i class="iconfont icon-jiantou"></i>
              </span>
            </div>
          </a>
        </section>
        <section class="profile_my_order border-1px">
          <mt-button type="danger" style="width:100%" v-if="userInfo._id" @click="logout">退出登錄</mt-button>
        </section>
    </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import {mapState} from 'vuex'
import {MessageBox, Toast} from 'mint-ui'
export default {
  components: {
    HeaderTop
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    logout () {
      MessageBox.confirm('確認要推出嗎？').then(
        // 點擊確認
        action => {
          this.$store.dispatch('logout')
          Toast('登出成功')
        },
        // 點擊取消
        esc => {
          console.log('取消了')
        }
      )
    }
  }
}
</script>

<style>
section.profile {
  width: 100%;
  overflow: hidden;
}
section.profile .profile-number {
  margin-top: 45.5px;
}
section.profile .profile-number .profile-link {
  *zoom: 1;
  position: relative;
  display: block;
  background: #02a774;
  padding: 20px 10px;
}
section.profile .profile-number .profile-link::after {
  content: '';
  display: block;
  clear: both;
}
section.profile .profile-number .profile-link .profile_image {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: top;
}
section.profile .profile-number .profile-link .profile_image .icon-profile-active {
  background: #e4e4e4;
  font-size: 62px;
}
section.profile .profile-number .profile-link .user-info {
  float: left;
  margin-top: 8px;
  margin-left: 15px;
}
section.profile .profile-number .profile-link .user-info p {
  font-weight: 700;
  font-size: 18px;
  color: #fff;
}
section.profile .profile-number .profile-link .user-info p.user-info-top {
  padding-bottom: 8px;
}
section.profile .profile-number .profile-link .user-info p .user-icon {
  display: inline-block;
  margin-left: -15px;
  margin-right: 5px;
  width: 20px;
  height: 20px;
}
section.profile .profile-number .profile-link .user-info p .user-icon .icon-mobile {
  font-size: 30px;
  vertical-align: text-top;
}
section.profile .profile-number .profile-link .user-info p .icon-mobile-number {
  font-size: 14px;
  color: #fff;
}
section.profile .profile-number .profile-link .arrow {
  width: 12px;
  height: 12px;
  position: absolute;
  right: 15px;
  top: 40%;
}
section.profile .profile-number .profile-link .arrow .icon-jiantou1 {
  color: #fff;
  font-size: 5px;
}
section.profile .profile_info_data {
  position: relative;
  width: 100%;
  background: #fff;
  overflow: hidden;
}
section.profile .profile_info_data::before {
  content: '';
  position: absolute;
  z-index: 200;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
  transform: scaleY(0.5);
}
section.profile .profile_info_data .info_data_list {
  *zoom: 1;
}
section.profile .profile_info_data .info_data_list::after {
  content: '';
  display: block;
  clear: both;
}
section.profile .profile_info_data .info_data_list .info_data_link {
  float: left;
  width: 33%;
  text-align: center;
  border-right: 1px solid #f1f1f1;
}
section.profile .profile_info_data .info_data_list .info_data_link .info_data_top {
  display: block;
  width: 100%;
  font-size: 14px;
  color: #333;
  padding: 15px 5px 10px;
}
section.profile .profile_info_data .info_data_list .info_data_link .info_data_top span {
  display: inline-block;
  font-size: 30px;
  color: #f90;
  font-weight: 700;
  line-height: 30px;
}
section.profile .profile_info_data .info_data_list .info_data_link .info_data_bottom {
  display: inline-block;
  font-size: 14px;
  color: #666;
  font-weight: 400;
  padding-bottom: 10px;
}
section.profile .profile_info_data .info_data_list .info_data_link:nth-of-type(2) .info_data_top span {
  color: #ff5f3e;
}
section.profile .profile_info_data .info_data_list .info_data_link:nth-of-type(3) {
  border: 0;
}
section.profile .profile_info_data .info_data_list .info_data_link:nth-of-type(3) .info_data_top span {
  color: #6ac20b;
}
section.profile .profile_my_order {
  position: relative;
  margin-top: 10px;
  background: #fff;
}
section.profile .profile_my_order::before {
  content: '';
  position: absolute;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
}
section.profile .profile_my_order .my_order {
  display: flex;
  align-items: center;
  padding-left: 15px;
}
section.profile .profile_my_order .my_order >span {
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
}
section.profile .profile_my_order .my_order >span >.iconfont {
  margin-left: -10px;
  font-size: 30px;
}
section.profile .profile_my_order .my_order >span .icon-order-s {
  color: #02a774;
}
section.profile .profile_my_order .my_order >span .icon-jifen {
  color: #ff5f3e;
}
section.profile .profile_my_order .my_order >span .icon-vip {
  color: #f90;
}
section.profile .profile_my_order .my_order >span .icon-fuwu {
  color: #02a774;
}
section.profile .profile_my_order .my_order .my_order_div {
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
  padding: 18px 10px 18px 0;
  font-size: 16px;
  color: #333;
  display: flex;
  justify-content: space-between;
}
section.profile .profile_my_order .my_order .my_order_div span {
  display: block;
}
section.profile .profile_my_order .my_order .my_order_div .my_order_icon {
  width: 10px;
  height: 10px;
}
section.profile .profile_my_order .my_order .my_order_div .my_order_icon .icon-jiantou1 {
  color: #bbb;
  font-size: 10px;
}
</style>
