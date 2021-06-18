<template>
    <div class="habit">
        <Headera style="color:#ff4c41;border-bottom:1px solid #fff;">
            <span class="header-title">习惯</span>
            <span class="left-icon">
                <router-link to="/main/home">
                    <i class="el-icon-arrow-left" style="font-size: 20px;color:#ff4c41"></i>
                </router-link>
            </span>
        </Headera>

        <div class="habit-container">
            <div class="habit-statistics">
                <div class="stat-item" style="margin-left: .5%;">
                    <i class="stat-icon el-icon-time"></i>进行中
                </div>
                <div class="stat-item">
                    <i class="stat-icon el-icon-circle-check"></i>
                    已完成
                </div>
                <div class="stat-item">
                    <i class="stat-icon el-icon-video-pause"></i>
                    已暂停
                </div>
            </div>
            <ul class="habit-list">
                <li class="list-item" v-for="(item,index) in habitList" :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.stat-icon{
    font-size:20px;
}
.list-item{
    border-radius: 6px;
    width: 94%;
    margin-left: 3%;
    margin-bottom: 20px;
    height: 60px;
    line-height: 60px;
    background: #fff;
}
.stat-item{
    color:#7a7e83;
    float:left;
    width:33%;
}
.habit-statistics{
    overflow: hidden;
}
.habit-list{
    position: fixed;
    top: 131px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    margin-bottom: 20px;
}
.habit{
    position:fixed;
    width:100%;
    height:100%;
    background-image: linear-gradient(to bottom right,#FFFAF0,#FFF0F5);
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
import { onMounted } from '@vue/runtime-core'

export default {
    name : "habit",
    components:{
        Headera
    },
    setup(){
        onMounted(()=>{
            console.log("das")
        })
    },
    data(){
        return {
            habitList:[1,2,21,312,3,123,123,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,]
        }
    }
}
</script>