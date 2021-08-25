import axios from "@/utils/axios.js"

export function upload(data){
    return axios({
        method:"post",
        url:"user/upload",
        data:data
    })
}

export function queryUser(data){
    return axios({
        method:"post",
        url:"user/queryUser",
        data:data
    })
}

export function updateUserById(data){
    return axios({
        method:"post",
        url:"user/updateUserById",
        data:data
    })
}

export function updateUserPasswordById(data){
    return axios({
        method:"post",
        url:"user/updateUserPasswordById",
        data:data
    })
}
