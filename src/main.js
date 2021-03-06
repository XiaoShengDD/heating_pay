import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wx from 'weixin-js-sdk'
import 'vant/lib/index.css';
import "@/style/index.css" // 引入公共css

import {
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Lazyload,
  Collapse,
  CollapseItem,
  NavBar,
  Button,
  SubmitBar,
  Form,
  Field,
  Cell,
  CellGroup,
  Loading,
  List,
  Sticky
} from 'vant';
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Button);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(NavBar);
Vue.use(SubmitBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Loading);
Vue.use(List);
Vue.use(Sticky);


import {
  font_size,
  getUrlKey
} from "@/utils/common";
Vue.prototype.font_size = font_size;
Vue.prototype.getUrlKey = getUrlKey;
Vue.prototype.wx = wx


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')