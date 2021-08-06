import axios from "@/utils/axios.js"

export function addDiary(data){
    return axios({
        method:"post",
        url:"diary/addDiary",
        data:data
    })
}

export function editDiaryById(data){
    return axios({
        method:"post",
        url:"diary/editDiaryById",
        data:data
    })
}

export function delDiaryById(data){
    return axios({
        method:"post",
        url:"diary/delDiaryById",
        data:data
    })
}

export function queryDiaryById(data){
    return axios({
        method:"post",
        url:"diary/queryDiaryById",
        data:data
    })
}

export function queryNearById(data){
    return axios({
        method:"post",
        url:"diary/queryNearById",
        data:data
    })
}

export function queryDiaryList(data){
    return axios({
        method:"post",
        url:"diary/queryDiaryList",
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
