<template>
  <div>
    <div :class="complete ? 'loading-wrap' : 'loading-end'"></div>
    <div v-if="complete" class="loading-box">
        <div :class="complete ? 'loading-start' : 'loading-end'">

        </div>
    </div>
  </div>
</template>
<script>
  import isSeeing from './isSeeing.js'
  export default {
    name: 'jt-loading',
    props: {
      complete: { // 是否加载完成
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        state: this.loading
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        if (isSeeing(this.$el) && !this.state) {
          this.state = true
          this.$emit('seeing')
        }
      }, 300)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    watch: {
      loading (to) {
        this.state = to
      }
    }
  }
</script>
<style lang="less" scoped>
  @text: #222;
  @main: #FFF;
  .loading-wrap{
    position:fixed;
    width:100%;
    height:100%;
    top:0rem;
    background-color: #000000;
    opacity:0.2;
    overflow-y: auto;
    z-index:999999999;
    transition: opacity .3s linear;
  }
  .loading-box{
    position: absolute;
    overflow:hidden;
    z-index:30000;
    top:50%;
    left:50%;
    max-width: 4.8rem;
    box-sizing: border-box;
    @include font-dpr(16px);
    line-height: 0.6rem;
    transform: translate(-50%, -50%);
    outline: none;
    padding: 0.4rem 0.6rem;
    text-align: center;
    background: rgba(33,33,33,0.90);
    border-radius: 8px;
    color: #ffffff;
    .msg {
      line-height: 70px;
      text-align: center;
      font-size: 14px;
    }
  }
  .loading-start {
    margin: .266667rem auto .266667rem auto;
    position: relative; 
    animation: rotate-forever 1s infinite linear;
    height: 1rem;
    width: 1rem;
    border: 4px solid @main;
    border-right-color: transparent;
    border-radius: 50%;
    .loading-end {
      display: none;
    }
  }
  @keyframes rotate-forever {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>