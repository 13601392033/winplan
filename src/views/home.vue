<template>
    <div>
        <Nav></Nav>
    </div>
    
    <router-view></router-view>
</template>

<script>
import Nav from "@/views/nav.vue"
export default {
    name:"home",
    components:{
        Nav
    },
    created(){

    },
    data(){
        return {

        }
    }
}
</script>

<style>

</style>