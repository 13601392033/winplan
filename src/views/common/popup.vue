<template>
    <div class="popup" style="color:red;">
        <div class="mf" @click="close"></div>
        <div class="popup-header" >
            <div @touchstart="startDraw()" @touchmove="draw" @touchend="endDraw" class="popup-drop" :style="{background:'url('+b8+') no-repeat'}">

            </div>
        </div>
        <div class="popup-body"></div>
    </div>
</template>

<script>
function debounce(fn,delay){
    let timer = null
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
            isMove:undefined,
            documentHeihgt:undefined,
            reduce : undefined,
            dom:undefined,
        }
    },
    created(){
        
    },
    methods:{
        startDraw(){
            this.isMove = "start";
            height = document.getElementsByClassName("popup")[0].clientHeight;
            this.reduce = this.documentHeihgt - height;
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
            }, 250);
        },
        open(){
            this.documentHeihgt = window.screen.availHeight; 
            this.dom = document.getElementsByClassName("popup")[0]
            this.dom.style.display = "block"
            setTimeout(() => {
                this.dom.style.top = "10%"    
            }, 0);
            
        },
        draw(e){
            debounce(()=>{
                let y = e.changedTouches[0].clientY;
                if(this.reduce > y){
                    return 
                }
                this.dom.style.top = y+"px"
                this.isMove = "ing";
            },0)()
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
        background: #ddd;
        z-index: -1;
        opacity: .3;
    }
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
        display: none;
        position: fixed;
        height: 90%;
        background: white;
        top:100%;
        z-index: 500000;
        transition:all .25s;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        left: 0;
        width: 100%;
    }
</style>