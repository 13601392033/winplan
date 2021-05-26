import "@/assets/main.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import ElementPlus from 'ElementPlus'
import axios from "./utils/axios"



const app = createApp(App).use(router).use(ElementPlus);


app.config.globalProperties.$http = axios

app.mount('#app')
