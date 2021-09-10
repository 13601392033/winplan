import axios from "@/utils/axios.js"

export function initWeek(data){
    return axios({
        method:"post",
        url:"week/initWeek",
        data:data
    })
}

export function addWeek(data){
    return axios({
        method:"post",
        url:"week/addWeek",
        data:data
    })
}

export function updateWeek(data){
    return axios({
        method:"post",
        url:"week/updateWeek",
        data:data
    })
}
