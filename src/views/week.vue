<template>
    <div class="week" :style="{background:'url('+back+')'}">
        <div class="camera">
            <ul class="stage">
                <li class="box" v-for="(item, index) in list" :key="index" :style="{transform: 'rotateY('+(index*40)+'deg) translateZ(310px)'}">
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
                                <div v-if="sonItem.type == 2">
                                    <div class="record-title">
                                        {{sonItem.title}}
                                    </div>
                                    <div class="record-content">
                                        <span>{{sonItem.content}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="diary-module" style="clear:both">
                                <div v-if="sonItem.type == 4">
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
                    
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
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
    width: 40%;
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
    margin:10px;
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
    margin:10px;
    height:70%;
    width:210px;
    overflow: auto;
    background: rgba(255,255,255,.8);
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
$(function () {
    function mf (mf) {
        mf.preventDefault(); 
    }
    var roY = 0, roX = -10;
    var xN = 0, yN = 0;
    var play = null;
    $(document).on('touchstart', (e) =>{
        let x_ = e.targetTouches[0].clientX;
        let y_ = e.targetTouches[0].clientY;
        clearInterval(play);
        $(this).bind('touchmove',(ev) =>{
            /*获取当前鼠标的坐标*/
            document.body.addEventListener('touchmove', mf, {passive: false});
            var x = ev.targetTouches[0].clientX;
            var y = ev.targetTouches[0].clientY;
            /*两次坐标之间的距离*/
            xN = x - x_;
            yN = y - y_;
            
            roY += xN * 0.2;
            roX -= yN * 0.1;
            $('.stage').css({
                transform: 'perspective(1500px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
            });
            /*之前的鼠标坐标*/
            x_ = ev.targetTouches[0].clientX;
            y_ = ev.targetTouches[0].clientY;
        });
    }).on('touchend',()=> {
        $(this).unbind('touchmove');
        document.body.removeEventListener('touchmove', mf, {passive: false});
        var play = setInterval(function () {
            xN *= 0.95;
            yN *= 0.95
            if (Math.abs(xN) < 1 && Math.abs(yN) < 1) {
                clearInterval(play);
            }
            roY += xN * 0.2;
            roX -= yN * 0.1;
            $('.stage').css({
                transform: 'perspective(1500px) rotateX(' + roX + 'deg) rotateY(' + roY + 'deg)'
            });
        }, 30);
    });
});
export default {
    data(){
        return {
            list:[],
            back: require("./../assets/d2.jpg"),
        }
    },
    created(){
        initWeek().then(res=>{
            if(res.data.code == 200){
                this.list = res.data.data

            }
        })
    },
    methods:{
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