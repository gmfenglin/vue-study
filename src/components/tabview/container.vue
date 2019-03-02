<template>
    <Tab-Container>
        <template v-slot:rightMenu>
            <Tab-Right-Menu></Tab-Right-Menu>
        </template>
        <template v-slot:header>
             <Tab-Scroller :condition="condition" direction="left"></Tab-Scroller>
             <Tab-Scroller :condition="condition" direction="right"></Tab-Scroller>
             <Tab-Nav-Container :nav-items="navItems" :on-close="onClose" :on-selected="onSelected"></Tab-Nav-Container>
        </template>
        <template v-slot:content>
            <Tab-Content></Tab-Content>
        </template>
    </Tab-Container>
</template>
<script>
import TabContainer from './tabContainer.vue'
import TabScroller from './tabScroller.vue'
import TabNavContainer from './tabNavContainer.vue'
import TabContent from './tabContent.vue'
import RightMenu from './rightMenu.vue'
import './style.scss'
export default {
    name:"NavContainer",
    created(){
        this.devMode=true;
        
    },
    data(){
        return {
            condition:false,
            navItems:[
                { path:"/a", title:"首页",selected:true,key:"home",icon:"icofont-home"},
                {path:"/b", title:"首页1",selected:false,key:"home1",icon:"icofont-home"},
                {path:"/c", title:"首页2",selected:false,key:"home2",icon:"icofont-home"},
                 {path:"/d", title:"首页3",selected:false,key:"home3",icon:"icofont-home"},
                {path:"/e", title:"首页4",selected:false,key:"home4",icon:"icofont-home"}
            ]
        };
    },
    components:{
        "Tab-Container":TabContainer,
        "Tab-Scroller":TabScroller,
        "Tab-Nav-Container":TabNavContainer,
        "Tab-Content":TabContent,
        "Tab-Right-Menu":RightMenu
    },
    methods:{
        onSelected(item){
            this.$router.push(item.path);
            this.navItems.map((navItem)=>{
                return navItem.selected=item.key==navItem.key;
            });
        },
        onClose(item,index){
            if(item.key == "home"){
                return ;
            }
            if(item.selected){// 关闭选中状态的tab
                if(this.navItems.length == 2 ){
                    this.navItems[0].selected=true;
                   this.$router.push(this.navItems[0].path);
                }else {
                    this.navItems[index-1].selected=true;
                   this.$router.push(this.navItems[index-1].path);
                } 
            }
            this.navItems.splice(index,1);
            
        }
    }
}
</script>
