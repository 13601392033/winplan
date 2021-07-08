import axios from "@/utils/axios.js"

export function saveRecord(data){
    return axios({
        method:"post",
        url:"record/addRecord",
        data:data
    })
}

export function queryRecordList(data){
    return axios({
        method:"post",
        url:"record/queryRecordList",
        data:data
    })
}

export function editRecordById(data){
    return axios({
        method:"post",
        url:"record/editRecordById",
        data:data
    })
}

export function refreshRecordList(data){
    return axios({
        method:"post",
        url:"record/refreshRecordList",
        data:data
    })
}

export function delRecordById(data){
    return axios({
        method:"post",
        url:"record/delRecordById",
        data:data
    })
}
