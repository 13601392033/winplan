import axios from "@/utils/axios.js"

export function saveData(data){
    return axios({
        method:"post",
        url:"task/addTask",
        data:data
    })
}

export function editTaskById(data){
    return axios({
        method:"post",
        url:"task/editTaskById",
        data:data
    })
}

export function delTaskById(data){
    return axios({
        method:"post",
        url:"task/delTaskById",
        data:data
    })
}

export function queryAllTasks(data){
    return axios({
        method:"post",
        url:"task/queryAllTasks",
        data:data
    })
}

export function queryTasksByType(data){
    return axios({
        method:"post",
        url:"task/queryTasksByType",
        data:data
    })
}
