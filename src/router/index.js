import {createRouter, createWebHashHistory} from "vue-router"
import home from "@/views/home"
import login from "@/views/white/login"

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
        path: "/main",
        name: "main",
        margin:"90px",
        component: ()=>import("@/views/main.vue"),
        children:[
            {
                path:"home",
                component:()=>import("@/views/home.vue")
            },
            {
                path: "task",
                component: ()=>import("@/views/task.vue"),
            },
            {
                path: "record",
                component: ()=>import("@/views/record.vue"),
            },
            {
                path: "habit",
                component: ()=>import("@/views/habit.vue"),
            },
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