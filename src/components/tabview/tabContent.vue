<template>
    <div class="tab-content">
        <transition>
            <keep-alive>
                <router-view name="tabview" ></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
export default {
    name:"tabContent",
    created(){
        this.devMode=true;
       
    }
}
</script>
