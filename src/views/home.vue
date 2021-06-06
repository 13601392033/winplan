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
                    
                    <div class="title-right fl" :style="{width: modal.type == -1 || modal.type == undefined ? 80 +'%' : 66 + '%'}">
                        <input v-model="popupTitle" type="text"/>
                    </div>
                    <div v-show="showType" class="type" @click="mf" ><i class="el-icon-moon-night icon-record-type" style="right: 0;" :class="[recordIcon(modal.type)]"></i></div>
                </div>
                <div class="body-content">
                    <textarea v-model="popupContent" placeholder="写点什么…"></textarea>
                </div>
                <div class="body-footer">
                    <i style="color:#FFC125" class="el-icon-success icon"></i>
                    <i style="color:#B5B5B5" class="el-icon-error icon"></i>
                </div>
            </template>
        </Popup>

        <!--任务-->
        <div class="home-module">
            <div class="task-header clear">
                <div class="task-left clear">
                    <i style="color: #0066ff;" class="el-icon-edit-outline"></i>
                    <span class="task-title">任务</span>
                    <i @click="openPopup" class="el-icon-circle-plus add-position"></i>
                </div>
                <div class="task-right clear">
                    <i style="line-height:23px;color:#4682B4" class="el-icon-arrow-right"></i>
                </div>
            </div>
            <ul class="task-list">
                <li v-for="(item,i) in taskList" :key="i" class="task-item">
                    <div @click="changeState(item,i)" class="check">
                        <div v-if="item.state == 1" class="single-check"></div>
                        <svg v-else-if="item.state == 2" style="font-size:24px;color:#0066ff;width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11388"><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="11389"></path></svg>
                    </div>
                    <div class="item-content ell" @click="openPopup(item)">{{item.title}}</div>
                </li>
            </ul>
        </div>

        <!--记录-->
        <div class="record-module">
            <div class="task-header clear">
                <div class="task-left clear">
                    <i style="color: #EE0000;" class="el-icon-edit-outline"></i>
                    <span class="task-title">记录</span>
                    <i @click="openPopup" style="color:#ff4c41" class="el-icon-circle-plus add-position"></i>
                </div>
                <div class="task-right clear">
                    <i style="line-height:23px;color:#EE0000" class="el-icon-arrow-right"></i>
                </div>
            </div>
            <ul class="record-list">
                <li v-for="(item,i) in recordList" :key="i" class="record-item" @click="openPopup(item)">
                    <div class="record-contain">
                        <i class="el-icon-moon-night icon-record-type" :class="[recordIcon(item.type)]"></i>
                        <div class="record-content ell">{{item.title}}</div>
                        <div class="detail ell">{{item.remark}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <van-popup v-model:show="show" position="bottom" :style="{ height: '60%' }">
            <van-picker
                title="标题"
                :columns="columns"
                @confirm="onConfirm"
                @change="onChange"
            />
        </van-popup>
        <div class="habit-module">
            
        </div>

        <div class="diary-module">
            
        </div>
    </div>
    
    <router-view></router-view>
</template>

<style scoped>
    .type{
        height:40px;
        color:#fff;
        background: #1A73E8;
        position: absolute;
        right: 0;
        width: 14%;
    }
    .icon{
        font-size: 30px;
        margin-left:15px;
    }
    .icon-record-type{
        left: 4%;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
    }
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
        position: fixed;
        background: #fff;
        bottom: 0px;
        width: 100%;
        padding: 10px 0;
        height:30px;
        
    }
    .detail{
        float: left;
        width: 100%;
        font-size: 14px;
        line-height: 1;
        text-align: left;
        bottom: 0;
        text-indent: 15%;
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
        text-indent: 15%;
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
import { Popup as vantPopup} from 'vant';
import { Picker } from 'vant';
export default {
    name:"home",
    components:{
        Nava,
        Headera,
        Popup,
        "van-popup":vantPopup,
        "van-picker": Picker,
    },
    created(){

    },
    setup() {
        const columns = ['生活', '工作', '学习', '感悟', 'mf'];

        const onConfirm = (value, ) => {
            console.log(value)
        };
        const onChange = (value, ) => {
            console.log(value)
        };

        return {
            columns,
            onChange,
            onConfirm,
        };
    },
    data(){
        return {
            showType:false,
            show:false,
            taskList:[
                {
                    title:"hello",
                    state:1,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"dd",
                    state:1,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"aa",
                    state:2,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"cs",
                    state:1,
                    remark:"dasdasdasdqw"
                },
                {
                    title:"daa",
                    state:2,
                    remark:"dasdasdasdqw"
                }
            ],
            popupTitle:"",
            popupContent:"",
            recordList:[
                {
                    title:"hello",
                    type:1,
                    remark:"one"
                },
                {
                    title:"hello",
                    type:1,
                    remark:"two"
                },
                {
                    title:"hello",
                    type:2,
                    remark:"three"
                },
                {
                    title:"hello",
                    type:1,
                    remark:"four"
                },
                {
                    title:"hello",
                    type:2,
                    remark:"five"
                }
            ],
            modal:{
               type:-1, 
            }
        }
    },
    computed:{
        recordIcon(){
            return (type)=>{
                switch (type){
                    case 1:
                        return "el-icon-reading"
                    case 2:
                        return "el-icon-moon-night"
                }
            }
        }
    },
    methods:{
        mf(){
            this.show = true
        },
        changeState(v, index){
            if(v.state == 1){
                this.taskList[index].state = 2;
            }else if(v.state == 2){
                this.taskList[index].state = 1;
            }
        },
        openPopup(item){
            this.modal.type = item.type;
            console.log(this.modal.type)
            if(item.type){
                this.showType = true;
            }else{
                this.showType = false;
            }
            this.popupTitle = item.title;
            this.popupContent = item.remark
            this.$refs.popup.open()
        }
    }
}
</script>
