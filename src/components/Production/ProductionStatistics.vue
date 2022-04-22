<template>
  <div>
    <div class="date_box fl">
      <!-- <div class="text">日期</div> -->
      <el-date-picker
        v-model="day"
        type="date"
        placeholder="日期"
        value-format="yyyy-MM-dd"
        @change="getDate()"
      >
      </el-date-picker>
    </div>
    <div class="chart-container fl" ref="loadProduction"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      day: "",
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadProduction);
      const initOption = {
        legend: {
          textStyle: {
            color: "#ffffff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "4%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            color: "#ffffff",
            fontSize: 16,
          },
          axisLine: {
            lineStyle: {
              color: "#ffffff",
            },
          },
          data: ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
        },
        yAxis: {
          axisLabel: {
            interval: 0,
            color: "#ffffff",
            fontSize: 16,
          },
          axisLine: {
            lineStyle: {
              color: "#ffffff",
            },
          },
          type: "value",
        },
        series: [
          {
            name: "当日产量统计",
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    getDate() {},
  },
};
</script>
<style scoped lang="scss">
.chart-container {
  width: 80%;
  height: 406px;
  padding-top: 20px;
  background: #0a2a55;
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
.el-date-editor.el-input {
  width: 150px;
  margin: 10px;
}
/deep/.el-input__inner {
  background: #354558;
  color: #fff;
}
.text {
  color: #fff;
  font-size: 20px;
}
</style>
