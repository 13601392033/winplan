<template>
    <div>
        <Nava></Nava>
        <router-view></router-view>
    </div>
</template>

<script>
import Nava from "@/views/common/nav.vue"
import Headera from "@/views/common/header.vue"
export default {
    name:"main",
    components:{
        Nava,

    }
}
</script>

<style>

</style>