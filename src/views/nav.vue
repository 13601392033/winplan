<template>
    <div class="menu" @click="switchState()">
        <div class="menu-btn" :style="{background:'url('+menu1+') no-repeat'}">
            <div class="menu-ico" :style="{background:'url('+menu2+') no-repeat'}">
    
            </div>
        </div>
    </div>
    <div class="nav" :style="{background:'url('+backImg+') no-repeat' }">
        <div class="nav-container">
            <ul class="nav-ul">
                <li v-for="item in routes" :key="item.name" :style="{marginLeft: item.margin}">
                    <span style="">{{item.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.nav-container{
    height:100%;
}
@keyframes mf{
    0% {
        opacity: 0;
        margin-left: -400px;
        transform: scale3d(1,1,1);
    }
}

.nav-in{
    display: block !important;
    animation: mf .5s ease 1;
}

.nav-out{
    animation: mf .5s ease 1;
}

.menu{
    width: 100px;
    height: 142px;
    z-index:10000;
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    left:-48px;
}
.menu-ico{
    width: 83%;
    height: 100%;
    background-position: 0px -2px !important;
    background-size: 100% 100% !important;
}
.menu-btn{
    background-size: 45% 45% !important;
    background-position: 14px 36px !important;
    width: 100%;
    height: 100%;
}
.btn{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.nav{
    display: none;
    transform: translateY(-50%);
    width: 195px;
    top: 50%;
    height: 350px;
    position: absolute;
    background-size: 200px 100% !important;
}
.nav-ul{
    width:100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 50%;
    overflow: auto;
}
.nav-ul li{
    text-align: left;
    margin-left:50px;
    line-height:30px;
    margin-bottom:15px;
}

.nav-ul li span{
    display: inline-block;
    text-align: center;
    background: #fff;
    border-radius:30px;
    width:86px;
    height:30px;
}
</style>

<script>
import {routes} from "@/router/index.js"
export default {
    name:"nav",
    created(){
        
    },
    methods:{
        switchState(){
            let nav = document.getElementsByClassName("nav")[0];
            if(this.state == 0){
                nav.classList.remove("nav-out")
                nav.classList.add("nav-in")
                this.state = 1;
                
            }else{
                nav.classList.remove("nav-in")
                nav.classList.add("nav-out")
                this.state = 0;
            }
        }
    },
    data(){
        return {
            state:0,//0为菜单 未打开 1 为已打开
            routes:routes,
            backImg:require("@/assets/menu_spand.png"),
            menu1:require("@/assets/menu1.png"),
            menu2:require("@/assets/menu2.png"),
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>

</style>