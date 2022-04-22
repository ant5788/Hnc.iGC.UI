<template>
  <div>
    <div class="con_top">
      <span>{{ type }}</span>
      <span>></span>
      <span>{{ part }}</span>
    </div>
    <div class="con_left fl">
      <div class="date_box">
        <button @click="moth()" :class="index === 0 ? 'active_btn' : ''">
          本月
        </button>
      </div>
      <div class="date_box">
        <button @click="Half()" :class="index === 1 ? 'active_btn' : ''">
          最近半年
        </button>
      </div>
      <div class="date_box">
        <button @click="custom_date()">自定义</button>
        <el-date-picker
          v-model="customDate"
          type="month"
          placeholder="选择月"
          v-show="index == 2"
          value-format="yyyy-MM-dd"
          @change="getDate()"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="con_right fl">
      <div class="con_right_top">
        <div class="chart">
          <piceChart :date="mothDate"></piceChart>
          <div class="chart_info">
            <span>开机时间(小时)</span><span>{{ startupTime }}</span>
            <span>平均无报警时间(小时)</span><span>{{ noalarmTime }}</span>
            <span>报警次数</span><span>{{ alarmNum }}</span>
          </div>
        </div>
        <div class="chart">
          <lineChart></lineChart>
        </div>
      </div>
      <div class="con_right_bottom">
        <div class="chart">
          <proStatis></proStatis>
        </div>
        <div class="chart">
          <faultChart></faultChart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import piceChart from "./piceChart.vue";
import lineChart from "./lineChart.vue";
import proStatis from "./ProductionStatistics.vue";
import faultChart from "./faultChart.vue";
export default {
  components: { piceChart, lineChart, proStatis, faultChart },
  data() {
    return {
      type: "机械",
      part: "A4奥迪CB转向节",
      monthArr: [],
      index: 0,
      customDate: "",
      mothDate: 0,
      startupTime: 10,
      noalarmTime: 10,
      alarmNum: 0,
    };
  },
  methods: {
    moth() {
      this.index = 0;
      console.log("ok");
      let date = new Date();
      let moth = date.getMonth();
      this.mothDate = moth;
      console.log(moth);
    },
    Half() {
      this.index = 1;
      this.monthArr = [];
      var data = new Date();
      // var year = data.getFullYear();
      data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
      for (var i = 0; i < 6; i++) {
        data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
        var m = data.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        this.monthArr.push(data.getFullYear() + "-" + m);
      }
      console.log(this.monthArr);
      //  return monthArr;
    },
    custom_date() {
      this.index = 2;
      console.log(this.customDate);
    },
    getDate() {
      console.log(this.customDate);
    },
  },
};
</script>
<style scoped lang="scss">
.con_top {
  width: 100%;
  height: 100px;
  color: #fff;
  font-size: 18px;
  line-height: 100px;
}
.con_left {
  width: 15%;
  height: calc(100vh - 270px);
  text-align: center;
  background: #032040;
  .date_box {
    margin: 20px;
    button {
      width: 163px;
      height: 40px;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
      outline: none;
      background: #010c20;
      border: 1px solid #010c20;
    }
    .active_btn {
      background: #354558;
      border: 1px solid #354558;
    }
  }
}
.con_right {
  width: 85%;
  height: calc(100vh - 270px);
}
.fl {
  float: left;
}
.con_right_top,
.con_right_bottom {
  display: flex;
}
.chart {
  height: 444px;
  flex: 1;
}
.chart_info {
  width: 98%;
  margin-left: 2%;
  color: #1171bb;
  text-align: center;
  padding: 10px 0;
  background: #0a2a55;
  span {
    margin-left: 20px;
  }
}
</style>
