<template>
    <div class="week" :style="{background:'url('+back+')'}">
        <h1 v-if="isNull" style="font-size:26px;font-family:cursive;margin-top:20px;">暂无数据</h1>

        <div class="week-list">
            <ul class="list-ul" >
                <li @click="jump(item.id)" class="week-box" v-for="(item,index) in list" :key="index">
                    <div class="intro">
                        <div>{{moment(item.startDate).format("YYYY-MM-DD")}}</div>
                        <div style="margin-top:5px;">~</div>
                        <div style="margin-top:5px;">{{moment(item.endDate).format("YYYY-MM-DD")}}</div>
                    </div>
                    <div class="week-back">
                        
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.intro{ 
    position: absolute;
    z-index: 100;
    color:#fff;
    font-size: 18px;
    letter-spacing: 2px;
}
.week-back{
    width: 100%;
    height: 100%;
    background-image: linear-gradient(#4B7C99, #B2C8D9);
    filter: blur(2px);
    border-radius: 15px;
}
.list-ul{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.week-box{
    width:50%;
    padding: 18px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
}
.week{
    position:fixed;
    width:100%;
    height:100%;
    overflow: auto;
    background-size:100% 100% !important;
}
</style>

<script>
import {queryAllWeek} from "@/request/week.js"
import { Toast } from 'vant';
export default {
    data(){
        return {
            list:[],
            isNull:false,
            back:localStorage.getItem("back"),
            moment:this.$moment
        }
    },
    created(){
        this.initData();
    },
    methods:{
        jump(id){
            this.$router.push({name:"week", query:{id:id}})
        },
        initData(){
            queryAllWeek().then(res=>{
                if(res.data.code == 200){
                    if(res.data.data.length > 0){
                        let data = res.data.data;
                        this.list = data
                    }else{
                        this.isNull = true;
                    }
                }else{
                    Toast.fail(res.data.msg)
                }
            })
        },
        strMapToObj(strMap) {
            let obj = Object.create(null);
            for (let [k,v] of strMap) {
                obj[k] = v;
            }
            return obj;
        },
    },
}
</script>

<style>

</style>