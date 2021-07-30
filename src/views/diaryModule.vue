<template>
    <div class="diary">
        <div class="diary-header">
            <span class="left-icon">
                <router-link to="/main/diary">
                    <i class="el-icon-back" style="font-size: 20px;color:#000;font-weight: bold;"></i>
                </router-link>
            </span>
            <div class="done">完成</div>
        </div>
        <div class="diary-body">
            <div class="diary-tag">
                <span class="tag-date">{{moment(date).format("YYYY-MM-DD")}}</span>
                <span class="tag-day">{{moment(date).format('dddd')}}</span>
                <span class="tag-time">{{moment(date).format('LT')}}</span>
            </div>
            <div class="diary-content">
                <textarea placeholder="今天发生了哪些想要记录下的事？" class="diary-textarea"></textarea>
            </div>
        </div>
    </div>
</template>

<style scoped>
.done{
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 16px;
    letter-spacing: 2px;
}
.diary-textarea{
    width: 100%;
    outline: none;
    text-indent: 3px;
    margin-top:20px;
    height:200px;
    border: none;
}
.diary-textarea::-webkit-input-placeholder {
    color: #ccc;
}
.diary-body{
    text-align: left;
    width: 92%;
    margin: 0 auto;
}
.diary-tag{
    letter-spacing: 1px;
}
.diary-tag span{
    margin-left:5px;
}
.diary-header{
    height:60px;
    position:relative;
}
.left-icon{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
}

</style>

<script>
import {queryDiaryList} from "@/request/diary"
import moment from "moment"

moment.locale("zh-cn");
export default {
    name : "habit",
    created(){
        this.init();
    },
    data(){
        return {
            moment: moment,
            date: new Date(),
        }
    },
    methods:{
        init(){
            //this.queryDiaryList();
        },
    },
}
</script>