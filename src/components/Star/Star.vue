<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(sc,index) in starClasses" :class="sc"></span>
  </div>
</template>

<script>
const CLASS_ON = 'on';
const CLASS_HALF = 'half';
const CLASS_OFF = 'off';
export default {
    props:{
        score:Number,
        size:Number
    },
    computed:{
        starClasses(){
            // 例子：3.2：3个on + 0个half + 2个off
            const {score} = this;
            const scs = [];
            
            // 向scs中添加n个'on'
            // 向下取整
            const scoreInt = Math.floor(score);
            for(let i = 0;i < scoreInt;i++){
                scs.push(CLASS_ON);
            }
            // 向scs中添加0/1个'half'
            if(score*10 - scoreInt*10 >= 5){
                scs.push(CLASS_HALF);
            }
            // 向scs中添加个'off'
            while(scs.length < 5){
                scs.push(CLASS_OFF);
            }
            return scs;
        }
    }
};
</script>

<style>
.star {
  float: left;
  font-size: 0;
}

.star .star-item {
  display: inline-block;
  background-repeat: no-repeat;
}

.star.star-48 .star-item {
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
}

.star.star-48 .star-item:last-child {
  margin-right: 0;
}

.star.star-48 .star-item.on {
  background-image: url("./images/stars/star48_on@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-48 .star-item.on {
    background-image: url("./images/stars/star48_on@3x.png");
  }
}
.star.star-48 .star-item.half {
  background-image: url("./images/stars/star48_half@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-48 .star-item.half {
    background-image: url("./images/stars/star48_half@3x.png");
  }
}
.star.star-48 .star-item.off {
  background-image: url("./images/stars/star48_off@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-48 .star-item.off {
    background-image: url("./images/stars/star48_off@3x.png");
  }
}
.star.star-36 .star-item {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-size: 15px 15px;
}
.star.star-36 .star-item:last-child {
  margin-right: 0;
}
.star.star-36 .star-item.on {
  background-image: url("./images/stars/star36_on@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-36 .star-item.on {
    background-image: url("./images/stars/star36_on@3x.png");
  }
}
.star.star-36 .star-item.half {
  background-image: url("./images/stars/star36_half@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-36 .star-item.half {
    background-image: url("./images/stars/star36_half@3x.png");
  }
}
.star.star-36 .star-item.off {
  background-image: url("./images/stars/star36_off@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-36 .star-item.off {
    background-image: url("./images/stars/star36_off@3x.png");
  }
}
.star.star-24 .star-item {
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
}
.star.star-24 .star-item:last-child {
  margin-right: 0;
}
.star.star-24 .star-item.on {
  background-image: url("./images/stars/star24_on@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-24 .star-item.on {
    background-image: url("./images/stars/star24_on@3x.png");
  }
}

.star.star-24 .star-item.half {
  background-image: url("./images/stars/star24_half@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-24 .star-item.half {
    background-image: url("./images/stars/star24_half@3x.png");
  }
}

.star.star-24 .star-item.off {
  background-image: url("./images/stars/star24_off@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
  .star.star-24 .star-item.off {
    background-image: url("./images/stars/star24_off@3x.png");
  }
}
</style>