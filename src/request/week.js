import axios from "@/utils/axios.js"

export function initWeek(data){
    return axios({
        method:"post",
        url:"week/initWeek",
        data:data
    })
}
