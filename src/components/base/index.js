import Vue from 'vue'
import Button from './Button/index.js'
import Dialog from './Dialog/index.js'
import Lazyload from './Lazyload'
import MessageBox from './MessageBox/index.js'
import Picker from './Picker/index.js'
import Search from './Search/index.js'
import Swipe from './Swipe/index.js'
import SwipeItem from './SwipeItem/index.js'
import Switch from './Switch/index.js'
import Toast from './Toast/index.js'
import Popup from './Popup/index.js'
import Radio from './Radio/index.js'
import RadioGroup from './RadioGroup/index.js'
import Checkbox from './Checkbox/index.js'
import CheckboxGroup from './CheckboxGroup/index.js'
import ImagePreview from './ImagePreview/index.js'
import Tooltip from './Tooltip/index.js'
import ActionSheet from './ActionSheet/index.js'
import Scroller from './Scroller/index.js'
import Header from './Header/index.js'
import Tabbar from './Tabbar/index.js'
import TabItem from './TabItem/index.js'
import TabContainer from './TabContainer/index.js'
import TabContainerItem from './TabContainerItem/index.js'
import Cell from './Cell/index.js'
import Badge from './Badge/index.js'
import Navbar from './Navbar/index.js'

export function init() {
  Vue.component(Button.name, Button)
  Vue.component(Dialog.name, Dialog)
  Vue.use(Lazyload, {try: 3})
  Vue.component(Search.name, Search)
  Vue.component(Popup.name, Popup)
  Vue.component(Tooltip.name, Tooltip)
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)
  Vue.component(Switch.name, Switch)
  Vue.component(Radio.name, Radio)
  Vue.component(RadioGroup.name, RadioGroup)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(CheckboxGroup.name, CheckboxGroup)
  Vue.component(Scroller.name, Scroller)
  Vue.component(Header.name, Header)
  Vue.component(Tabbar.name, Tabbar)
  Vue.component(TabItem.name, TabItem)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  Vue.component(Cell.name, Cell)
  Vue.component(Badge.name, Badge)
  Vue.component(Navbar.name, Navbar)

  Vue.$Toast = Vue.prototype.$Toast = Toast
  Vue.$ActionSheet = Vue.prototype.$ActionSheet = ActionSheet
  Vue.$ImagePreview = Vue.prototype.$ImagePreview = ImagePreview
  Vue.$MessageBox = Vue.prototype.$MessageBox = MessageBox
  Vue.$Picker = Vue.prototype.$Picker = Picker
}
