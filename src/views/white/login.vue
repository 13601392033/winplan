<template>
    <div class="wrapper" :style="{background: 'url('  + back1 + ') no-repeat'}">
        <div class="login-title">
            <h3>win plan</h3>
        </div>
        <div class="login-form">
            <div class="form-item">
                <input placeholder="请输入账号" class="input" type="text"/>
            </div>
            <div class="line"></div>
            <div class="form-item">
                <input placeholder="请输入账号" class="input" type="password"/>
            </div>
            <div class="line"></div>
            <div class="login-btn">
                登录
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"login",
    created(){
        console.log(this.$http)
    },
    data(){
        return {
            back1: require("@/assets/login.jpg"),
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