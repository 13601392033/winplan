<template>
    <div class="task" :style="{background:'url('+back+')'}">
        <Headera style="color:#000;border-bottom:1px solid #fff;margin-bottom: 23px;">
            <span class="header-title">任务</span>
            <span class="left-icon">
                <router-link to="/main/home">
                    <i class="el-icon-arrow-left" style="font-size: 20px;color:#FAFAFA"></i>
                </router-link>
            </span>
        </Headera>
         
        <Popup ref="popup">
            <template v-slot:body>
                <div class="body-title">
                    <div class="title-left fl">
                        <i class="el-icon-pie-chart"></i>
                    </div>
                    
                    <div class="title-right fl" style="width:66%">
                        <input v-model="popup.title" type="text"/>
                    </div>
                    <div class="popup-type" @click="showTypeCol" >{{taskTypeCom}}</div>
                </div>
                <div class="body-content">
                    <textarea class="textarea" placeholder="定个任务呗~" v-model="popup.content"></textarea>
                </div>
                <div class="body-footer">
                    <i @click="saveData" style="color:#FFC125" class="el-icon-success icon"></i>
                    <i @click="delTask" v-show="popup.isEdit==2" style="color: rgba(255,76,65,.9);" class="el-icon-delete-solid icon"></i>
                    <i @click="$refs.popup.close()" style="color:#B5B5B5" class="el-icon-error icon"></i>
                </div>
            </template>
        </Popup>
        
        <div class="task-container">
            <!--一天以内-->
            <div class="task-item item-one">
                <div class="item-title">
                    within one day
                </div>
                <ul class="item-list">
                    <li v-show="taskOneList.length == 0"><p class="null-text">暂无内容</p></li>
                    <li  :class="{delay:item.isDelay}" v-for="(item,i) in taskOneList" :key="i" class="item-list-li">
                        <div @click="changeState(item,i)" class="check">
                            <div v-if="item.state == 1" class="single-check"></div>
                            <svg class="svg-check" v-else-if="item.state == 2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11388"><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="11389"></path></svg>
                        </div>
                        <div :class="{taskDone: item.state == 2}" @click="showPopup(item)" class="content">
                            <div class="item-content ell">{{item.title}}</div>
                            <div class="ell item-detail">{{item.detail}}</div>
                        </div>
                    </li>
                    <refresh :on-infinite-load="onInfiniteLoadOne"
                        :parent-pull-up-state="onePages.pullUpState">
                        
                    </refresh>
                </ul>
            </div>
            <!--两天以内-->
            <div class="task-item item-two">
                <div class="item-title">
                    within two days
                </div>
                <ul class="item-list">
                    <li v-show="taskTwoList.length == 0"><p class="null-text">暂无内容</p></li>
                    <li :class="{delay:item.isDelay}" v-for="(item,i) in taskTwoList" :key="i" class="item-list-li">
                        <div @click="changeState(item,i)" class="check">
                            <div v-if="item.state == 1" class="single-check"></div>
                            <svg class="svg-check" v-else-if="item.state == 2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11388"><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="11389"></path></svg>
                        </div>
                        <div :class="{taskDone: item.state == 2}" @click="showPopup(item)" class="content">
                            <div class="item-content ell">{{item.title}}</div>
                            <div class="ell item-detail">{{item.detail}}</div>
                        </div>
                    </li>
                    <refresh :on-infinite-load="onInfiniteLoadTwo"
                        :parent-pull-up-state="twoPages.pullUpState">
                        
                    </refresh>
                </ul>
            </div>
            <!--三天以内-->
            <div class="task-item item-three">
                <div class="item-title">
                    within three days
                </div>
                <ul class="item-list">
                    <li v-show="taskThreeList.length == 0"><p class="null-text">暂无内容</p></li>
                    <li :class="{delay:item.isDelay}" v-for="(item,i) in taskThreeList" :key="i" class="item-list-li">
                        <div @click="changeState(item,i)" class="check">
                            <div v-if="item.state == 1" class="single-check"></div>
                            <svg class="svg-check" v-else-if="item.state == 2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11388"><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="11389"></path></svg>
                        </div>
                        <div :class="{taskDone: item.state == 2}" @click="showPopup(item)" class="content">
                            <div class="item-content ell">{{item.title}}</div>
                            <div class="ell item-detail">{{item.detail}}</div>
                        </div>
                    </li>
                    <refresh :on-infinite-load="onInfiniteLoadThree"
                        :parent-pull-up-state="threePages.pullUpState">
                        
                    </refresh>
                </ul>
            </div>
            <i @click="openPopup" class="el-icon-plus add-position"></i>
        </div>
       
        <van-popup v-model:show="stateTypeCol" position="bottom" :style="{ height: '60%' }">
            <van-picker
                ref="vantPopupTask"
                @cancel="stateTypeCol = false"
                @confirm="confirmVanPopup"
                title="标题"
                :columns="columns"
                :swipe-duration="300"
            />
        </van-popup>
    </div>
