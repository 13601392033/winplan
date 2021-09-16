import "@/css/main.css"
//import "@/font/css/font-awesome.css"
import { createApp } from 'vue'

import router from "./router"
import ElementPlus from 'element-plus'
import axios from "./utils/axios"
import "@/assets/menu_spand.png"
import moment from "moment"
import App from './App.vue'

const app = createApp(App).use(router).use(ElementPlus);
let httpSrc = "http://localhost:9011/"
if (process.env.NODE_ENV === 'production') {
    httpSrc = "http://http://1.117.21.31:9011/"
}

moment.locale("zh-cn");
app.config.globalProperties.httpSrc = httpSrc
app.config.globalProperties.$http = axios
app.config.globalProperties.$moment = moment

let data = require("./assets/d"+ randomNum(1,6) +".jpg")
localStorage.setItem("back", data)

app.mount('#app')


/*eslint-disable*/
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}