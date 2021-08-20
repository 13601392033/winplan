<template>
    <div class="habit">
        <Headera style="color: #fff;background-image: linear-gradient(to bottom right,#FFAEB9,#FA8072,#FF4040);position: fixed;
    width: 100%;
    z-index: 200;">
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
            <div class="empty-text" v-if="diaryList.length <= 0">暂无日记</div>
            <ul class="habit-list">
                <li @click="jumpModule(item)" class="list-item" v-for="(item,index) in diaryList" :key="index">
                    <div class="diary-left fl">
                        <span class="day">{{item.day}}</span>
                        <br/>
                        <span class="mon">{{item.month}}月</span>
                        
                    </div>
                    <div class="diary-line"></div>
                    <div class="diary-right fl ell">
                        
                        <span class="diary-detail">{{item.detail}}</span>
                    </div>
                </li>
                <refresh :on-infinite-load="onInfiniteLoad"
                        :parent-pull-up-state="pages.pullUpState">
                </refresh>
            </ul>
            
        </div>
        <i @click="jumpModule(null)" class="el-icon-plus add-position"></i>
    </div>
</template>

<style scoped>
.empty-text{
    margin-top: 100px;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
}
.diary-detail{
    letter-spacing: 1px;
}
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
    margin: 0 25px 0 22px;
}
.mon{
    color:#AAAAAA;
    width: 50px;
    white-space: nowrap;
}
.day{
    font-weight: bold;
    font-size: 23px;
}
.diary-left{
    flex-direction: column;
    line-height: 14px;
    align-items: center;
    margin-left: 20px;
    display: flex;
}
/**习惯组件css样式start**/
.add-position{
    bottom: 42px;
    color: #fff;
    right: 23px;
    border-radius: 50%;
    background: rgb(250, 128, 114);
    font-size: 28px;
    padding: 12px;
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
    margin-top:10px;
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
    padding-top: 10px;
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
import {queryDiaryList} from "@/request/diary"
import refresh from "@/views/common/refresh"
export default {
    name : "habit",
    components:{
        Headera,
        Popup,
        refresh,
    },
    created(){
        this.init();
    },
    data(){
        return {
            diaryList:[],
            date: new Date(),
            detail:"",
            pages:{
                pageNo: 1,
                pageSize: 20,
                pullUpState:0,
                total:0,
            },
        }
    },
    methods:{
        jumpModule(item){
            let query = {};
            if(item){
                query={
                    id: item.id,
                    incId: item.incId
                }
            }else{
                query = {};
            }
            this.$router.push({
                name: "diaryModule",
                query: query
            });
        },
        init(){
            this.queryDiaryList();
        },
        async onInfiniteLoad(done){
            this.pages.pageNo ++;
            this.pages.pullUpState = 2;
            await this.queryDiaryList();
            done()
        },
        queryDiaryList(){
            queryDiaryList({
                pageNo: this.pages.pageNo,
                pageSize: this.pages.pageSize,
            }).then(res=>{
                if(res.data.code == 200){
                    this.diaryList = this.diaryList.concat(res.data.data.map((item)=>{
                        return {
                            id : item.id,
                            detail : item.text,
                            day : new Date(item.date).getDate(),
                            month : new Date(item.date).getMonth() + 1,
                            date : item.date,
                            incId : item.incId
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
        getPullUpMoreData(){
            if(this.pages.total > (this.pages.pageNo * this.pages.pageSize)){
                this.pages.pullUpState = 1;
            }else{
                this.pages.pullUpState = 3;
            }
        },

    },
}
</script>