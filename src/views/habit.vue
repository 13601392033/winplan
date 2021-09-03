<template>
    <div class="habit" :style="{background:'url('+back+')'}">
        <Headera>
            <span class="header-title">习惯</span>
            <span class="left-icon">
                <router-link to="/main/home">
                    <i class="el-icon-arrow-left" style="font-size: 20px;color:#fff"></i>
                </router-link>
            </span>
        </Headera>
        <Popup @on-close="onClosePopup" ref="popup" :height="'60px'" :isBack="false" :popupBodyBack="'#fff'">
            <template v-slot:header>
                <div class="popup-header">
                    <span class="ph-left">取消</span>
                    <span class="ph-title">添加习惯</span>
                    <span class="ph-right" @click="saveHabit">保存</span>
                </div>
            </template>
            <template v-slot:body style="background:#fff">
                <div class="ph-body">
                    <div class="ph-body-item">
                        <input type="text" v-model="habit.name" class="title-input" placeholder="习惯名称" />
                    </div>
                    <div class="ph-body-item">
                        <div class="item-back">
                            <span class="name-label">选择图标和背景色</span>
                            <span class="item-back-icon">
                                <span @click="changeChoice(0)" class="back-demo" :class="{opa : sureChoice != 0}" :style="{background:backColor, color : color}">{{firstText}}</span>
                                <span :style="{background:backColor, color : color}" @click="changeChoice(1)" class="back-demo" :class="{opa : sureChoice != 1}">
                                    <i class="stat-icon" :class="iconChoiceComputed"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                     <div class="ph-body-item" style="height:110px;">
                        <div class="item-excitation">写点什么激励自己吧~</div>
                        <input type="text" v-model="habit.remark" class="item-excitation-input" placeholder="永远年轻，永远热泪盈眶" />
                    </div>
                </div>
            </template>
        </Popup>
        <div class="habit-container">
            <!-- <div class="habit-statistics">
                <div class="stat-item" style="margin-left: .5%;color:#409EFF">
                    <i class="stat-icon el-icon-time"></i>
                    <span class="stat-label">进行中</span>
                    <div class="habit-num">{{ing}}</div>
                </div>
                <div class="stat-item" style="color:#909399">
                    <i class="stat-icon el-icon-circle-check"></i>
                    <span class="stat-label">已完成</span>
                    <div class="habit-num">{{succ}}</div>
                </div>
                <div class="stat-item" style="color:#F56C6C">
                    <i class="stat-icon el-icon-video-pause"></i>
                    <span class="stat-label">已暂停</span>
                    <div class="habit-num">{{stop}}</div>
                </div>
            </div> -->
            <ul class="habit-list">
                
                <li @click="jumpDetail(item)" class="list-item" v-for="(item,index) in habitList" :key="index">
                    <span class="item-ele item-icon-back">
                        <span class="radius" :style="{background: item.backColor, color: item.color}">
                            <i v-if="item.type == 1" class="icon" :class="iconClass(item)"></i>
                            <span v-if="item.type == 0" class="icon">{{item.text}}</span>
                        </span>
                    </span>
                    <span class="item-ele item-content ell">{{item.name}}</span>
                    <span class="item-ele item-days">
                        <span class="item-all-days">
                            <span class="num">{{item.days}}</span>
                            <span class="tian">天</span>
                        </span>
                        <span class="item-days-label">累计打卡</span>
                    </span>
                </li>
                <li v-show="habitList.length == 0"><p style="margin-top:28px;" class="null-text">暂无内容</p></li>
            </ul>
            
        </div>
        <i @click="openPopup" class="el-icon-plus add-position"></i>

        <!--oh my god-->
        <van-popup v-model:show="stateChoice" position="bottom" :style="{ height: '80%' }">
            <div class="back-popup">
                <div class="bp-header">
                    <span @click="stateChoice=false" style="flex:0 0 60px">取消</span>
                    <span class="bp-header-title">{{bpTitle}}</span>
                    <span @click="sureChoiceMethod" style="flex:0 0 60px">确定</span>
                </div>
                <div class="bp-content">

                    <div class="bp-icon-list" v-show="curChoice == 1">
                        <div class="bp-icon-list-header">
                            <span class="bp-choice-label">选择一个喜欢的图标~</span>
                            <span :style="{background:tempBackColor}" class="bp-choice-icon">
                                <i :class="iconChoice" :style="{color:tempColor}"></i>
                            </span>
                        </div>
                        <div>
                            <ul class="bp-icon-list-content displayBar">
                                <li @click="iconChoice = item" class="icon-list-item" v-for="(item, index) in iconConfig" :key="index">
                                    <div class="icon-item-wrapper">
                                        <i :class="item"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="bp-text-container" v-show="curChoice == 0">
                        <div class="bp-text-header">
                            <span class="bp-text-logo">文字图标</span>
                            <span :style="{background:tempBackColor, color: tempColor}" class="bp-input-text">
                                {{tempFirstText}}
                            </span>
                        </div>
                        <input maxlength="1" type="text" v-model="tempFirstText" class="bp-text-input" placeholder="输入首个文字" />
                    </div>

                    <div class="bp-back-list">
                        <div class="bp-back-list-header">
                            <div class="bp-choice-label">选择一个喜欢的背景色</div>
                        </div>
                        <ul class="bp-back-list-content displayBar">
                            <li @click="changeBack(item, index)"  class="bp-back-item" v-for="(item, index) in predefineColors" :key="index">
                                <div class="back-item-wrapper" :class="{curBack: index == isCurBack}" :style="{background: item}">

                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="bp-back-list" >
                        <div class="bp-back-list-header">
                            <div class="bp-choice-label">选择一个喜欢的图标(文字)颜色</div>
                        </div>
                        <ul class="bp-back-list-content displayBar">
                            <li @click="changeColor(item, index)"  class="bp-back-item" v-for="(item, index) in predefineColors" :key="index">
                                <div class="back-item-wrapper" :class="{curBack: index == isCurColor}" :style="{background: item}">
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </van-popup>
    </div>
