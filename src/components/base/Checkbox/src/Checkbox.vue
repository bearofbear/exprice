<template lang="html">
  <div class="wd-checkbox">
    <input type="checkbox" v-model="currentCheck" :disabled="disChoose" :value="text" @change="changeCheck()">
    <span class="wd-checkbox-custominput" :class="{'dis': disChoose}"></span>
  </div>
</template>

<script>
export default {
  name: 'jetair-checkbox',
  props: {
    disChoose: {
      default: false,
      type: Boolean
    },
    nowValue: {
      type: Array,
      default: function() {
        return []
      }
    },
    text: {
      type: String
    }
  },
  data() {
    return {
      currentCheck: this.nowValue
    }
  },
  watch: {
    nowValue(val) {
      this.currentCheck = val
    }
  },
  created() {},
  mounted() {
    
  },
  methods: {
    changeCheck(){
      // console.log(this.currentCheck);
      this.$emit('input', this.currentCheck)
    }
  }
}
</script>

<style lang="scss" scoped>
.wd-checkbox {
  position: relative;
  display: inline-block;
  width: .613333rem;
  height: 100%;
  input {
    z-index: 10;
    width: .586667rem;
    height: .586667rem;
    position: absolute;
    cursor: pointer;
    opacity: 0;
    outline: 0;
    top: 50%;
    margin-top: -.293333rem;
  }
  input+&-custominput {
    position:absolute;
    width: .533333rem;
    height: .533333rem;
    border: 1px solid #DDDDDD;
    background: #FFFFFF;
    border-radius: 50%;
    display: inline-block;
    top: 50%;
    margin-top: -.293333rem;
  }
  input+&-custominput.dis{
    background: #EEEEEE;
    border: 2px solid #CACACA;
  }
  input:checked+&-custominput {
    border: 1px solid #F0412F;
    background: #F0412F url('../../../../assets/images/check_w.png') no-repeat center;
    background-size: 65%;
  }
  input:checked+&-custominput.dis {
    border: 1px solid #CACACA;
    background: #EEEEEE url('../../../../assets/images/check_b.png') no-repeat center;
    background-size: 65%;
  }
}
</style>
