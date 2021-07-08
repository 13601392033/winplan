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
                    mf
                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">年龄</div>
                <div class="item-value">
                    23
                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">邮箱</div>
                <div class="item-value">
                    13601392033@163.com
                </div>
            </div>
            <div class="detail-item">
                <div class="item-label">手机号</div>
                <div class="item-value">
                    13601392033
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Headera from "@/views/common/header.vue"
export default {
    name:"personal",
    components:{
        Headera,
        //"van-uploader":Uploader,
    },
    data(){
        return {
            src:require("@/assets/z2.jpg"),
            file:[{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' ,isImage: false }],
        }
    },
    methods:{
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
        }
    }
}
</script>

<style scoped>
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