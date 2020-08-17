// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueResource from 'vue-resource'
import yuns from './assets/js/yun';
Vue.use(yuns);
Vue.use(VueResource);
Vue.use(Antd);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: function(){
    return {
        URL: 'http://192.168.19.136:9000',
    }
  },
  router,
  components: { App },
  template: '<App/>'
})
