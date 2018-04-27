<template>
  <div class="appContainer">
    
    
  </div>
</template>

<script>
import Header from './base/Header'
export default {
  name: 'HelloWorld',
  data () {
    return {
      selected: '',
      headerName:'首页'
      
    }
  },
  components:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.aaa{
  @include font-dpr(15px)
}
</style>
