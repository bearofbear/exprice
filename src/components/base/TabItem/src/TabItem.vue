<template>
  <div class="wd-tab-item"
    :style="tabItemStyle"
    @click="tabItemClickHandler"
    :class="{active: active, 'navbar-active': navbarActive, 'tabbar-active': tabbarActive, 'navbar-tab-item': isAttachToNavbar, 'tabbar-tab-item': isAttachToTabbar}">
    <div class="wd-tab-item-icon-wrapper" v-if="isAttachToTabbar">
    <div v-show="tabbarActive">
      <slot name="activeIcon"></slot>
    </div>
     <div v-show="!tabbarActive">
      <slot name="icon"></slot>
    </div> 
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'jt-tab-item',
  props: {
    flex: {
      type: Number,
      default: 1
    },
    tabId: {
      type: String
    }
  },
  computed: {
    tabItemStyle() {
      return {
        flex: this.flex,
        flexDirection: this.isAttachToTabbar ? 'column' : 'row'
      }
    },
    active() {
      return this.$parent.value === this.tabId
    },
    isAttachToTabbar() {
      return this.$parent.$options._componentTag === 'jt-tabbar'
    },
    isAttachToNavbar() {
      return this.$parent.$options._componentTag === 'wd-navbar'
    },
    navbarActive() {
      return this.isAttachToNavbar && this.active
    },
    tabbarActive() {
      return this.isAttachToTabbar && this.active
    }
  },
  methods: {
    tabItemClickHandler() {
      this.$parent.$emit('input', this.tabId);
      if(this.$parent.$options._componentTag === 'jt-tabbar'){
        switch(this.tabId){
          case 'home':
            this.$router.push({path:"/"});
            break;
          case 'specialProduct':
            this.$router.push({path:"/sp"});
            break;
          case 'selfService':
            this.$router.push({path:"/ss"});
            break;
          case 'activetyZone':
             this.$router.push({path:"/az"});
             break;
          case 'persionalCenter':
             this.$router.push({path:"/pc"});
             break;
          default:
            this.$router.push({path:"/"});
        }
      }
    }
  }
}
</script>

<style lang="scss">
$wd-navbar-tab-item-active-color: #c6021e;
$wd-navbar-tab-item-horizontal-offset: .373333rem;

.wd-tab-item {
  display: flex;
  height: 100%;
  line-height: 100%;
  align-items: center;
  justify-content: center;
  @include font-dpr(12px);
  .wd-tab-item-icon-wrapper {

    img {
      margin-bottom: .08rem;
      width: .826667rem;
      height: .826667rem;
    }
  }

  &.navbar-active {
    color: $wd-navbar-tab-item-active-color;
    border-bottom: .053333rem solid $wd-navbar-tab-item-active-color;
  }
  &.navbar-tab-item {
    margin: 0 $wd-navbar-tab-item-horizontal-offset;
  }
}
</style>
