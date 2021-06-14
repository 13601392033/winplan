<template>
    <div class="record">
        <Headera style="color:#000;border-bottom:1px solid #5F6368">
            <span class="header-title">记录</span>
            <span class="left-icon">
                <router-link to="/main/home">
                    <i class="el-icon-arrow-left" style="font-size: 20px;color:#FAFAFA"></i>
                </router-link>
            </span>
        </Headera>
        record
    </div>
</template>

<style scoped>
.record{
    background: rgb(122, 115, 116);
    position: fixed;
    overflow: auto;
    width: 100%;
    height: 100%;
}
.left-icon{
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
}
</style>

<script>
import Headera from "@/views/common/header.vue"
export default {
    components:{
        Headera
    }
}
</script>

