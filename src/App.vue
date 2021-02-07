<template>
    <div>
        <router-view/>
        <footer-guide v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
    components:{
        FooterGuide
    }
}
</script>

<style>
#app { 
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  position: relative;
}
</style>