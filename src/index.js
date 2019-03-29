import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapState } from 'vuex'
import App from './components/tabview/container.vue';
import loger from './mixins/log.js'
// test code
import Ta from './testdata/ta.vue'
import Tb from './testdata/tb.vue'
import Tc from './testdata/tc.vue'
import Td from './testdata/td.vue'
import Te from './testdata/te.vue'


let mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");
let browser = navigator.userAgent.toLowerCase();
let isMobile = false;
for (let i = 0; i < mobileAgent.length; i++) {
  if (browser.indexOf(mobileAgent[i]) != -1) {
    isMobile = true;
    break;
  }
}
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;// 屏幕宽度
let htmlDom = document.getElementsByTagName("html")[0];// 根元素
if(isMobile){
  htmlDom.style.fontSize = htmlWidth / 37.5 + "px";// rem 基准值
}else{
  htmlDom.style.fontSize = 16 + "px";// rem 基准值
}


// test code
Vue.use(Vuex)
Vue.use(VueRouter);
const store = new Vuex.Store({
  state: {
    count: 0
  }
});
const routes = [
  {
    path: "/a",
    name: "a",
    components: { tabview: Ta }

  }
  ,
  {
    path: "/b",
    name: "b",
    components: { tabview: Tb }

  },
  {
    path: "/c",
    name: "c",
    components: { tabview: Tc }

  },
  {
    path: "/d",
    name: "d",
    components: { tabview: Td }

  },
  {
    path: "/e",
    name: "e",
    components: { tabview: Te }

  }
];
const router = new VueRouter({});
router.addRoutes(routes);
Vue.mixin(loger);

Vue.prototype.$EventBus = new Vue()
Vue.prototype.$isMobile=isMobile;

new Vue({
  el: '#root',
  name: "root",
  store,
  router,
  created() {
    this.devMode = true;
  },
  render: (h) => h(App),
  mounted() {

    this.$EventBus.$emit("addTab", { path: "/e", title: "首页4", selected: false, key: "home46", icon: "icofont-home" });
    let that = this;
    this.$EventBus.$on("selectedTab", (item) => {
      that.log(item);
    });
  }
});
