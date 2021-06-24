<template>
    <div class="habit">
        <Headera style="color: #fff;background-image: linear-gradient(to bottom right,#FFAEB9,#FA8072,#FF4040);">
            <span class="header-title">日记</span>
            <span class="left-icon">
                <router-link to="/main/home">
                    <i class="el-icon-arrow-left" style="font-size: 20px;color:#fff"></i>
                </router-link>
            </span>
        </Headera>
        <Popup ref="popup">
            <template v-slot:body>
                <div class="body-title">
                    <div class="title-left fl">
                        <i class="el-icon-pie-chart"></i>
                    </div>
                    
                    <div class="title-right fl" >
                        <input v-model="popupTitle" readonly type="date"/>
                    </div>
                    <div v-show="showType" class="type"><i class="el-icon-moon-night icon-record-type" style="right: 0;"></i></div>
                </div>
                <div class="body-content">
                    <textarea class="textarea" v-model="detail"></textarea>
                </div>
                <div class="body-footer">
                    <i style="color:#FFC125" class="el-icon-success icon"></i>
                    <i style="color:#B5B5B5" class="el-icon-error icon"></i>
                </div>
            </template>
        </Popup>
        <div class="habit-container">
            <ul class="habit-list">
                <li @click="jumpDetail(item)" class="list-item" v-for="(item,index) in habitList" :key="index">
                    <div class="diary-left fl">
                        <span class="day">{{item.day}}</span>
                        <br/>
                        <span class="mon">{{item.month}}月</span>
                        
                    </div>
                    <div class="diary-line"></div>
                    <div class="diary-right fl">
                        <i class="el-icon-edit"></i>
                        <span style="margin-left:10px;">记下你的此时此刻~</span>
                    </div>
                </li>
            </ul>
            
        </div>
        <i @click="openPopup" class="el-icon-plus add-position"></i>

       
    </div>
</template>

<style scoped>
.body-content .textarea{
    width: 100%;
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
.body-footer .icon{
    font-size: 30px;
    margin-left: 15px;
}
.diary-right{
    color:#AAAAAA;
    height: 100%;
    line-height: 93px;
}
.diary-line{
    width: 1px;
    height: 69%;
    background: #C7C7C7;
    top: 0;
    left: 46px;
    margin: 0 30px;
}
.mon{
    color:#AAAAAA;
}
.day{
    font-weight: bold;
    font-size: 23px;
}
.diary-left{
    flex-direction: column;
    line-height: 14px;
    align-items: center;
    margin-left: 26px;

    display: flex;
}
/**习惯组件css样式start**/
.add-position{
    font-size: 60px;
    bottom: 75px;
    color: #fff;
    right: 23px;
    border-radius: 50%;
    background: rgb(250, 128, 114);
    font-size: 40px;
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
}

.item-days{
    line-height: 24px;
    margin-right:10px;
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
    width: 96%;
    margin-left: 2%;
    display: flex;
    align-items: center;
    margin-bottom:10px;
    height: 100px;
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
    top: 71px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
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
import Popup from "@/views/common/popup.vue"
export default {
    name : "habit",
    components:{
        Headera,
        Popup
    },
    setup(){
        
    },
    data(){
        return {
            habitList:[
                {
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    date : "2020-03-16",
                    detail:"回首向来萧瑟处，归去，也无风雨也无晴",
                },
                {
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    date : "2020-03-16",
                    detail:"回首向来萧瑟处，归去，也无风雨也无晴",
                },
                {
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    date : "2020-03-16",
                    detail:"回首向来萧瑟处，归去，也无风雨也无晴",
                },
                {
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    date : "2020-03-16",
                    detail:"回首向来萧瑟处，归去，也无风雨也无晴",
                },
                {
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    date : "2020-03-16",
                    detail:"回首向来萧瑟处，归去，也无风雨也无晴",
                },

                {
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    date : "2020-03-16",
                    detail:"回首向来萧瑟处，归去，也无风雨也无晴",
                },
                {
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1,
                    date : "2020-03-16",
                    detail:"回首向来萧瑟处，归去，也无风雨也无晴",
                },
            ],
            date: new Date(),
            detail:"",
        }
    },
    methods:{
        jumpDetail(item){
            this.date = item.date;
            this.detail = item.detail;
            this.$refs.popup.open();
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
            this.date = new Date().getTime();
            this.detail = "";
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