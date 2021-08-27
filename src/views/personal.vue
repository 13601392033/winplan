<template>
    <div class="personal">
        <Headera style="color:#000;border-bottom:1px solid #fff;">
            <span class="header-title" style="font-size:24px;">个人资料</span>
            <span class="left-icon">
                <router-link to="/main/home">
                    <i class="el-icon-back"></i>
                </router-link>
            </span>
            <span class="right-icon">更多</span>
        </Headera>
        <div class="personal-content">
            <div class="detail-item">
                <div class="item-label">头像</div>
                <div class="item-value">
                    <img @click="triggerUpload" class="avatar" :src="src">
                    <input class="file" style="display:none" @change="fileChange" type="file" />
                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">昵称</div>
                <div class="item-value">
                    <input v-model="name" class="item-input" type="text"/>

                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">年龄</div>
                <div class="item-value">
                    <input v-model.number="age" class="item-input" type="number"/>
                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">邮箱</div>
                <div class="item-value">
                    <input v-model="email" class="item-input" type="text"/>
                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">手机号</div>
                <div class="item-value">
                    <input v-model="phone" class="item-input" type="text"/>
                </div>
            </div>
            <div @click="showChangePass" class="change-btn">修改密码</div>
            <el-button type="primary" @click="save" class="save-btn">保存</el-button>
        </div>
        <Popup @on-close="onClosePopup" ref="popup" :height="'60px'" :isBack="false" :popupBodyBack="'#fff'">
            <template v-slot:header>
                <div class="popup-header" style='background:#fff;height:100%;'>
                    <span class="ph-title">修改密码</span>
                    <span class="ph-right" @click="saveHabit">取消</span>
                </div>
            </template>
            <template v-slot:body style="background:#fff">
                <div class="detail-popup">
                    <div class="detail-item">
                        <div class="item-label">旧密码</div>
                        <div class="item-value">
                            <input placeholder="请输入旧密码" v-model="pass.oldPass" class="item-input" type="text"/>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="item-label">新密码</div>
                        <div class="item-value">
                            <input placeholder="请输入新密码" v-model="pass.newPass" class="item-input" type="text"/>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="item-label">确认密码</div>
                        <div class="item-value">
                            <input placeholder="请再次确认新密码" v-model="pass.doubleNewPass" class="item-input" type="text"/>
                        </div>
                    </div>
                    <el-button type="primary" @click="updatePass" class="save-btn">修改</el-button>
                </div>
            </template>
        </Popup>
    </div>
</template>
<style scoped>
.detail-popup .item-label{
    flex:0  100px;
}
.detail-popup .item-input{
    width: 100%;
    height: 40px;
}
.detail-popup .item-value{
    flex:1;
}
.popup-header{
    position: relative;
    letter-spacing: 2px;
}
.ph-title{
    font-size: 20px;
    font-weight: bold;
    line-height: 40px;
}
.ph-right{
    position: absolute;
    right:10px;
    top:5px;
}
</style>
<script>
import Headera from "@/views/common/header.vue"
import Popup from "@/views/common/popup.vue"
import {upload} from "@/request/user.js"
import {queryUser, updateUserById, updateUserPasswordById} from "@/request/user.js"
import {Toast} from "vant"
import crypto from "crypto";
export default {
    name:"personal",
    components:{
        Headera,
        Popup
    },
    data(){
        return {
            name:"",
            age:"",
            email:"",
            pass:{
                oldPass:"",
                newPass:"",
                doubleNewPass:"",
            },
            phone:"",
            src:require("@/assets/z2.jpg"),
            file:[{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' ,isImage: false }],
        }
    },
    created(){
        this.init();
    },
    methods:{
        updatePass(){
            if(!this.pass.oldPass){
                Toast.fail("请输入旧密码");
                return false;
            }
            if(!this.pass.newPass){
                Toast.fail("请输入新密码");
                return false;
            }
            if(!this.pass.doubleNewPass || (this.pass.newPass !== this.pass.doubleNewPass)){
                Toast.fail("两次密码输入不一样");
                return false;
            }
            updateUserPasswordById({
                oldPass: crypto.createHash('md5').update(this.pass.oldPass).digest("hex"),
                newPass: crypto.createHash('md5').update(this.pass.newPass).digest("hex"),
            }).then(res=>{
                if(res.data.code == 200){
                    this.$refs.popup.close();
                    Toast.success(res.data.msg);
                    this.pass = {
                        oldPass:"",
                        newPass:"",
                        doubleNewPass:"",
                    }
                }else{
                    Toast.fail(res.data.msg);
                }
            })
        },
        showChangePass(){
            this.$refs.popup.open();
        },
        init(){
            queryUser({
                username: localStorage.getItem("username")
            }).then(res=>{
                if(res.data.code == 200){
                    let data = res.data.data[0];
                    let dataSrc = "http://1.117.21.31:9011/uploads/" + data.avatar;
                    // if (process.env.NODE_ENV === 'production') {
                    //     dataSrc = "http://1.117.21.31:9011/uploads/" + data.avatar;
                    // }
                    if(data.avatar){
                        this.src = dataSrc;
                    }
                    
                    this.name = data.name;
                    this.age = data.age;
                    this.email = data.email;
                    this.phone = data.phone;
                }
            })
        },
        checkPhone(phone){ 
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){ 
                Toast.fail("请输入正确的手机号！");
                return false;
            }
            return true;
        },
        save(){
            if(!this.checkPhone(this.phone)){
                return false;
            }
            updateUserById({
                username: localStorage.getItem("username"),
                age: this.age,
                email: this.email,
                name: this.name,
                phone: this.phone,
            }).then(res=>{
                if(res.data.code == 200){
                    Toast.success(res.data.msg);
                }else{
                    Toast.fail("修改失败！");
                }
            })
        },
        triggerUpload(){
            let fileInput = document.getElementsByClassName("file")[0];
            fileInput.click();
        },
        fileChange(e){
            let file = e.srcElement.files[0];
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = (e)=>{
                let res = e.target.result;
                this.src = res
            }
            let formData = new FormData();
            formData.append("file", file);
            formData.append("username", localStorage.getItem("username"));
            upload(formData).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style scoped>
.change-btn{
    margin-right: 15px;
    width: 125px;
    height: 35px;
    float: right;
    color:#fff;
    background-image: linear-gradient(to bottom right,#d3f5f4,#6CA6CD,#4682B4);
    border-radius: 46px;
    line-height: 35px;
}
.save-btn{
    margin-top:20px;
    width: 80%;
    border-radius: 30px;
    letter-spacing: 4px;
    font-size: 20px;
}
.item-input{
    border:none;
    outline:none;
    text-align: right;
}
.avatar{
    width:60px;
    height:60px;
    border-radius: 50%;
}
.detail-item{
    width:100%;
    display: flex;
    height:60px;
    align-items: center;
    margin-bottom: 10px;
}
.item-label{
    flex: 1 1 50%;
    text-align: left;
    text-indent: 20px;
    height: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
}
.item-value{
    margin-right: 20px;
    height: 100%;
    display: flex;
    align-items: center;
}
.el-icon-back{
    font-size: 24px;
    color:#000;
    font-weight: bold;
}
.left-icon{
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
}   
.right-icon{
    position: absolute;
    right: 20px;
    top: 50%;
    color: #7a7e83;
    font-size: 18px;
    transform: translateY(-50%);
}
</style>