<template>
    <div class="record" :style="{background:'url('+back+')'}">
        <Headera style="color:#000;">
            <span class="header-title">记录</span>
            <span class="left-icon">
                <router-link to="/main/home">
                    <i class="el-icon-arrow-left" style="font-size: 20px;color:#7a7e83"></i>
                </router-link>
            </span>
        </Headera>
        <Popup ref="popup">
            <template v-slot:body>
                <div class="body-title">
                    <div class="title-left fl">
                        {{recordType(popup.type)}}
                    </div>
                    
                    <div class="title-right fl" style="width:66%">
                        <input v-model="popup.title" type="text"/>
                    </div>
                    <div class="popup-type" @click="showTypeCol" ><i class="icon-record-type" style="right: 0;" :class="[recordIcon(popup.type)]"></i></div>
                </div>
                <div class="body-content">
                    <textarea class="textarea" placeholder="记录些什么吧~" v-model="popup.content"></textarea>
                </div>
                <div class="body-footer">
                    <i @click="saveRecord" style="color:#FFC125" class="el-icon-success icon"></i>
                    <i @click="delRecord" v-show="popup.isEdit" style="color: rgba(255,76,65,.9);" class="el-icon-delete-solid icon"></i>
                    <i @click="$refs.popup.close()" style="color:#B5B5B5" class="el-icon-error icon"></i>
                </div>
            </template>
        </Popup>

        <div class="record-container">
            <div class="record-nav">
                <ul class="nav-list">
                    <li :class="{active: index == curIndex}" @click="queryList(item, index)" class="nav-list-item" v-for="(item,index) in navList" :key="index">
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <ul class="record-list">
                <li v-for="(item,i) in recordList" :key="i" class="record-item" @click="openPopup(item, true)">
                    <div class="record-contain">
                        <i class="icon-record-type" :class="[recordIcon(item.type)]"></i>
                        <div class="record-content ell">{{item.title}}</div>
                        <div class="detail ell">{{item.remark}}</div>
                    </div>
                </li>
                <refresh :on-infinite-load="onInfiniteLoad"
                        :parent-pull-up-state="pages.pullUpState">
                </refresh>
            </ul>
            <i @click="openPopup(null, false)" class="el-icon-plus add-position"></i>
        </div>

        <van-popup v-model:show="stateTypeCol" position="bottom" :style="{ height: '60%' }">
            <van-picker
                ref="typePicker"
                title="标题"
                @cancel="stateTypeCol = false"
                @confirm="confirmVanPopup"
                :columns="columns"
                :swipe-duration="300"
            />
        </van-popup>
    </div>
</template>

