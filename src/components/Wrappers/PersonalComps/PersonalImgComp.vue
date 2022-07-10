<script setup>
    import HeaderSnack from "@/components/HeaderSnack/HeaderSnack.vue";
</script>
<template>
    <div class="personalWrapperCol">
        <div class="personalIMGHeader">
            <HeaderSnack />
        </div>
        <div class="personalIMGWrapper">
            <img :src="require('@/assets/images/Personal.jpg')" alt="form page picture">
            <div class="pictureText">
                <p class="quote">“When you see a good move, look for a better one.”</p>
                <p class="author">-Emanuel Lasker</p>
            </div>
        </div>
    </div>
</template>