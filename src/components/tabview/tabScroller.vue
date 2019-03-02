<template>
    <div v-if="condition" @click="onScroll(direction)" class="tab-scroller" :class="directionClass"></div>
</template>
<script>
export default {
    props:["condition","direction","onScroll"],
    computed:{
        directionClass(){
            return this.direction=='left'?'tab-scroller-left icofont-circled-left':'tab-scroller-right icofont-circled-right';
        }
    }
}
</script>

