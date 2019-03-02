import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex ,{mapState} from 'vuex'
import App from './components/tabview/container.vue';
import loger from './mixins/log.js'
// test code
import Ta from './testdata/ta.vue'
import Tb from './testdata/tb.vue'
import Tc from './testdata/tc.vue'
import Td from './testdata/td.vue'
import Te from './testdata/te.vue'
// test code
Vue.use(Vuex)
Vue.use(VueRouter);
const store=new Vuex.Store({
  state:{
    count:0
  }
});
const routes=[
  {
  path:"/a",
  name:"a",
  components:{tabview:Ta}
  
}
  ,
  {
    path:"/b",
    name:"b",
    components:{tabview:Tb}
    
  },
  {
    path:"/c",
    name:"c",
    components:{tabview:Tc}
    
  },
  {
    path:"/d",
    name:"d",
    components:{tabview:Td}
    
  },
  {
    path:"/e",
    name:"e",
    components:{tabview:Te}
    
  }
];
const router=new VueRouter({});
router.addRoutes(routes);
Vue.mixin(loger);
new Vue({
    el: '#root',
    store,
    router,
    render:(h)=>h(App)
  });
  