<template>
    <div class="habit-detail">
        <Headera style="color:#000;border-bottom:1px solid #fff;">
            <span class="header-title">习惯详情</span>
            <span class="left-icon">
                <router-link to="/main/habit">
                    <i class="el-icon-back"></i>
                </router-link>
            </span>
            <span class="right-icon"><i @click="showOper" class="el-icon-more"></i></span>
        </Headera>
        <div class="detail-content">
            <div class="detail-item">
                <div class="item-label" style="font-size:20px;">{{detail.name}}</div>
                <div class="item-value">
                    <div class="radius-wrapper" :style="{background: detail.background, color: detail.color}">
                        <i v-if="detail.type == 1" :class="iconComputed"></i>
                        <span v-else>{{detail.text}}</span>
                    </div>
                </div>
            </div>
            <div class="detail-item">
                <div class="item-content">
                    <i class="el-icon-wind-power"></i>
                    <span class="hold-label">当前已经连续坚持</span>
                    <span class="days"><span style="font-size: 24px;font-weight: bold;">{{detail.days}}</span>天</span>
                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">开始日期</div>
                <div class="item-value">
                    <div class="">
                        {{detail.startDate}}
                    </div>
                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">实际打卡</div>
                <div class="item-value">
                    <div class="">
                        {{detail.allDays}}天
                    </div>
                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">最长连续天数</div>
                <div class="item-value">
                    <div class="">
                        {{detail.bestLongDays}}天
                    </div>
                </div>
            </div>
            
        </div>
        <van-popup @close="closeVanPopup" v-model:show="stateOper" position="bottom" :style="{ height: '200px' }">
            <div class="detail-oper">
                <div class="oper-item" @click="editHabit">
                    <i class="icon-left el-icon-edit"></i>
                    <span class="oper-item-text">编辑</span>
                    <i class="icon-right el-icon-arrow-right"></i>
                </div>
                <div class="oper-item">
                    <i class="icon-left el-icon-video-pause"></i>
                    <span class="oper-item-text">暂停</span>
                    <i class="icon-right el-icon-arrow-right"></i>
                </div>
                <div class="oper-item">
                    <i class="icon-left el-icon-delete"></i>
                    <span class="oper-item-text">删除</span>
                    <i class="icon-right el-icon-arrow-right"></i>
                </div>
            </div>
        </van-popup>
        <Popup @on-close="onClosePopup" ref="popup" :height="'60px'" :isBack="false" :popupBodyBack="'#fff'">
            <template v-slot:header>
                <div class="popup-header">
                    <span class="ph-left">取消</span>
                    <span class="ph-title">编辑习惯</span>
                    <span class="ph-right">保存</span>
                </div>
            </template>
            <template v-slot:body style="background:#fff">
                <div class="ph-body">
                    <div class="ph-body-item">
                        <input type="text" class="title-input" placeholder="习惯名称" />
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
                        <input type="text" class="item-excitation-input" placeholder="永远年轻，永远热泪盈眶" />
                    </div>
                </div>
            </template>
        </Popup>
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
                                <i :class="{iconChoice:true}" class="el-icon-time" :style="{color:tempColor}"></i>
                            </span>
                        </div>
                        <div>
                            <ul class="bp-icon-list-content displayBar">
                                <li class="icon-list-item" v-for="(item, index) in 100" :key="index">
                                    <div class="icon-item-wrapper">
                                        <i class="el-icon-time"></i>
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

