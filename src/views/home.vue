<template>
    <div class="home" >
        <Headera>
            <span class="header-title">mf plan</span>
            <div class="attitude">保持姿态，迎接最美的蜕变</div>
            <span @click="loginOut" class="login-out">退出</span>
        </Headera>

        <Popup ref="popup">
            <template v-if="curPopup == 'task'" v-slot:body>
                <!--任务内容-->
                <div class="body-title">
                    <div class="title-left fl">
                        <i class="el-icon-pie-chart"></i>
                    </div>
                    <div class="title-right fl" style="width:64%;">
                        <input v-model="taskModule.title" type="text"/>
                    </div>
                    <div class="type" @click="mf" >
                        <span>{{taskTypeCom}}</span>
                    </div>
                </div>
                <div class="body-content">
                    <textarea class="textarea" v-model="taskModule.content"></textarea>
                </div>
                <div class="body-footer">
                    <i @click="saveData" style="color:#FFC125" class="el-icon-success icon"></i>
                    <i @click="delTask" style="color: rgba(255,76,65,.9);" class="el-icon-delete-solid icon"></i>
                    <i @click="$refs.popup.close()" style="color:#B5B5B5" class="el-icon-error icon"></i>
                </div>
            </template>

            <!-- 记录内容 -->
            <template v-else v-slot:body>
                <div class="body-title">
                    <div class="title-left fl">
                        <i class="el-icon-pie-chart"></i>
                    </div>
                    <div class="title-right fl" style="width:64%;">
                        <input v-model="recordModule.title" type="text"/>
                    </div>
                    <div class="type" @click="mf" >
                        <span>{{recordTypeCom}}</span>
                    </div>
                </div>
                <div class="body-content">
                    <textarea class="textarea hide-scroll" v-model="recordModule.content"></textarea>
                </div>
                <div class="body-footer">
                    <i @click="saveRecord" style="color:#FFC125" class="el-icon-success icon"></i>
                    <i @click="delRecord" style="color: rgba(255,76,65,.9);" class="el-icon-delete-solid icon"></i>
                    <i @click="$refs.popup.close()" style="color:#B5B5B5" class="el-icon-error icon"></i>
                </div>
            </template>
        </Popup>

        <!--任务-->
        <div class="home-module">
            <div class="task-header clear">
                <div class="task-left clear">
                    <i style="color: #0066ff;" class="el-icon-edit-outline"></i>
                    <span class="task-title">任务</span>
                    <i @click="openPopup(null, 1)" class="el-icon-circle-plus add-position"></i>
                </div>
                <div class="task-right clear">
                    <div @click="$router.push({name:'task'})">
                        <i  style="line-height:23px;color:#4682B4" class="el-icon-arrow-right"></i>
                    </div>
                    <!-- <router-link to="/main/task">
                        <i  style="line-height:23px;color:#4682B4" class="el-icon-arrow-right"></i>
                    </router-link> -->
                </div>
            </div>
            <div class="empty-text" v-if="taskList.length <= 0">暂无任务</div>
            <ul class="task-list">
                <li v-for="(item,i) in taskList" :key="i" class="task-item">
                    <div @click="changeTaskState(item,i)" class="check">
                        <div v-if="item.state == 1" class="single-check"></div>
                        <svg v-else-if="item.state == 2" style="font-size:24px;color:#0066ff;width: 19px;height: 19px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11388"><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="11389"></path></svg>
                    </div>
                    <div :class="{taskDone: item.state == 2}" class="item-content ell" @click="openPopup(item, 2)">{{item.title}}</div>
                </li>
            </ul>
        </div>

        <!--记录-->
        <div class="record-module">
            <div class="task-header clear">
                <div class="task-left clear">
                    <i style="color: #EE0000;" class="el-icon-edit-outline"></i>
                    <span class="task-title">记录</span>
                    <i @click="openPopupRecord(null, 1)" style="color:#ff4c41" class="el-icon-circle-plus add-position"></i>
                </div>
                <div class="task-right clear">
                    <router-link to="/main/record">
                        <i style="line-height:23px;color:#EE0000" class="el-icon-arrow-right"></i>
                    </router-link>
                </div>
            </div>
            <div class="empty-text" v-if="recordList.length <= 0">暂无记录</div>
            <ul class="record-list">
                <li v-for="(item,i) in recordList" :key="i" class="record-item" @click="openPopupRecord(item, 2)">
                    <div class="record-contain">
                        <i  class="icon-record-type" :class="[recordIcon(item.type)]"></i>
                        <div class="record-content ell">{{item.title}}</div>
                        <div class="detail ell">{{item.remark}}</div>
                    </div>
                </li>
            </ul>
        </div>
        
        <!--习惯-->
        <div class="habit-module">
            <div class="task-header clear">
                <div class="task-left clear">
                    <i style="color: #0066ff;" class="el-icon-circle-check"></i>
                    <span class="task-title">习惯</span>
                </div>
                <div class="task-right clear">
                    <router-link to="/main/habit">
                        <i style="line-height:23px;color:#0066ff" class="el-icon-arrow-right"></i>
                    </router-link>
                </div>
            </div>
            <div class="habit-container">
                <ul class="habit-list">
                    <li v-for="(item, index) in habitList " @click="changeHabitState(item)" :key="index" class="habit-item">
                        <!-- <div :class="{done: item.state == 1}" :style="habitBack(item)" ><i class="fa" :class="habitClass(item)"></i></div> -->
                        <span class="radius" :style="{background: item.backColor, color: item.color}">
                            <i v-if="item.type == 1" class="icon" :class="iconClass(item)"></i>
                            <span v-if="item.type == 0" class="icon">{{item.text}}</span>
                        </span>
                        <span style="width:100%;" class="ell">{{item.name}}</span>
                    </li>
                  
                </ul>
            </div>
        </div>

        <!--日记-->
        <div class="diary-module">
            <div class="task-header clear">
                <div @click="snail++" class="task-left clear">
                    <i style="color: #EE0000;" class="el-icon-edit-outline"></i>
                    <span class="task-title">日记</span>
                </div>
                <div class="task-right clear">
                    <router-link to="/main/diary">
                        <i style="line-height:23px;color:#EE0000" class="el-icon-arrow-right"></i>
                    </router-link>
                </div>
            </div>

            <div class='diary-container'>
                <div class="diary-left fl">
                    <span class="day">{{new Date().getDate()}}</span>
                    <br/>
                    <span class="mon">{{new Date().getMonth() + 1}}月</span>
                    <div class="diary-line"></div>
                </div>
                <div class="diary-right fl">
                    <i class="el-icon-edit"></i>
                    <span style="margin-left:10px;">记下你的此时此刻~</span>
                </div>
            </div>
        </div>

        <van-popup  v-model:show="show" position="bottom" :style="{ height: '60%' }">
            <van-picker
                ref="vanPopup"
                @cancel="show = false"
                @confirm="confirmVanPopup"
                title="标题"
                :columns="columns"
                :swipe-duration="300"
            />
        </van-popup>
    </div>

    <router-view></router-view>
