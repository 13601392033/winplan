import axios from "@/utils/axios.js"

export function saveHabit(data){
    return axios({
        method:"post",
        url:"habit/addHabit",
        data:data
    })
}

export function addHabitLogs(data){
    return axios({
        method:"post",
        url:"habitLogs/addHabitLogs",
        data:data
    })
}

export function refreshHabitLogs(){
    return axios({
        method:"post",
        url:"habitLogs/refreshHabitLogs",
    })
}

export function queryHabitById(data){
    return axios({
        method:"post",
        url:"habit/queryHabitById",
        data
    })
}

export function queryHabitListInHome(data){
    return axios({
        method:"post",
        url:"habit/queryHabitListInHome",
        data:data
    })
}

export function queryHabitList(data){
    return axios({
        method:"post",
        url:"habit/queryHabitList",
        data:data
    })
}

export function editHabitById(data){
    return axios({
        method:"post",
        url:"habit/editHabitById",
        data:data
    })
}

export function delHabitById(data){
    return axios({
        method:"post",
        url:"habit/delHabitById",
        data:data
    })
}