<style scoped>
.add-position{
    position:fixed;
    bottom: 20px;
    color: #fff;
    right: 23px;
    border-radius: 50%;
    background:#4682B4;
    font-size: 40px;
    padding: 6px;
    font-weight: bold;
    background-image: linear-gradient(to bottom right,#d3f5f4,#6CA6CD,#4682B4);
}

.popup-type{
    height:40px;
    color:#fff;
    background: #1A73E8;
    position: absolute;
    right: 0;
    width: 14%;
}
.body-content .textarea{
    width: 96%;
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
.body-title{
    width:100%;
    height:40px;
    line-height:40px;
}
.body-content{
    width:100%;
    flex:1;
    background: #fff;
}
.body-footer{
    background: #fff;
    bottom: 0px;
    width: 100%;
    padding: 10px 0;
    height:30px;   
}
.icon-record-type{
    left: 4%;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
}
.detail{
    float: left;
    width: 100%;
    font-size: 12px;
    line-height: 22px;
    text-align: left;
    bottom: 2px;
    text-indent: 15%;
    letter-spacing: 1px;
    position: absolute;
}
.record-contain{
    border-bottom: 1px solid #ddd;
    position: relative;
    height: 100%;
    width: 94%;
    margin:0 auto;
}
.record-item{
    height: 60px;
    position: relative;
    line-height: 40px;
}
.record-content{
    width: 100%;
    text-indent: 15%;
    font-weight: bold;
    float: left;
    font-size: 16px;
    text-align: left;
    line-height: 46px;
}
.record-list{
    margin-top:22px;
    margin-bottom: 10px;
    position: fixed;
    overflow: auto;
    left: 3%;
    right: 3%;
    top: 132px;
    bottom: 20px;
}
.active{
    background: #0099ff;
    color:#fff;
}
.nav-list{
    white-space: nowrap;
    height:40px;
    scrollbar-width: none;
    line-height: 40px;
    overflow: scroll;
    margin: 0 20px;
}
.nav-list::-webkit-scrollbar {
    display:none;
}

.nav-list-item{
    display: inline-block;
    padding:0 10px;
    border-radius: 50%;
    margin-right:10px;
}
.record-nav{
    padding-top: 20px;
}
.record-nav::after{
    content:"";
    clear: both;
    display: block;
}
.record-container{
    width:94%;
    border: 1px solid transparent;
    margin:0 auto;
    background: #fff;
    border-radius: 10px;
    position: fixed;
    top: 70px;
    left: 3%;
    right: 3%;
    bottom: 20px;
}
.header-title{
    color:#fff;
}
.record{
    background-image: linear-gradient(to bottom right,#FFFAF0,#FFF0F5);
    background-image: linear-gradient(to bottom right,#C7C7C7,#336699,#6CA6CD);
    position: fixed;
    overflow: auto;
    width: 100%;
    height: 100%;
    overflow:hidden;
    background-size:100% 100% !important;
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
import Popup from "@/views/common/popup.vue"
import { Popup as vantPopup, Toast, Dialog} from 'vant';
import { Picker } from 'vant';
import refresh from "@/views/common/refresh"
import {queryRecordList, saveRecord, editRecordById, delRecordById} from "@/request/record.js"
export default {
    components:{
        Headera,
        Popup,
        "van-picker":Picker,
        "van-popup":vantPopup,
        refresh,
    },
    created(){
        this.init();
    },
    setup(){
        const columns = [
            {text: "学习", value: 1},
            {text: "工作", value: 2},
            {text: "生活", value: 3},
            {text: "感悟", value: 4},
        ];
        return {
            columns,
        }
    },
    data(){
        return {
            back: localStorage.getItem("back"),
            pages:{
                pageNo: 1,
                pageSize: 10,
                pullUpState:0,
                total:0,
            },
            popup:{
                title:"",
                content:"",
                isEdit:false,
                type:1, //1==学习 2==工作 3==生活 4==感悟
                icon:"",
                typeId:"",
            },
            navList:[
                {
                    name:"全部",
                    value: 0,
                },
                {
                    name:"学习",
                    value: 1,
                },
                {
                    name:"工作",
                    value: 2,
                },
                {
                    name:"生活",
                    value: 3,
                },
                {
                    name:"感悟",
                    value: 4,
                },
            ],
            recordList:[],
            curIndex:0,
            stateTypeCol: false,
        }
    },
    computed:{
        recordType(){
            return (type)=>{
                switch (type){
                    case 1:
                        return "学习"
                    case 2:
                        return "工作"
                    case 3:
                        return "生活"
                    case 4:
                        return "感悟"
                }
            }
        },
        recordIcon(){
            return (type)=>{
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
        async onInfiniteLoad(done){
            this.pages.pageNo ++;            
            this.pages.pullUpState = 2;
            await this.queryListData();
            done()
        },
        getPullUpMoreData(){
            if(this.pages.total > (this.pages.pageNo * this.pages.pageSize)){
                this.pages.pullUpState = 1;
            }else{
                this.pages.pullUpState = 3;
            }
        },
        delRecord(){
            let self = this;
            Dialog.confirm({
                title: '删除',
                message: '确定删除该记录吗？',
            }).then(()=>{
                delRecordById({
                    id: self.popup.id
                }).then(res=>{
                    if(res.data.code == 200){
                        self.$refs.popup.close();
                        self.refresh();
                        Toast(res.data.msg)
                    }
                })    
            })
            
        },
        confirmVanPopup(){
            this.popup.type = this.$refs.typePicker.getValues()[0].value;
            this.stateTypeCol = false;
        },
        init(){
            this.queryListData();
        },
        refresh(){
            this.pages.pageNo = 1;
            this.recordList = [];
            this.queryListData();
        },
        queryListData(){
            queryRecordList({
                pageNo: this.pages.pageNo,
                pageSize: this.pages.pageSize,
                type: this.curIndex,
            }).then(res=>{
                if(res.data.code == 200){
                    this.recordList = this.recordList.concat(res.data.data.map((item)=>{
                        return {
                            title : item.title,
                            remark : item.content,
                            type : item.type,
                            id : item.id,
                        }
                    }));
                    this.pages.total = res.data.total;
                    if(this.pages.total == 0 || this.pages.total <= this.pages.pageSize){
                        this.pages.pullUpState = 0
                    }else{
                        this.pages.pullUpState = 1
                        this.getPullUpMoreData()
                    }
                }
            })
        },
        saveRecord(){
            if(this.popup.isEdit){
                editRecordById({
                    id: this.popup.id,
                    title: this.popup.title,
                    content: this.popup.content,
                    type: this.popup.type,
                }).then(res=>{
                    if(res.data.code == 200){
                        Toast(res.data.msg)
                        this.refresh();
                    }else{
                        Toast.fail("修改失败")
                    }
                })
            }else{
                saveRecord({
                    title: this.popup.title,
                    content: this.popup.content,
                    type: this.popup.type,
                }).then(res=>{
                    if(res.data.code == 200){
                        Toast(res.data.msg)
                        this.refresh();
                    }else{
                        Toast.fail("添加失败")
                    }
                })
            }
        },
        openPopup(item, isEdit){
            this.popup.isEdit = isEdit;
            if(!isEdit){
                this.popup.id = "";
                this.popup.title = "";
                this.popup.content = "";
                this.popup.type = 1;
            }else{
                this.popup.id = item.id;
                this.popup.title = item.title;
                this.popup.content = item.remark;
                this.popup.type = item.type;
            }
            
            this.$refs.popup.open();
        },
        queryList(item, index){
            this.curIndex = item.value;
            this.refresh();

        },
        showTypeCol(){
            this.stateTypeCol = true;
        },
    }
}
</script>

