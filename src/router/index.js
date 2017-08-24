import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Experience from '@/components/Experience'
import ExperienceDetail from '@/components/ExperienceDetail'
import LeaveMsg from '@/components/LeaveMsg'
import Error from '@/components/Error'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Naruto from '@/components/projects/Naruto'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/user/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/project/naruto',
      name: 'naruto',
      component: Naruto
    },
    {
      path: '*',
      name: 'error',
      component: Error
    },
    {
      path: '/experience',
      name: 'Experience',
      component: Experience
    },
    {
      path: '/experienceDetail/:id',
      name: 'experienceDetail',
      component: ExperienceDetail
    },
    {
      path: '/user/leaveMsg',
      name: 'leaveMsg',
      component: LeaveMsg
    }
  ]
})
