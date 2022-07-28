<template>
  <div>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con_right fl">
      <div class="chart">
        <proStatis :deviceId="deviceId"></proStatis>
      </div>
      <div class="chart">
        <faultChart :deviceId="deviceId"></faultChart>
      </div>
    </div>
  </div>
</template>
<script>
import leftNav from "../common/leftNav.vue";
import proStatis from "./ProductionStatistics.vue";
import faultChart from "./faultChart.vue";
let DeviceUrl = "/api/CNC/GetDeviceList";
export default {
  components: { proStatis, faultChart, leftNav },
  data() {
    return {
      monthArr: [],
      index: 0,
      customDate: "",
      mothDate: 0,
      startupTime: 10,
      noalarmTime: 10,
      alarmNum: 0,
      DeviceList: [],
      deviceId: "",
    };
  },
  created() {
    this.getDeviceData();
  },
  methods: {
    // moth() {
    //   this.index = 0;
    //   console.log("ok");
    //   let date = new Date();
    //   let moth = date.getMonth();
    //   this.mothDate = moth;
    //   console.log(moth);
    // },
    // Half() {
    //   this.index = 1;
    //   this.monthArr = [];
    //   var data = new Date();
    //   // var year = data.getFullYear();
    //   data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
    //   for (var i = 0; i < 6; i++) {
    //     data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
    //     var m = data.getMonth() + 1;
    //     m = m < 10 ? "0" + m : m;
    //     this.monthArr.push(data.getFullYear() + "-" + m);
    //   }
    //   console.log(this.monthArr);
    //   //  return monthArr;
    // },
    custom_date() {
      this.index = 2;
      console.log(this.customDate);
    },
    getDate() {
      console.log(this.customDate);
    },
    getDeviceData() {
      this.$axios.get(DeviceUrl).then((res) => {
        if (res.data.state === 1) {
          this.DeviceList = res.data.data;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.left {
  width: 14%;
  margin-top: 20px;
  margin-right: 10px;
}

.con_right {
  width: 85%;
  height: calc(100vh - 270px);
}
.fl {
  float: left;
}
.date_box {
  width: 18%;
  height: 426px;
  background: #0a2a55;
  margin-left: 2%;
}
.chart {
  width: 100%;
  clear: both;
  height: 474px;
}
</style>