</template>

<style scoped>
    .empty-text{
        margin-top: 40px;
        font-size: 20px;
        font-weight: bold;
    }
    .login-out{
        position: absolute;
        top: 9px;
        right: 20px;
        font-size: 16px;
    }
    .taskDone{
        opacity: .6;
    }
    .diary-right{
        margin-left: 46px;
        color:#AAAAAA;
        height: 100%;
        line-height: 93px;
    }
    .diary-line{
        position: absolute;
        width: 1px;
        height: 100%;
        background: #C7C7C7;
        top: 0;
        left: 46px;
    }
    .mon{
        color:#AAAAAA;
    }
    .day{
        font-weight: bold;
        font-size: 23px;
    }
    .diary-container{
        width:100%;
        height:100px;
    }
    .diary-left{
        position: relative;
        margin-top:25px;
        margin-left:26px;
    }
    .habit-item .fa{
        position: absolute;
        font-size:20px;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }
    .habit-item .radius{
        width: 50px;
        height: 50px;
        background: #ddd;
        border-radius: 50%;
        position: relative;
        text-align: center;
    }
    .habit-item div{
        width: 50px;
        height: 50px;
        position: relative;
        margin: 0 auto;
        border:1px solid #5F6368;
        border-radius: 50%;
    }
    .habit-item .done{
        border:none;
        box-shadow: 1px 1px 7px #888888;
    }
    .radius .icon{
        position: absolute;
        top: 50%;
        transform: translate(-50%,-50%);
        left: 50%;
        font-size: 27px;
    }
    .habit-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        float:left;
        width: 33%;
        height: 100px;
        line-height: 40px;
        margin-bottom: 20px;
    }
    .habit-list{
        overflow: hidden;
    }
    .habit-container{
        width:100%;
        min-height:100px;
        margin-top:22px;
    }
    .type{
        height:40px;
        color:#fff;
        background: #1A73E8;
        position: absolute;
        right: 0;
        width: 16%;
    }
    .type span{
        font-size: 18px;
        letter-spacing: 2px;
    }

    .body-footer .icon{
        font-size: 30px;
        margin-left:15px;
    }
    .icon-record-type{
        left: 4%;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
    }
    .body-content .textarea{
        width: 94%;
        height: 63%;
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
        background: #fff;
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
        bottom: 2px;
        text-indent: 15%;
        position: absolute;
    }
    .diary-module{
        width: 94%;
        margin: 28px auto 0;
        border-radius: 10px;
        background-color: rgba(255,255,255,.9);
        margin-bottom: 10px;
        border: 1px solid #FFFFF0;
    }
    .habit-module{
        width: 94%;
        margin: 28px auto 0;
        border-radius: 10px;
        background-color: rgba(255,255,255,.9);
        margin-bottom: 10px;
        border: 1px solid #FFFFF0;
    }
    .record-module{
        width:94%;
        height:326px;
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
        width: 94%;
        margin:0 auto;
    }
    .record-item{
        height: 50px;
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
        height:269px;
        overflow: auto;
        margin-top:22px;
        margin-bottom: 10px;
    }
    .home{

        overflow: auto;
        width:100%;
        height:100%;
        position:fixed;
        background-image: linear-gradient(to bottom right,#C7C7C7,#336699,#6CA6CD);
        background-size:100% 100% !important;
    }
    .home-module{
        width:94%;
        margin: 28px auto 0;
        border-radius: 10px;
        background-color:rgba(255,255,255,.9);
        height:300px;
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
        width:16px;
        height:16px;
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
        height: 212px;
        overflow: auto;
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
import Popup from "@/views/common/popup.vue"
import { Popup as vantPopup} from 'vant';
import Headera from "@/views/common/header.vue"
import { Picker } from 'vant';
import { Toast, Dialog  } from 'vant';
import {saveData, editTaskById, delTaskById} from "@/request/task"
import {saveRecord, editRecordById, refreshRecordList, delRecordById} from "@/request/record"
import {addHabitLogs} from "@/request/habit"
export default {
    name:"home",
    components:{
        Popup,Headera,
        "van-popup":vantPopup,
        "van-picker": Picker,
    },
    created(){
        this.init()
    },
    setup() {
        // const snail = ref(1);
        // let mf = {};
        // function getPromiseWithAbort(p){
        //     let obj = {};
        //     let p1 = new Promise(function(resolve, reject){
        //         obj.abort = reject;
        //     });
        //     obj.promise = Promise.race([p, p1]);
        //     return obj;
        // }
        // watchEffect((onInvalidate)=>{
            
        //     mf = getPromiseWithAbort(new Promise((resolve)=>{
        //         setTimeout(()=>{
        //             resolve(3000)
        //         }, 2000)
        //     }));
        //     mf.promise.then(res=>{
        //         console.log(res)
        //     })
        //     console.log(snail.value)
        //     onInvalidate(()=>{
        //         mf.abort();
        //     })  
        // });

        return {
            
        };
    },
    data(){
        return {
            curPopup:"",//当前打开的popup
            taskModule:{
                isEdit:undefined, // 1 为添加 2为编辑
                type:1,
                title:"",
                content:"",
                id:"",
            },
            recordModule:{
                title:"",
                content:"",
                id:"",
                isEdit:undefined, // 1 为添加 2为编辑
            },
            show:false,
            isEdit:false,
            taskList:[],
            popupTitle:"",
            popupContent:"",
            recordList:[],
            habitList:[
                {
                    icon:"fa-quora",
                    title:"hellofa-quora",
                    background:"#3399cc",
                    state:1,//1 为已完成 0 为未完成
                },
                {
                    icon:"fa-quora",
                    title:"hellofa-quora",
                    background:"#3399cc",
                    state:0,//1 为已完成 0 为未完成
                },
                {
                    icon:"fa-quora",
                    title:"hellofa-quora",
                    background:"#3399cc",
                    state:0,//1 为已完成 0 为未完成
                },
                {
                    icon:"fa-quora",
                    title:"hellofa-quora",
                    background:"#3399cc",
                    state:1,//1 为已完成 0 为未完成
                },
                {
                    icon:"fa-quora",
                    title:"hellofa-quora",
                    background:"#3399cc",
                    state:1,//1 为已完成 0 为未完成
                },
                {
                    icon:"fa-quora",
                    title:"hellofa-quora",
                    background:"#3399cc",
                    state:0,//1 为已完成 0 为未完成
                },

            ],
            lastDiary:{
                title:"日记~1",
                date:"2021-6-10"
            },
            modal:{
               type:-1, 
            }
        }
    },
    computed:{
        taskTypeCom(){
            let type = this.taskModule.type
            let ret = "";
            if(type == 1){
                ret = "one"
            }else if(type == 2){
                ret = "two"
            }else if(type == 3){
                ret = "three"
            }
            return ret
        },
        recordTypeCom(){
            let type = this.recordModule.type
            let ret = "";
            if(type == 1){
                ret = "学习"
            }else if(type == 2){
                ret = "工作"
            }else if(type == 3){
                ret = "生活"
            }else if(type == 4){
                ret = "感悟"
            }
            return ret
        },
        habitBack(){
            return (item)=>{
                return {
                    color: item.color,
                    background : item.state == 1 ? item.background : ""
                }
            }
        },
        iconClass(){
            return (item)=>{
                if(item.type == 1){
                    let map = new Map();
                    map.set(item.icon, true);
                    return this.strMapToObj(map)
                }else{
                    return {}
                }
            }
        },
        recordIcon(){
            return (type)=>{
                console.log(type)
                switch (type){
                    case 1:
                        return "el-icon-reading"
                    case 2:
                        return "el-icon-tickets"
                    case 3:
                        return "el-icon-coffee-cup"
                    case 4:
                        return "el-icon-moon-night"

                }
            }
        }
    },
    methods:{
        init(){
            this.$http({
                url:"/init",
                method:"post",
            }).then(res=>{
                if(res.data.code == 200){
                    if(res.data.data){
                        this.taskList = res.data.data.taskList.map((item)=>{
                            return {
                                title : item.title,
                                remark : item.content,
                                state : item.state,
                                type : item.type,
                                id : item.id,
                            }
                        });

                        this.recordList = res.data.data.recordList.map((item)=>{
                            return {
                                title : item.title,
                                remark : item.content,
                                type : item.type,
                                id : item.id,
                            }
                        });

                        this.habitList = res.data.data.habitList.map((item)=>{
                            return {
                                type : item.logoType,
                                remark : item.remark,
                                icon : item.logo,
                                text : item.logo,
                                name : item.name,
                                backColor : item.backColor,
                                color : item.logoColor,
                            }
                        })
                    }
                }
            })
        },
        confirmVanPopup(){
            if(this.curPopup == "task"){
                this.taskModule.type = this.$refs.vanPopup.getValues()[0].value;
            }else{
                this.recordModule.type = this.$refs.vanPopup.getValues()[0].value;
            }
            this.show = false;
        },
        refreshTaskList(){
            this.$http({
                url:"/task/refreshTaskList",
                method:"post",
            }).then(res=>{
                if(res.data.code == 200){
                    if(res.data && res.data.data.length > 0){
                        this.taskList = res.data.data.map((item,index)=>{
                            return {
                                title : item.title,
                                remark : item.content,
                                state : item.state,
                                type : item.type,
                                id : item.id,
                            }
                        });
                    }
                    else{
                        this.taskList = [];

                    }
                }
            })
        },
        refreshRecordList(){
            refreshRecordList().then(res=>{
                if(res.data.code == 200){
                    if(res.data && res.data.data.length > 0){
                        this.recordList = res.data.data.map((item)=>{
                            return {
                                title : item.title,
                                remark : item.content,
                                type : item.type,
                                id : item.id,
                            }
                        });
                    }
                    else{
                        this.recordList = [];
                    }
                }
            })
        },
        loginOut(){
            let self = this;
            Dialog.confirm({
                title: '退出',
                message: '确定退出登录吗？',
            }).then(()=>{
                this.$http({
                    method:"post",
                    url:"/loginOut"
                }).then(res=>{
                    console.log(res)
                })
                localStorage.clear();
                this.$router.push({
                    name:"login"
                })
            })
            
        },
        changeHabitState(item){
            // let state = this.habitList[i].state;
            addHabitLogs({
                habitId: item.id,
                type: 1,
                
            }).then(res=>{
                console.log(res)
            })
        },
        strMapToObj(strMap) {
            let obj = Object.create(null);
            for (let [k,v] of strMap) {
                obj[k] = v;
            }
            return obj;
        },
        mf(){
            this.show = true
        },
        //更新任务状态
        changeTaskState(v){
            let state = undefined;
            if(v.state == 1){
                state = 2;
            }else if(v.state == 2){
                state = 1;
            }
            this.$http({
                method: "post",
                url: "/task/updateState",
                data:{
                    state: state,
                    id: v.id,
                }    
            }).then(res=>{
                if(res.data.code == 200){
                    this.refreshTaskList();
                }
            })
        },
        saveRecord(){
            if(!this.recordModule.title){
                Toast.fail("请输入标题");
                return false;
            }
            if(!this.recordModule.content){
                Toast.fail("请输入内容");
                return false;
            }
            if(this.recordModule.isEdit == 2){
                editRecordById(
                    {
                        title: this.recordModule.title,
                        content: this.recordModule.content,
                        type: this.recordModule.type,
                        id: this.recordModule.id,
                    }
                ).then(res=>{
                    if(res.data.code == 200){
                        this.refreshRecordList();
                        Toast(res.data.msg);
                    }
                })
            }else{
                saveRecord(
                    {
                        title: this.recordModule.title,
                        content: this.recordModule.content,
                        type: this.recordModule.type,
                    }
                ).then(res=>{
                    if(res.data.code == 200){
                        this.refreshRecordList();
                        Toast(res.data.msg);
                    }
                })
            }
        },
        delTask(){
            let self = this;
            Dialog.confirm({
                title: '删除',
                message: '确定删除该任务吗',
            })
            .then(() => {
                delTaskById({id : self.taskModule.id}).then(res=>{
                    if(res.data.code == 200){
                        self.$refs.popup.close();
                        self.refreshTaskList();
                        Toast(res.data.msg);
                    }
                })    
            })
            .catch(() => {                
            })
        },
        delRecord(){
            let self = this;
            Dialog.confirm({
                title: '删除',
                message: '确定删除该记录吗',
            }).then(()=>{
                delRecordById({id : self.recordModule.id}).then(res=>{
                    if(res.data.code == 200){
                        self.$refs.popup.close();
                        self.refreshRecordList();
                        Toast(res.data.msg);
                    }
                })
            })
            
        },
        saveData(){
            if(!this.taskModule.title){
                Toast.fail("请输入标题");
                return false;
            }
            if(!this.taskModule.content){
                Toast.fail("请输入内容");
                return false;
            }
            if(this.taskModule.isEdit == 2){
                editTaskById(
                    {
                        title: this.taskModule.title,
                        content: this.taskModule.content,
                        type: this.taskModule.type,
                        id: this.taskModule.id,
                    }
                ).then(res=>{
                    if(res.data.code == 200){
                        this.refreshTaskList();
                        Toast(res.data.msg);
                        //this.$refs.popup.close();
                    }
                })
            }else{ 
                saveData(
                {
                    title: this.taskModule.title,
                    content: this.taskModule.content,
                    type: this.taskModule.type,
                }).then(res=>{
                    if(res.data.code == 200){
                        this.refreshTaskList();
                        Toast(res.data.msg);
                        //this.$refs.popup.close();
                    }
                })
            }
        },
        openPopupRecord(item, isEdit){
            this.curPopup = "record";
            this.recordModule.isEdit = isEdit;
            if(item){   
                this.recordModule.id = item.id;
                this.recordModule.type = item.type;
                this.recordModule.title = item.title;
                this.recordModule.content = item.remark;
            }else{
                this.recordModule.title = "";
                this.recordModule.content = "";
                this.recordModule.type = 1;
            }
            this.columns = [
                {
                    text:"学习",
                    value:"1"
                },
                {
                    text:"工作",
                    value:"2"
                },
                {
                    text:"生活",
                    value:"3"
                },
                {
                    text:"感悟",
                    value:"4"
                },
            ]
            this.$refs.popup.open()
        },
        openPopup(item, isEdit){ // isEdit为是否为编辑
            this.curPopup = "task";
            this.taskModule.isEdit = isEdit
            if(item){   
                this.taskModule.id = item.id;
                this.taskModule.type = item.type;
                this.taskModule.title = item.title;
                this.taskModule.content = item.remark;
            }else{
                this.taskModule.title = "";
                this.taskModule.content = "";
                this.taskModule.type = 1;
            }
            this.columns = [
                {
                    text:"一天以内",
                    value:"1"
                },
                {
                    text:"两天以内",
                    value:"2"
                },
                {
                    text:"三天以内",
                    value:"3"
                },
            ]
            this.$refs.popup.open()
        }
    }
}
</script>
