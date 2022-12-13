<template>
    <div class="wrapper" :style="{background: 'url('  + back1 + ') no-repeat'}">
        <!-- <div class="special">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div> -->
        <div class="login-title">
            <h3>
                <span :style="{animationDelay:(index/10) + 1+'s'}" v-for="(item, index) in title" :key="item">{{item}}</span>
            </h3>
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
                登&nbsp;&nbsp;录
            </div>
        </div>
    </div>
</template>

<style >
.login-title h3 span{
    animation:mymove 1s  both;
    -webkit-animation:mymove 1s both;
    
}

@keyframes mymove {
    0% {
        opacity: 0;
        transform: translateY(-80%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@-webkit-keyframes mymove {
    0% {
        opacity: 0;
        transform: translateY(-80%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

<script>
import crypto from "crypto";
import { h } from 'vue'
  import { ElMessage } from 'element-plus'
export default {
    name:"login",
    setup(){
    },
    created(){
        let a = '11';
        console.log(crypto.createHash('md5').update("admin123456").digest("hex"))
    },
    data(){
        return {
            userName:"king",
            password:"",
            back1: require("@/assets/b6.jpg"),
            title:"win plan"
        }
    },
    methods:{
        loginIn(){
            
            this.$http({
                method:"post",
                url:"/login",
                data:{
                    userName: this.userName,
                    password:crypto.createHash('md5').update(this.password).digest("hex")
                }
            }).then(res=>{
                
                if(res.data.data.length >= 1){
                    let routes = JSON.parse(localStorage.getItem("routes"))
                    if(res.data.data[0].username != "king"){
                        console.log(routes)
                        let newArr = routes.filter((item)=>{
                            return item.name != "week"
                        })
                        localStorage.setItem("routes", JSON.stringify(newArr));
                    }else{
                        routes.unshift(
                            {
                                name:"week",
                                title:"week",
                                margin:"68px",
                            }
                        )
                        localStorage.setItem("routes", JSON.stringify(routes));
                    }
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("username", res.data.data[0].username)
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
        font-size: 22px;
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
        background: rgba(255,255,255,.7);
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
        font-size: 18px;
        letter-spacing: 2px;
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