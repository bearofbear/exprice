<template>
  <div class="wd-header" :style="[headerFixed,headerBackgoundWithBorder]">
  　<div style="position:absolute;"></div>
    <div class="wd-header-left-wrapper">
      <slot name="left"></slot>
    </div>
    <content :style="{color:contentFontColor}">
      <slot name="title">{{ title }}</slot>
    </content>
    <div class="wd-header-right-wrapper">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'jt-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: false
    },
    InvokedByComponent:{
      type: Boolean,
      default: false
    },
    HeaderType:{
      type:Boolean,
      default:true
    },
    NavType:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    headerFixed() {
      if(this.fixed) {
        return {
          position: 'relative',
          zIndex: 9999,
          top: 0
        }
      }else {
        return {
          position: 'relative'
        }
      }
    },
    headerBackgoundWithBorder(){
      if(this.HeaderType){
        return{
          background:'#FFF',
          borderBottom:'1px solid #e0e0e0'
        }
      }else{
        return {
          background:'#ff4c00'
        }
      }
    },
    contentFontColor(){
      return this.HeaderType ? '#333' : '#FFF'
    },

    
  }
}
</script>

<style lang="scss" scoped>
.wd-header {
  width: 10rem;
  height: 1.16rem;
  line-height: 1.16rem;
  margin:0 auto;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  content {
    display: flex;
    justify-content: center;
    font-weight: bold;
    @include font-dpr(16px);
  }
  .wd-header-left-wrapper {
    position: absolute;
    left: 0.32rem;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    @include font-dpr(16px);
    color: #fff;
  }


  .wd-header-right-wrapper {
    position: absolute;
    right: 24px;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    @include font-dpr(16px);
    color: #fff;
  }
}
</style>
