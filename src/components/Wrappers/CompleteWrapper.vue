<script>
    import CompleteImgComp from './CompleteComps/CompleteImgComp.vue';
    import CompleteDoneComp from './CompleteComps/CompleteDoneComp.vue';

    import { toRaw } from '@vue/reactivity';

    import axios from "axios";

    export default {
    components: { CompleteImgComp, CompleteDoneComp },
    props: { finalData: Object },
    mounted:function() {
        const rawFinal = toRaw(this.finalData);

        axios.post('https://chess-tournament-api.devtest.ge/api/register', rawFinal, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
</script>
<template>
    <div class="completeWrapper">
        <CompleteImgComp />
        <CompleteDoneComp />
    </div>
</template>