</template>

<style scoped>
.taskDone{
    opacity: .6;
}

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

.content{
    width: 80%;
    height: 100%;
    margin-left: 15%;
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
    flex: 1;
    background: #fff;
}
.body-footer{
    background: #fff;
    bottom: 0px;
    width: 100%;
    padding: 10px 0;
    height:30px;   
}
.delay{
    background: rgb(241, 147, 156);
    color: #fff;
}
.svg-check{
    font-size:24px;
    color:#0066ff;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    fill: currentColor;
    overflow: hidden;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
}
.check{
    height:55px;
    width: 15%;
    position: relative;
    float:left;
    position: relative;
}
.single-check{
    top: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    left: 50%;
    width:16px;
    height:16px;
    border-radius: 50%;
    border:1px solid #0066ff;
    display: inline-block;
}
.item-detail{
    text-align: left;
    position: absolute;
    bottom: 0;
    letter-spacing: 1px;
    line-height: 26px;
    left: 15%;
    width: 80%;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
}
.item-content{
    text-align: left;
    font-size: 17px;
    line-height: 41px;
}
.item-list{
    height: 305px;
    margin-top: 15px;
    overflow: auto;
}
.item-list-li{
    position: relative;
    height:60px;
}
.item-title{
    color: #fff;
    background-image:linear-gradient(to bottom right,#4682B4,#6CA6CD,#4682B4);
    height: 50px;
    line-height: 50px;
    font-size: 20px;
}
.header-title{
    color:#FAFAFA;
}
.task-container{
    margin: 0 35px;
    margin-top: 10px;
}
.task-container .task-item{
    position: relative;
    line-height: 34px;
    border-radius: 5px;
    padding-bottom: 20px;
    width: 100%;
    overflow: hidden;
    background: #fff;
    margin-bottom:35px;
    
}

.task{
    background: rgb(122, 115, 116);
    background-image: linear-gradient(to bottom right,#C7C7C7,#336699,#80d6c9);
    position: fixed;
    overflow-x:hidden;
    overflow: auto;
    background-size:100% 100% !important;
    width: 100%;
    height: 100%;
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
import refresh from "@/views/common/refresh"
import {saveData, editTaskById, delTaskById} from "@/request/task"
import {queryAllTasks, queryTasksByType} from "@/request/task"
import { Toast , Dialog } from 'vant';
export default {
    name:"task",
    components:{
        Headera,
        Popup,
        "van-picker":Picker,
        "van-popup":vantPopup,
        refresh
    },
    created(){
        this.init();
    },
    setup(){
        const columns = [
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
        ];
        return {
            columns,
        };
    },
    data(){
        return{
            back: localStorage.getItem("back"),
            onePages:{
                pageSize: 20,
                pageNo: 1,
                pullUpState:2,
            },
            twoPages:{
                pageSize: 20,
                pageNo: 1,
                pullUpState:2,
            },
            threePages:{
                pageSize: 20,
                pageNo: 1,
                pullUpState:2,
            },
            stateTypeCol:false,
            popup:{
                id:"",
                title:"",
                content:"",
                type:1,
                icon:"",
                typeId:"",
                isEdit:1,//1 == 添加 2 == 修改
            },
            taskOneList:[],
            taskTwoList:[],
            taskThreeList:[],
            oneDay: 1000 * 60 * 60 * 24,
        }
    },
    methods:{
        filterIsDelay(v){
            if(v.state == 2){
                return false;
            }
            let date = new Date().getTime();
            let vd = v.date;
            if(v.type == 2){
                vd += this.oneDay * 2
            }else if(v.type == 3){
                vd += this.oneDay * 3
            }else if(v.type == 1){
                vd += this.oneDay
            }
            return vd < date;
        },
        delTask(){
            let self = this;
            Dialog.confirm({
                title: '删除',
                message: '确定删除该任务吗',
            })
            .then(() => {
                delTaskById({id : self.popup.id}).then(res=>{
                    if(res.data.code == 200){
                        self.$refs.popup.close();
                        Toast(res.data.msg);
                        this.refreshList()
                    }
                })    
            })
            .catch(() => {
            })
        },
        refreshList(){
            let type = parseInt(this.popup.type);
            let pages = this.onePages;
            let pagesStr = "onePages";
            let list = "taskOneList";
            if(type == 2){
                pages = this.twoPages;
                list = "taskTwoList";
                pagesStr = "twoPages";
            }else if(type == 3){
                pages = this.threePages;
                list = "taskThreeList";
                pagesStr = "threePages";
            }
            pages.pageNo = 1;
            queryTasksByType({
                pageSize: pages.pageSize,
                type: type,
                pageNo: pages.pageNo
            }).then(res=>{
                if(res.data.code == 200){
                    let d = res.data.data.map((item)=>{
                        return {
                            title : item.title,
                            detail : item.content,
                            state : item.state,
                            type : item.type,
                            id : item.id,
                            isDelay: this.filterIsDelay(item)
                        }
                    })
                    this[list] = d;
                    this[pagesStr].total = res.data.total;
                }
                this.initBranch(list, pagesStr);
            })
        },
        saveData(){
            if(!this.popup.title){
                Toast.fail("请输入标题");
                return false;
            }
            if(!this.popup.content){
                Toast.fail("请输入内容");
                return false;
            }
            if(this.popup.isEdit == 2){
                editTaskById(
                    {
                        title: this.popup.title,
                        content: this.popup.content,
                        type: this.popup.type,
                        id: this.popup.id,
                    }
                ).then(res=>{
                    if(res.data.code == 200){
                        this.refreshList();
                        Toast(res.data.msg);
                    }
                })
            }else{ 
                saveData(
                {
                    title: this.popup.title,
                    content: this.popup.content,
                    type: this.popup.type,
                }).then(res=>{
                    if(res.data.code == 200){
                        this.refreshList();
                        Toast(res.data.msg);
                        
                    }
                })
            }
        },
        openPopup(){
            this.popup.title = "";
            this.popup.content = "";
            this.popup.type = 1;
            this.popup.isEdit = 1;
            this.$refs.popup.open();
        },
        confirmVanPopup(){
            this.popup.type = this.$refs.vantPopupTask.getValues()[0].value;
            this.stateTypeCol = false;
        },
        init(){
            queryAllTasks({
                pageSize: this.onePages.pageSize,
                pageNo: this.onePages.pageNo,
            }).then(res=>{
                if(res.data.code == 200){
                    let data = res.data.data;
                    data.forEach(item => {
                        let obj = {
                            title : item.title,
                            detail : item.content,
                            state : item.state,
                            type : item.type,
                            id : item.id,
                            isDelay: this.filterIsDelay(item)
                        }
                        if(item.type == 1){
                            this.taskOneList.push(obj)
                        }else if(item.type == 2){
                            this.taskTwoList.push(obj)
                        }else if(item.type == 3){
                            this.taskThreeList.push(obj)
                        }
                    });
                    let oneTotal = 0;
                    let twoTotal = 0;
                    let threeTotal = 0;
                    res.data.total.forEach(item=>{
                        if(item._id == 1){
                            oneTotal = item.total
                        }
                        if(item._id == 2){
                            twoTotal = item.total
                        }
                        if(item._id == 3){
                            threeTotal = item.total
                        }
                    })
                    this.onePages.total = oneTotal;
                    this.twoPages.total = twoTotal;
                    this.threePages.total = threeTotal;
                    this.initBranch("taskOneList", "onePages");
                    this.initBranch("taskTwoList", "twoPages");
                    this.initBranch("taskThreeList", "threePages");
                }
            })
        },
        initBranch(list, pages){
            if(this[list].length == 0){
                this[pages].pullUpState = 0    
            }else{
                this[pages].pullUpState = 1
            }
            if(this[pages].total <= this[pages].pageSize){
                this[pages].pullUpState = 0
            }
        },
        queryTasksByPage(pages, type, list, done){
            queryTasksByType({
                pageSize: pages.pageSize,
                type: type,
                pageNo: pages.pageNo
            }).then(res=>{
                if(res.data.code == 200){
                    let d = res.data.data.map((item)=>{
                        return {
                            title : item.title,
                            remark : item.content,
                            state : item.state,
                            type : item.type,
                            id : item.id,
                        }
                    })
                    this[list] = this[list].concat(d)
                }
                if (pages.pullUpState === 1) {
                    this.getPullUpMoreData(pages)
                }
                done()
            })
        },
        onInfiniteLoadOne (done) {
            this.onePages.pageNo ++;
            this.queryTasksByPage(this.onePages, 1, "taskOneList", done);
        },
        onInfiniteLoadTwo (done) {
            this.twoPages.pageNo ++;
            this.queryTasksByPage(this.twoPages, 2, "taskTwoList", done);
        },
        onInfiniteLoadThree (done) {
            this.threePages.pageNo ++;
            this.queryTasksByPage(this.threePages, 3, "taskThreeList", done);
        },
        getPullUpMoreData(pages){   
            if(pages.total > (pages.pageNo * pages.pageSize)){
                pages.pullUpState = 1;
            }else{
                pages.pullUpState = 3;
            }
        },
        showTypeCol(){
            this.stateTypeCol = true;
        },
        changeState(v, index){
            let state = undefined;
            this.popup.type = v.type;
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
                    this.refreshList();
                }
            })
        },
        showPopup(item){
            this.popup.id = item.id;
            this.popup.isEdit = 2;
            this.popup.type = item.type;
            this.popup.title = item.title;
            this.popup.content = item.detail;
            this.$refs.popup.open();
        }
    },
    computed:{
        taskTypeCom(){
            let type = this.popup.type
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
    }
}
</script>

