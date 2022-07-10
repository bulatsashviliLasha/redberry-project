<script setup>
    import HeaderSnack from "@/components/HeaderSnack/HeaderSnack.vue"
</script>
<template>
    <div class="landingWrapper">
        <div class="landingWrapperCol scrollable">
            <div class="landingIMGHeader">
                <HeaderSnack />
            </div>
            <div class="landingIMGWrapper">
                <img :src="require('@/assets/images/Landing.jpg')" alt="landing page scrolling picture">
            </div>
        </div>
        <div class="landingWrapperCol">
            <div class="landingTextWrapper">
                <h1>chess says <span>a lot about</span> who we are</h1>
                <router-link to="/personalForm"><button class="landingButton">Get Started</button></router-link>
            </div>
        </div>
    </div>
    <router-view :key="$route.path"/>

</template>

<style>
    @import url(./Wrappers.css);
</style>