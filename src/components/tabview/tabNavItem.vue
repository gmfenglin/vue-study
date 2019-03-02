<template>
     <li class="tab-nav"   :class="{'tab-selected':navItem.selected}">
               <a  class="tab-inner">
                    <div  @contextmenu.stop.prevent="onRightMenu(navItem,index)" @click="onSelected(navItem,index)">
                    <span class="tab-title">{{navItem.title}}</span>
                    <span v-if="navItem.key!='home'" class="tab-close icofont-close-circled" @click.stop="onClose(navItem,index)"></span>
                    </div>
                </a>
    </li>
</template>
<script>
export default {
    name:"navItem",
    created(){
        this.devMode=true;
    },
    props:["navItem","index","onSelected","onClose","onRightMenu"],
    watch:{
        "navItem.selected"(flag){
            if(flag){
                this.$EventBus.$emit("selectedTab",this.navItem);
            }
        }
    }
}
</script>