<script>
import Headera from "@/views/common/header.vue"
import { reactive } from '@vue/reactivity'
import { Popup as vantPopup} from 'vant';
import Popup from "@/views/common/popup.vue"
export default {
    name:"habitDetail",
    components:{
        Popup,
        Headera,
        "van-popup":vantPopup,
    },
    setup(){
        let detail = {
            name:"停止胡思乱想",
            type:"0", // 0为文字 1为图标
            icon:"el-icon-time",
            text:"文",
            background:"#12da31",
            color:"#fff",
            days:"1",// 当前连续坚持天数
            allDays:"9",//总共天数
            bestLongDays: '4',//最长连续天数
            startDate: '2020/04/13'
        }
        const columns = ['编辑', '暂停', '取消'];
        return reactive({
            detail,
            columns,
        })
    },
    data(){
        return {
            firstText:'文',
            iconChoice:"el-icon-time", // 选择icon
            bpTitle:"", // 第二层弹出框标题
            isCurBack:undefined, 
            isCurColor:undefined,
            tempFirstText:"文",
            stateChoice:false,
            sureChoice: 1, //当前确定的logo类型
            curChoice: 1,// 0为文本 1为图标
            tempBackColor:'rgba(255, 69, 0, 0.68)',
            tempColor:"#fff",
            backColor: 'rgba(255, 69, 0, 0.68)',
            color:'#fff',
            stateOper : false,
            predefineColors: [
            '#ff4500',
            '#ff8c00',
            '#ffd700',
            '#90ee90',
            '#00ced1',
            '#1e90ff',
            '#c71585',
            'rgba(255, 69, 0, 0.68)',
            'rgb(255, 120, 0)',
            '#c7158577',
            '#ff4c41',
            '#336699',
            '#ffffcc',
            '#000'
            ],
        }
    },
    methods:{
        editHabit(){
            this.stateOper = false;
            this.$refs.popup.open();
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
        closeVanPopup(){
            document.getElementsByClassName("menu")[0].style.display = "block";
        },
        strMapToObj(strMap) {
            let obj = Object.create(null);
            for (let [k,v] of strMap) {
                obj[k] = v;
            }
            return obj;
        },
        showOper(){
            document.getElementsByClassName("menu")[0].style.display = "none";
            this.stateOper = true;
        }
    },
    computed:{
        iconComputed(){
            let map = new Map()
            map.set(this.detail.icon, true)
            return this.strMapToObj(map)
        },
        iconChoiceComputed(){
            let map = new Map()
            map.set(this.iconChoice, true)
            return this.strMapToObj(map)
        },
    }
    
}
</script>

<style scoped>
.oper-item .oper-item-text{
    flex: 1;
    text-align: left;
}
.oper-item .icon-left{
    flex: 0 0 30px;
    margin-left: 10px;
}
.oper-item .icon-right{
    flex: 0 0 50px;
}
.detail-oper{
    display: flex;
    flex-direction: column;
}
.oper-item{
    align-items: center;
    justify-content: center;
    width:100%;
    height:60px;
    display: flex;
    align-items: center;
}
.item-content .hold-label{
    text-align: left;
    display: inline-block;
    flex:1;
    margin-left: 2%;
}
.item-content .days{
    flex: 0 0 100px;
}
.item-content{
    flex: 0 0 90%;
    background: rgba(51,153,204,.5);
    margin-left: 5%;
    border-radius: 33px;
    display: flex;
    height: 100%;
    align-items: center;
}
.el-icon-wind-power{
    margin-left: 6%;
    font-size: 28px;
    color:#666666;
}
.radius-wrapper{
    width:50px;
    height:50px;
    border-radius: 50%;
    position: relative;
    display: inline-block;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
}
.radius-wrapper i{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.detail-item{
    width:100%;
    display: flex;
    height:60px;
    align-items: center;
    margin-bottom: 10px;
}
.item-label{
    flex: 1 1 50%;
    text-align: left;
    text-indent: 20px;
    line-height: 50px;
    font-size: 16px;
}
.item-value{
    flex:1 1 50%;
    text-align: right;
    margin-right: 20px;
}
.right-icon{
    position: absolute;
    right: 20px;
    top: 50%;
    font-size: 24px;
    transform: translateY(-50%);
}
.el-icon-back{
    font-size: 24px;
    color:#000;
    font-weight: bold;
}
.left-icon{
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
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
    line-height:60px;
    background: #fff;
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
</style>