import Vue from 'vue'
import App from './App.vue'
import router from './router'
//全部引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';

//引入图标
import '@/assets/icons/iconfont/iconfont.css'
//引入字体
import '@/assets/css/text.css'


//全部引入vant
import Vant from 'vant';
import 'vant/lib/index.css';


// // 引入echarts
// import 'echarts'
// import Echarts from 'vue-echarts'



// Vue.component('v-echart', Echarts)

// 引入Echarts
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts



Vue.use(Vant);






Vue.use(ElementUI);
Vue.config.productionTip = false




new Vue({
    store,
    router,
    render: h => h(App)

}).$mount('#app')