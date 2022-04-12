import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/index/index.vue'
Vue.use(Router)
const routes=[{
  path:'/',
  name:'home',
  component:Home,
  meta: {
    title: '首页',
  },
}]
const router = new Router({
  mode: 'history',
  routes,
})
export default router