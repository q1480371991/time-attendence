import axios from 'axios'

//解决跨域问题
axios.defaults.withCredentials = true

// 调用 axios.create() 函数，创建一个 axios 的实例对象，用 request 来接收
const request = axios.create({
    // 指定请求的根路径
    baseURL: 'http://localhost:8080'
})

export default request