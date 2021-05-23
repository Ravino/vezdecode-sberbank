import Vue from 'vue'
import App from './App'
import store from './store'
import Vuelidate from 'vuelidate'
import {BootstrapVue} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import router from "@/router";

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(store)
Vue.use(VueRouter)
Vue.use(router)

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')