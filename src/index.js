import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex, { mapState } from 'vuex'
import App from './app.vue';
import loger from './mixins/log.js'
import {isMobile} from './fit/fit.js'
import userList from './model/user/list/container.vue';

Vue.use(Vuex)
Vue.use(VueRouter);
const store = new Vuex.Store({
  state: {
    count: 0
  }
});
console.log(userList);
const routes = [
  {
    path: "/user/list",
    components: { tabview: userList }

  }
];
const router = new VueRouter({});
router.addRoutes(routes);
Vue.mixin(loger);

Vue.prototype.$EventBus = new Vue()
Vue.prototype.$isMobile=isMobile();

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

    this.$EventBus.$emit("addTab", { path: "/home", title: "首页", selected: true, key: "home", icon: "icofont-home" });
    let that = this;
    this.$EventBus.$on("selectedTab", (item) => {
      that.log(item);
    });
  }
});
