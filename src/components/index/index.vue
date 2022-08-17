<template>
  <div>
    <Header :title="title"></Header>
    <div class="left fl">
      <AlamTime
        :durationTimeList="durationTimeList"
        :deviceNumberList="deviceNumberList"
      ></AlamTime>
      <AlamInfo :alarmData="alarmData"></AlamInfo>
      <!-- <TimeUti></TimeUti> -->
    </div>
    <div class="center fl">
      <deviceMap></deviceMap>
      <!-- <TimeUtilizationTop></TimeUtilizationTop> -->
    </div>
    <div class="right fl">
      <RealTimeState></RealTimeState>
      <StateDistribute></StateDistribute>
    </div>
  </div>
</template>
<script>
import AlamTime from "./AlamTime";
import AlamInfo from "./alarmInfo";
// import TimeUti from "./TimeUtilization";
import deviceMap from "./DeviceMap";
// import TimeUtilizationTop from "./TimeUtilizationTop";
import RealTimeState from "./RealTimeState";
import StateDistribute from "./StateDistribute";
import Header from "../common/Header.vue";
let url = "/api/CNC";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    AlamTime,
    AlamInfo,
    // TimeUti,
    deviceMap,
    // TimeUtilizationTop,
    RealTimeState,
    StateDistribute,
    Header,
  },
  data() {
    return {
      data: [],
      alarmData: [],
      alarmTimeTop: [],
      difference: [],
      deviceNumberList: [],
      durationTimeList: [],
      title: "超越智慧工厂",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get(this.$api + url).then((res) => {
        console.log(res);
        this.data = res.data;
        this.processData(this.data);
      });
    },
    processData(data) {
      let arry = [];
      let obj = {};
      if (data.lenght > 0) {
        data.forEach((item) => {
          if (item.Alarm === true) {
            arry = arry.concat(item.AlarmMessages);
            obj.Name = item.Name;
            obj.difference = this.timeDifference(
              item.AlarmMessages.StartAt - item.AlarmMessages.EndAt
            );
            this.alarmTimeTop.push(obj);
            this.difference.push(obj.difference);
          }
        });
        this.alarmData = arry;
        console.log(this.alarmData);
        this.timeSort(this.difference);
        this.dataMatch();
      }
    },
    //计算时间差
    timeDifference(date1, date2) {
      date1 = date1.replace(/-/g, "/");
      date2 = date2.replace(/-/g, "/");
      date1 = new Date(date1);
      date2 = new Date(date2);
      let s1 = date1.getTime();
      let s2 = date2.getTime();
      let total = (s2 - s1) / 1000;
      let day = parseInt(total / (24 * 60 * 60));
      let afterDay = total - day * 24 * 60 * 60;
      let hour = parseInt(afterDay / (60 * 60));
      let afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60;
      let min = parseInt(afterHour / 60);
      return min;
    },
    //时间进行排序
    timeSort(arry) {
      arry.sort(function (a, b) {
        return a - b;
      });
      return arry;
    },
    //筛选报警时间前十的数组
    dataMatch() {
      this.durationTimeList = this.difference.slice(-5);
      this.durationTimeList.forEach((item) => {
        this.alarmTimeTop.forEach((item1) => {
          if (item1.Name === item) {
            this.deviceNumberList.push(item1.Name);
          }
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  height: calc(100% - 114px);
  width: 100%;
  margin-top: 20px;
}
.fl {
  float: left;
}
.left,
.right {
  width: 25%;
  height: 100%;
}
.center {
  width: 50%;
  height: 100%;
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
</style>
