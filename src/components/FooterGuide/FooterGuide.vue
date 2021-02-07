<template>
<footer class="footer_guide">
    <span class="guide_item" 
        :class="{on:'/msite' === $route.path}" 
        @click="goto('/msite')">  <!--路由跳转-->
      <span class="item_icon">
        <i class="iconfont icon-U"></i>
      </span>
      <span>外卖</span>
    </span>
    <span class="guide_item" 
        :class="{on:'/search' === $route.path}"
        @click="goto('/search')">
      <span class="item_icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide_item" 
        :class="{on:'/order' === $route.path}"
        @click="goto('/order')">
      <span class="item_icon">
        <i class="iconfont icon-order"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide_item" 
        :class="{on:'/profile' === $route.path}"
        @click="goto('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-profile-active"></i>
      </span>
      <span>我的</span>
    </span>
  </footer>
</template>

<script>
export default {
    methods:{
        goto(path){
            this.$router.replace(path);
        }
    }
}
</script>

<style>
@media only screen and (-webkit-device-pixel-ratio: 2) {
  .border-1px::before {
    transform: scaleY(0.5);
  }
}
@media only screen and (-webkit-device-pixel-ratio: 3) {
  .border-1px::before {
    transform: scaleY(0.333333);
  }
}
 .footer_guide {
  position: relative;
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
}
 .footer_guide::before {
  content: '';
  position: absolute;
  z-index: 200;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
}
 .footer_guide .guide_item {
  display: flex;
  flex: 1;
  text-align: center;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  color: #999;
}
 .footer_guide .guide_item.on {
  color: #02a774;
}
 .footer_guide .guide_item span {
  font-size: 12px;
  margin-top: 2px;
  margin-bottom: 2px;
}
 .footer_guide .guide_item span .iconfont {
  font-size: 22px;
}
</style>