<script setup>
    import LocationBar from '@/components/HeaderSnack/LocationBar.vue';
    import NavigationBar from '@/components/HeaderSnack/NavigationBar.vue';
    import PersonalForm from '@/components/PersonalForm/PersonalForm.vue';
    import {ref} from "vue";

    const current = ref(1);
    const active = ref(0);
</script>

<template>
    <div class="personalWrapperCol form">
        <LocationBar step="Start creating your account" />
        <div class="personalWrapperContent">
            <NavigationBar :current="current.value" :active="active.value" />
            <div class="personalInfoTextWrapper">
                <h2>Personal information</h2>
                <p>This is basic information fields</p>
            </div>
            <div class="personalWrapperForm">
                <PersonalForm @setActive="(n) => active.value = n" :active="active.value"/>
            </div>
        </div>
    </div>
</template>