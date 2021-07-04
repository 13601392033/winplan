<template>
    <div class="task">
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
        
        <div class="task-container">
            <!--一天以内-->
            <div class="task-item item-one">
                <div class="item-title">
                    within one day
                </div>
                <ul class="item-list">
                    <li  :class="{delay:item.isDelay}" v-for="(item,i) in taskOneList" :key="i" class="item-list-li">
                        <div @click="changeState(item,i)" class="check">
                            <div v-if="item.state == 1" class="single-check"></div>
                            <svg class="svg-check" v-else-if="item.state == 2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11388"><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="11389"></path></svg>
                        </div>
                        <div @click="showPopup(item)" class="content">
                            <div class="item-content ell">{{item.title}}</div>
                            <div class="ell item-detail">{{item.detail}}</div>
                        </div>
                    </li>
                    <refresh :on-infinite-load="onInfiniteLoad"
        :parent-pull-up-state="pullUpState">
            
        </refresh>
                </ul>
            </div>
            <!--两天以内-->
            <div class="task-item item-two">
                <div class="item-title">
                    within two days
                </div>
                <ul class="item-list">
                    <li :class="{delay:item.isDelay}" v-for="(item,i) in taskOneList" :key="i" class="item-list-li">
                        <div @click="changeState(item,i)" class="check">
                            <div v-if="item.state == 1" class="single-check"></div>
                            <svg class="svg-check" v-else-if="item.state == 2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11388"><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="11389"></path></svg>
                        </div>
                        <div @click="showPopup(item)" class="content">
                            <div class="item-content ell">{{item.title}}</div>
                            <div class="ell item-detail">{{item.detail}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--三天以内-->
            <div class="task-item item-three">
                <div class="item-title">
                    within three days
                </div>
                <ul class="item-list">
                    <li :class="{delay:item.isDelay}" v-for="(item,i) in taskOneList" :key="i" class="item-list-li">
                        <div @click="changeState(item,i)" class="check">
                            <div v-if="item.state == 1" class="single-check"></div>
                            <svg class="svg-check" v-else-if="item.state == 2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11388"><path d="M416.832 798.08C400.64 798.08 384.512 791.872 372.16 779.52L119.424 525.76C94.784 500.992 94.784 460.8 119.424 436.032 144.128 411.264 184.128 411.264 208.768 436.032L416.832 644.928 814.4 245.76C839.04 220.928 879.04 220.928 903.744 245.76 928.384 270.528 928.384 310.656 903.744 335.424L461.504 779.52C449.152 791.872 432.96 798.08 416.832 798.08Z" p-id="11389"></path></svg>
                        </div>
                        <div @click="showPopup(item)" class="content">
                            <div class="item-content ell">{{item.title}}</div>
                            <div class="ell item-detail">{{item.detail}}</div>
                        </div>
                    </li>
                </ul>
            </div>
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
    position: absolute;
    bottom: 0;
    left: 15%;
    width: 80%;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
}
.item-content{
    text-align: left;
}
.item-list{
    height: 270px;
    margin-top: 15px;
    overflow: auto;
}
.item-list-li{
    position: relative;
    height:55px;
}
.item-title{
    color: rgb(222, 28, 49);
    color: #fff;
    background: rgb(241, 147, 156);
    background: #F56C6C;
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
    background-image: linear-gradient(to bottom right,#C7C7C7,#336699,#6CA6CD);
    position: fixed;
    overflow-x:hidden;
    overflow: auto;
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
        let self = this;
        setTimeout(()=>{
            self.pullUpState = 1
        },500)
        
    },
    setup(){
        const columns = ['生活', '工作', '学习', '感悟', 'mf'];
        return {
            columns,
        };
    },
    data(){
        return{
            stateTypeCol:false,
            pullUpState:2,
            popup:{
                title:"",
                content:"",
                type:"学习",
                icon:"",
                typeId:"",
            },
            popupTitle:"",
            test:5,
            popupContent:"",
            taskOneList:[
                {
                    title:"完成xxx事情",
                    detail:"a period of time when sb/sth has to wait because of a problem that makes sth slow or late",
                    state:1,
                    isDelay:false,
                    type:"",
                },
                {
                    title:"完成xxx事情",
                    detail:"a period of time when sb/sth has to wait because of a problem that makes sth slow or late",
                    state:1,
                    isDelay:false,
                    type:"",
                },{
                    title:"完成xxx事情",
                    detail:"a period of time when sb/sth has to wait because of a problem that makes sth slow or late",
                    state:1,
                    isDelay:false,
                    type:"",
                },{
                    title:"完成xxx事情",
                    detail:"a period of time when sb/sth has to wait because of a problem that makes sth slow or late",
                    state:1,
                    isDelay:false,
                    type:"",
                },
                {
                    title:"完成xxx事情",
                    detail:"a period of time when sb/sth has to wait because of a problem that makes sth slow or late",
                    state:1,
                    isDelay:false,
                    type:"",
                },
                {
                    title:"完成xxx事情",
                    detail:"a period of time when sb/sth has to wait because of a problem that makes sth slow or late",
                    state:1,
                    isDelay:true,
                    type:"",
                },
                {
                    title:"完成xxx事情",
                    detail:"a period of time when sb/sth has to wait because of a problem that makes sth slow or late",
                    state:1,
                    isDelay:false,
                    type:"",
                }
            ]
        }
    },
    methods:{
        onInfiniteLoad (done) {
            setTimeout(() => {
                this.taskOneList.push({
                    title:"完成xxx事情",
                    detail:"a period of time when sb/sth has to wait because of a problem that makes sth slow or late",
                    state:1,
                    isDelay:false,
                    type:"",
                },)
                if (this.pullUpState === 1) {
                this.getPullUpMoreData()
            }
            done()    
            }, 2000);
            
        },
        getPullUpMoreData(){
            if(this.test > 0){
                this.pullUpState = 1;
            }else{
                this.pullUpState = 3;
            }
            

            this.test -- 
        },
        showTypeCol(){
            this.stateTypeCol = true;
        },
        changeState(v, index){
            if(v.state == 1){
                this.taskOneList[index].state = 2;
            }else if(v.state == 2){
                this.taskOneList[index].state = 1;
            }
        },
        showPopup(item){
            this.popup.title = item.title;
            this.popup.content = item.detail;
            this.$refs.popup.open();
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
    }
}
</script>

