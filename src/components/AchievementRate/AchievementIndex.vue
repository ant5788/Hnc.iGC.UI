<template>
  <div>
    <Header :title="title"></Header>
    <div class="left fl">
      <leftNav></leftNav>
    </div>
    <div class="con fl">
      <div class="chart-container" ref="line"></div>
    </div>
  </div>
</template>
<script>
import leftNav from "../common/leftNav.vue";
import Header from "../common/Header.vue";
export default {
  components: { leftNav, Header },
  data() {
    return {
      chartInstance: null,
      title: "设备达成率分析",
    };
  },
  mounted() {
    this.initEchart();
  },
  methods: {
    initEchart() {
      this.chartInstance = this.$echarts.init(this.$refs.line);
      let initOption = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["实际产量", "计划产量"],
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "实际产量",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "计划产量",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
  },
};
</script>
<style scoped lang="scss">
.fl {
  float: left;
}
.left {
  width: 14%;
  margin-top: 20px;
  margin-right: 10px;
}
.con {
  width: 85%;
  margin-top: 20px;
}
.chart-container {
  width: 80%;
  height: calc(100vh - 114px);
  padding-top: 20px;
  background: #0a2a55;
}
</style>
