import Vue from "vue";
import Router from "vue-router";
import Home from "../components/index/index.vue";
import deviceDetails from "../components/deviceDetails/deviceIndex.vue";
import Machine from "../components/MachineDetails/MachineIndex.vue";
import Production from "../components/Production/ProductionIndex.vue";
import ProLineRate from "../components/productionLineRate/productionLine.vue";
import Efficiency from "../components/text/textLIne.vue";
import deviceList from "../components/deviceList/deviceList.vue";
import Equipment from "../components/Equipment/equipmentIndex.vue";
import Maintenance from "../components/Maintenance/MaintenanceIndex.vue";
import Examine from "../components/Examine/ExamineIndex.vue";
import Rate from "../components/PassRate/passRateindex.vue";
import OutsideP from "../components/outsideP/OutsidePindex.vue";
import Achievement from "../components/AchievementRate/AchievementIndex.vue";
import Output from "../components/AchievementRate/AchievementList.vue";
import Grain from "../components/Grain/GrainIndex.vue";
import Repair from "../components/Devicerepair/repairIndex.vue";
import Alarm from "../components/Alarm/AlarmIndex.vue";
import FictitiousList from "../components/FictitiousDevice/FictitiousDeviceIndex.vue";
import Unity from "../components/Unity/UnityINdex.vue";
import Program from "../components/Programupload/ProgramUpload.vue";
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
    path: "/Equipment",
    name: "Equipment",
    component: Equipment,
    meta: {
      title: "设备档案管理",
    },
  },
  {
    path: "/Maintenance",
    name: "Maintenance",
    component: Maintenance,
    meta: {
      title: "设备维保管理",
    },
  },
  {
    path: "/Examine",
    name: "Examine",
    component: Examine,
    meta: {
      title: "设备检点情况",
    },
  },
  {
    path: "/Rate",
    name: "Rate",
    component: Rate,
    meta: {
      title: "合格率统计分析",
    },
  },
  {
    path: "/OutsideP",
    name: "OutsideP",
    component: OutsideP,
    meta: {
      title: "外协加工",
    },
  },
  {
    path: "/Achievement",
    name: "Achievement",
    component: Achievement,
    meta: {
      title: "达成率分析",
    },
  },
  {
    path: "/Output",
    name: "Output",
    component: Output,
    meta: {
      title: "实际产量",
    },
  },
  {
    path: "/Grain",
    name: "Grain",
    component: Grain,
    meta: {
      title: "设备嫁动率/运动率",
    },
  },
  {
    path: "/Repair",
    name: "Repair",
    component: Repair,
    meta: {
      title: "设备维修记录",
    },
  },
  {
    path: "/Alarm",
    name: "Alarm",
    component: Alarm,
    meta: {
      title: "报警及统计",
    },
  },
  {
    path: "/FictitiousList",
    name: "FictitiousList",
    component: FictitiousList,
    meta: {
      title: "虚拟设备管理",
    },
  },
  {
    path: "/Unity",
    name: "Unity",
    component: Unity,
    meta: {
      title: "三维车间",
    },
  },
  {
    path: "/Program",
    name: "Program",
    component: Program,
    meta: {
      title: "程序上传",
    },
  },
];
const router = new Router({
  mode: "history",
  routes,
});
export default router;
