import Vue from "vue";
import App from "./App.vue";
import Axios from "axios"; //前端的http请求
import router from "./router"; //路由
import dataV from "@jiaminghi/data-view"; //大屏展示相关的css 插件
import * as echarts from "echarts"; //图表显示的插件
import "./assets/css/main.scss"; //全局的css
import store from "./store"; //全局数据交互（目前没有用到）
import base from "./api/index"; //引入后端的接口IP地址配置
import "element-ui/lib/theme-chalk/index.css"; //element-ui样式的引入
import utils from "./utils/common"; //全局方法的封装
import webSocket from "./utils/socket"; //与后端实时通讯方式的引入
import {
  DatePicker,
  TimePicker,
  Select,
  Option,
  OptionGroup,
  Table,
  TableColumn,
  Button,
  Pagination,
  Form,
  FormItem,
  Dialog,
  Message,
  Input,
  Upload,
  Loading,
  Radio,
  RadioGroup,
} from "element-ui"; //按需引入elemet-ui的相关组件
Vue.component(DatePicker.name, DatePicker);
Vue.component(TimePicker.name, TimePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(Dialog);
Vue.use(Message);
Vue.use(Input);
Vue.use(FormItem);
Vue.use(Upload);
Vue.use(dataV);
Vue.use(Loading);
Vue.use(Radio);
Vue.use(RadioGroup);
//引入对象在vue对象进行挂载
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$api = base.url.base;
Vue.prototype.$utils = utils;
Vue.prototype.$message = Message;
Vue.prototype.sendMsg = webSocket.sendMsg;
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
