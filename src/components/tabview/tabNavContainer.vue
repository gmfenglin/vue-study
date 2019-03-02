<template>
    <div class="tab-wrap">
            <ul class="tabs">
              <slot name="tabItem"></slot>
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
