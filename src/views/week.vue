<template>
    <div class="week" :style="{background:'url('+back+')'}">
        <h1 v-if="isNull" style="font-size:26px;font-family:cursive;margin-top:20px;">暂无数据</h1>

        <div class="camera">
            <ul class="stage">
                <li  v-for="(item, index) in list" :key="index" >
                    <div class="box" :style="{transform: 'rotateY('+(index*45)+'deg) translateZ(310px)'}">
                        <div class="scroll">
                            <i class="el-icon-top top" @click="boxTop($event, index)"></i>
                            <i class="el-icon-bottom bottom" @click="boxBottom($event,index)"></i> 
                        </div>
                        
                        <p class="title">{{$moment(item[0]).format('dddd')}}</p>
                        <div class="module">
                            <div class="item-module" v-for="(sonItem,i) in item[1]" :key="i" :class="{'habit-container':sonItem.type==3}">

                                <div class="task-module" >
                                    <div v-if="sonItem.type == 1" :class="stateClass(sonItem)">
                                        <div class="task-title">
                                            {{sonItem.title}}
                                        </div>
                                        <div class="task-content">
                                            <span>{{sonItem.content}}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="habit-module">
                                    <div v-if="sonItem.type == 3">
                                        <div class="habit" :style="{'background': sonItem.habit[0].backColor, 'color': sonItem.habit[0].logoColor}">
                                            <div class="habit-item">
                                                <i v-if="sonItem.habit[0].logoType == 1" class="icon" :class="iconClass(sonItem.habit[0])"></i>
                                                <span v-if="sonItem.habit[0].logoType == 0" class="icon">{{sonItem.habit[0].logo}}</span>  
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="record-module" style="clear:both">
                                    <div v-if="sonItem.type == 2" class="narrow">
                                        <div class="record-title">
                                            {{sonItem.title}}
                                        </div>
                                        <div class="record-content">
                                            <span>{{sonItem.content}}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="diary-module" style="clear:both">
                                    <div v-if="sonItem.type == 4" class="narrow">
                                        <div class="record-title">
                                            {{sonItem.title}}
                                        </div>
                                        <div class="record-content">
                                            <span v-html="sonItem.content"></span>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                    
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.top{
    position: fixed;
    left:-5px;
    font-size: 20px;
}
.bottom{
    position: fixed;
    left:-5px;
    bottom:0;
    font-size: 20px;
    
}
.locking{
    overflow: auto!important;;
}
.lock{
    float:right;
}
.narrow{
    transform:scale(.9);
}
.task-succ{
    background: #66cc99;
    color: #fff;
    border-radius: 20px;
    padding:4px 10px;
}
.task-err{
    background: rgb(241, 147, 156);
    padding: 4px 10px;
    border-radius: 20px;
    color: #fff;
}
.habit{
    width:50px;
    height:50px;
    border-radius: 50%;
}
.habit-container::after{
    content:"";
    display: block;
    clear: both;
}
.habit-container{
    float: left;
    width: 45%;
    margin-right: 5%;
    margin-top:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 50px;
}
.module{
    text-align: left;
    color:#080808;
    letter-spacing: 1px;
}
.task-title{
    font-size:13px;
}
.task-module{
    margin-bottom:10px;
}
.task-content{
    font-size:12px;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.90);
}
.title{
    font-size:16px;
    letter-spacing: 2px;
}
.camera{
    width:100%;
    height:100%;
}
.stage{
    transform-style:preserve-3d;
    transform:perspective(1500px) rotateX(-5.95901deg) rotateY(0deg);
    position: relative;
    width: 223px;
    height:100%;
    display: flex;
    margin: 50px auto;
}
.box{
    position: absolute;
    border:1px solid #ddd;
    overflow: hidden;
    margin:10px;
    height:70%;
    width:235px;
    background: rgba(255,255,255,.8);
}
 .box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 3px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
   .box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
  }
  .box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 10px;
  }
.week{
    position:fixed;
    width:100%;
    height:100%;
    background-size:100% 100% !important;
}
</style>

