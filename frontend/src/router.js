import VueRouter from 'vue-router'
import login from "@/components/login";
import registration from "@/components/registration";
import authorization from "@/components/authorization";
import refresh_pass from "@/components/refrech_pass"
import axios from "axios";
import main from "@/components/main";
// import {TOKEN} from "@/api/common";

const token = localStorage.getItem('token');
export default new VueRouter({
        routes: [
            {
                path: '',
                name: 'main',
                component: authorization,
                beforeEnter: (to, from, next) => {
                    axios.post('https://nesaweb.xyz/registration-authorization/session/update', {refreshToken: token}).then((response) => {
                        this.$store.commit('updateToken', response.data.refreshToken)
                        window.location.href = "/home"
                    }).catch(() => {
                        next()
                    })
                }
            },
            {
                path: '/signup',
                name: 'reg',
                component: registration
            },
            {
                path: '/login',
                name: 'login',
                component: login,
                beforeEnter: (to, from, next) => {
                    next();
                    axios.post('https://nesaweb.xyz/registration-authorization/session/update', {refreshToken: token}).then((response) => {
                        this.$store.commit('updateToken', response.data.refreshToken)
                        window.location.href = "/home"
                    }).catch(() => {
                        next()
                    })
                }
            },
            {
                path: '/home',
                name: 'home',
                component: main,
                beforeEnter: (to, from, next) => {
                    next();
                    axios.post('https://nesaweb.xyz/registration-authorization/session/update', {refreshToken: token}).then(() => {
                        next()
                    }).catch(() => {
                        window.location.href = "/login";
                    })
                }
            },
            {
                path: '/refresh',
                name: 'refresh',
                component: refresh_pass,
                beforeEnter: (to, from, next) => {
                    next();
                    // TOKEN.post('/verify_token/', {token: token}).then(() => {
                    //     window.location.href = "/home"
                    // }).catch(() => {
                    //     next();
                    // })

                }
            },
        ],
        //отключение хеша '#'
        mode: 'history'
    }
)