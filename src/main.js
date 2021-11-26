import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 导入bootstrap
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"

//弹出框禁止滑动
Vue.prototype.$disabledScroll = function () {
  var mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁止页面滑动
}
 
//弹出框可以滑动
Vue.prototype.$canScroll = function () {
  var mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = ''// 出现滚动条
  document.removeEventListener('touchmove', mo, false)
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
