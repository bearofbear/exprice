<template>
  <div class="wd-cell" @click="cellClickHandler">
    <div class="wd-cell-inner-wrapper">
      <div class="wd-cell-left-wrapper">
        <slot name="left">
          {{ title }}
        </slot>
      </div>
      <div class="wd-cell-right-wrapper">
        <slot name="right">
          {{ value }}
          <img v-if="to" class="wd-cell-goto-icon" src="@/assets/images/right-arrow.png">
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'jetair-cell',
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    },
    to: {
      type: String
    }
  },
  methods: {
    cellClickHandler() {
      if(this.to) {
        location.href = this.to
      }
    }
  }
}
</script>

<style lang="scss">
.wd-cell {
  position: relative;
  width:10rem;
  height: 1.426667rem;
  line-height: 1.426667rem;
  background-color: #FFF;
  border-bottom:1px solid #e0e0e0;
  .wd-cell-inner-wrapper {
    width:10rem;
    height: 100%;
  }

  // & + .wd-cell {
  //   .wd-cell-inner-wrapper {
  //     border-top: 1px solid rgba(0, 0, 0, 0.15); /* no */
  //   }
  // }

  .wd-cell-left-wrapper {
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    height: 100%;
    margin-left:.4rem;
    @include font-dpr(16px);
    color: #666;
  }
  .wd-cell-right-wrapper {
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    right: 0;
    height: 100%;
    @include font-dpr(16px);
    color: #ccc;
    margin-right:.4rem;

    .wd-cell-goto-icon {
      margin-left: .106667rem;
      width: 1.426667rem;
      height: 1.426667rem;
    }
  }
}
</style>
