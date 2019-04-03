import axios from 'axios'
import {
    Loading,
    Message
} from 'element-ui'
import router from './router';

let loading

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0,7)'
    })
}

function endLoading() {
    loading.close()
}
//请求拦截
axios.defaults.timeout = 5000
axios.interceptors.request.use(config => {
    //加载动画
    startLoading();
    if (localStorage.eleToken) {
        config.headers.Authorization = localStorage.eleToken
    }
    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(response => {
    endLoading();
    return response
}, error => {
    endLoading()
    console.log('响应拦截出错')
    Message.error(error.response.data)

    //获取错误的状态码
    const status = error.status
    if(status == 401){
        Message.error('token失效，请重新登录')
        localStorage.removeItem('eleToken')

    }
    router.push('/login');
    return Promise.reject(error)
})

export default axios