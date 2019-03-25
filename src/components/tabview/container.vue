<template>
    <Tab-Container>
        <template v-slot:rightMenu>
            <Tab-Right-Menu :on-selected-meun="onSelectedMeun" :menu-data="menuData"  :is-show-right-menu="isShowRightMenu" :on-mouse-leave="onMouseLeave"></Tab-Right-Menu>
        </template>
        <template v-slot:header>
             <Tab-Scroller :condition="condition" direction="left" :on-scroll="onScroll"></Tab-Scroller>
             <Tab-Scroller :condition="condition" direction="right" :on-scroll="onScroll"></Tab-Scroller>
             <Tab-Nav-Container :nav-items="navItems" >
                 <template v-slot:tabItem >
                     <Tab-Nav-Item v-for="(navItem,index) in navItems" :nav-item="navItem" :index="index"
                      :on-right-menu="onRrightMenu" :key="navItem.key" :on-close="onClose" :on-selected="onSelected"></Tab-Nav-Item>
                 </template>
             </Tab-Nav-Container>
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
import TabNavItem from './tabNavItem.vue'
import RightMenu from './rightMenu.vue'
import './style.scss'
export default {
    name:"NavContainer",
    created(){
        this.devMode=true;
        this.$EventBus.$on("addTab",this.addTab);
    },
    data(){
        return {
            condition:false,
            left:0,
            right:0,
            leftMenu:0,
            topMenu:0,
            isShowRightMenu:false,
            menuData:[],
            navItems:[
                { path:"/a", title:"首页",selected:true,key:"home",icon:"icofont-home"}//,
               /* {path:"/b", title:"首页1",selected:false,key:"home1",icon:"icofont-home"},
                {path:"/c", title:"首页2",selected:false,key:"home2",icon:"icofont-home"},
                 {path:"/d", title:"首页3",selected:false,key:"home3",icon:"icofont-home"},
                {path:"/e", title:"首页4",selected:false,key:"home4",icon:"icofont-home"}
                ,
                {path:"/b", title:"首页1",selected:false,key:"home11",icon:"icofont-home"},
                {path:"/c", title:"首页2",selected:false,key:"home21",icon:"icofont-home"},
                 {path:"/d", title:"首页3",selected:false,key:"home31",icon:"icofont-home"},
                {path:"/e", title:"首页4",selected:false,key:"home41",icon:"icofont-home"}
                ,
                {path:"/b", title:"首页1",selected:false,key:"home12",icon:"icofont-home"},
                {path:"/c", title:"首页2",selected:false,key:"home22",icon:"icofont-home"},
                 {path:"/d", title:"首页3",selected:false,key:"home32",icon:"icofont-home"},
                {path:"/e", title:"首页4",selected:false,key:"home42",icon:"icofont-home"}
                ,
                {path:"/b", title:"首页1",selected:false,key:"home13",icon:"icofont-home"},
                {path:"/c", title:"首页2",selected:false,key:"home23",icon:"icofont-home"},
                 {path:"/d", title:"首页3",selected:false,key:"home33",icon:"icofont-home"},
                {path:"/e", title:"首页4",selected:false,key:"home43",icon:"icofont-home"}
                ,
                {path:"/b", title:"首页1",selected:false,key:"home14",icon:"icofont-home"},
                {path:"/c", title:"首页2",selected:false,key:"home24",icon:"icofont-home"},
                 {path:"/d", title:"首页3",selected:false,key:"home34",icon:"icofont-home"},
                {path:"/e", title:"首页4",selected:false,key:"home44",icon:"icofont-home"}
                ,
                {path:"/b", title:"首页1",selected:false,key:"home15",icon:"icofont-home"},
                {path:"/c", title:"首页2",selected:false,key:"home25",icon:"icofont-home"},
                 {path:"/d", title:"首页3",selected:false,key:"home35",icon:"icofont-home"},
                {path:"/e", title:"首页4",selected:false,key:"home45",icon:"icofont-home"}
                ,
                {path:"/b", title:"首页1",selected:false,key:"home16",icon:"icofont-home"},
                {path:"/c", title:"首页2",selected:false,key:"home26",icon:"icofont-home"},
                 {path:"/d", title:"首页3",selected:false,key:"home36",icon:"icofont-home"},
                {path:"/e", title:"首页4",selected:false,key:"home46",icon:"icofont-home"}*/
            ]
        };
    },
    components:{
        "Tab-Container":TabContainer,
        "Tab-Scroller":TabScroller,
        "Tab-Nav-Container":TabNavContainer,
        "Tab-Content":TabContent,
        "Tab-Right-Menu":RightMenu,
        "Tab-Nav-Item":TabNavItem
    },
    mounted(){
         let that=this;
          that.condition=that.isScroll();
          window.addEventListener('resize', function(){
               that.condition=that.isScroll();
        });	
    },
    computed:{
        navCount(){
            return this.navItems.length;
        }
    },
    watch:{
        navCount(){
            this.condition=this.isScroll();
        }
    },
    methods:{
        addTab(item){
            let flag=false;
            for(let i=0;i<this.navItems.length;i++){
                this.navItems[i].selected=item.key==this.navItems[i].key;
                if(item.key==this.navItems[i].key){
                    flag=true;
                    break;
                }
            }
            if(!flag){
                this.navItems.push(item);
                item.selected=true;
            }
        },
        onSelectedMeun(item){
            this.isShowRightMenu=false;
            const {key,navKey,navIndex}=item;
            switch(key){
                case 'close':{
                    this.onClose(this.navItems[navIndex],navIndex);
                    break;
                    }
                case 'closeLeft':{
                    this.navItems.splice(1,navIndex-1);
                     let newSelectedIndex=-1;
                    for(let i=0;i< this.navItems.length;i++){
                        if( this.navItems[i].selected){
                        newSelectedIndex=i;
                        }
                    }
                    if(newSelectedIndex==-1){
                         this.navItems[1].selected=true;  
                    }
                    break;
                    }
                case 'closeRight':{
                     this.navItems.splice(navIndex+1, this.navItems.length-1);
                    let newSelectedIndex=-1;
                    for(let i=0;i< this.navItems.length;i++){
                        if( this.navItems[i].selected){
                        newSelectedIndex=i;
                        }
                    }
                    if(newSelectedIndex==-1){
                         this.navItems[ this.navItems.length-1].selected=true;
                    }
                    break;
                    }
                case 'closeOther':{
                    if(navIndex==0){
                        this.navItems.splice(1,this.navItems.length-1);
                    }else{
                        this.navItems.splice(1,navIndex-1);
                        this.navItems.splice(2,this.navItems.length-1);
                    }
                    
                    let newSelectedIndex=0;
                    for(let i=0;i<this.navItems.length;i++){
                        if(this.navItems[i].selected){
                        newSelectedIndex=i;
                        }
                    }
                    if(newSelectedIndex==0){
                        if(navIndex==0){
                        this.navItems[0].selected=true;
                        }else{
                        this.navItems[1].selected=true;
                        }
                    
                    }
                    break;
                    }
                case 'closeAll':{
                    this.navItems.splice(1,this.navItems.length-1);
                    this.navItems[0].selected=true;
                    break;
                    }
            }
        },
        onMouseLeave(){
            this.isShowRightMenu=false;
        },
        onRrightMenu(item,index){
             let eleArray= document.querySelectorAll('.tab-nav');
            let ele=eleArray[index];
           this.menuData.splice(0,this.menuData.length);
            if(index==0&& item.key=='home'&&eleArray.length>1){
            this.menuData.push({text:"关闭其他",key:"closeOther",navKey:item.key,navIndex:index});
            }else if(item.key!='home'){
            if(index==1&&eleArray.length==2){
                this.menuData.push({text:"关闭",key:"close",navKey:item.key,navIndex:index});
            }else{
                if(index==eleArray.length-1){
                this.menuData.push({text:"关闭",key:"close",navKey:item.key,navIndex:index});
                this.menuData.push({text:"关闭左边",key:"closeLeft",navKey:item.key,navIndex:index});
                }else{
                
                this.menuData.push({text:"关闭",key:"close",navKey:item.key,navIndex:index});
                this.menuData.push({text:"关闭所有",key:"closeAll",navKey:item.key,navIndex:index});
                if(index!=1){
                    this.menuData.push({text:"关闭其他",key:"closeOther",navKey:item.key,navIndex:index});
                    this.menuData.push({text:"关闭左边",key:"closeLeft",navKey:item.key,navIndex:index});
                }
                this.menuData.push({text:"关闭右边",key:"closeRight",navKey:item.key,navIndex:index});
                }
            }
            }
            let scrollDistance=0;
            for(let i=0;i<this.left;i++){
            scrollDistance+=eleArray[i].clientWidth+4;
            }
        
            this.leftMenu=ele.offsetLeft+4-scrollDistance;
            this.topMenu=ele.offsetTop+25;
            this.isShowRightMenu=true;
            let menu=document.querySelector('.right-menu');
            this.log(this.menuData);
            menu.style.left =this.leftMenu+ 'px';
			menu.style.top = this.topMenu+ 'px';
        },
        onScroll(direction){
             let eleArray= document.querySelectorAll('.tab-nav');

            let length=4;
        
            if(direction=='left'){
            for(let i=this.left;i<eleArray.length;i++){
                length+=eleArray[i].clientWidth;
            }
            }else{
            for(let i=eleArray.length-this.right-1;i>=0;i--){
                length+=eleArray[i].clientWidth;
            }
            }
        
            let flag=length>document.querySelector('.tab-header').clientWidth;
            if(flag || (this.left>0 && direction=="right") || (this.right>0 && direction=="left")){
                let tx=direction=='left'?eleArray[this.left].clientWidth+4:-eleArray[this.left-1].clientWidth-4;
                document.querySelector('.tab-wrap').scrollLeft+=tx;
                let left=direction=='left'?this.left+1:this.left-1<0?0:this.left-1;
                let right=direction=='right'?this.right+1:this.right-1<0?0:this.right-1;
                this.left=left;
                this.right=right;
            }
        },
         onSelected(item){
                this.$router.push(item.path);
                this.navItems.map((navItem)=>{
                    return navItem.selected=item.key==navItem.key;
                });
        },
        isScroll(){
            let flag=false;
            if(document.querySelector('.tab-nav')==null){
                
                return flag;
            }
            let eleArray= document.querySelectorAll('.tab-nav');
            let length=4;
            for(let i=0;i<eleArray.length;i++){
                length+=eleArray[i].clientWidth;
            }
            flag=length>document.querySelector('.tab-header').clientWidth;
            if(!flag){
                document.querySelector('.tab-wrap').scrollLeft=0;
            }
            return flag;
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
