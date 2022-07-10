<script>
    export default {
        props: {
            current: Number,
            active: Number
        }
    }
</script>

<template>
    <div class="navigationWrapper">
        <div class="wizardWrapper">
            <div :class="current === 1 && active === 0 ? 'pageWrapper current' 
            : current === 1 && active === 1 ? 'pageWrapper current active' : current === 2 ? 'pageWrapper current active done'
            : 'pageWrapper'">
                <span>1</span>
            </div>
            <p>Personal Information</p>
        </div>
        <hr class="wizardHR">
        <div class="wizardWrapper">
            <div :class="current === 2 && active === 0 ? 'pageWrapper current' 
            : current === 2 && active === 2 ? 'pageWrapper current active' 
            : 'pageWrapper'">
                <span>2</span>
            </div>
            <p>Chess experience</p>
        </div>
    </div>
</template>