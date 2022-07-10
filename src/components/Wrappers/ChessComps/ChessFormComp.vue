<script setup>
    import ChessForm from "@/components/ChessForm/ChessForm.vue";
    import LocationBar from "@/components/HeaderSnack/LocationBar.vue";
    import NavigationBar from "@/components/HeaderSnack/NavigationBar.vue";

    import {ref} from "vue";
    const current = ref(2);
    const active = ref(0);
</script>

<template>
    <div class="chessWrapperCol form">
        <LocationBar step="First step is done, continue to finish onboarding" />
        <div class="chessWrapperContent">
            <NavigationBar :current="current.value" :active="active.value" />
            <div class="chessInfoTextWrapper">
                <h2>Chess experience</h2>
                <p>This is basic information fields</p>
            </div>
            <div class="chessWrapperForm">
                <ChessForm @setActive="(n) => active.value = n" :active="active.value"/>
            </div>
        </div>
    </div>
</template>