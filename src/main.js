import Vue from 'vue'
import App from './App.vue'
import router from './router'
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
  CellGroup
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


import {
  font_size,
  getQueryVariable,
  getUrlKey
} from "@/utils/common";
Vue.prototype.font_size = font_size;
Vue.prototype.getUrlKey = getUrlKey;
Vue.prototype.getQueryVariable = getUrlKey;


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')