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
                path: "personal",
                name: "personal",
                margin:"68px",
                component: ()=>import("@/views/personal.vue"),
            },
            {
                name:"home",
                path:"home",
                component:()=>import("@/views/home.vue")
            },
            {
                name:"task",
                path: "task",
                component: ()=>import("@/views/task.vue"),
            },
            {
                name:"record",
                path: "record",
                component: ()=>import("@/views/record.vue"),
            },
            {
                name:"habit",
                path: "habit",
                component: ()=>import("@/views/habit.vue"),
            },
            {
                name:"habitDetail",
                path: "habitDetail",
                component: ()=>import("@/views/habitDetail.vue"),
            },
            {
                name:"diary",
                path: "diary",
                component: ()=>import("@/views/diary.vue"),
            },
        ]
    },
]

let navRoutes = [
    {
        name:"personal",
        title:"我的",
        margin:"68px",
    },
    {
        name:"home",
        title:"主页",
        margin:"68px",
    },
    {
        name:"task",
        title:"任务",
        margin:"68px",
    },
    {
        name:"habit",
        title:"习惯",
        margin:"68px",
    },
    {
        name:"record",
        title:"记录",
        margin:"68px",
    },
    {
        name:"diary",
        title:"日记",
        margin:"68px",
    },
];
export  {navRoutes as routes};

const router = createRouter({
    history: createWebHashHistory(),
    mode:"history",
    routes
})
export default router