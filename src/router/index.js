import Vue from 'vue'
import VueRouter from 'vue-router'

import Homelogin from '@/views/home/home-login.vue'
import homeaflogin from '@/views/home/home-aflogin.vue'
import newrank from '@/views/rank/newrank.vue'
import record from '@/views/record/record.vue'
import oldrank from '@/views/rank/oldrank.vue'
import Room from '@/views/chart/Room.vue'



Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: "/home-login" },
    { path: '/home-login', component: Homelogin },
    { path: '/home-aflogin', component: homeaflogin, name: 'home-aflogin' },
    { path: '/newrank', component: newrank },
    { path: '/oldrank', component: oldrank },
    { path: '/record', component: record },
    { path: '/chart', component: Room }
]

const router = new VueRouter({
    routes
})

export default router