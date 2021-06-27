<template>
    <div class="wrapper" :style="{background: 'url('  + back1 + ') no-repeat'}">
        <!-- <div class="special">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div> -->
        <div class="login-title">
            <h3>win plan</h3>
        </div>
        <div class="login-form">
            <div class="form-item">
                <input placeholder="请输入账号" v-model="userName" class="input" type="text" autocomplete="off"/>
            </div>
            <div class="line"></div>
            <div class="form-item">
                <input  placeholder="请输入密码" v-model="password" class="input" type="password" autocomplete="off"/>
            </div>
            <div class="line"></div>
            <div class="login-btn" @click="loginIn">
                登录
            </div>
        </div>
    </div>
</template>

<style scoped>
.special{
    position: absolute;
    width: 100%;
    height: 119px;
    overflow: hidden;
}
.special span{
    position: absolute;
    width: 20% !important;
    opacity: .7;
    border-radius: 30px;
    height: 10px;
    background: linear-gradient(90deg, transparent, #66ffff);
    animation-iteration-count:3 !important;
}
.special span:nth-child(1){
    width: 40%;
    right: -26%;
    transform: translateX(-50%) rotate(-32deg);
    top:-40px;
    animation: animate1 1.5s linear infinite;
    animation-delay: 2s;
}
.special span:nth-child(2){
    top:-40px;
    width: 40%;
    right:-26%;
    transform: translateX(-50%) rotate(-32deg);
    animation: animate1 1.5s linear infinite;
    animation-delay: 2.1s;
}
.special span:nth-child(3){
    width: 40%;
    left: 40%;
    transform: translateX(-50%) rotate(32deg);
    top:-46px;
    animation: animate3 1.5s linear infinite;
    animation-delay: 2s;
}

.special span:nth-child(4){
    width: 40%;
    left: 40%;
    transform: translateX(-50%) rotate(32deg);
    top:-46px;
    animation: animate3 1.5s linear infinite;
    animation-delay: 2.1s;
}


@keyframes animate3 {
    0% {
        top: 10px;
    }
    50%,
    100% {
        left:80%;
        top: 155px;
    }
}

@keyframes animate1 {
    0% {
        top: 10px;
    }
    50%,
    100% {
        right:80%;
        top: 155px;
    }
}

</style>

<script>
import crypto from "crypto";
import { defineComponent, h } from 'vue'
  import { ElMessage } from 'element-plus'
export default {
    name:"login",
    setup(){
    },
    created(){
        
    },
    data(){
        return {
            userName:"king",
            password:"zhflovezhf1314",
            back1: require("@/assets/login.jpg"),
        }
    },
    methods:{
        loginIn(){
            this.$http({
                method:"post",
                url:"/api/login",
                data:{
                    userName: this.userName,
                    password:crypto.createHash('md5').update(this.password).digest("hex")
                }
            }).then(res=>{
                if(res.data.data.length >= 1){
                    this.$router.push({name:'home'});
                }else{
                    ElMessage({
                        message: h('p', null, [
                        h('span', null, '账号或密码错误！')
                        ])
                    });
                }
            })
        }
    }
}
</script>

<style scoped>
    .login-btn:active{
            box-shadow: 1px -2px 23px #ccffff;
    }
    .login-btn{
        background: transparent;
        width:90%;
        margin:0 auto;
        border:1px solid #FFFAF0;
        color:#fff;line-height:40px;
        border-radius:30px;
        height:40px;
        margin-top:20px;
        font-size: 14px;
    }
    .login-title h3{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 11%;
        font-family: Cursive;
        font-size: 34px;
        color: #fff;
    }
    .login-form{
        position: relative;
        top: 30%;
    }
    .line{
        width:100%;
        width: 90%;
        margin: 0 auto;
        height:1px;
        background: #969799;
    }
    .form-item{
        width: 90%;
        margin: 10px auto;
    }
    .input{
        color:#fff;
        border:none;
        background: transparent;
        width: 100%;
        outline:none;
        height:30px;
    }
    .wrapper{
        width:100%;
        height:100%;
        position:fixed;
        background-size: cover !important;
    }
    .input::-webkit-input-placeholder {
        text-align: left;
        color: #fff;
        letter-spacing: 2px;
        text-indent: 5px;
        font-size: 16px;
    }
</style>