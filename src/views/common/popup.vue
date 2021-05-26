<template>
    <div class="popup" style="color:red;">
        <div class="popup-header" >
            <div @touchstart="startDraw()" @touchmove="draw" @touchend="endDraw" class="popup-drop" :style="{background:'url('+b8+') no-repeat'}">

            </div>
        </div>
    </div>
</template>

<script>
function debounce(fn,delay){
    let timer = null //借助闭包
    return function() {
        if(timer){
            clearTimeout(timer) 
        }
        timer = setTimeout(fn,delay) 
    }
}
let height = undefined
export default {
    name:"popup",
    data(){
        return {
            b8:require("@/assets/a3.jpg"),
            isMove:false,
            documentHeihgt:undefined,
            reduce : undefined,
            dom:undefined,
        }
    },
    created(){
        
    },
    methods:{
        startDraw(){
            this.isMove = true;
            height = document.getElementsByClassName("popup")[0].clientHeight;
            this.reduce = this.documentHeihgt - height;
        },
        endDraw(e){
            this.isMove = false;
            let y = e.changedTouches[0].clientY;
            if(y > (this.documentHeihgt/3)){
                this.dom.style.height = "0"
            }
        },
        open(){
            this.documentHeihgt = window.screen.availHeight; 
            this.dom = document.getElementsByClassName("popup")[0]
            this.dom.style.height = "90%"
            this.dom.style.top = "10%"

            // document.addEventListener("click", (e)=>{
            //     console.log(e.target)
            //     // let y = e.clientY;
            //     // let top = window.screen.availHeight - document.getElementsByClassName("popup")[0].offsetHeight;
            //     // console.log(y,top)
            // })
        },
        draw(e){
            debounce(()=>{
                let y = e.changedTouches[0].clientY;
                if(this.reduce > y){
                    return 
                }
                this.dom.style.top = y+"px"
            },0)()
        },
        
    }
}
</script>

<style scoped>
    .popup-header{
        width:100%;
        height:200px;
    }
    .popup-drop{
        width:100%;
        height:120px;
        background-size:100% 100% !important;
    }
    .popup{
        overflow: hidden;
        color: red;
        position: fixed;
        height: 0;
        background: white;
        top:10%;
        z-index: 500000;
        transition:all .25s;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        left: 0;
        width: 100%;
    }
</style>