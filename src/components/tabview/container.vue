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
import {_debouce,_throttle} from '../../performance/performance.js'
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
        navCount:function(){
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
             this.onSelected(item);
        },
        onSelectedMeun:_debouce (function(item){
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
        },100),
        onMouseLeave:_debouce(function(){
            this.isShowRightMenu=false;
        }),
        onRrightMenu:_debouce (function(item,index){
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
        },100),
        onScroll:_debouce (function(direction){
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
                if(direction=="right" && this.left<1){
                    return;
                }
                let tx=direction=='left'?eleArray[this.left].clientWidth+4:-eleArray[this.left-1].clientWidth-4;
                document.querySelector('.tab-wrap').scrollLeft+=tx;
                let left=direction=='left'?this.left+1:this.left-1<0?0:this.left-1;
                let right=direction=='right'?this.right+1:this.right-1<0?0:this.right-1;
                this.left=left;
                this.right=right;
            }
        },100),
         onSelected:_debouce (function(item){
                this.$router.push(item.path);
                this.navItems.map((navItem)=>{
                    return navItem.selected=item.key==navItem.key;
                });
        },50),
        isScroll(){
            let flag=false;
            if(document.querySelector('.tab-nav')==null){
                
                return flag;
            }
            let eleArray= document.querySelectorAll('.tab-nav');
            let length=4;
            let count=this.navCount>eleArray.length?eleArray.length:this.navCount;
            for(let i=0;i<count;i++){
                length+=eleArray[i].clientWidth;
            }
            flag=length>document.querySelector('.tab-header').clientWidth;
            if(!flag){
                document.querySelector('.tab-wrap').scrollLeft=0;
            }
            return flag;
        },
        onClose:_debouce (function(item,index){
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
            
        },50)
    }
}
</script>
