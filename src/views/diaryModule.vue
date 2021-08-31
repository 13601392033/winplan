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
                <!-- <QuillEditor @ready="ready" ref="editor"  contentType="html" v-model:content="content" style="letter-spacing:3px;font-size:16px;">
                </QuillEditor> -->
                <!--<textarea v-model="content" placeholder="今天发生了哪些想要记录下的事？" class="diary-textarea"></textarea>-->
                <div class="editor-content" ref='editorCon'></div>
                
            </div>
        </div>
        <div class="diary-footer" v-if="isEdit">
            <span :class="{opa: leftDis}" class="prev" @click="leftDis ? null : jump(0)">上一篇</span>
            <span :class="{opa: rightDis}" class="next" @click="rightDis ? null : jump(1)">下一篇</span>
        </div>
    </div>

</template>

<style>
.editor-content .w-e-text-container{
    flex:1
}
</style>

<style scoped>
.editor-content{
    display: flex;
    flex:1;
    overflow: auto;
    flex-direction: column;
}
.diary-footer span{
    background: #fff;
}
.diary-content{
    position: fixed;
        display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0 auto;
    bottom: 26px;
    margin-bottom:10px;
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
    bottom:10px;
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
import {addDiary, editDiaryById, queryNearById, delDiaryById, queryDiaryById, diaryUpload} from "@/request/diary"
import moment from "moment"
import {Dialog, Toast} from 'vant';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import WangEditor from 'wangeditor';
moment.locale("zh-cn");
export default {
    name : "habit",
    mounted(){
        this.init();
    },
    components:{
        //QuillEditor,
    },
    setup() {
        const editor = ref();
        const content = reactive({
            html: '',
            text: '',
        });
        let instance;
        onMounted(() => {
            instance = new WangEditor(editor.value);
            instance.config.uploadImgMaxLength = 1 // 一次最多上传机长图片
            instance.config.excludeMenus = [
                'emoticon',
                'quote',
                'video'
            ]
            instance.config.customUploadImg = function (resultFiles, insertImgFn) {
                console.log(resultFiles)
                let formData = new FormData();
                formData.append("file", resultFiles[0]);
                diaryUpload(formData).then(res=>{
                    if(res.data.code == 200){
                        let httpSrc = "http://localhost:9011/uploads/"
                        if (process.env.NODE_ENV === 'production') {
                            httpSrc = "http://1.117.21.31:9011/uploads/"
                        }
                        insertImgFn(httpSrc + res.data.data)
                    }
                })
            }
            instance.create();
        });
        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        });
        const syncHTML = (html) => {
           instance.txt.html(html);
        };
        const getHtml = ()=>{
            return instance.txt.html()
        }
        const getText = ()=>{
            return instance.txt.text()
        }
        
        return {
            syncHTML,
            instance,
            editorCon:editor,
            contentCon:content,
            getHtml,
            getText
        };
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
                        this.syncHTML(this.content);
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
                        this.syncHTML(this.content);
                        this.isEdit = true;
                        this.diaryId = data.id;
                        this.leftDis = false;
                        this.rightDis = false;
                        this.editor = true;
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
            let html = this.getHtml();
            if(!html){
                Toast.fail("写点什么吧~");
                return false;
            }
            let text = this.getText().substring(0,15);
            if(!this.isEdit){
                addDiary({
                    content: html,
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
                    content: html,
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