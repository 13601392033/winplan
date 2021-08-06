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
            <el-button type="primary" @click="save" class="save-btn">保存</el-button>
        </div>
    </div>
</template>

<script>
import Headera from "@/views/common/header.vue"
import {upload} from "@/request/user.js"
import {queryUser, updateUserById} from "@/request/user.js"
import {Toast} from "vant"
export default {
    name:"personal",
    components:{
        Headera,
    },
    data(){
        return {
            name:"",
            age:"",
            email:"",
            phone:"",
            src:require("@/assets/z2.jpg"),
            file:[{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' ,isImage: false }],
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            queryUser({
                username: localStorage.getItem("username")
            }).then(res=>{
                if(res.data.code == 200){
                    let data = res.data.data[0];
                    let dataSrc = "http://localhost:9011/uploads/" + data.avatar;
                    if (process.env.NODE_ENV === 'production') {
                        dataSrc = "http://1.117.21.31:9011/uploads/" + data.avatar;
                    }
                    this.src = dataSrc;
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