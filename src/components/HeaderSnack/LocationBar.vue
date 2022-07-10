<script>
    export default {
        props: {
            step: String
        }
    }
</script>

<template>
    <div class="locationWrapper">
        <p>{{ step }}</p>
    </div>
</template>

<style>
    @import url(./HeaderSnack.css);
</style>