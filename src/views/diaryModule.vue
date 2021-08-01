<template>
    <div class="diary">
        <div class="diary-header">
            <span class="left-icon">
                <router-link to="/main/diary">
                    <i class="el-icon-back" style="font-size: 20px;color:#000;font-weight: bold;"></i>
                </router-link>
            </span>
            <div  class="done">
                <i @click="save" class="el-icon-edit-outline"></i>
                <i @click="delDiary" v-if="isEdit" class="el-icon-delete" style="margin-left:20px;"></i>
            </div>
        </div>
        <div class="diary-body">
            <div class="diary-tag">
                <span class="tag-date">{{year}}</span>
                <span class="tag-day">{{week}}</span>
                <span class="tag-time">{{day}}</span>
            </div>
            <div class="diary-content">
                <textarea v-model="content" placeholder="今天发生了哪些想要记录下的事？" class="diary-textarea"></textarea>
            </div>
        </div>
    </div>
</template>

<style scoped>
.done{
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 26px;
    letter-spacing: 2px;
}
.diary-textarea{
    width: 100%;
    outline: none;
    text-indent: 3px;
    margin-top:20px;
    letter-spacing: 1px;
    height:200px;
    border: none;
}
.diary-textarea::-webkit-input-placeholder {
    color: #ccc;
}
.diary-body{
    text-align: left;
    width: 92%;
    margin: 0 auto;
}
.diary-tag{
    letter-spacing: 1px;
}
.diary-tag span{
    margin-left:5px;
}
.diary-header{
    height:60px;
    position:relative;
}
.left-icon{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
}

</style>

<script>
import {addDiary, editDiaryById, delDiaryById} from "@/request/diary"
import moment from "moment"
import {Dialog, Toast} from 'vant';
moment.locale("zh-cn");
export default {
    name : "habit",
    created(){
        this.init();
    },
    data(){
        return {
            moment: moment,
            date: new Date(),
            isEdit: false,
            content:"",
            year: undefined,
            week: undefined,
            day: undefined,
            diaryId: undefined,
        }
    },
    methods:{
        init(){
            let id = this.$route.query.id;
            if(id){
                let date = parseInt(this.$route.query.date);
                this.year = moment(new Date(date)).format("L");
                this.week = moment(new Date(date)).format("dddd");
                this.day = moment(new Date(date)).format("LT");
                this.content = this.$route.query.detail;
                this.isEdit = true;
                this.diaryId = id;
            }else{
                let date = new Date().getTime();
                this.year = moment(new Date(date)).format("L");
                this.week = moment(new Date(date)).format("dddd");
                this.day = moment(new Date(date)).format("LT");
            }
        },
        delDiary(){
            let self = this;
            Dialog.confirm({
                title: '删除',
                message: '确定删除该日记吗？',
            }).then(res=>{
                delDiaryById({
                    id: self.diaryId
                }).then(res=>{
                    if(res.data.code == 200){
                        Toast.success(res.data.msg);
                        this.$router.push({
                            name: "diary"
                        })
                    }else{
                        Toast.fail(res.data.msg);
                    }
                })
            })
        },
        save(){
            if(!this.content){
                Toast.fail("写点什么吧~");
                return false;
            }
            if(!this.isEdit){
                addDiary({
                    content: this.content,
                }).then(res=>{
                    Toast.success(res.data.msg);
                    if(res.data.code == 200){
                        Toast.success(res.data.msg)
                    }else{
                        Toast.fail(res.data.msg)
                    }
                })
            }else{
                editDiaryById({
                    id: this.diaryId,
                    content: this.content,
                }).then(res=>{
                    if(res.data.code == 200){
                        Toast.success(res.data.msg)
                    }else{
                        Toast.fail(res.data.msg)
                    }
                })
            }
        }
    },
}
</script>