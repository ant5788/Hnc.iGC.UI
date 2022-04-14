import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/index/index.vue'
import deviceDetails from "../components/deviceDetails/deviceIndex.vue"
import Machine from "../components/MachineDetails/MachineIndex.vue"
Vue.use(Router)
const routes=[{
  path:'/',
  name:'home',
  component:Home,
  meta: {
    title: '首页',
  },
},
{
  path:'/deviceDetails',
  name:'deviceDetails',
  component:deviceDetails,
  meta: {
    title: '设备详情',
  }, 
},
{
  path:'/Machine',
  name:'Machine',
  component:Machine,
  meta: {
    title: '设备详情',
  }, 
}
]
const router = new Router({
  mode: 'history',
  routes,
})
export default router