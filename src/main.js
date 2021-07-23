import "@/css/main.css"
//import "@/font/css/font-awesome.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import ElementPlus from 'ElementPlus'
import axios from "./utils/axios"
import "@/assets/menu_spand.png"
import moment from "moment"


const app = createApp(App).use(router).use(ElementPlus);

app.config.globalProperties.$http = axios
app.config.globalProperties.$moment = moment

app.mount('#app')