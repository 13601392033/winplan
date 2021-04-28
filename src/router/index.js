import {createRouter, createWebHashHistory} from "vue-router"
import home from "./../views/home"
import login from "./../views/white/login"

const routes = [
    {
        path: "/",
        name: "login",
        component: login,
    },
    {
        path: "/login",
        name: "login",
        component: login,
    },
    {
        path: "/home",
        name: "home",
        component: home,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    mode:"history",
    routes
})
export default router