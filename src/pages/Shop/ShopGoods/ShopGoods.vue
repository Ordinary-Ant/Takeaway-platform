<template>
    <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
// 此爲下拉組件
import BScroll from 'better-scroll'
import {mapState} from 'vuex'
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
import ShopCart from '../../../components/ShopCart/ShopCart'
export default {
  data () {
    return {
      // 右側滑動的Y坐標(滑動過程實時變化)
      scrollY: 0,
      // 所有右側分類li的top組成的數組(列表第一次顯示后不再變化)
      tops: [],
      food: {} // food组件需要的对象
    }
  },
  mounted () {
    this.$store.dispatch('getShopGoods', () => { // 數據更新完畢
      this.$nextTick(() => { // 列表數據更新顯示后
        // 初始化滾動條
        this._initScroll()
        // 初始化tops
        this._initTops()
      })
    })
  },
  computed: { // 計算屬性是在初始時和相關數據發生變化時觸發
    ...mapState(['goods']),
    // 計算得到當前分類的下標
    currentIndex () {
      // 得到條件數據
      const {scrollY, tops} = this
      // 根據條件計算產生結果
      // findIndex()遍歷數組找到對應的下標
      const index = tops.findIndex((top, index) => {
        // 當前高度必須存在兩個類別模塊之間
        return scrollY >= top && scrollY < tops[index + 1]
      })
      // 返回結果
      return index
    }
  },
  methods: {
    // 初始化滾動條
    _initScroll () {
      // 創建滾動條
      // eslint-disable-next-line no-new
      new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodScroll = new BScroll('.foods-wrapper', {
        probeType: 2,
        click: true
      })
      // 為右側列表綁定scroll監聽
      // 需要在BScroll對象中添加上probeType選項，此選項有三個值：1(非實時派發scroll) 2(在屏幕滑動過程之實時派發scroll) 3(不管是否滑動都會實時派發scorll)
      this.foodScroll.on('scroll', ({ x, y }) => { // x和y為坐標
        this.scrollY = Math.abs(y)
      })
      // 為右側列表綁定scroll結束的監聽
      this.foodScroll.on('scrollEnd', ({ x, y }) => { // x和y為坐標
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化tops
    _initTops () {
      const tops = []
      let top = 0
      tops.push(top)
      const lis = this.$refs.foodsUl.querySelectorAll('.food-list-hook')
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })

      this.tops = tops
    },

    // 左側列表事件監聽
    clickMenuItem (index) {
      // 使右側列表滑動到指定位置
      // 得到目標位置
      const y = this.tops[index]
      // 立即更新top位置
      this.scrollY = y
      // 滑動右側列表
      this.foodScroll.scrollTo(0, -y, 300)
    },

    // 显示food
    showFood (food) {
      // 设置food
      this.food = food
      // 显示food(父组件需要调用子组件的显示方法)
      this.$refs.food.toggleShow()
    }
  },
  components: {
    CartControl,
    Food,
    ShopCart
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