</template>

<style scoped>

.item-all-days .num{
    font-size: 26px;
}
.item-all-days .tian{
    font-size: 24px;
}

.item-excitation-input{
    width:90%;
    text-indent: 1em;
    height:44px;
    border:1px solid #ddd;
    outline: none;
    border-radius: 10px;
}
.item-excitation{
    text-align: left;
    margin-left: 15px;
    height: 60px;
    line-height: 60px;
}
.bp-text-header{
    display: flex;
}
.bp-text-logo{
    flex: 1 0 100px;
    text-align: left;
    margin-left: 15px;
}
.bp-text-input{
    height: 50px;
    font-size: 18px;
    border-bottom: 1px solid #ddd;
    text-indent: 15px;
    width: 95%;
    outline: none;
    border:none;
}
.curBack{
    box-shadow: -1px 2px 9px #1a73e8;
}
.bp-back-list-content{
    margin-top:20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height: 80px;
    overflow: auto;
}
.bp-back-item{
    width:70px;
    height:40px;
    display: flex;
    justify-content: center;
}
.back-item-wrapper{
    width:33px;
    height:33px;
    border-radius:50%;
}

.bp-back-list{
    margin-top:20px;
}
.icon-list-item{
    width:20%;
    height:40px;
    display: flex;
    justify-content: center;
    padding:10px 0px;
}
.bp-icon-list-content{
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height:126px;
    overflow: auto;
}
.displayBar::-webkit-scrollbar {display:none}
.icon-item-wrapper{
    width:43px;
    height:43px;
    background: rgba(235,235,235,.5);
    border-radius:50%;
    position: relative;
}
.icon-list-item i{
    position: absolute;
    color: #000;
    font-size: 26px;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
}
.bp-content{
    margin-top: 20px;
}
.bp-choice-label{
    margin-left:15px;
    flex:1;
    text-align: left;
}
.bp-icon-list-header{
    display: flex;
    align-items: center;
}
.bp-input-text{
    text-align: right;
    margin-right: 15px;
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    width: 50px;
    height: 50px;
    background: #1A73E8;
    border-radius: 50%;
}
.bp-choice-icon{
    text-align: right;
    margin-right: 15px;
    font-size: 30px;
    width: 45px;
    height: 45px;
    background: #1A73E8;
    border-radius: 50%;
    position: relative;
}
.bp-choice-icon i{
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.bp-header{
    display: flex;
    height: 50px;
    line-height: 50px;
}
.bp-header-title{
    flex:1;
    font-size: 18px;
}
.item-back-icon{
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    margin-right: 10px;
}
.opa{
    opacity: .3;
}
.back-demo{
    background: #1A73E8;
    color:#fff;
    margin-left:10px;
    width:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height:40px;
    border-radius:50%;
}
.name-label{
    font-size: 18px;
    flex: 0 0 170px;
    text-align: left;
    text-indent: 16px;
}
.item-back{
    display: flex;
    align-items: center;
    height:100%;
}
.title-input{
    width:100%;
    height:60px;
    outline: none;
    border: none;
    text-indent: 16px;
    font-size: 20px;
}
.ph-body-item{
    position: relative;
    width:100%;
    height:60px;
}
.ph-body{
    background: #fff;
}
.popup-header{
    height:60px;
    background: #fff;
    line-height:60px;
    display: flex;
}
.ph-left{
    flex:0 0 70px;
}
.ph-right{
    flex:0 0 70px;
    color: #1A73E8;
    letter-spacing: 2px;
}
.ph-title{
    flex: 1;
    font-size: 28px;
    font-weight: 600;
    font-family: cursive;
}

/**习惯组件css样式start**/
.add-position{
    bottom: 63px;
    color: #fff;
    right: 25px;
    border-radius: 50%;
    background: #409EFF;
    background: #FA8072;
    font-size: 33px;
    padding: 6px;
    font-weight: bold;
}

.item-icon-back .icon{
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    left: 50%;
    font-size: 27px;
}

.item-days-label{
    color:#909399;
    font-size: 12px;
}

.item-days{
    line-height: 24px;
    margin-right:10px;
    letter-spacing: 1px;
}
.item-all-days{
    display: block;
    margin-top: 8px;
    font-size: 24px;
}
.item-icon-back{
    position: relative;
    align-items: center;
    flex:0 0 100px;
    display: flex;
    justify-content: center;
}
.item-icon-back .radius{
    width: 50px;
    height: 50px;
    background: #ddd;
    border-radius: 50%;
}
.item-content{
    flex:1;
    text-align: left;
}
.stat-label{
    font-size: 16px;
}
.habit-num{
    font-size:24px;
}
.stat-icon{
    font-size:18px;
}
.list-item{
    border-radius: 10px;
    width: 94%;
    margin-left: 3%;
    display: flex;
    align-items:center;
    margin-bottom: 22px;
    height: 87px;
    line-height: 70px;
    background: #fff;
}
.stat-item{
    color:#7a7e83;
    float:left;
    width:33%;
}


.habit-statistics{
    overflow: hidden;
    padding: 20px 0;
}
.habit-list{
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
}
.habit{
    position:fixed;
    width:100%;
    height:100%;
    background-size: 100% 100% !important;
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
import Popup from "@/views/common/popup.vue"
import { Popup as vantPopup} from 'vant';
import {queryHabitList, saveHabit} from '@/request/habit'
import { Toast } from 'vant';
import {iconConfig, colorConfig} from "@/config/icon.js"
export default {
    name : "habit",
    components:{
        Headera,
        Popup,
        "van-popup":vantPopup,
    },
    created(){
        this.init()
    },
    setup(){
        
    },
    data(){
        return {
            back: localStorage.getItem("back"),
            iconConfig: iconConfig,
            firstText:'文',
            iconChoice:"el-icon-time", // 选择icon
            bpTitle:"", // 第二层弹出框标题
            isCurBack:undefined, 
            isCurColor:undefined,
            tempFirstText:"文",
            habit:{
                name:"",
                remark:"",
            },
            stateChoice:false,
            sureChoice: 1, //当前确定的logo类型
            curChoice: 1,// 0为文本 1为图标
            tempBackColor:'rgba(255, 69, 0, 0.68)',
            tempColor:"#fff",
            backColor: 'rgba(255, 69, 0, 0.68)',
            color:'#fff',
            predefineColors: colorConfig,
            //习惯组件所需
            ing:30,
            succ:24,
            stop:0,
            habitList:[]
        }
    },
    methods:{
        init(){
            queryHabitList().then(res=>{
                if(res.data.code == 200){
                    let data = res.data.data;
                    this.habitList = data.map((item)=>{
                        return {
                            id: item.id,
                            type : item.logoType,
                            remark : item.remark,
                            icon : item.logo,
                            text : item.logo,
                            name : item.name,
                            backColor : item.backColor,
                            days : item.days,
                            color : item.logoColor,
                        }
                    })
                }
            })
        },
        saveHabit(){
            if(!this.habit.name){
                Toast("请填写习惯名称！");
                return false;
            }
            saveHabit({
                name: this.habit.name,
                remark: this.habit.remark,
                logoType: this.curChoice,
                backColor: this.backColor,
                logoColor: this.color,
                logo: this.curChoice == 0 ? this.firstText : this.iconChoice,
                state: 1,
            }).then(res=>{
                if(res.data.code == 200){
                    this.init();
                    this.$refs.popup.close();
                    Toast.success("添加成功");
                }
            })
        },
        jumpDetail(v){
            this.$router.push({
                name:"habitDetail",
                query:{ habitId: v.id}
            });
        },
        sureChoiceMethod(){
            this.sureChoice = this.curChoice;
            this.backColor = this.tempBackColor;
            this.color = this.tempColor;
            this.stateChoice = false;
            if(this.sureChoice == 0){
                this.firstText = this.tempFirstText
            }
        },
        changeColor(v, i){
            this.tempColor = v
            this.isCurColor = i;
        },
        changeBack(v, i){
            this.tempBackColor = v
            this.isCurBack = i;
        },
        changeChoice(v){
            if(v == 1){
                this.bpTitle = "挑选图标和颜色";
            }else{
                this.bpTitle = "输入文字和挑选颜色";
            }
            this.curChoice = v;
            this.stateChoice = true;
        },
        openPopup(){
            document.getElementsByClassName("menu")[0].style.display = "none";
            this.$refs.popup.open();
        },
        onClosePopup(){
            document.getElementsByClassName("menu")[0].style.display = "block"
        },
        strMapToObj(strMap) {
            let obj = Object.create(null);
            for (let [k,v] of strMap) {
                obj[k] = v;
            }
            return obj;
        },
    },
    computed:{
        iconChoiceComputed(){
            let map = new Map()
            map.set(this.iconChoice, true)
            return this.strMapToObj(map)
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
        }
    }
}
</script>