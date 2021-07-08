import Axios from 'axios'
import { ElMessage } from 'element-plus'
import router from "@/router"
let baseURL = "/api";
if (process.env.NODE_ENV == 'development') {
    console.log(1)
} else if (process.env.NODE_ENV == 'production') {
    baseURL = "http://1.117.21.31:9000/api";
}
const axios = Axios.create({
    baseURL,
    timeout: 20000 // 请求超时 20s
})

function showMe(){
    let gif = require("@/assets/loading.gif");
    let img = document.createElement("img");
    img.setAttribute("src", gif);
    img.setAttribute("class", "loading");
    let div = document.createElement("div");
    div.appendChild(img);
    div.setAttribute("class","mask");
    document.getElementById("app").appendChild(div);
}
function hide(){
    let app = document.getElementById("app");
    let list = document.getElementsByClassName("mask");
    for(let i = 0; i< list.length; i++){
        app.removeChild(list[i]);
    }
}

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
    (response) => {
        /**
         * 根据你的项目实际情况来对 config 做处理
         * 这里对 config 不做任何处理，直接返回
         */
        showMe();
        let token = localStorage.getItem("token");
        if(token){
            response.headers["token"] = token;
        }
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
    (response) => {
        hide();
        if(response.data.code == "303"){ // token失效
            ElMessage.error(`Code: ${response.data.code}, Message: token失效`)
            localStorage.clear();
            router.push({name:"login"});
        }else if(response.data.code == "304"){ // session失效
            ElMessage.error(`Code: ${response.data.code}, Message: session失效`)
            localStorage.clear();
            router.push({name:"login"});
        }
        return response
    },
    (error) => {
        hide();
        if (error.response && error.response.data) {
            const code = error.response.status
            const msg = error.response.data.message
            ElMessage.error(`Code: ${code}, Message: ${msg}`)
            console.error(`[Axios Error]`, error.response)
        } else {
            ElMessage.error(`${error}`)
        }
        return Promise.reject(error)
    }
)

export default axios
