<template>
    <div class="home" >
        <Nava></Nava>
        <Headera></Headera>
        <Popup ref="popup">
            <template v-slot:body>
                <div class="body-title">
                    <div class="title-left fl">
                        <i class="el-icon-pie-chart"></i>
                    </div>
                    <div class="title-right fl">
                        <input type="text"/>
                    </div>
                </div>
                <div class="body-content">
                    <textarea placeholder="写点什么…"></textarea>
                </div>
                <div class="body-footer"></div>
            </template>
        </Popup>
        <div class="home-module">
            <div class="task-header clear">
                <div class="task-left clear">
                    <i style="color: #0066ff;" class="el-icon-edit-outline"></i>
                    <span class="task-title">任务</span>
                </div>
                <div class="task-right clear">
                    <i style="line-height:23px;" class="el-icon-arrow-right"></i>
                </div>
            </div>
            <ul class="task-list">
                <li v-for="(item,i) in taskList" :key="i" class="task-item">
                    <div @click="changeState(item,i)" class="check">
                        <div v-if="item.state == 1" class="single-check"></div>
                        <svg v-else-if="item.state == 2" style="font-size:24px;color:#0066ff;width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11388"><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="11389"></path></svg>
                    </div>
                    <div class="item-content ell" @click="openPopup">{{item.title}}</div>
                </li>
            </ul>
        </div>

        <div class="record-module">
            <div class="task-header clear">
                <div class="task-left clear">
                    <i style="color: #0066ff;" class="el-icon-edit-outline"></i>
                    <span class="task-title">记录</span>
                    <i @click="openPopup" class="el-icon-circle-plus add-position"></i>
                </div>
                <div class="task-right clear">
                    <i style="line-height:23px;" class="el-icon-arrow-right"></i>
                </div>
            </div>
            <ul class="record-list">
                <li v-for="(item,i) in recordList" :key="i" class="record-item">
                    <div class="record-contain">
                        <div class="record-content ell">{{item.title}}</div>
                        <div class="detail ell">mfmfmfmmff</div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="habit-module">
            
        </div>

        <div class="diary-module">
            
        </div>
    </div>
    
    <router-view></router-view>
</template>

<style scoped>
    .body-content textarea{
        width: 100%;
        height: 100%;
        margin-top: 10px;
        border: none;
        padding-top:10px;
        text-indent:2em;
        outline: none;
    }
    .title-left{
        width:20%;
        height:100%;
        background: #B9D3EE;
        text-align: center;
        color:#0066ff;
    }
    .title-right{
        width:80%;
        height:100%;
    }
    .title-right input{
        width:100%;
        height:100%;
        border:none;
        outline:none;
        text-indent: 1em;
    }
    .body-title{
        width:100%;
        height:40px;
        line-height:40px;
    }
    .body-content{
        width:100%;
        height:100%;
    }
    .body-footer{
        position: absolute;
        bottom: 10px;
        width: 100%;
    }
    .detail{
        float: left;
        width: 100%;
        font-size: 14px;
        line-height: 1;
        text-align: left;
        bottom: 0;
        text-indent: 9%;
        position: absolute;
    }
    .record-module{
        width:94%;
        margin: 28px auto 0;
        border-radius: 10px;
        background-color:rgba(255,255,255,.9);
        margin-bottom: 10px;
        border:1px solid #FFFFF0;
    }
    .record-contain{
        border-bottom: 1px solid #ddd;
        position: relative;
        height: 100%;
        width: 100%;
    }
    .record-item{
        height: 47px;
        position: relative;
        line-height: 34px;
    }
    .record-content{
        width: 100%;
        text-indent: 9%;
        font-weight: bold;
        float: left;
        font-size: 18px;
        text-align: left;
    }
    .record-list{
        margin-top:22px;
        margin-bottom: 10px;
    }
    .home{
        position: fixed;
        overflow: auto;
        width:100%;
        height:100%;
        background-image: linear-gradient(to bottom right,#C7C7C7,#336699,#6CA6CD);
        background-size:100% 100% !important;
    }
    .home-module{
        width:94%;
        margin: 28px auto 0;
        border-radius: 10px;
        background-color:rgba(255,255,255,.9);
        height:250px;
        border:1px solid #FFFFF0;
    }
    .check{
        width: 15%;
        position: relative;
        height: 30px;
        float:left;
        position: relative;
    }
    .item-content{
        float:left;
        width:80%;
        border-bottom: 1px solid #ddd; 
        text-align: left;
        text-indent:2px;
    }
    .single-check{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 5px;
        width:20px;
        height:20px;
        border-radius: 50%;
        border:1px solid #0066ff;
        display: inline-block;
    }
    .task-item{
        height: 34px;
        position: relative;
        line-height: 34px;
    }
    .task-list{
        margin-top: 22px;
    }
    .task-left{
        float:left;
        margin-left:10px;
    }
    .task-right{
        float:right;
        margin-right:10px;
    }
    .task-header{
        margin-top:10px;
    }
    .clear::after{
        content:"";
        display: block;
        clear:both;
    }
</style>

<script>
import Nava from "@/views/common/nav.vue"
import Headera from "@/views/common/header.vue"
import Popup from "@/views/common/popup.vue"
export default {
    name:"home",
    components:{
        Nava,
        Headera,
        Popup
    },
    created(){

    },
    data(){
        return {
            taskList:[
                {
                    title:"hello",
                    state:1,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"hello",
                    state:1,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"hello",
                    state:2,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"hello",
                    state:1,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"hello",
                    state:2,
                    remark:"dasdasdasdqw"
                }
            ],

            recordList:[
                {
                    title:"hello",
                    state:1,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"hello",
                    state:1,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"hello",
                    state:2,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"hello",
                    state:1,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"hello",
                    state:2,
                    remark:"dasdasdasdqw"
                }
            ],
           
        }
    },
    methods:{
        changeState(v, index){
            if(v.state == 1){
                this.taskList[index].state = 2;
            }else if(v.state == 2){
                this.taskList[index].state = 1;
            }
        },
        openPopup(){
            this.$refs.popup.open()
        }
    }
}
</script>
