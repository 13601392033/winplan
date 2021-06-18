<template>
    <div class="record">
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
                        {{popup.type}}
                    </div>
                    
                    <div class="title-right fl" style="width:66%">
                        <input v-model="popup.title" type="text"/>
                    </div>
                    <div class="popup-type" @click="showTypeCol" ><i class="el-icon-moon-night icon-record-type" style="right: 0;" :class="[recordIcon(1)]"></i></div>
                </div>
                <div class="body-content">
                    <textarea class="textarea" placeholder="记录些什么吧~" v-model="popup.content"></textarea>
                </div>
                <div class="body-footer">
                    <i style="color:#FFC125" class="el-icon-success icon"></i>
                    <i style="color:#B5B5B5" class="el-icon-error icon"></i>
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
            <ul class="record-list" >
                <li v-for="(item,i) in recordList" :key="i" class="record-item" @click="openPopup(item)">
                    <div class="record-contain">
                        <i class="el-icon-moon-night icon-record-type" :class="[recordIcon(item.type)]"></i>
                        <div class="record-content ell">{{item.title}}</div>
                        <div class="detail ell">{{item.remark}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <van-popup v-model:show="stateTypeCol" position="bottom" :style="{ height: '60%' }">
            <van-picker
                title="标题"
                :columns="columns"
                :swipe-duration="300"
            />
        </van-popup>
    </div>
</template>

<style scoped>
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
.icon-record-type{
    left: 4%;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
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
import { Popup as vantPopup} from 'vant';
import { Picker } from 'vant';
export default {
    components:{
        Headera,
        Popup,
        "van-picker":Picker,
        "van-popup":vantPopup,
    },
    setup(){
        let containerHeight = window.screen.height - 221;
        let listHeight = containerHeight - 60 - 24 - 20;
        const columns = ['生活', '工作', '学习', '感悟', 'mf'];
        return {
            containerHeight,
            listHeight,
            columns,
        }
    },
    data(){
        return {
            popup:{
                title:"",
                content:"",
                type:"学习",
                icon:"",
                typeId:"",
            },
            navList:[
                {
                    name:"全部",
                },
                {
                    name:"工作",
                },
                {
                    name:"生活",
                },
                {
                    name:"感悟",
                },
                {
                    name:"健身",
                },{
                    name:"学习",
                },
                {
                    name:"工作",
                },
                {
                    name:"生活",
                },
                {
                    name:"感悟",
                },
                {
                    name:"健身",
                },
            ],
            recordList:[
                {
                    title:"hello",
                    type:1,
                    remark:"one"
                },
                {
                    title:"hello",
                    type:1,
                    remark:"one"
                },
                {
                    title:"hello",
                    type:1,
                    remark:"one"
                },
                {
                    title:"hello",
                    type:1,
                    remark:"one"
                },
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
                },
                {
                    title:"hello",
                    type:2,
                    remark:"five"
                },
                {
                    title:"hello",
                    type:2,
                    remark:"five"
                }
            ],
            curIndex:0,
            stateTypeCol: false,
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
        openPopup(item){
            this.popup.title = item.title;
            this.popup.content = item.remark;
            this.$refs.popup.open();
        },
        queryList(item, index){
            this.curIndex = index;
        },
        showTypeCol(){
            this.stateTypeCol = true;
        },
    }
}
</script>

