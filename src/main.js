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
Vue.use(Vant);

// // 引入echarts
// import 'echarts'
// import Echarts from 'vue-echarts'



// Vue.component('v-echart', Echarts)

// 引入Echarts
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts

//引入高德地图api
// import AMap from 'vue-amap'
// Vue.use(AMap)
// AMap.initAMapApiLoader({
//     key: 'a3eb62e20382e5d9a40dc502d5da9d9e',
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.MouseTool', 'AMap.Polygon', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//     // 默认高德 sdk 版本为 1.4.4
//     v: '1.4.4'
// })








Vue.use(ElementUI);
Vue.config.productionTip = false




new Vue({
    store,
    router,
    render: h => h(App)

}).$mount('#app')