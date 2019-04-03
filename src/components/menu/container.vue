<template>
  <div class="menu-warp" @mouseout="onMenuMouseOut">
    <ul>
      <li v-for="item in menu" :key="item.key" @mousemove="onMenuMouseOver(item.key)">
        <a href="#" :class="{active:selectedKey==item.key}">
          <span>{{item.title}}</span>
          <i class="icofont-arrow-right"></i>
        </a>
      </li>
    </ul>
    <div
      v-if="currentMenu.key==selectedKey"
      class="sub-menu"
      @mouseover="onSubMouseOver"
      @mouseout="onSubMouseOut"
    >
      <div>
        <dl>
          <dt>
            <span>{{currentMenu.title}}</span>
          </dt>
          <dd>
            <a
              href="#"
              v-for="item in currentMenu.sub"
              :key="item.key"
              @click="selectMenuItem(item)"
            >{{item.title}}</a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import "./style.scss";
import { _debouce, _throttle } from "../../performance/performance.js";
export default {
  name: "menuTag",
  created() {
    this.devMode = true;
  },
  computed: {
    currentMenu() {
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].key == this.selectedKey) {
          return this.menu[i];
        }
      }
      return {};
    }
  },
  watch: {
    inSub: _debouce(function() {
      if (!this.inMenu && !this.inSub) {
        this.selectedKey = "";
      }
    }),

    inMenu: _debouce(function() {
      if (!this.inMenu && !this.inSub) {
        this.selectedKey = "";
      }
    })
  },
  methods: {
    selectMenuItem(item) {
      this.$EventBus.$emit("addTab", {
        path: item.path,
        title: item.title,
        selected: true,
        key: item.key,
        icon: "icofont-home"
      });
      this.selectedKey="";
    },
    onSubMouseOut: function() {
      this.inSub = false;
    },
    onMenuMouseOut: function() {
      this.inMenu = false;
    },
    onSubMouseOver() {
      this.inSub = true;
    },
    onMenuMouseOver(key) {
      this.selectedKey = key;
      this.inMenu = true;
    }
  },
  props: ["menu"],
  data() {
    return {
      inMenu: false,
      inSub: false,
      selectedKey: ""
    };
  }
};
</script>
