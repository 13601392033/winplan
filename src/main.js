import "@/css/main.css"
//import "@/font/css/font-awesome.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import ElementPlus from 'element-plus'
import axios from "./utils/axios"
import "@/assets/menu_spand.png"
import moment from "moment"


const app = createApp(App).use(router).use(ElementPlus);
let httpSrc = "http://localhost:9011/"
if (process.env.NODE_ENV === 'production') {
    httpSrc = "http://http://1.117.21.31:9011/"
}

moment.locale("zh-cn");
app.config.globalProperties.httpSrc = httpSrc
app.config.globalProperties.$http = axios
app.config.globalProperties.$moment = moment

let data = require("./assets/d1.jpg")
localStorage.setItem("back", data)

app.mount('#app')