import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/view/HomePage'
import CategoryPage from '@/view/CategoryPage'
import RoomList from '@/view/RoomList'
import Detail from '@/view/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomePage
    },
    {
      path: '/category',
      component: CategoryPage
    },
    {
      path: '/roomlist',
      component: RoomList
    },
    {
      path: '/detail/:id',
      component: Detail
    }
  ]
})
