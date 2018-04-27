<template>
  <transition :name="actionsheetTransition" @after-enter="onShow()" @after-leave="onHide()">
    <div :class="{'wd-actionsheet-theme-left': textAlign === 'left','wd-actionsheet-theme-center': textAlign === 'center'}" class="wd-actionsheet" ref="popup" v-if="visible" :style="{'z-index': zIndex}">
      <header v-if="isShowTitle" class="wd-actionsheet-header">{{ title }}</header>
      <div class="wd-actionsheet-content">
        <wd-actionsheet-slot @getData="getData" :items="content.items" :type="content.type" :defaultValue="content.defaultValue"></wd-actionsheet-slot>
      </div>
      <footer class="wd-actionsheet-footer">
        <span @click="onCancel">{{ cancelText }}</span>
        <span @click="onConfirm" v-if="isShowConfirmButton">{{ confirmText }}</span>
      </footer>
    </div>
  </transition>
</template>
<script>
  import ActionSheetSlot from './ActionSheetSlot.vue'
  import Popup from '@/popup/index.js'

  export default {
    name: 'jt-actionSheet',
    mixins: [Popup],
    components: {
      [ActionSheetSlot.name]: ActionSheetSlot
    },
    props: {
      transition: {
        type: String,
        default: 'slide-bottom'
      },
      title: {
        type: [String, Number],
        default: ''
      },
      isShowTitle: {
        type: Boolean,
        default: true
      },
      content: {
        type: Object,
        default: {
          type: 'single',
          items: []
        }
      },
      textAlign: {
        type: String,
        default: 'left'
      },
      confirmText: {
        type: [String, Number],
        default: '确定'
      },
      cancelText: {
        type: [String, Number],
        default: '取消'
      },
      isShowConfirmButton: {
        type: Boolean,
        default: true
      },
      value: {
        type: Boolean,
        default: false
      },
      onShow: {
        type: Function,
        default: () => {}
      },
      onHide: {
        type: Function,
        default: () => {}
      },
      onConfirm: {
        type: Function,
        default: () => {}
      },
      onCancel: {
        type: Function,
        default: () => {}
      },
      onMaskClick: {
        type: Function,
        default: () => {}
      },
      onItemClick: {
        type: Function,
        default: () => {}
      },
    },
    data() {
      return {
        visible: false,
        datas: {}
      }
    },
    computed: {
      actionsheetTransition() {
        if(this.transition) {
          return `actionsheet-${this.transition}`
        }else {
          return ''
        }
      }
    },
    watch: {
      value(val) {
        this.visible = val
      }
    },
    methods: {
      getData(data) {
        this.$set(this.datas, 'datas', data)
      },
      maskClick() {
        this.onMaskClick()
      }
    }
  }
</script>
<style lang="scss">
  $header-text-color: #9a9a9a;
  $header-text-size: 24px;
  $header-line-height: 1.173333rem;
  $content-text-color: #222;
  $content-text-size: 32px;
  $content-line-height: 1.386667rem;
  $border-color: #ddd;
  $button-background-color: #f7f7f7;
  .wd-actionsheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-color: #FFF;
    .wd-actionsheet-header {
      padding: 0 0.533333rem;
      height: $header-line-height;                   /* px */
      line-height: $header-line-height;              /* px */
      @include font-dpr(24px);                /* px */
      color: $header-text-color;
    }
    .wd-actionsheet-content {
      padding: 0 0 0 0.533333rem;
    }
    .wd-actionsheet-footer {
      display: flex;
      border-top: 1px solid $border-color; /* no */
      span {
        display: flex;
        flex: 1;
        height: 1.386667rem;                     /* px */
        align-items: center;
        justify-content: center;
        flex-direction: row;
        @include font-dpr(18px);    /* px */
        color: $content-text-color;
        background-color: $button-background-color;
        &:first-child {
          border-right: 1px solid $border-color; /* no */
        }
      }
    }
    &.wd-actionsheet-theme-center {
      .wd-actionsheet-header,
      .wd-actionsheet-content {
        text-align: center;
        padding: 0;
        .wd-actionsheet-list {
          .wd-actionsheet-listitem {
            padding-right: 0
        }
      }
      }
    }
  }
  .actionsheet-slide-bottom-enter-active,
  .actionsheet-slide-bottom-leave-active {
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition: all .3s;
  }
  .actionsheet-slide-bottom-enter,
  .actionsheet-slide-bottom-leave-active {
    transform: translate3d(0, 100%,0);
    opacity: 0;
  }
</style>
