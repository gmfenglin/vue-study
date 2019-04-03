<template>
  <div class="app">
    <div class="top"></div>
    <div class="body">
      <Menu :menu="menu"></Menu>
      <TabView></TabView>
    </div>

    <div class="footer"></div>
  </div>
</template>
<script type="text/javascript" >
import Menu from "./components/menu/container.vue";
import TabView from "./components/tabview/container.vue";
import "./app.scss";
export default {
  components: {
    Menu,
    TabView
  },
  data() {
    return { menu:  [
        {
          key: "user",
          title: "用户管理",
          sub: [
            {
              key: "userList",
              title: "用户列表",
              path:"/user/list"
            }
          ]
        },
        {
          key: "resource",
          title: "资源管理",
          sub: [
            {
              key: "resourceList",
              title: "资源列表",
            }
          ]
        },
        {
          key: "org",
          title: "组织管理",
          sub: [
            {
              key: "orgList",
              title: "组织列表",
              component:"orgList"
            }
          ]
        }
      ] };
  }
};
</script>
