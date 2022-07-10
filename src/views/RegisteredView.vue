<script>
    import CompleteWrapper from '@/components/Wrappers/CompleteWrapper.vue';
    export default {
        data() {
            return {
                personalData: Object,
                chessData: Object,
                finalData: Object,
            };
        },
        methods: {
            parseChess() {
                delete this.chessData.character_name;
                delete this.chessData.experience_name;
            }
        },
        beforeMount: function () {
            try {
                this.personalData = JSON.parse(sessionStorage.getItem("KC-personalInfo"));
                this.chessData = JSON.parse(sessionStorage.getItem("KC-chessInfo"));

                this.parseChess();

                sessionStorage.clear();
                this.finalData = {
                    ...this.personalData,
                    ...this.chessData
                };
            } catch(err) {
                if(err) this.$router.push('notFound');
            }
        },
        components: { CompleteWrapper }
    }
</script>
<template>
    <CompleteWrapper :finalData="finalData" />
</template>