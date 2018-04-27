<template>
<transition name='slide-fade'>
    <div class='page-component-up' v-show='isShow' @click='getTop'>
  </div>
</transition>
</template>
<script>
export default {
  name: 'BackTop',
  props: {
    scrollmyself: {
      type: Boolean,  // 这是选择滚动对象的props值，如果滚动的对象是当前组件的父元素，就设置scrollObj为true.如果没有设置就默认为window对象
      default: false
    }
  },
  data () {
    return {
      isShow: false,
      target: ''
    }
  },
  methods: {
    
    showIcon () {
      if (this.target.scrollTop > 100) {
        this.isShow = true
      } else if (this.target.scrollTop < 100) {
        this.isShow = false
      }
    },
    getTop () {
      let timer = setInterval(() => {
        let top = this.target.scrollTop
        let speed = Math.ceil(top / 5)
        // console.log(this.target)
        this.target.scrollTop = top - speed
        if (top === 0) {
          clearInterval(timer)
        }
      }, 20)
    }
  },
  mounted () {
    // 通过这个target来判断当前的滚动监听对象是谁
    if (this.scrollmyself) {
      this.target = this.$el.parentNode
    } else {
      this.target = document.body
    }
    this.target.addEventListener('scroll', this.showIcon)
  },
  beforeDestroy () {
    this.target.removeEventListener('scroll', this.showIcon)
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
 
  .page-component-up {
    background:url('../../../../assets/images/base/top_Icon.png')no-repeat center center;
    position: fixed;
    right: .4rem;
    bottom: 1.746667rem;
    width: 1.36rem;
    height: 1.373333rem;
    z-index: 99999;
    background-size: 1.36rem;
  }
  
  
</style>
