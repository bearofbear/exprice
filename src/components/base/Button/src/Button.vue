<template>
  <button
  :type="nativeButtonType"
  :disabled="disabled"
  :class="['wd-button', `wd-button-${type}`, {'wd-button-ghost': ghost}]">
    <label class="wd-button-text"><slot></slot></label>
  </button>
</template>

<script>

/*
 * wd-button
 * @desc 按钮
 * @param nativeButtonType {string} button 原生类型
 * @param type {string} 样式类型
 * @param disabled {boolean} 是否为禁用状态
 * @param ghost {boolean} 是否为幽灵按钮
 */

export default {
  name: 'jetair-button',
  props: {
    nativeButtonType: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return [
          'primary',
          'gray',
          'default',
          'dark',
          'radius',
          'blue',
          'white',
        ].indexOf(value) > -1
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

$button-default-width: 100%;
$button-default-height: 1.173067rem;
$button-text-primary-color-normal: #fff;
$button-text-primary-color-pressed: #fff;
$button-text-default-color-normal: #c60a1e;
$button-text-default-color-pressed: #fff;
$button-text-blue-color-normal:#fff;
$button-text-white-color-normal: #ff4c00;
$button-text-gray-color-normal: #222;
$button-text-gray-color-pressed: #222;
$button-text-dark-color-normal: #fff;
$button-text-dark-color-pressed: #fff;
$button-background-color-primary-normal: #ff4c00;
$button-background-color-primary-pressed: #505050;
$button-background-color-primary-border: #c60a1e;
$button-background-color-default-normal: #ff4c00;
$button-background-color-default-pressed: #c60a1e;
$button-background-color-default-border: #c60a1e;
$button-background-color-gray-normal: #f7f7f7;
$button-background-color-gray-pressed: #dddddd;
$button-background-color-gray-border: #9a9a9a;
$button-background-color-dark-normal: transparent;
$button-background-color-dark-pressed: rgba(255,255,255,0.4);
$button-background-color-dark-border: #fff;
$button-border-radius: .106667rem;
$button-radius-box-shadow: 0px 18px 39px 0 rgba(228, 57, 57, 0.4);
$button-border-radius-radius-normal:1.333333rem;
$button-disabled-opacity: 0.4;
$button-background-color-blue-normal:#00afd8;
$button-background-color-white-normal:#FFF;

.wd-button {
  display: inline-block;
  padding: 0;
  width: 100%;
  border: none;
  height: 100%;
  line-height: 100%;
  text-align: center;
  appearance: none;
  outline: none;
  border-radius: $button-border-radius;
  box-sizing: border-box;

  &-primary {
    background-color: $button-background-color-primary-normal;
    border: 1px solid $button-background-color-primary-border; /* no */
    color: $button-text-primary-color-normal;

    &:active {
      background-color: $button-background-color-primary-pressed;
      color: $button-text-primary-color-pressed;
    }
  }
  

  &-default {
    background-color: $button-background-color-default-normal;
    border: 1px solid $button-background-color-default-border; /* no */
    color: $button-text-default-color-normal;

    &:active {
      background-color: $button-background-color-default-pressed;
      color: $button-text-default-color-pressed;
    }
  }

  &-gray {
    background-color: $button-background-color-gray-normal;
    border: 1px solid $button-background-color-gray-border; /* no */
    color: $button-text-gray-color-normal;

    &:active {
      background-color: $button-background-color-gray-pressed;
      color: $button-text-gray-color-pressed;
    }
  }

  &-dark {
    background-color: $button-background-color-dark-normal;
    border: 1px solid $button-background-color-dark-border; /* no */
    color: $button-text-dark-color-normal;

    &:active {
      background-color: $button-background-color-dark-pressed;
      color: $button-text-dark-color-pressed;
    }
  }

  &-radius {
    background-color: $button-background-color-primary-normal;
    border: 1px solid $button-background-color-primary-border; /* no */
    color: $button-text-primary-color-normal;
    border-radius: $button-border-radius-radius-normal;
    // box-shadow: $button-radius-box-shadow;

    &:active {
      background-color: $button-background-color-primary-pressed;
      color: $button-text-primary-color-pressed;
    }
  }
  &-blue {
    background-color: $button-background-color-blue-normal;
    // border: 1px solid $button-background-color-primary-border; /* no */
    color: $button-text-blue-color-normal;
    border-radius: $button-border-radius-radius-normal;
    // box-shadow: $button-radius-box-shadow;

    // &:active {
    //   background-color: $button-background-color-primary-pressed;
    //   color: $button-text-primary-color-pressed;
    // }
  }
   &-white {
    background-color: $button-background-color-white-normal;
    // border: 1px solid $button-background-color-primary-border; /* no */
    color: $button-text-white-color-normal;
    border-radius: $button-border-radius-radius-normal;
    border: 1px solid $button-background-color-primary-border;
    // box-shadow: $button-radius-box-shadow;

    // &:active {
    //   background-color: $button-background-color-primary-pressed;
    //   color: $button-text-primary-color-pressed;
    // }
  }


  &.wd-button-ghost:not(:active) {
    background-color: transparent;
    border:1px solid #CCC;
    color:#505050;
  }

  &[disabled] {
    opacity: $button-disabled-opacity;
  }

  label {
    @include font-dpr(16px);
  }
}
</style>
