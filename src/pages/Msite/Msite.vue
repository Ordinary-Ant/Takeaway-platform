<template>
    <section class="msite">
        <!--首页头部-->
        <header-top :title="address.name">
          <router-link to="/search" class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
          <router-link :to="userInfo._id ? '/userinfo':'/login'" class="header_login" slot="right">
            <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-profile-active"></i>
            </span>
          </router-link>
        </header-top>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorys.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="category in categorys" :key="category.id">
                  <div class="food_container">
                    <img :src="baseImageURL + category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <shop-list/>
        </div>
      </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import ShopList from '../../components/ShopList/ShopList'
import {mapState} from 'vuex'
export default {
  mounted () {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  data () {
    return {
      baseImageURL: 'https://fuss10.elemecdn.com/'
    }
  },
  watch: {
    categorys (value) {
      // 因为一旦categorys有数据就会触发swiper，而不是等categorys全部拿齐才触发，所以需要定时器
      // 但这种方法规定的时间并不准确，所以不是最优解
      // setTimeout(()=>{
      //   // 创建swiper对象实现轮播图
      //   new Swiper('.swiper-container',{
      //     loop:true, //循环轮播
      //     // 分页器
      //     pagination:{
      //       el:'.swiper-pagination'
      //     }
      //   })
      // },100)

      // vue组件内部提供了一个方法，这个方法是一旦界面完成更新就立刻触发回调
      // 这个方法必须写在数据更新后面，一般来说，执行步骤是先数据更新->界面更新
      this.$nextTick(() => {
        // eslint-disable-next-line no-new
        new Swiper('.swiper-container', {
          loop: true, // 循环轮播
          // 分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(['address', 'categorys', 'userInfo']),

    /**
     * 将categorys这个一维数组转换为二维数据
     * 内部小数组元素个数为8
     */
    categorysArr () {
      const { categorys } = this
      let maxArr = []
      let minArr = []
      categorys.forEach(element => {
        if (minArr.length === 8) {
          minArr = []
        }
        if (minArr.length === 0) {
          maxArr.push(minArr)
        }
        minArr.push(element)
      })
      return maxArr
    }
  }
}
</script>

<style>
section.msite {
  width: 100%;
}
section.msite .msite_nav {
  position: relative;
  margin-top: 45px;
  height: 200px;
  background: #fff;
}
section.msite .msite_nav::before {
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
section.msite .msite_nav .swiper-container {
  width: 100%;
  height: 100%;
}
section.msite .msite_nav .swiper-container .swiper-wrapper {
  width: 100%;
  height: 100%;
}
section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
}
section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food {
  width: 25%;
}
section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container {
  display: block;
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  font-size: 0;
}
section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food .food_container img {
  display: inline-block;
  width: 50px;
  height: 50px;
}
section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide .link_to_food span {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #666;
}
section.msite .msite_nav .swiper-container .swiper-pagination >span.swiper-pagination-bullet-active {
  background: #02a774;
}
section.msite .msite_shop_list {
  position: relative;
  margin-top: 10px;
  background: #fff;
}
section.msite .msite_shop_list::before {
  content: '';
  position: absolute;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
}
section.msite .msite_shop_list .shop_header {
  padding: 10px 10px 0;
}
section.msite .msite_shop_list .shop_header .shop_icon {
  margin-left: 5px;
  color: #999;
}
section.msite .msite_shop_list .shop_header .shop_header_title {
  color: #999;
  font-size: 14px;
  line-height: 20px;
}
</style>
