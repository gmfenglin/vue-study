<template>
    <div class="tab-container">
        <slot name="rightMenu"></slot>
        <div class="tab-header">
                <slot name="header"></slot>
        </div>
        
        <slot name="content"></slot>
    </div>
</template>
<script>
export default {
    
}
</script>
