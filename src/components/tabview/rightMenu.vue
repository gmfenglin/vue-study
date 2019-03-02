<template>
     <div class="right-menu" @mouseleave="onMouseLeave" v-show="isShowRightMenu">
    <ul class="right-menu-ul">
        <li  v-for="(item) in menuData" class="right-menu-li" :key="item.key"><a class="right-menu-a" @click="onSelectedMeun(item)">{{item.text}}</a></li>
    </ul>
</div>
</template>
<script>
export default {
    name:"RightMenu",
    created(){
        this.devMode=true;
       
    },
    props:["menuData","isShowRightMenu","onMouseLeave","onSelectedMeun"]
    
}
</script>
