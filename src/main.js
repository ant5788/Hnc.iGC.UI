import Vue from "vue";
import App from "./App.vue";
import Axios from "axios";
import router from "./router";
import dataV from "@jiaminghi/data-view";
import * as echarts from "echarts";
import "./assets/css/main.scss";
import store from "./store";
import { DatePicker, TimePicker} from "element-ui";
Vue.component(DatePicker.name, DatePicker);
Vue.component(TimePicker.name, TimePicker);
Vue.use(dataV);
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = echarts;
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
