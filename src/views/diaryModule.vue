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
            <div class="diary-content" v-show="editor">
                <QuillEditor @ready="ready" ref="editor"  contentType="html" v-model:content="content" style="letter-spacing:3px;">
                </QuillEditor>
                <!--<textarea v-model="content" placeholder="今天发生了哪些想要记录下的事？" class="diary-textarea"></textarea>-->
            </div>
        </div>
        <div class="diary-footer" v-if="isEdit">
            <span :class="{opa: leftDis}" class="prev" @click="leftDis ? null : jump(0)">上一篇</span>
            <span :class="{opa: rightDis}" class="next" @click="rightDis ? null : jump(1)">下一篇</span>
        </div>
    </div>

</template>

<style scoped>
.diary-footer span{
    background: #fff;
}
.diary-content{
    position: fixed;
    margin: 0 auto;
    bottom: 80px;
    top: 100px;
    left: 0px;
    right: 0px;
    width: 96%;
}
.opa{
    opacity: .3;
}
.diary-footer{
    position: fixed;
    bottom:30px;
    width:100%;
}
.prev{
    float:left;
    margin-left:20px;
}
.next{
    float:right;
    margin-right:20px;
}
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
    height: 100%;
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
    color:#8A8A8A;
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
import {addDiary, editDiaryById, queryNearById, delDiaryById, queryDiaryById} from "@/request/diary"
import moment from "moment"
import {Dialog, Toast} from 'vant';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
moment.locale("zh-cn");
export default {
    name : "habit",
    created(){
        this.init();
    },
    components:{
        QuillEditor,
    },
    data(){
        return {
            moment: moment,
            leftDis: false,
            rightDis: false,
            date: new Date(),
            editor:false,
            isEdit: false,
            content:"",
            year: undefined,
            week: undefined,
            day: undefined,
            incId: undefined,
            diaryId: undefined,
        }
    },
    methods:{
        ready(el){
            console.log(el)
            el.blur.bind(el);
        },
        jump(n){
            this.editor = false;
            queryNearById({
                incId: parseInt(this.incId),
                type: n,
            }).then(res=>{
                if(res.data.code == 200){
                    if(res.data.data.length > 0){
                        let data = res.data.data[0];
                        this.incId = data.incId
                        this.diaryId = data.id;
                        this.content = data.content;
                        this.$refs.editor.setContents(this.content);
                        let date = parseInt(data.date);
                        this.year = moment(new Date(date)).format("L");
                        this.week = moment(new Date(date)).format("dddd");
                        this.day = moment(new Date(date)).format("LT");
                        this.$router.push({
                            name: "diaryModule",
                            query: {
                                id: data.id,
                                incId: data.incId
                            }
                        })
                        this.leftDis = false;
                        this.rightDis = false;
                    }else{
                        if(n == 0){
                            this.leftDis = true;
                        }else{
                            this.rightDis = true;
                        }
                        Toast.fail("没有了哦");
                    }
                }
            }).finally(()=>{
                this.editor = true;
            })
        },
        init(){
            let id = this.$route.query.id;
            if(id){
                this.incId = this.$route.query.incId;
                queryDiaryById({
                    id: id
                }).then(res=>{
                    if(res.data.code == 200){
                        let data = res.data.data[0];
                        let date = parseInt(data.date);
                        this.year = moment(new Date(date)).format("L");
                        this.week = moment(new Date(date)).format("dddd");
                        this.day = moment(new Date(date)).format("LT");
                        this.content = data.content;
                        this.$refs.editor.setContents(this.content);
                        // document.getElementsByClassName("mf")[0].focus()
                        // document.getElementsByClassName("mf")[0].blur()
                        document.getElementsByClassName("tag-date")[0].click();
                        this.isEdit = true;
                        this.diaryId = data.id;
                        this.leftDis = false;
                        this.rightDis = false;this.editor = true;
                    }
                })  
                
            }else{
                let date = new Date().getTime();
                this.year = moment(new Date(date)).format("L");
                this.week = moment(new Date(date)).format("dddd");
                this.day = moment(new Date(date)).format("LT");
                this.editor = true;
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
            let text = this.$refs.editor.getText().substring(0,15);
            if(!this.isEdit){
                addDiary({
                    content: this.content,
                    text:text
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
                    text:text
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