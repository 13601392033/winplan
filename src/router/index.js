import {createRouter, createWebHashHistory} from "vue-router"
import home from "@/views/home"
import login from "@/views/white/login"
import a from "@/views/a.vue"

const routes = [
    {
        path: "/#",
        name: "login",
        margin:"51px",
        component: login,
    },
    {
        path: "/login",
        name: "login",
        margin:"68px",
        component: login,
    },
    {
        path: "/login",
        name: "login",
        margin:"68px",
        component: login,
    },
    {
        path: "/login",
        name: "login",
        margin:"68px",
        component: login,
    },
    {
        path: "/login",
        name: "login",
        margin:"68px",
        component: login,
    },
    {
        path: "/home",
        name: "home",
        margin:"90px",
        component: home,
        children:[
            {
                path:"a",
                component:a
            }
        ]
    },
]

export  {routes};

const router = createRouter({
    history: createWebHashHistory(),
    mode:"history",
    routes
})
export default router