<template>
    <div class="habit-detail">
        <Headera style="color:#000;border-bottom:1px solid #fff;">
            <span class="header-title">习惯详情</span>
            <span class="left-icon">
                <router-link to="/main/habit">
                    <i class="el-icon-arrow-left" style="font-size: 20px;color:#000;font-weight: bold;"></i>
                </router-link>
            </span>
        </Headera>
    </div>
</template>

<script>
import Headera from "@/views/common/header.vue"
export default {
    name:"habitDetail",
    components:{
        Headera
    }
    
}
</script>

<style scoped>
.left-icon{
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
}   
.item-excitation-input{
    width:90%;
    text-indent: 1em;
    height:44px;
    border:1px solid #ddd;
    outline: none;
    border-radius: 10px;
}
.item-excitation{
    text-align: left;
    margin-left: 15px;
    height: 60px;
    line-height: 60px;
}
.bp-text-header{
    display: flex;
}
.bp-text-logo{
    flex: 1 0 100px;
    text-align: left;
    margin-left: 15px;
}
.bp-text-input{
    height: 50px;
    font-size: 18px;
    border-bottom: 1px solid #ddd;
    text-indent: 15px;
    width: 95%;
    outline: none;
    border:none;
}
.curBack{
    box-shadow: -1px 2px 9px #1a73e8;
}
.bp-back-list-content{
    margin-top:20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height: 80px;
    overflow: auto;
}
.bp-back-item{
    width:70px;
    height:40px;
    display: flex;
    justify-content: center;
}
.back-item-wrapper{
    width:33px;
    height:33px;
    border-radius:50%;
}

.bp-back-list{
    margin-top:20px;
}
.icon-list-item{
    width:20%;
    height:40px;
    display: flex;
    justify-content: center;
    padding:10px 0px;
}
.bp-icon-list-content{
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height:126px;
    overflow: auto;
}
.displayBar::-webkit-scrollbar {display:none}
.icon-item-wrapper{
    width:43px;
    height:43px;
    background: rgba(235,235,235,.5);
    border-radius:50%;
    position: relative;
}
.icon-list-item i{
    position: absolute;
    color: #000;
    font-size: 26px;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
}
.bp-content{
    margin-top: 20px;
}
.bp-choice-label{
    margin-left:15px;
    flex:1;
    text-align: left;
}
.bp-icon-list-header{
    display: flex;
    align-items: center;
}
.bp-input-text{
    text-align: right;
    margin-right: 15px;
    font-size: 30px;
    text-align: center;
    line-height: 50px;
    width: 50px;
    height: 50px;
    background: #1A73E8;
    border-radius: 50%;
}
.bp-choice-icon{
    text-align: right;
    margin-right: 15px;
    font-size: 30px;
    width: 45px;
    height: 45px;
    background: #1A73E8;
    border-radius: 50%;
    position: relative;
}
.bp-choice-icon i{
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.bp-header{
    display: flex;
    height: 50px;
    line-height: 50px;
}
.bp-header-title{
    flex:1;
    font-size: 18px;
}
.item-back-icon{
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    margin-right: 10px;
}
.opa{
    opacity: .3;
}
.back-demo{
    background: #1A73E8;
    color:#fff;
    margin-left:10px;
    width:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height:40px;
    border-radius:50%;
}
.name-label{
    font-size: 18px;
    flex: 0 0 170px;
    text-align: left;
    text-indent: 16px;
}
.item-back{
    display: flex;
    align-items: center;
    height:100%;
}
.title-input{
    width:100%;
    height:60px;
    outline: none;
    border: none;
    text-indent: 16px;
    font-size: 20px;
}
.ph-body-item{
    position: relative;
    width:100%;
    height:60px;
}
.ph-body{
    background: #fff;
}
.popup-header{
    height:60px;
    line-height:60px;
    display: flex;
}
.ph-left{
    flex:0 0 70px;
}
.ph-right{
    flex:0 0 70px;
    color: #1A73E8;
    letter-spacing: 2px;
}
.ph-title{
    flex: 1;
    font-size: 28px;
    font-weight: 600;
    font-family: cursive;
}
</style>