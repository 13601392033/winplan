<template>
    <div class="week" :style="{background:'url('+back+')'}">week</div>
</template>

<style scoped>
.week{
    position:fixed;
    width:100%;
    height:100%;
    background-size:100% 100% !important;
    background-image:linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)
}
</style>

<script>
export default {
    data(){
        return {
            back: require("./../assets/g2.jpg")
        }
    }
}
</script>

<style>

</style>