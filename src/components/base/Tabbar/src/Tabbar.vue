<template>
  <div class="wd-tabbar" :style="tabbarStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'jt-tabbar',
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    isPhone : {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    }
  },
  computed: {
    tabbarStyle() {
      if(this.fixed) {
        return {
          position: 'fixed',
          zIndex: 99999999,
          bottom: 0,
          left: 0,
          right: 0,
          bottom:0,
          margin: 'auto'
        }
      }else {
        return {
          position: 'static'
        }
      }
    }
  }
}
</script>

<style lang="scss">

$tabbar-height: 1.479733rem;
$tabbar-background-color: #FFFFFF;
$tabbar-font-size: 20px;
$tabbar-color: #737373;
$tabbar-border-color: #cccccc;
.wd-tabbar {
  display: flex;
  width: 10rem;
  height: $tabbar-height;
  line-height: $tabbar-height;
  background-color: $tabbar-background-color;
  font-size: $tabbar-font-size; /* px */
  color: $tabbar-color;
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
  -webkit-box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
  -moz-box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
}
</style>
