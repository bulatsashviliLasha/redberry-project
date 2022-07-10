<script setup>
    import HeaderSnack from "@/components/HeaderSnack/HeaderSnack.vue";
</script>
<template>
    <div class="completeWrapperCol">
        <div class="completeIMGHeader">
            <HeaderSnack />
        </div>
        <div class="completeIMGWrapper">
            <img :src="require('@/assets/images/Complete.jpg')" alt="complete page picture">
        </div>
    </div>
</template>