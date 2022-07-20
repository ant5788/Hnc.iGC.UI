import Vue from "vue";
import Router from "vue-router";
import Home from "../components/index/index.vue";
import deviceDetails from "../components/deviceDetails/deviceIndex.vue";
import Machine from "../components/MachineDetails/MachineIndex.vue";
import Production from "../components/Production/ProductionIndex.vue";
import Efficiency from "../components/efficiencyAnalysis/efficiencyIndex.vue";
import ProLineRate from "../components/productionLineRate/productionLine.vue";
import text from "../components/text/textLIne.vue";
import deviceList from "../components/deviceList/deviceList.vue";
Vue.use(Router);
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/deviceDetails",
    name: "deviceDetails",
    component: deviceDetails,
    meta: {
      title: "设备详情",
    },
  },
  {
    path: "/Machine",
    name: "Machine",
    component: Machine,
    meta: {
      title: "设备详情",
    },
  },
  {
    path: "/Production",
    name: "Production",
    component: Production,
    meta: {
      title: "生产统计",
    },
  },
  {
    path: "/Efficiency",
    name: "Efficiency",
    component: Efficiency,
    meta: {
      title: "效率分析",
    },
  },
  {
    path: "/ProLineRate",
    name: "ProLineRate",
    component: ProLineRate,
    meta: {
      title: "生产线达成率",
    },
  },
  {
    path: "/deviceList",
    name: "deviceList",
    component: deviceList,
    meta: {
      title: "设备列表",
    },
  },
  {
    path: "/text",
    name: "text",
    component: text,
    meta: {
      title: "测试",
    },
  },
];
const router = new Router({
  mode: "history",
  routes,
});
export default router;
