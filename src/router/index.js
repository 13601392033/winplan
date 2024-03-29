import {createRouter, createWebHashHistory} from "vue-router"
import login from "@/views/white/login"

const routes = [
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
                name:"week",
                path:"week",
                component:()=>import("@/views/week.vue")
            },
            {
                name:"allWeek",
                path:"allWeek",
                component:()=>import("@/views/allWeek.vue")
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
            {
                name:"diaryModule",
                path: "diaryModule",
                component: ()=>import("@/views/diaryModule.vue"),
            },
        ]
    },
    {
        path: '/:pathMatch(.*)',
        
        redirect: login,
    },
]

let navRoutes = [
    {
        name:"week",
        title:"week",
        margin:"68px",
    },
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


// if(localStorage.getItem("username") != "king"){
//     let newArr = navRoutes.filter((item)=>{
//         return item.name != "week"
//     })
//     localStorage.setItem("routes", JSON.stringify(newArr));
// }else{
//     navRoutes.unshift(
//         {
//             name:"week",
//             title:"week",
//             margin:"68px",
//         }
//     )
//     localStorage.setItem("routes", JSON.stringify(navRoutes));
// }

localStorage.setItem("routes", JSON.stringify(navRoutes));

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
let whiteList = ["login","c"];
router.beforeEach((to, from, next)=>{
    if(whiteList.find(name=>name==to.name)){ //白名单放行
        next();
    }else{
        let token = localStorage.getItem("token");
        if(token){
            next();
        }else{
            next({name:"login"})
        }
    }
})

export default router