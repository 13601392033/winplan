<template>
    <div class="home" :style="{background:'url('+ back +') no-repeat'}">
        <Nav></Nav>
        <Header></Header>
        <div class="home-module">

        </div>

        <div class="habit-module">
            
        </div>

        <div class="diary-module">
            
        </div>
    </div>
    
    <router-view></router-view>
</template>

<script>
import Nav from "@/views/common/nav.vue"
import Header from "@/views/common/header.vue"
export default {
    name:"home",
    components:{
        Nav,
        Header
    },
    created(){

    },
    data(){
        return {
            back: require("@/assets/2.jpg"),
        }
    }
}
</script>

<style scoped>
    .home{
        position: fixed;
        overflow: auto;
        width:100%;
        height:100%;
        background: #F0F0F0;
        background-size:100% 100% !important;
    }
</style>