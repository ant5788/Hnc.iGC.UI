<template>
  <div class="chart-container" ref="loadBar"></div>
</template>
<script>
export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.loadBar);
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
            name: "故障统计时间（分钟）",
            data: [0, 0, 0, 0, 0, 0.15],
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
  },
};
</script>
<style scoped lang="scss">
.chart-container {
  width: 95%;
  height: 93%;
  margin-left: 2%;
  padding-top: 2%;
  background: #0a2a55;
}
</style>
