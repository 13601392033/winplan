<template>
    <div class="popup" >
        <div class="mf" @click="close"></div>
        <div :style="{height:height}" class="popup-header" @touchstart="startDraw" @touchmove="draw" @touchend="endDraw">
            <div v-if="isBack" class="popup-drop" :style="{background:'url('+b8+') no-repeat'}">
                
            </div>
            
            <slot v-else name="header"></slot>
        </div>
        <div class="popup-body" :style="{background:popupBodyBack}">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>

function throttle(fn,delay,e){
    let valid = true
    return function() {
       if(!valid){
           //休息时间 暂不接客
           return false 
       }
       // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
            fn(e)
            valid = true;
        }, delay)
    }
}

let height = undefined
export default {
    name:"popup",
    props:{
        isBack:{
            default:true,
        },
        height:{
            default:"108px",
        },
        popupBodyBack:{
            default:null
        }
    },
    emits:[
        "onClose"
    ],
    data(){
        return {
            b8:require("@/assets/m7.jpg"),
            isMove:undefined,
            documentHeihgt:undefined,
            reduce : undefined,
            value:undefined,
            dom:undefined,
        }
    },
    methods:{
        open(){
            this.documentHeihgt = window.screen.height;
            this.dom = document.getElementsByClassName("popup")[0]
            this.dom.style.display = "flex"
            setTimeout(() => {
                this.dom.style.top = "10%"
            }, 0);
            document.getElementsByClassName("menu")[0].style.display = "none";
        },
        startDraw(){
            this.isMove = "start";
            height = Math.floor(this.documentHeihgt * 0.9)
            this.reduce = this.documentHeihgt - height;
        },
        draw(e){
            // throttle(()=>{
            //     let pageY = e.targetTouches[e.targetTouches.length-1].pageY;
            //     console.log(pageY,this.reduce)
            //     if(this.reduce > pageY){
            //         return 
            //     }
            //     this.dom.style.top = pageY + "px"
            //     this.isMove = "ing";
            // },10,e)()
            
            let pageY = e.targetTouches[e.targetTouches.length-1].pageY;
            if(this.reduce > pageY){
                this.dom.style.top = "10%"
                return 
            }
            this.dom.style.top = pageY + "px"
            this.isMove = "ing";
        },
        endDraw(e){
            let y = e.changedTouches[0].clientY;
            if(y > (this.documentHeihgt/3) && this.isMove == "ing"){
                this.close();
            }
            this.isMove = "end";
        },
        close(){
            this.dom.style.top = "100%"
            setTimeout(() => {
                this.dom.style.display = "none"
                this.dom.style.height = "90%"
                document.getElementsByClassName("menu")[0].style.display = "flex";
                this.$emit("onClose")    
            }, 250);
            
        },
        
    }
}
</script>

<style scoped>
    .mf{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        background: rgba(0,0,0,.6);
        z-index: -1;
    }
    .popup-body{
        color:#080808;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .popup-header{
        width:100%;
        height:108px;
    }
    .popup-drop{
        width:100%;
        height:100%;
        background-size:100% 100% !important;
    }
    .popup{
        overflow: hidden;
        display: none;
        flex-direction: column;
        position: fixed;
        height: 90%;
        background: white;
        top:100%;
        z-index: 1001;
        transition:top .15s;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        left: 0;
        width: 100%;
    }
</style>