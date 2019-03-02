<template>
    <div class="root">{{message}}</div>
</template>
<script type="text/javascript" >
    export default {
        data(){
           return { message:"Hello world!"};
        }
    };
</script>
<style scoped >
    .root{
        background-color: red;
    }
</style>
