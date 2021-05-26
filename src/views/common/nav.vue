<template>
    <div class="menu" >
        <div class="menu-btn" :style="{background:'url('+menu1+') no-repeat'}">
            <div @click="switchState()" class="menu-ico" :style="{background:'url('+menu2+') no-repeat'}">
    
            </div>
        </div>
    </div>
    <div class="nav" >
        <div class="nav-back" style="width:100%;height:100%;" :style="{background:'url('+backImg+') no-repeat' }">
            <div class="nav-container">
                <ul class="nav-ul">
                    <li v-for="item in routes" :key="item.name" :style="{marginLeft: item.margin}">
                        <span style="">{{item.name}}</span>
                    </li>
                </ul>
            </div>
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

@keyframes mf2{
    100% {
        opacity: 0;
        margin-left: -400px;
        transform: scale3d(1,1,1);
    }
}

.nav-back{
    width:100%;
    height:100%;
    background-size: 200px 100% !important;
}

.nav-in{
    animation: mf .5s ease 1;
}

.nav-out{
    animation: mf2 .5s ease 1;
}

.menu{
    width: 80px;
    height: 142px;
    z-index: 200000;
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
    background-size: 40% 40% !important;
    background-position: 18px 40px !important;
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
    z-index: 100000;
    top: 50%;
    height: 350px;
    position: absolute;
    
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
    name:"nava",
    created(){
        
    },
    methods:{
         showMe(){
            let gif = require("@/assets/loading.gif");
            let img = document.createElement("img");
            img.setAttribute("src", gif);
            img.setAttribute("class", "loading");
            let div = document.createElement("div");
            //div.appendChild(img);
            div.setAttribute("class","mask");
            document.getElementsByClassName("home")[0].appendChild(div);
        },
        hide(){
            let app = document.getElementsByClassName("home")[0];
            let list = document.getElementsByClassName("mask");
            for(let i = 0; i< list.length; i++){
                app.removeChild(list[i]);
            }
        },
        switchState(){
            let nav = document.getElementsByClassName("nav")[0];
            if(this.state == 0){
                this.showMe();
                nav.classList.remove("nav-out")
                nav.classList.add("nav-in")
                this.state = 1;
                nav.style = "display:block;"

                let dom = document.getElementsByClassName("mask")[0];
                dom.addEventListener("click", ()=>{
                    this.hide();
                    nav.classList.remove("nav-in")
                    nav.classList.add("nav-out")
                    this.state = 0;
                    setTimeout(()=>{
                        nav.style = "display:none;"
                    },400)    
                })
            }else{
                this.hide();
                nav.classList.remove("nav-in")
                nav.classList.add("nav-out")
                this.state = 0;
                setTimeout(()=>{
                    nav.style = "display:none;"
                },400)
                
            }
        }
    },
    data(){
        return {
            state:0,//0为菜单 未打开 1 为已打开
            routes:routes,
            backImg:require("@/assets/menu_spand.png"),
            menu1:require("@/assets/menu1.png"),
            menu2:require("@/assets/1.png"),
        }
    },
    mounted(){
        
    }
}
</script>
