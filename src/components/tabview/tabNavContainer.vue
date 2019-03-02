<template>
    <div class="tab-wrap">
            <ul class="tabs">
               <li class="tab-nav"  v-for="(navItem,index) in navItems" :key="navItem.key" :class="{'tab-selected':navItem.selected}">
               <a  class="tab-inner">
                    <div  @contextmenu.stop.prevent="onRrightMenu(navItem,index)" @click="onSelected(navItem,index)">
                    <span class="tab-title">{{navItem.title}}</span>
                    <span v-if="navItem.key!='home'" class="tab-close icofont-close-circled" @click.stop="onClose(navItem,index)"></span>
                    </div>
                </a>
            </li>
            </ul>
        </div>
</template>
<script>
export default {
    //
    name:"TabNavContainer",
    created(){
       this.devMode=true;
      
      
    },
    props:["navItems","onSelected","onClose"]
    ,methods:{
        onRrightMenu(){
          this.log("rightMunu");
        }
       
        
    },
    destroyed(){
        this.log("destoryed!");
    }
    
}
</script>
