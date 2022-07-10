<script setup>
    import HeaderSnack from '@/components/HeaderSnack/HeaderSnack.vue';
</script>

<template>
    <div class="chessWrapperCol">
        <div class="chessIMGHeader">
            <HeaderSnack />
        </div>
        <div class="chessIMGWrapper">
            <img :src="require('@/assets/images/Chess.jpg')" alt="chess form page picture">
            <div class="pictureText">
                <p class="quote">“Many have become chess masters; <br /> no one has become the master of chess.”</p>
                <p class="author">- Siegbert Tarrasch</p>
            </div>
        </div>
    </div>
</template>