<script>
import $ from 'jquery'
import {initWeek} from "@/request/week.js"
function throttle(fn,delay,ev){
    let valid = true
    return ()=>{
       if(!valid){
           //休息时间 暂不接客
           return false 
       }
       // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn(ev)
            valid = true;
        }, delay)
    }
}



export default {
    data(){
        return {
            list:[],
            back: require("./../assets/m4.jpg"),
            isNull:false,
            num:100,
        }
    },
    created(){
        initWeek().then(res=>{
            if(res.data.code == 200){
                this.list = res.data.data
                if(res.data.data.length == 0){
                    this.isNull = true;
                }
            }
        })
    },
    mounted(){
        this.init()
    },
    methods:{
        boxTop(e, index){
            let top;
            if(e.target.style.top){
                top = parseInt(e.target.style.top.substring(0,e.target.style.top.length-2));
            }else{
                top = 0;
            }
            if(top == 0){
                return false;
            }
            e.target.style.top = top - this.num + "px"
            let box = document.getElementsByClassName("box")[index]
            let bottom = document.getElementsByClassName("bottom")[index]
            bottom.style.bottom = this.num - top  + "px"
            box.scrollTop = top - this.num;
        },
        boxBottom(e, index){
            let bottom;
            let box = document.getElementsByClassName("box")[index]
            let top = document.getElementsByClassName('top')[index]
            if(e.target.style.bottom){
                bottom = parseInt(e.target.style.bottom.substring(0,e.target.style.bottom.length-2));
            }else{
                bottom = 0;
            }
            if(Math.abs(bottom) > $(box).children(".module")[0].offsetHeight-100){
                return false;
            }
            e.target.style.bottom = bottom - this.num + "px"
            
            top.style.top = this.num - bottom + "px"
            box.scrollTop = box.scrollTop + this.num;
        },
        init(){
            $(function () {
                var roY = 0, roX = -10;
                var xN = 0, yN = 0;
                var play = null;
                let log = 0;
                $(".week").on('touchstart', (e) =>{
                    let x_ = e.targetTouches[0].clientX;
                    let y_ = e.targetTouches[0].clientY;
                    clearInterval(play);
                    log = 0;
                    $(this).bind('touchmove',(ev) =>{
                        throttle((ev)=>{
                            log = 1;
                            /*获取当前鼠标的坐标*/
                            var x = ev.targetTouches[0].clientX;
                            var y = ev.targetTouches[0].clientY;
                            /*两次坐标之间的距离*/
                            xN = x - x_;
                            yN = y - y_;
                            
                            roY += xN * 0.2;
                            roX -= yN * 0.1;
                            $('.stage').css({
                                transform: 'perspective(1500px) rotateX('+roX+'deg) rotateY(' + roY + 'deg)'
                            });
                            /*之前的鼠标坐标*/
                            x_ = ev.targetTouches[0].clientX;
                            y_ = ev.targetTouches[0].clientY;
                        },50,ev)()
                    });
                    }).on('touchend',()=> {
                        $(this).unbind('touchmove');
                        var play = setInterval(function () {
                            xN *= 0.95;
                            yN *= 0.95
                            if (Math.abs(xN) < 1 && Math.abs(yN) < 1) {
                                clearInterval(play);
                            }
                            roY += xN * 0.2;
                            roX -= yN * 0.1;
                            if(log != 0){
                                $('.stage').css({
                                transform: 'perspective(1500px) rotateX('+roX+'deg) rotateY(' + roY + 'deg)'
                            });
                            }
                            
                        }, 30);
                    });
            });
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
        stateClass(){
            return (item)=>{
                let obj = {};
                if(item.state == 1){
                    obj={
                        "task-err":true
                    }
                }else{
                    obj={
                        "task-succ":true
                    }
                }
                return obj
            }
        },
        iconClass(){
            return (item)=>{
                if(item.logoType == 1){
                    let map = new Map();
                    map.set(item.logo, true);
                    return this.strMapToObj(map)
                }else{
                    return {}
                }
            }
        },
    }
}
</script>

<style>

</style>